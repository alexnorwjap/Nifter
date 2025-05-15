const dataWorkInfo = [
  {
    pathImage: 'image/worksInfo/wallet.png',
    alt: 'image-wallet',
    title: 'Set up your wallet',
    text: 'To set up Apple Pay, add a debit, credit, or prepaid card to the Wallet app on your iPhone, Apple Watch, or other compatible device.',
  },
  {
    pathImage: 'image/worksInfo/nfts.png',
    alt: 'image-NFTs',
    title: 'Add your NFTs',
    text: 'If you want to create a series of NFTs, you can use a collection to do so — on Rarible, you can create one right from the NFT creation screen.',
  },
  {
    pathImage: 'image/worksInfo/collection.png',
    alt: 'image-collection',
    title: 'Create collection',
    text: 'In the command, name is name of collection to be created. Options is a document and is used to specify configuration.',
  },
  {
    pathImage: 'image/worksInfo/list.png',
    alt: 'image-list',
    title: 'List item for sale',
    text: 'Creating a listing is the first step in getting your item in front of ... We have a range of tools and options to help make sure your listing ends in a sale.',
  },
];

const createItemExplore = (item) => {
  return `<li class="works-info__item works-item">
      <div class="works-item__icon">
         <img src="${item.pathImage}" alt="${item.alt}" />
      </div>
      <h4 class="works-item__title">${item.title}</h4>
      <p class="works-item__text">${item.text}</p>
   </li>
   `;
};

function renderList(arrayData, containerForRender, createHTML) {
  const html = arrayData.map(createHTML).join('');

  containerForRender.insertAdjacentHTML('beforeend', html);
}
export { dataWorkInfo, createItemExplore, renderList };
