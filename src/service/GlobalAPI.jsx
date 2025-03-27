import axios from "axios"

const BASE_URL= 'https://places.googleapis.com/v1/places:searchText'
const config={
    headers:{
        'Content-Type':'application/json',
        'X-Goog-Api-Key': import.meta.env.VITE_GOOGLE_PLACE_API_KEY,
        'X-Goog-FieldMask': [
            'places.displayName',
            'places.photos'
        ]
    }

}

export const GetPlaceDetails=(data)=>axios.post(BASE_URL, data, config)

// import axios from "axios";

// const BASE_URL = 'https://maps.googleapis.com/maps/api/place/textsearch/json';

// export const GetPlaceDetails = (query) => {
//     const apiKey = import.meta.env.VITE_GOOGLE_PLACE_API_KEY;
//     return axios.get(BASE_URL, {
//         params: {
//             key: apiKey,
//             query: query // e.g., "restaurants near me"
//         }
//     });
// };