import React from 'react'
import PlaceCardItem from './PlaceCardItem'

function PlacesToVisit({trip}) {
  return (
    <div>
      <h2 className='font-bold text-lg'> Places to Visit</h2>

      <div> 
        {trip.tripData?.itinerary?.map((item, index)=>(
            <div className='grid md:grid-cols gap-5' > 
                <h2 className='font-medium text-lg'>{item?.day} </h2>
                
                {item.activities.map((place, index)=>(
                    <div className='my-3'> 
                        <h2 className='font-medium text-xl text-orange-600'>{place.name}</h2>
                        <PlaceCardItem place={place}/>

                    </div>
                
                
                ))}
                
            </div>

        ))}
      </div>
    </div>
  )
}

export default PlacesToVisit

//<h2>{place.name}</h2>
                        // <h2>{place.description}</h2>
                        // <h2>{place.cost}</h2>
