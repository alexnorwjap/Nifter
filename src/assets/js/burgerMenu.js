export class CLickBurger {
  constructor(burgerButton, menuBurger, body) {
    this.burgerButton = burgerButton;
    this.menuBurger = menuBurger;
    this.body = body;
    this.initEvents();
  }
  initEvents() {
    this.burgerButton.addEventListener('click', this);
    this.menuBurger.addEventListener('click', this);
  }

  handleEvent(event) {
    if (event.target === this.burgerButton) {
      return this.onClickBurger();
    }
    if (this.menuBurger.contains(event.target) && this.menuBurger !== event.target) {
      return this.onClickBurger();
    }
  }

  onClickBurger() {
    this.burgerButton.classList.toggle('active');
    this.menuBurger.classList.toggle('active');
    this.body.classList.toggle('lock');
  }
}
