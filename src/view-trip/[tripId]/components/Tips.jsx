import React from 'react'

function Tips({trip}) {
  return (
    <div>
        
        <h2 className='font-bold text-lg'>Tips</h2>
        <div> 
            { trip.tripData?.tips?.map((tip,index)=>(
                <h2>{tip}</h2>

            ))
            }

        </div>
      
    </div>
  )
}

export default Tips
