export class CountdownTimer {
  constructor(hoursSelector, minutesSelector, secondsSelector, promoId = 'default_promo') {
    // DOM-элементы
    this.hoursElement = document.querySelector(hoursSelector);
    this.minutesElement = document.querySelector(minutesSelector);
    this.secondsElement = document.querySelector(secondsSelector);

    // Уникальный идентификатор акции для хранения
    this.promoId = promoId;
    this.storageKeys = {
      endTime: `countdown_${this.promoId}_endTime`,
      backupEndTime: `countdown_${this.promoId}_backup`,
      fingerprint: `countdown_${this.promoId}_fingerprint`,
    };

    // Инициализация таймера
    this.initTimer();

    // Запуск таймера
    this.timerInterval = setInterval(() => this.updateTimer(), 1000);

    // Первоначальное обновление таймера
    this.updateTimer();

    // Добавляем обработчик для хранения данных при закрытии окна
    window.addEventListener('beforeunload', () => this.saveTimerState());
  }

  // Инициализация таймера с проверкой сохраненных данных
  initTimer() {
    // Попытка восстановить время из разных источников
    const savedEndTime = this.getEndTimeFromStorage();

    if (savedEndTime) {
      this.bitTime = new Date(savedEndTime);

      // Если время истекло, установим новое
      const now = new Date();
      if (this.bitTime <= now) {
        this.resetTimer();
      }
    } else {
      this.resetTimer();
    }

    // Создаем и сохраняем "отпечаток" браузера
    this.createAndSaveFingerprint();
  }

  // Генерация простого отпечатка браузера
  createAndSaveFingerprint() {
    const fingerprint = {
      userAgent: navigator.userAgent,
      language: navigator.language,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      screenSize: `${window.screen.width}x${window.screen.height}`,
      timestamp: Date.now(),
    };

    const fingerprintString = JSON.stringify(fingerprint);

    // Сохраняем в разных хранилищах
    this.setStorageItem(this.storageKeys.fingerprint, fingerprintString);
  }

  // Проверка валидности отпечатка
  isValidFingerprint() {
    try {
      const storedFingerprint = this.getStorageItem(this.storageKeys.fingerprint);
      if (!storedFingerprint) return false;

      const fingerprint = JSON.parse(storedFingerprint);
      const now = Date.now();

      // Проверяем основные параметры браузера
      const currentUserAgent = navigator.userAgent;
      const currentLanguage = navigator.language;
      const currentTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

      if (
        fingerprint.userAgent !== currentUserAgent ||
        fingerprint.language !== currentLanguage ||
        fingerprint.timezone !== currentTimezone
      ) {
        return false;
      }

      // Проверяем, что отпечаток был создан не более 2 недель назад
      const twoWeeksInMs = 14 * 24 * 60 * 60 * 1000;
      if (now - fingerprint.timestamp > twoWeeksInMs) {
        return false;
      }

      return true;
    } catch (e) {
      console.error('Ошибка проверки отпечатка:', e);
      return false;
    }
  }

  // Получение сохраненного времени окончания из разных хранилищ
  getEndTimeFromStorage() {
    // Если отпечаток не валиден, не восстанавливаем данные
    if (!this.isValidFingerprint()) {
      this.clearAllStorage();
      return null;
    }

    // Пробуем восстановить из localStorage
    const endTimeFromStorage = this.getStorageItem(this.storageKeys.endTime);
    if (endTimeFromStorage) {
      return endTimeFromStorage;
    }

    // Пробуем восстановить из backup (sessionStorage или cookie)
    const backupEndTime = this.getStorageItem(this.storageKeys.backupEndTime, 'backup');
    if (backupEndTime) {
      // Синхронизируем с основным хранилищем
      this.setStorageItem(this.storageKeys.endTime, backupEndTime);
      return backupEndTime;
    }

    return null;
  }

  // Сброс таймера
  resetTimer() {
    this.bitTime = new Date();
    this.bitTime.setDate(this.bitTime.getDate() + 1);
    this.saveTimerState();
  }

  // Сохранение состояния таймера
  saveTimerState() {
    const endTimeString = this.bitTime.toISOString();

    // Сохраняем в localStorage и в резервные хранилища
    this.setStorageItem(this.storageKeys.endTime, endTimeString);
    this.setStorageItem(this.storageKeys.backupEndTime, endTimeString, 'backup');
  }

  // Универсальный метод для хранения данных с защитой от ошибок
  setStorageItem(key, value, storageType = 'primary') {
    try {
      // Основное хранилище - localStorage
      if (storageType === 'primary' || storageType === 'both') {
        localStorage.setItem(key, value);
      }

      // Резервное хранилище - sessionStorage
      if (storageType === 'backup' || storageType === 'both') {
        sessionStorage.setItem(key, value);

        // Дополнительно сохраняем в cookie для большей устойчивости
        this.setCookie(key, value, 14); // 14 дней
      }
    } catch (e) {
      console.error('Ошибка сохранения данных:', e);
    }
  }

  // Получение данных из хранилища
  getStorageItem(key, storageType = 'primary') {
    try {
      // Пробуем получить из основного хранилища
      if (storageType === 'primary') {
        return localStorage.getItem(key);
      }

      // Пробуем получить из резервных хранилищ
      if (storageType === 'backup') {
        // Сначала из sessionStorage
        const sessionData = sessionStorage.getItem(key);
        if (sessionData) return sessionData;

        // Затем из cookie
        return this.getCookie(key);
      }
    } catch (e) {
      console.error('Ошибка получения данных:', e);
      return null;
    }
  }

  // Очистка всех хранилищ
  clearAllStorage() {
    for (const key in this.storageKeys) {
      try {
        localStorage.removeItem(this.storageKeys[key]);
        sessionStorage.removeItem(this.storageKeys[key]);
        this.deleteCookie(this.storageKeys[key]);
      } catch (e) {
        console.error('Ошибка очистки хранилища:', e);
      }
    }
  }

  // Вспомогательные методы для работы с cookie
  setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = `expires=${date.toUTCString()}`;
    document.cookie = `${name}=${value};${expires};path=/;SameSite=Strict`;
  }

  getCookie(name) {
    const cookieName = `${name}=`;
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i].trim();
      if (cookie.indexOf(cookieName) === 0) {
        return cookie.substring(cookieName.length, cookie.length);
      }
    }
    return null;
  }

  deleteCookie(name) {
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
  }

  // Форматирование числа
  formatNum(number) {
    return number < 10 ? `0${number}` : number;
  }

  // Обновление таймера
  updateTimer() {
    const actualTime = new Date();
    let timeLeft = this.bitTime - actualTime;

    // Если время вышло, добавляем новый день
    if (timeLeft < 0) {
      this.resetTimer();
      timeLeft = this.bitTime - actualTime;
    }

    // Рассчет часов, минут и секунд
    const hours = Math.floor(timeLeft / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    // Обновление DOM-элементов
    this.hoursElement.textContent = this.formatNum(hours);
    this.minutesElement.textContent = this.formatNum(minutes);
    this.secondsElement.textContent = this.formatNum(seconds);
  }
  // Остановка таймера
  stop() {
    clearInterval(this.timerInterval);
  }
}
