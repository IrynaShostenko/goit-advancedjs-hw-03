export function createGalleryMarkup(images) {
  return images
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
            <div class="info-box"><span class="label">Likes:</span> ${likes}</div>
            <div class="info-box"><span class="label">Views:</span> ${views}</div>
            <div class="info-box"><span class="label">Comments:</span> ${comments}</div>
            <div class="info-box"><span class="label">Downloads:</span> ${downloads}</div>
          </div>
        </li>
      `
    )
    .join('');
}
