export class DropdownManager {
  constructor(targetSelector, optionsWrapSelector, optionSelector) {
    this.dropdownWrap = document.querySelector(optionsWrapSelector);
    this.dropdownOptions = document.querySelectorAll(optionSelector);
    this.dropdownTarget = document.querySelector(targetSelector);
    this.isOpen = false;
    this.currentPeriod = 'month';
    this.init();
  }

  init() {
    this.dropdownTarget.addEventListener('click', () => this.toggleDropdown());

    document.addEventListener('click', (event) => {
      if (
        this.isOpen &&
        !this.dropdownTarget.contains(event.target) &&
        !this.dropdownWrap.contains(event.target)
      ) {
        this.toggleDropdown();
      }
    });

    this.dropdownOptions.forEach((option) => {
      option.addEventListener('click', (event) => {
        event.stopPropagation();

        const selectedPeriod = option.getAttribute('value');

        this.currentPeriod = selectedPeriod;

        this.updateDropdownSelected(option);

        this.onPeriodChange(this.currentPeriod);

        this.toggleDropdown();
      });
    });
  }

  toggleDropdown() {
    this.isOpen = !this.isOpen;

    this.dropdownWrap.classList.toggle('open', this.isOpen);
    this.dropdownTarget.classList.toggle('open', this.isOpen);
    this.dropdownTarget.classList.toggle('close', !this.isOpen);
  }

  updateDropdownSelected(selectedOption) {
    const spanText = this.dropdownTarget.querySelector('#dropdown-selected');
    if (spanText) {
      spanText.textContent = selectedOption.textContent;
    }
  }

  onPeriodChange(period) {}

  getCurrentPeriod() {
    return this.currentPeriod;
  }
}

export class SellerSlider {
  constructor(sliderWrapSelector, prevBtnSelector, nextBtnSelector, btnContainerSelector) {
    this.slider = document.querySelector('.slider');
    this.buttonContainer = document.querySelector(btnContainerSelector);
    this.sliderWrap = document.querySelector(sliderWrapSelector);
    this.prevButton = document.querySelector(prevBtnSelector);
    this.nextButton = document.querySelector(nextBtnSelector);

    this.sliderRect = this.sliderWrap.getBoundingClientRect();
    this.columnGap = window.getComputedStyle(this.sliderWrap).columnGap;
    this.sliderScrollWidth;
    this.slideStep;
    this.currentPosition = 0;
    this.dragOffsetX = 0;
    this.viewportWidth;

    this.handleDragMoveMethod = (event) => this.handleDragMove(event);

    this.init();
  }

  init() {
    this.buttonContainer.addEventListener('click', (event) => this.handleButtonClick(event));

    this.sliderWrap.addEventListener('pointerdown', (event) => this.handleDragStart(event));
    this.sliderWrap.addEventListener('pointerleave', () => this.handleDragEnd());

    this.sliderWrap.addEventListener('pointerup', () => this.handleDragEnd());
    this.sliderWrap.classList.add('cursorGrab');
  }

  updateSliderStep() {
    if (this.slider.clientWidth <= 1476) {
      this.slideStep = 300 + parseFloat(this.columnGap);
    }
    if (this.slider.clientWidth < 300) {
      this.slideStep = 260 + parseFloat(this.columnGap);
    }
  }
  updateSliderWidth() {
    this.viewportWidth = this.slider.clientWidth;
  }
  updateSliderScrollWidth() {
    const scrollWidthRect = Math.floor(this.sliderWrap.getBoundingClientRect().width);
    if (!this.sliderScrollWidth || this.sliderScrollWidth !== scrollWidthRect) {
      this.sliderScrollWidth = scrollWidthRect;
    }
  }

  handleButtonClick(event) {
    const target = event.target.closest('#seller-prev, #seller-next');
    this.updateSliderScrollWidth();
    this.updateSliderStep();
    this.updateSliderWidth();

    if (!target) return;

    if (target === this.prevButton && this.currentPosition < 0) {
      this.currentPosition += this.slideStep;
    }

    if (
      target === this.nextButton &&
      -this.currentPosition < this.sliderScrollWidth - this.viewportWidth
    ) {
      this.currentPosition -= this.slideStep;
    }

    this.currentPosition = Math.max(
      -(this.sliderScrollWidth - this.viewportWidth),
      Math.min(0, this.currentPosition),
    );

    this.updateSliderPosition();
  }

  updateSliderPosition() {
    this.sliderWrap.style.transform = `translateX(${this.currentPosition}px)`;

    if (this.currentPosition === 0) {
      this.prevButton.classList.add('disabled');
    }

    if (this.currentPosition !== 0) {
      this.prevButton.classList.remove('disabled');
    }

    if (this.currentPosition === -(this.sliderScrollWidth - this.viewportWidth)) {
      this.nextButton.classList.add('disabled');
    }

    if (this.currentPosition !== -(this.sliderScrollWidth - this.viewportWidth)) {
      this.nextButton.classList.remove('disabled');
    }
  }

  handleDragStart(event) {
    this.updateSliderScrollWidth();
    this.updateSliderStep();
    this.updateSliderWidth();
    this.dragOffsetX = event.clientX - this.sliderRect.left - this.currentPosition;
    this.sliderWrap.addEventListener('pointermove', this.handleDragMoveMethod);
  }
  handleDragMove(event) {
    this.sliderWrap.classList.add('userSelectOff');
    this.sliderWrap.classList.remove('cursorGrab');
    this.sliderWrap.classList.add('cursorGrabbing');
    const currentPointerX = event.clientX - this.sliderRect.left;

    this.currentPosition = currentPointerX - this.dragOffsetX;
    if (this.currentPosition > 0) this.currentPosition = 0;

    if (-this.currentPosition > this.sliderScrollWidth - this.viewportWidth)
      this.currentPosition = -(this.sliderScrollWidth - this.viewportWidth);

    this.sliderWrap.style.transform = `translateX(${this.currentPosition}px)`;
  }

  handleDragEnd() {
    let stepsCount = this.currentPosition / this.slideStep;

    this.currentPosition = Math.round(stepsCount) * this.slideStep;

    this.currentPosition = Math.max(
      -(this.sliderScrollWidth - this.viewportWidth),
      Math.min(0, this.currentPosition),
    );

    this.updateSliderPosition();
    this.sliderWrap.classList.remove('cursorMove');
    this.sliderWrap.classList.remove('userSelectOff');
    this.sliderWrap.classList.remove('cursorGrabbing');
    this.sliderWrap.classList.add('cursorGrab');
    this.sliderWrap.removeEventListener('pointermove', this.handleDragMoveMethod);
  }
}

export class DataLoader {
  constructor(containerSelector) {
    this.container = document.querySelector(containerSelector);
  }

  async loadData(period) {
    try {
      this.container.innerHTML = '';

      this.container.innerHTML = '<li>Do here animation...</li>';

      const response = await fetch(`https://ddbd8828c9bcda52.mokky.dev/${period}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      this.container.innerHTML = '';
      data.forEach((seller) => {
        const listItem = document.createElement('li');
        listItem.className = 'slider__item';
        listItem.innerHTML += `
             <div class="slider__image">
               <img src="${seller.pathAvatar}" alt="avatar" />
             </div>
             <div class="slider__description">
               <p class="slider__name">${seller.name}</p>
               <p class="slider__total">${seller.total}<span>Eth</span></p>
             </div>
             <div class="slider__social">
               <a href="#" class="slider__link">
                 <img src="image/friends.png" alt="friends" />
               </a>
               <a href="#" class="slider__link">
                 <img src="image/telegram.png" alt="telegram" />
               </a>
             </div>
           `;
        this.container.appendChild(listItem);
      });
      //зачем
      return data;
    } catch (error) {
      console.log('Error loading data:', error);
      this.container.innerHTML = `<li>Произошла ошибка при загрузке данных: ${error.message}</li>`;
      //зачем
      return [];
    }
  }
}

export class SellerApp {
  constructor() {
    this.dataLoader = new DataLoader('#slider-wrap');

    this.dropdown = new DropdownManager('#dropdown-target', '#options-wrap', '#dropdown-option');

    this.slider = new SellerSlider(
      '#slider-wrap',
      '#seller-prev',
      '#seller-next',
      '#seller-buttons',
    );

    this.dropdown.onPeriodChange = (period) => this.handlePeriodChange(period);

    this.handlePeriodChange(this.dropdown.getCurrentPeriod());
  }

  async handlePeriodChange(period) {
    await this.dataLoader.loadData(period);
    this.slider.currentPosition = 0;

    this.slider.sliderRect = this.slider.sliderWrap.getBoundingClientRect();

    this.slider.updateSliderPosition();
  }
}
