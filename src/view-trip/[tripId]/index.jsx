import { db } from '../../service/firebase';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import InfoSection from './components/InfoSection';
import Hotels from './components/Hotels';
import PlacesToVisit from './components/PlacesToVisit';
import Tips from './components/Tips';

function Viewtrip() {
    const {tripId} = useParams();
    const [trip, setTrip] = useState([]);
    useEffect(()=> {
        tripId&&getTripData();
},[tripId])

    const getTripData=async()=>{
        const docRef = doc(db, 'cities', tripId);
        const docSnap= await getDoc(docRef)
        if(docSnap.exists()){
            console.log("Document: ", docSnap.data());
            setTrip(docSnap.data());
        }
        else{
            console.log("No such document!")
            toast('No such trip found!')

        }

    }
  
    return (
    
    
    <div className = 'p-10 md:px-20 lg:px-44 xl:px-56'>
      {/* Information Section */}
        <InfoSection trip={trip} />
      {/* Recommended Hotels */}
        <Hotels trip={trip}/>
      {/* Daily Plan */}
        <PlacesToVisit trip={trip} />
      {/* Tips */}
      <Tips trip={trip} />

      {/* Footer */}
    </div>
  )
}

export default Viewtrip
