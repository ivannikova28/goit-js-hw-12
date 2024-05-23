// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";


// Описаний у документації
import SimpleLightbox from "simplelightbox";
// Додатковий імпорт стилів
import "simplelightbox/dist/simple-lightbox.min.css";


import { apiService } from "./pixabay-api";
import { renderGallery, templateGallery } from "./render-functions";


const refs = {
    gallery : document.querySelector('.gallery'),
    form: document.querySelector('form'),
    loadMoreBtn: document.querySelector('.load-more'),
    searchButton: document.querySelector('#search-form button'),

}

const app = {
    totalImagesUploaded: 15,
    classLists: {
        visuallyHidden: "visually-hidden"
    }
}

console.log(app)
console.log(apiService)

// refs.loadMoreBtn.classList.add( app.classLists.visuallyHidden);
addClassList(refs.loadMoreBtn, app.classLists.visuallyHidden)

refs.form.addEventListener('submit',handlerSubmitForm)

refs.loadMoreBtn.addEventListener("click", handleLoadMore)

async function handleLoadMore(event) {
    refs.loadMoreBtn.textContent = "Loading..."
    try {
        const { data } = await apiService.getPhotos()
        // console.log(data)

        const {hits, totalHits} = data;
        // console.log(hits)
        // console.log(totalHits)

        app.totalImagesUploaded += 15;

        if (app.totalImagesUploaded >= totalHits) {
            iziToast.warning({
                message: "we're sorry? but you've reached the end of search result",
                position: "topRight"
            })
            addClassList(refs.loadMoreBtn,  app.classLists.visuallyHidden)
            return
        }

        const galleryHTML = templateGallery(hits)
        renderGallery(refs.gallery, galleryHTML);


        const {height: cardHeight} = document.querySelector(".gallery").firstElementChild.getBoundingClientRect()
        console.log(scroll)

        window.scrollBy({
            // top: cardHeight * 2,
            top: cardHeight * 1.95,
            behavior: "smooth"
        })

        const  lightbox = new SimpleLightbox('.gallery a', { /* options */ });
        lightbox.refresh()


    } catch (error) {

        iziToast.warning({
            message: "we're sorry? but you've reached the end of search result",
            position: "topRight"
        })

        console.log("ERROR", error)
        // addClassList(refs.loadMoreBtn,  app.classLists.visuallyHidden)
    } finally {
        refs.loadMoreBtn.textContent = "Load more"
    }
}

async function handlerSubmitForm (event){
    event.preventDefault()

    const {searchQuery} = refs.form.elements

    const searchQueryValue = searchQuery.value.trim()

    if(!searchQueryValue) {
        iziToast.info({
            message: `Pleace, enter data to search` ,
            position: "topRight"
        })
        return
    }

    refs.searchButton.disabled = true;
        
    refs.loadMoreBtn.textContent = "Loading...."
    // refs.loadMoreBtn.classList.remove( app.classLists.visuallyHidden)
    removeClassList(refs.loadMoreBtn,  app.classLists.visuallyHidden)

    refs.gallery.innerHTML = "";

    try {
        const { data } = await apiService.getPhotos(searchQueryValue)
        console.log(data)

        const {hits, totalHits} = data;
        console.log(hits)
        console.log(totalHits)

        if(!totalHits){
            iziToast.error({
                message: `Sorry, there are no images matching your search query. Please try again!`,
                position: "topRight"
                
            })
            return

        }


        iziToast.success({
            message: `Hooray! We found ${totalHits} images.`,
            position:"topRight"
        })

        const galleryHTML = templateGallery(hits)
        renderGallery(refs.gallery, galleryHTML);

        refs.searchButton.disabled = false;

        const  lightbox = new SimpleLightbox('.gallery a', { /* options */ });
        lightbox.refresh()

        refs.loadMoreBtn.textContent = "Load more"
        // refs.loadMoreBtn.classList.add( app.classLists.visuallyHidden)
        // addClassList(refs.loadMoreBtn,  app.classLists.visuallyHidden)

    } catch (error) {
        console.log("ERROR", error)

        iziToast.error({
            message: `Sorry there was an error`,
            position:"topRight"
        })


        refs.searchButton.disabled = false;
        // refs.loadMoreBtn.classList.add( app.classLists.visuallyHidden)
        addClassList(refs.loadMoreBtn,  app.classLists.visuallyHidden)
    }
    //  finally{
    //     refs.searchButton.disabled = false;
    //     // refs.loadMoreBtn.classList.add( app.classLists.visuallyHidden)
    //     addClassList(refs.loadMoreBtn, app.classLists.visuallyHidden")
    // }

}


function addClassList(element, className) {
    element.classList.add(className)
}
function removeClassList(element, className) {
    element.classList.remove(className)
}
