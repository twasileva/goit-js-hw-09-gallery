import defaultExport from './gallery-items.js'
const galleryItems = defaultExport

const galleryContainer = document.querySelector('.js-gallery')
const isModal = document.querySelector('.js-lightbox')
const isOverlay = document.querySelector('.lightbox__overlay')
const isLightBoxImgContent = document.querySelector('.lightbox__content')
const isModalImage = document.querySelector('.lightbox__image')
const buttonCloseModal = document.querySelector('button[data-action="close-lightbox"]')

const imagesMarkup = createGalleryImages(galleryItems)
galleryContainer.insertAdjacentHTML('beforeend', imagesMarkup)

galleryContainer.addEventListener('click', onGalleryImageClick)
isOverlay.addEventListener('click', onOverlayModalClick)
buttonCloseModal.addEventListener('click', onBtnCloseModalClick)

function createGalleryImages(images) {
  return images.map(({ preview, original, description }, idx) => {

    return `
    <li class="gallery__item">
  <a
    class="gallery__link"
    href="${original}"
  >
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      data-index="${idx}"
      alt="${description}"
    />
  </a>
</li>
    `
  }).join('')

}

function onGalleryImageClick(e) {
  e.preventDefault()

  const isGalleryImageEl = e.target.classList.contains('gallery__image')
  if (!isGalleryImageEl) {
    return
  }
  const currentIndex = e.target.dataset.index
  console.log(currentIndex);
  const originalSizeImage = e.target.dataset.source
  const descriptionImage = e.target.alt

  onOpenModal(originalSizeImage, descriptionImage)

}

function onOpenModal(sizeImage, description) {
  window.addEventListener('keydown', onEscCloseModalClick)
  isModal.classList.add('is-open')
  isModalImage.src = sizeImage
  isModalImage.alt = description
}


function onEscCloseModalClick(e) {
  console.log(e.code);

  if (e.code === 'Escape') {
    onBtnCloseModalClick()
  }
  // if (e.code === 'ArrowLeft') {

  // }
  // if (e.code === 'ArrowRight') {


  // }
}
function onOverlayModalClick(e) {
  onBtnCloseModalClick()
}

function onBtnCloseModalClick(e) {
  window.removeEventListener('keydown', onEscCloseModalClick)
  isModal.classList.remove('is-open')
  isModalImage.src = ''
  isModalImage.alt = ''
}
