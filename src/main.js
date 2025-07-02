import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = {
  searchForm: document.querySelector('.js-search-form'),
  gallery: document.querySelector('.js-gallery'),
  loader: document.querySelector('.js-loader'),
};

let lightbox = null;

const createGalleryMarkup = images =>
  images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `
      <li class="gallery-item">
        <a class="gallery-link" href="${largeImageURL}">
          <img class="gallery-image" src="${webformatURL}" alt="${tags}" loading="lazy" />
        </a>
        <div class="info">
  <div class="info-box"><span class="label">Likes</span><span>${likes}</span></div>
  <div class="info-box"><span class="label">Views</span><span>${views}</span></div>
  <div class="info-box"><span class="label">Comments</span><span>${comments}</span></div>
  <div class="info-box"><span class="label">Downloads</span><span>${downloads}</span></div>
</div>

      </li>
    `
    )
    .join('');

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
    return;
  }

  fetch(
    `https://pixabay.com/api/?key=51075470-1937ac32d69b36f6f43f67dbf&orientation=horizontal&q=${searchedQuery}&image_type=photo&safesearch=true`
  )
    .finally(() => {
      refs.loader.classList.remove('is-visible');
    })
    .then(responce => {
      if (!responce.ok) {
        throw new Error(responce.status);
      }
      return responce.json();
    })
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
    });
};

refs.searchForm.addEventListener('submit', onSearchFormSubmit);
