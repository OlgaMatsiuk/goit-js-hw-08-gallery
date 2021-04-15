
import images from './gallery-items.js';

const galleryListRef = document.querySelector('.js-gallery');
const modalRef = document.querySelector('.js-lightbox');
const modalImage = document.querySelector('.lightbox__image');
const closeModalBtn = modalRef.querySelector('.lightbox__button');
const backdropRef = document.querySelector('.lightbox__overlay');
const allImagesRef = document.querySelectorAll('.gallery__image');


const imagesMarkup = createGalleryMarkup(images);

galleryListRef.insertAdjacentHTML('beforeend', imagesMarkup);

galleryListRef.addEventListener('click', onGalleryClick);
closeModalBtn.addEventListener('click', onCloseModalBtn);
backdropRef.addEventListener('click', onBackdropCloseModal);

function createGalleryMarkup(images) {
    return images.map(({ preview, original, description }) => {
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
            alt="${description}"
            />
        </a>
    </li>
    `;
    }).join('');

}
function onGalleryClick(event) {
    event.preventDefault();

    const isImage = event.target.classList.contains('gallery__image');
    if (!isImage) {
        return;
    }

    modalRef.classList.add('is-open');

    modalImage.src = event.target.dataset.source;
    window.addEventListener('keydown',onEscKeyDown);
}

function onCloseModalBtn() {
    modalRef.classList.remove('is-open');
    modalImage.src = '';
    window.removeEventListener('keydown',onEscKeyDown);
}
function onBackdropCloseModal(event){
    if (event.currentTarget===event.target){
        onCloseModalBtn();
    }
}

function onEscKeyDown(event){
    if (event.code==='Escape'){
        onCloseModalBtn();
    }
}

