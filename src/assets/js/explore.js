export const exploreData = [
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

export const createItemInExplore = (item) => `
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

export function takeExploreData(nameData, targetName) {
  let result;
  nameData.forEach((element) => {
    if (targetName in element) {
      result = element[targetName];
    }
  });
  return result;
}

export function takeSideIndex(nameData, targetName, lastIndex) {
  let side;
  nameData.forEach((element) => {
    if (targetName in element) {
      nameData.indexOf(element);
      side = lastIndex < nameData.indexOf(element) ? 'right' : 'left';
      lastIndex = nameData.indexOf(element);
    }
  });
  return side;
}
