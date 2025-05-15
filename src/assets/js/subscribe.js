class EmailValidator {
  constructor() {
    this.regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  }

  validate(email) {
    return this.regex.test(email);
  }
}

class SubscribeFormApp {
  constructor(formSelector, apiUrl, classValidator, classModalWindow) {
    this.form = document.querySelector(formSelector);
    this.apiUrl = apiUrl;
    this.validator = classValidator;
    this.modalAnswerForm = classModalWindow;
    this.correctInput = false;

    this.initEventListeners();
  }

  initEventListeners() {
    this.form.addEventListener('input', this.handleInput);
    this.form.addEventListener('submit', this.handleSubmit);
  }

  handleInput = ({ target }) => {
    const isEmpty = target.value === '';
    this.correctInput = this.validator.validate(target.value);
    const isValid = isEmpty || this.correctInput;

    this.form.classList.toggle('true', isValid && !isEmpty);
    this.form.classList.toggle('false', !isValid);
  };

  handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(this.form);
    const email = formData.get('email');

    if (!this.correctInput) {
      return this.modalAnswerForm.openModalWithContent(email, 'Введите корректный email!');
    }

    try {
      await this.processSubscription(email);
    } catch (error) {
      console.log('Произошла ошибка:', error.message);
    }
  };

  async processSubscription(email) {
    const data = await this.fetchSubscription(email);

    if (data.length === 0) {
      await this.createSubscription(email);
      this.modalAnswerForm.openModalWithContent(email, 'Вы успешно отправили email!');
      this.resetForm();
    } else {
      this.modalAnswerForm.openModalWithContent(email, 'Вы тут уже были!');
    }
  }

  async fetchSubscription(email) {
    const response = await fetch(`${this.apiUrl}?email=${email}`);
    if (!response.ok) throw new Error('Ошибка сети');
    return await response.json();
  }

  async createSubscription(email) {
    const saveResponse = await fetch(this.apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });

    if (!saveResponse.ok) throw new Error('Ошибка при сохранении');
    return saveResponse;
  }

  resetForm() {
    this.form.classList.remove('true');
    this.form.reset();
  }
}

export { EmailValidator, SubscribeFormApp };
