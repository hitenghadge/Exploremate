import { GetPlaceDetails } from '../../../service/GlobalAPI';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function PlaceCardItem({place}) {
    

    const PHOTO_URL = 'https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=2000&maxWidthPx=1000&key=' + import.meta.env.VITE_GOOGLE_PLACE_API_KEY
    const [photourl, setPhotoUrl] = useState();
    useEffect(()=>{
        place&&GetPlacePhoto();  

    },[place])
    const GetPlacePhoto=async()=>{
        const data={
            textQuery:place.name

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
    <Link to={'https://www.google.com/maps/search/?api=1&query=' +place.name}>
    <div className ='border rounded-xl p-3 mt-2 flex gap-5'>
      <img src={photourl} className='w-[130px] h-[130px] rounded-xl'/>
        
        
        <div> 
        
            <h2 className='text-sm text-gray-400'>{place.description}</h2>
            <h2>{place.cost}</h2>
        </div>
    
    </div>
    </Link>
  )
}

export default PlaceCardItem
