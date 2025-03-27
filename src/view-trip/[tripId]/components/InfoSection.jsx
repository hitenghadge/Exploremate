import { GetPlaceDetails } from '../../../service/GlobalAPI';
import { Button } from '../../../components/button'
import React, { useEffect, useState } from 'react'
import { IoIosSend } from "react-icons/io";

const PHOTO_URL = 'https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=2000&maxWidthPx=1000&key=' + import.meta.env.VITE_GOOGLE_PLACE_API_KEY
function InfoSection({trip}) {
  
    const [photourl, setPhotoUrl] = useState();
    useEffect(()=>{
        trip&&GetPlacePhoto();  

    },[trip])
    const GetPlacePhoto=async()=>{
        const data={
            textQuery:trip?.userSelection?.location?.label

        }
        console.log("Comes here")
        const result = await GetPlaceDetails(data).then(
            resp=>{
                console.log(resp.data.places[0].photos[3].name)
                const photoUrl = PHOTO_URL.replace('{NAME}',resp.data.places[0].photos[6].name)
            
            setPhotoUrl(photoUrl)
        }

        )
    }
    return (
    <div>
        <img src = {photourl} className = 'h-[340px] w-full object-cover rounded-xl'/>
        <div className = 'flex justify-between items-center'> 
            <div className = 'my-5 flex flex-col gap-2'> 
                <h2 className='font-bold text-2xl'>{trip?.userSelection?.location?.label}</h2>
                <div className = 'flex gap-5'> 
                    <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'> 📅{trip.userSelection?.noOfDays} Days</h2>
                    <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>💰{trip.userSelection?.budget} Budget</h2>
                    <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>🍾{trip.userSelection?.traveler}</h2>
                </div>
            </div>
            <Button><IoIosSend /></Button>
        </div>
        
    </div>
  )
}

export default InfoSection
