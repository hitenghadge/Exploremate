import { GetPlaceDetails } from '../../../service/GlobalAPI';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

function HotelCardItem({hotel}) {
    
    const PHOTO_URL = 'https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=2000&maxWidthPx=1000&key=' + import.meta.env.VITE_GOOGLE_PLACE_API_KEY
    const [photourl, setPhotoUrl] = useState();
    useEffect(()=>{
        hotel&&GetPlacePhoto();  

    },[hotel])
    const GetPlacePhoto=async()=>{
        const data={
            textQuery:hotel.name

        }
        console.log("Comes here")
        const result = await GetPlaceDetails(data).then(
            resp=>{
                console.log(resp.data.places[0].photos[3].name)
                const photoUrl = PHOTO_URL.replace('{NAME}',resp.data.places[0].photos[1].name)
            
            setPhotoUrl(photoUrl)
        }

        )
    }

  
    return (
    <Link to={'https://www.google.com/maps/search/?api=1&query=' +hotel.name+","+hotel?.address} target='_blank'>
        <div className = 'hover:scale-110 transition-all'>
            <img src={photourl} className='rounded-xl'/>
            <div className= 'my-2 flex flex-col'> 
               <h2 className='font-medium'>{hotel.name}</h2> 
               <h2 className='text-xs text-gray-500'> 📍{hotel?.address}</h2>
               <h2 className='text-sm'>{hotel.price_range} </h2>
            </div> 
        </div>
        </Link>
  )
}

export default HotelCardItem
