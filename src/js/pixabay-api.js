import axios from 'axios';

const URL_BASE = 'https://pixabay.com/api/'

const API_KEY_PIXABAY = "39287667-f1a1553e63cd5dc6035e5c951";

export const apiService = {
    url:URL_BASE,
    params: {
        key: API_KEY_PIXABAY,
        q: "",
        image_type: "photo",
        orientation: "horizontal",
        page: 1,
        per_page: 15
    },
 
    getPhotos(query = this.params.q) {
        this.params.q = query;

        return axios.get(this.url, {
            params: {
                ...this.params,
                page: this.params.page++
            },

        })
    }
}