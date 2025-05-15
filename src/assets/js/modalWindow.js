class BaseModal {
  constructor() {
    this.modal = document.querySelector('#modal');
    this.modalWindow = document.querySelector('#modal-window');
    this.btnClose = document.querySelector('#btn-close');
    this.titleModal = document.querySelector('#modal-title');
    this.textModal = document.querySelector('#modal-text');
    this.imageModal = document.querySelector('#image-modal');
  }
  initEvents() {
    this.modal.addEventListener('click', this);
    document.addEventListener('keydown', this);
    this.btnClose.addEventListener('click', this);
  }

  handleEvent(event) {
    if (this.isCLoseAction(event)) {
      return this.closeModalWindow();
    }
  }

  isCLoseAction(event) {
    console.log(event.keydown);
    return event.target === this.btnClose || event.target === this.modal || event.key === 'Escape';
  }

  openModalWindow() {
    this.modal.classList.add('active');
    this.modal.querySelector('.modal__window').classList.add('active');
    document.querySelector('body').classList.add('lock');
  }

  closeModalWindow() {
    this.modal.classList.remove('active');
    this.modal.querySelector('.modal__window').classList.remove('active');
    document.querySelector('body').classList.remove('lock');
  }
}

export class ModalErrorLinks extends BaseModal {
  constructor(elements) {
    super();
    this.elements = elements;
    this.initEvents();
  }
  initEvents() {
    super.initEvents();
    this.elements.forEach((element) =>
      element.addEventListener('click', (event) => this.openModalWithContent(event)),
    );
  }

  openModalWithContent(event) {
    event.preventDefault();
    this.titleModal.textContent = event.target.textContent;
    this.textModal.textContent = `Content for: ${event.target.textContent}`;
    return this.openModalWindow();
  }
}

export class ModalAnswerForm extends BaseModal {
  constructor() {
    super();
    this.initEvents();
  }
  initEvents() {
    super.initEvents();
  }
  openModalWithContent(email, textAnswer) {
    this.titleModal.textContent = email;
    this.textModal.textContent = textAnswer;
    return this.openModalWindow();
  }
}
