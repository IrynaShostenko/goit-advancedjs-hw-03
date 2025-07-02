import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { fetchImages } from './js/pixabay-api.js';
import { createGalleryMarkup } from './js/render-functions.js';

const refs = {
  searchForm: document.querySelector('.js-search-form'),
  gallery: document.querySelector('.js-gallery'),
  loader: document.querySelector('.js-loader'),
};

let lightbox = null;

const onSearchFormSubmit = async event => {
  event.preventDefault();

  const searchedQuery = event.target.elements.user_query.value.trim();
  if (!searchedQuery) {
    iziToast.warning({
      title: 'Warning',
      message: 'Please enter a search term!',
      position: 'topRight',
    });
    return;
  }

  refs.gallery.innerHTML = '';
  refs.loader.classList.add('is-visible');

  try {
    const data = await fetchImages(searchedQuery);
    refs.loader.classList.remove('is-visible');

    if (data.hits.length === 0) {
      iziToast.error({
        title: 'No results',
        message: 'Sorry, no images found. Try again.',
        position: 'topRight',
      });
      return;
    }

    refs.gallery.innerHTML = createGalleryMarkup(data.hits);

    if (!lightbox) {
      lightbox = new SimpleLightbox('.js-gallery a', {
        captionsData: 'alt',
        captionDelay: 250,
      });
    } else {
      lightbox.refresh();
    }
  } catch (err) {
    refs.loader.classList.remove('is-visible');
    iziToast.error({
      title: 'Error',
      message: `Something went wrong: ${err}`,
      position: 'topRight',
    });
  }
};

refs.searchForm.addEventListener('submit', onSearchFormSubmit);
