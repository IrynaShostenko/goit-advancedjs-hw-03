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

const onSearchFormSubmit = event => {
  event.preventDefault();

  const searchForm = event.target;
  const searchedQuery = searchForm.elements.user_query.value.trim();

  refs.loader.classList.add('is-visible');
  refs.gallery.innerHTML = '';

  if (!searchedQuery) {
    iziToast.warning({
      title: 'Warning',
      message: 'Please enter a search term!',
      position: 'topRight',
    });
    refs.loader.classList.remove('is-visible');
    return;
  }

  fetchImages(searchedQuery)
    .then(result => {
      if (result.hits.length === 0) {
        iziToast.error({
          title: 'No results',
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          position: 'topRight',
        });
        refs.gallery.innerHTML = '';
        return;
      }

      refs.gallery.innerHTML = createGalleryMarkup(result.hits);

      if (!lightbox) {
        lightbox = new SimpleLightbox('.js-gallery a', {
          captionsData: 'alt',
          captionDelay: 250,
        });
      } else {
        lightbox.refresh();
      }
    })
    .catch(err => {
      iziToast.error({
        title: 'Error',
        message: `Something went wrong: ${err}`,
        position: 'topRight',
        timeout: 5000,
      });
    })
    .finally(() => {
      refs.loader.classList.remove('is-visible');
    });
};

refs.searchForm.addEventListener('submit', onSearchFormSubmit);
