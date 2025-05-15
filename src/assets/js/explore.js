import { AnimatedCollection } from './HotCollectionApp.js';

const exploreData = [
  {
    Recomendations: [
      {
        title: 'Vaporart',
        subTitle: 'by weidner art',
        status: true,
        price: '2.45 ETH',
        likes: '50',
        imgPath: 'image/artworks/Vaporart.jpg',
      },
      {
        title: 'The Angel',
        subTitle: 'by visual 3d',
        status: true,
        price: '4.85 ETH',
        likes: '30',
        imgPath: 'image/artworks/Angel.jpg',
      },
      {
        title: 'Aesthetic',
        subTitle: 'by itvrn',
        status: true,
        price: '1.98 ETH',
        likes: '20',
        imgPath: 'image/artworks/Aesthetic.jpg',
      },
      {
        title: 'Wadafox',
        subTitle: 'by wonder art',
        status: true,
        price: '5.11 ETH',
        likes: '90',
        imgPath: 'image/artworks/Wadafox.jpg',
      },
    ],
  },
  {
    Music: [
      {
        title: 'Vaporart',
        subTitle: 'by weidner art',
        status: true,
        price: '2.45 ETH',
        likes: '50',
        imgPath: 'image/artworks/Vaporart.jpg',
      },
      {
        title: 'The Angel',
        subTitle: 'by visual 3d',
        status: true,
        price: '4.85 ETH',
        likes: '30',
        imgPath: 'image/artworks/Angel.jpg',
      },
      {
        title: 'Aesthetic',
        subTitle: 'by itvrn',
        status: true,
        price: '1.98 ETH',
        likes: '20',
        imgPath: 'image/artworks/Aesthetic.jpg',
      },
      {
        title: 'Wadafox',
        subTitle: 'by wonder art',
        status: true,
        price: '5.11 ETH',
        likes: '90',
        imgPath: 'image/artworks/Wadafox.jpg',
      },
    ],
  },
  {
    'Modern Art': [
      {
        title: 'Vaporart',
        subTitle: 'by weidner art',
        status: true,
        price: '2.45 ETH',
        likes: '50',
        imgPath: 'image/artworks/Vaporart.jpg',
      },
      {
        title: 'The Angel',
        subTitle: 'by visual 3d',
        status: true,
        price: '4.85 ETH',
        likes: '30',
        imgPath: 'image/artworks/Angel.jpg',
      },
      {
        title: 'Aesthetic',
        subTitle: 'by itvrn',
        status: true,
        price: '1.98 ETH',
        likes: '20',
        imgPath: 'image/artworks/Aesthetic.jpg',
      },
      {
        title: 'Wadafox',
        subTitle: 'by wonder art',
        status: true,
        price: '5.11 ETH',
        likes: '90',
        imgPath: 'image/artworks/Wadafox.jpg',
      },
    ],
  },
  {
    '3D': [
      {
        title: 'Vaporart',
        subTitle: 'by weidner art',
        status: true,
        price: '2.45 ETH',
        likes: '50',
        imgPath: 'image/artworks/Vaporart.jpg',
      },
      {
        title: 'The Angel',
        subTitle: 'by visual 3d',
        status: true,
        price: '4.85 ETH',
        likes: '30',
        imgPath: 'image/artworks/Angel.jpg',
      },
      {
        title: 'Aesthetic',
        subTitle: 'by itvrn',
        status: true,
        price: '1.98 ETH',
        likes: '20',
        imgPath: 'image/artworks/Aesthetic.jpg',
      },
      {
        title: 'Wadafox',
        subTitle: 'by wonder art',
        status: true,
        price: '5.11 ETH',
        likes: '90',
        imgPath: 'image/artworks/Wadafox.jpg',
      },
    ],
  },
  {
    Watercolor: [
      {
        title: 'Vaporart',
        subTitle: 'by weidner art',
        status: true,
        price: '2.45 ETH',
        likes: '50',
        imgPath: 'image/artworks/Vaporart.jpg',
      },
      {
        title: 'The Angel',
        subTitle: 'by visual 3d',
        status: true,
        price: '4.85 ETH',
        likes: '30',
        imgPath: 'image/artworks/Angel.jpg',
      },
      {
        title: 'Aesthetic',
        subTitle: 'by itvrn',
        status: true,
        price: '1.98 ETH',
        likes: '20',
        imgPath: 'image/artworks/Aesthetic.jpg',
      },
      {
        title: 'Wadafox',
        subTitle: 'by wonder art',
        status: true,
        price: '5.11 ETH',
        likes: '90',
        imgPath: 'image/artworks/Wadafox.jpg',
      },
    ],
  },
];

export class ExploreManager extends AnimatedCollection {
  constructor(tabContainer, containerExplore) {
    super();
    this.tabContainer = tabContainer;
    this.containerExplore = containerExplore;
    this.exploreData = exploreData;
    this.currentIndex = 0;

    this.init();
  }

  init() {
    this.renderInitialCollection();
    this.setupEventListeners();
  }

  renderInitialCollection() {
    this.renderCollection(
      null,
      '',
      this.createItemInExplore,
      this.takeExploreData('Recomendations'),
      this.containerExplore,
    );
  }

  createItemInExplore(item) {
    return `
      <li class="artworks-list__item">
        <div class="artworks-list__image">
          <img src="${item.imgPath}" alt="Vaporart" />
        </div>
        <div class="artworks-list__content content-artworks">
          <div class="content-artworks__left">
            <h3 class="content-artworks__title">${item.title}</h3>
            <p class="content-artworks__subtitle">${item.subTitle}</p>
            <p class="content-artworks__status">${item.status ? '1' : '0'} of 1 available</p>
          </div>
          <div class="content-artworks__right">
            <p class="content-artworks__price">${item.price}</p>
            <div class="content-artworks__likes">
              <svg>
                <use href="image/svg/sprite.svg#likes"></use>
              </svg>
              <p class="content-artworks__total">${item.likes} K</p>
            </div>
          </div>
        </div>
      </li>
    `;
  }

  takeExploreData(targetName) {
    let result;
    this.exploreData.forEach((element) => {
      if (targetName in element) {
        result = element[targetName];
      }
    });
    return result;
  }

  takeSideIndex(targetName) {
    let side;
    let newIndex;

    this.exploreData.forEach((element) => {
      if (targetName in element) {
        newIndex = this.exploreData.indexOf(element);
        side = this.currentIndex < newIndex ? 'right' : 'left';
      }
    });

    this.currentIndex = newIndex;
    return side;
  }

  setupEventListeners() {
    if (!this.tabContainer) return;

    this.tabContainer.addEventListener('click', (event) => {
      const tabs = this.tabContainer.querySelectorAll('button');

      if (!event.target.closest('button')) return;

      const categoryName = event.target.textContent;
      const side = this.takeSideIndex(categoryName);

      this.renderCollection(
        null,
        side,
        this.createItemInExplore,
        this.takeExploreData(categoryName),
        this.containerExplore,
      );

      tabs.forEach((element) => {
        element.classList.remove('active');
      });
      event.target.classList.add('active');
    });
  }
}
