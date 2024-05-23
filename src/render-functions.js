export   function templateGallery(gallery){
    return gallery.map(templateItemGallery).join("")
}

function templateItemGallery(gallery_item){
    const {
        largeImageURL,
        webformatURL,
        tags,
        likes,
        views,
        comments,
        downloads

        
    } = gallery_item


    return (
      `<div class="gallery__item">
        <a class="gallery__link" href="${largeImageURL}">
          <img class="gallery__image" src="${webformatURL}" alt="${tags}" loading="lazy"/>
        </a>
        <div class="gallery__info">
          <p class="gallery__info-item">
            <b>Likes ${likes}</b>
          </p>
          <p class="gallery__info-item">
            <b>Views ${views}</b>
          </p>
          <p class="gallery__info-item">
            <b>Comments ${comments}</b>
          </p>
          <p class="gallery__info-item">
            <b>Downloads ${downloads}</b>
          </p>
        </div>
      </div>`
  
    )
    
}

// /**
//  * 
//  * @param {HTMLDivElement} element 
//  */
export function renderGallery(element, html) {
  element.insertAdjacentHTML("beforeend", html)
}

export function renderGalleryItem(element, html) {
  element.insertAdjacentHTML("beforeend", html)
}

