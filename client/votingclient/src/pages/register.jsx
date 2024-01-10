import React, { useState } from 'react'
import { useContract, useContractWrite } from "@thirdweb-dev/react";
import Header from '../components/header'
import axios from 'axios';
function register() {
  const [details,setdetails]=useState({});
  const [ima,setima]=useState();
  const[img,setimg]=useState();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setdetails({ ...details, [name]: value });
    console.log(details);
  };

  // const images = [];
  // const handleChange2 = (e) => {
  //   const files = e.target.files;
    
  //   for (let i = 0; i < files.length; i++) {
  //     images.push(files[i]);
  //   }
  //   setImages(images);
  // }

  const handleChange2 = (e) => {
    setima(e.target.files[0])
      console.log(e.target.files);
    };

    const handleChange3 = (e) => {
      setimg(e.target.files[0])
        console.log(e.target.files);
      };

      const config = {     
        headers: { 'content-type': 'multipart/form-data' }
      }
      const { contract } = useContract("0xa513E6E4b8f2a923D98304ec87F64353C4D5C853");
      const { mutateAsync: register, isLoading } = useContractWrite(contract, "register")
      const call = async () => {
        try {
          const data = await register({ args: [details.partyname] });
          console.info("contract call successs", data);
        } catch (err) {
          console.error("contract call failure", err);
        }
      }
     const submit=(e)=>{
      e.preventDefault();
     
      call();
      const formdata =new FormData();
      formdata.append('partyimg',ima);
      formdata.append('profileimg',img);
      formdata.append('name',details.partyname);
      formdata.append('symbol',details.shortletter);
      formdata.append('candidatename',details.candidatename);
      formdata.append('address',details.city+" "+details.state+" "+details.zip)
        axios.post("http://localhost:8000/addcandidate",formdata,config)
        .then(res=>console.log(res))
        .catch()
     } 

  return (
    <div>
      <div style={{position:"absolute"}}><h1 className='text-white font-bold ml-10'>W3 VOTING</h1></div>
    <Header/>
<div style={{marginLeft:"300px"}}><h1 className='text-white font-bold ml-96'>Candidate Registration</h1></div>

<div>
  <form style={{marginLeft:"470px"}} class="w-full ml-96 border rounded-xl p-12 max-w-lg">
    <div class="flex flex-wrap -mx-3 mb-6">
      <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
        <label class="block uppercase tracking-wide text-white text-xs font-bold mb-2" for="grid-first-name">
         Party Name
        </label>
        <input name='partyname' class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" onChange={handleChange} type="text" placeholder="ASD BHJ CDF"/>
      </div>
      <div class="w-full md:w-1/2 px-3">
        <label class="block uppercase tracking-wide text-white text-xs font-bold mb-2" for="grid-last-name">
          Short letter
        </label>
        <input name='shortletter' class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" onChange={handleChange} type="text" placeholder="ABC"/>
      </div>
    </div>
    <div class="flex flex-wrap -mx-3 mb-6">
      <div class="w-full px-3">
        <label class="block uppercase tracking-wide text-white text-xs font-bold mb-2" for="grid-password">
          Candidate name
        </label>
        <input name='candidatename' class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" onChange={handleChange} type="text" placeholder="munis"/>
        <p class="text-gray-600 text-xs italic">Enter your original name</p>
      </div>
    </div>
    <div class="flex flex-wrap -mx-3 mb-6">
      <div class="w-full px-3">
        <label class="block uppercase tracking-wide text-white text-xs font-bold mb-2" for="grid-password">
          Candidate Image
        </label>
        <input name='images' class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" onChange={handleChange2} type="file" placeholder="******************"/>
      </div>
    </div>
    <div class="flex flex-wrap -mx-3 mb-6">
      <div class="w-full px-3">
        <label class="block uppercase tracking-wide text-white text-xs font-bold mb-2" for="grid-password">
          Party Image
        </label>
        <input name='imagesa' class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" onChange={handleChange3} type="file" placeholder="******************"/>
      </div>
    </div>
    <div class="flex flex-wrap -mx-3 mb-2">
      <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
        <label class="block uppercase tracking-wide text-white text-xs font-bold mb-2" for="grid-city">
          City
        </label>
        <input name='city' class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" onChange={handleChange} type="text" placeholder="Albuquerque"/>
      </div>
      <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
        <label class="block uppercase tracking-wide text-white text-xs font-bold mb-2" for="grid-state">
          State
        </label>
        <input name='state' class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-zip" onChange={handleChange} type="text" placeholder="90210"/>
        
      </div>
      <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
        <label class="block uppercase tracking-wide text-white text-xs font-bold mb-2" for="grid-zip">
          Zip
        </label>
        <input name='zip' class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" onChange={handleChange} id="grid-zip" type="number" placeholder="90210"/>
      </div>
      <button onClick={submit} className='mt-12 w-full bg-blue-700 text-white p-4 '>submit</button>
    </div>
  </form></div>
    </div>
    
  )
}

export default register