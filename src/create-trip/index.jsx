import { AI_PROMPT, SelectBudgetOptions, SelectTravelesList } from '../constants/options.jsx';
import { Input } from '../components/input.jsx';
import React, { useEffect, useState } from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import { Button } from '../components/button';
import { toast } from 'sonner';
import { chatSession } from '../service/AIModel.jsx';
import { FcGoogle } from "react-icons/fc";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "../components/dialog.jsx"
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../service/firebase.jsx';
import { TbTruckLoading } from "react-icons/tb";
import { useNavigate} from 'react-router-dom';


function CreateTrip() {
    const [place, setPlace] = useState();

    const [formData, setFormData] = useState([]);
    const [openDailog, setOpenDailog] = useState(false);
    const [loading, setLoading]= useState(false);
    const navigate= useNavigate();
    const handleInputChange=(name, value)=>{
        
        // if(name=='noOfDays' && value>5)
        // {
        //     console.log("Please enter Trip Days less than 5!")
        //     return ;

        // }
        
        setFormData({
            ...formData, 
            [name]:value

        })
    }

    useEffect(() => {
        console.log(formData);
    }, [formData])

    const login=useGoogleLogin({
        onSuccess:(codeResp)=>GetUserProfile(codeResp),
        onError:(error)=>console.log("There is an error!")

    })

    const GetUserProfile=(tokenInfo)=>{
        axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`, {
            headers:{
                Authorization:`Bearer ${tokenInfo?.access_token}`,
                Accept: 'Application/json'
            }

        }).then((resp)=>{

            console.log(resp);
            localStorage.setItem('user', JSON.stringify(resp.data));
            setOpenDailog(false);
            OnGenerateTrip();
        })
        
    
    }
    const OnGenerateTrip=async()=>{


        const user=localStorage.getItem('user')
        if (!user){
            setOpenDailog(true)
            return;

        }

        if (formData?.noOfDays>7&&!formData?.location||!formData?.budget||!formData?.traveler){

           
            toast("Please fill all details.")

            return ;

        }
        setLoading(true);
        const FINAL_PROMPT=AI_PROMPT
        .replace('{location}', formData?.location.label)
        .replace('{totalDays}', formData?.noOfDays)
        .replace('{traveler}', formData?.traveler)
        .replace('{budget}', formData?.budget)
        
        console.log(FINAL_PROMPT);
        const result= await chatSession.sendMessage(FINAL_PROMPT);
        console.log(result?.response?.text());
        setLoading(false);
        saveAiTrip(result?.response?.text())
        }
    
    const saveAiTrip=async(TripData)=> {
        setLoading(true);
        const user = JSON.parse(localStorage.getItem('user')); 
        const docId= Date.now().toString()
        await setDoc(doc(db, "cities", docId), {
            userSelection: formData,
            tripData: JSON.parse(TripData), 
            userEmail:user?.email,
            id:docId
          });
          setLoading(false);
          navigate('/view-trip/'+docId)

    }

    return (
        <div className='sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10'>
            <h2 className='font-bold text-3xl'> Tell us your travel preferences!</h2>
            <p className='mt-3 text-gray-500 text-xl'>Just provide some basic information, and our trip planner will generate a customized itinerary based on your preferences.</p>
            <div className='mt-20 flex flex-col gap-10'>
                <div>
                    <h2 className='text-xl my-3 font-medium'> What is your destination of your choice?</h2>
                    <GooglePlacesAutocomplete
                        apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
                        selectProps={{
                            place,
                            onChange: (v) => { setPlace(v); handleInputChange('location', v) }

                        }}
                    />
                </div>
            </div>
            <div>
                <h2 className='text-xl my-3 font-medium'>How many days are you planning your trip?</h2>
                <Input placeholder={'Ex.3'} type="number" 
                onChange={(e) =>handleInputChange('noOfDays', e.target.value)}
                />
            </div>
            <div>
                <h2 className='text-xl my-3 font-medium'>What is Your Budget?</h2>
                <div className='grid grid-cols-3 gap-5 mt-5'>
                    {SelectBudgetOptions.map((item, index) => (
                        <div key={index} 
                        onClick={() =>handleInputChange('budget', item.title)}
                        className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg
                        ${formData?.budget==item.title&&'shadow-lg border-black'}
                        `}>
                            <h2 className='text-4xl'>{item.icon}</h2>
                            <h2 className='font-bold text-lg'>{item.title}</h2>
                            <h2 className='text-sm text-gray-500'>{item.desc}</h2>
                        </div>



                    ))}
                </div>
            </div>
            <div>
                <h2 className='text-xl my-3 font-medium'>Who do you plan on traveling with on your next adventure?</h2>
                <div className='grid grid-cols-3 gap-5 mt-5'>
                    {SelectTravelesList.map((item, index) => (
                        <div key={index} 
                        onClick={() =>handleInputChange('traveler', item.people)}
                        className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg
                        ${formData?.traveler==item.people&&'shadow-lg border-black'}
                        `}>
                            
                            <h2 className='text-4xl'>{item.icon}</h2>
                            <h2 className='font-bold text-lg'>{item.title}</h2>
                            <h2 className='text-sm text-gray-500'>{item.desc}</h2>
                        </div>



                    ))}
                </div>
            </div>
            <div className='my-10 justify-end flex'> 

            <Button 
            disabled={loading}
            onClick={OnGenerateTrip}>
                {
                    loading? 
                    <TbTruckLoading className='h-7 w-7 animate-spin'/>: 'Generate Trip'

                }
                </Button>
            </div>
            
            <Dialog open={openDailog}>
            
            <DialogContent>
                <DialogHeader>
                <DialogTitle></DialogTitle>
                <DialogDescription>
                    <img src ="/JournieGenier.svg"/>
                    <h2 className = 'font-bold text-lg mt-7 flex gap-4 items-center'>Sign in With Google </h2>
                    <p> Sign in to the App with Google authentication security</p>
                  <Button 
                  
                  onClick={login}
                  className="w-full mt-5">
                  
                  <FcGoogle className = 'h-7 w-7'/>
                    
                    Sign In With Google
                    
                    </Button>
                
                </DialogDescription>
                </DialogHeader>
            </DialogContent>
            </Dialog>


        </div>
    )
}

export default CreateTrip
