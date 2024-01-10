import React, { useState } from 'react'
import { useContract, useContractWrite } from "@thirdweb-dev/react";
import axios from 'axios';
function voterregister() {
  const [address,setaddress]=useState();
  const handlechange=(e)=>{
    setaddress({ad:e.target.value});
    console.log(address)
  }

  const { contract } = useContract("0xa513E6E4b8f2a923D98304ec87F64353C4D5C853");
  const { mutateAsync: transfer, isLoading } = useContractWrite(contract, "transfer")

  const call = async () => {
    try {
      const data = await transfer({ args: [address.ad, 1] });
      console.info("contract call successs", data);
    } catch (err) {
      console.error("contract call failure", err);
    }
  }

  const submit=(e)=>{
 e.preventDefault();
 call();
 axios.post("http://localhost:8000/addvoter",address)
 .then(res=>console.log(res))
 .catch()
  }
  return (
    <div style={{ background: 'rgba(0, 23, 55, 1)', height:"100vh"}}>
      <div>
   
       <div style={{position:"absolute", background: 'rgba(0, 23, 55, 1)'}}><h1 className='text-white font-bold ml-10 mt-10'>W3 VOTING</h1></div>
       
    <div className="min-h-full py-12 px-4 sm:px-6 lg:px-8"  style={{ background: 'rgba(0, 23, 55, 1)'}}>
    <div style={{marginLeft:'750px'}}><h1 className="text-white font-bold mt-60 text-4xl ">Voter Registrer</h1></div>
        <div className="w-96 mt-12 ml-96 p-4 border rounded-lg border-4 border-indigo-500/100 " style={{width:'600px',marginLeft:"600px"}}>
         <h1 className='text-white p-4'>Transfer token</h1>
          <form  action="#" method="POST">
           
            <div className="-space-y-px rounded-md  shadow-sm">
              <div>
                <label htmlFor="password" className='text-2xl text-white ml-48 '>
                  VOTER ADDRESS
                </label>
                <input
                  id="password"
                  name="address"
                  type="text"
                  onChange={handlechange}
                  autoComplete="current-password"
                  required
                  className="relative block w-3/5 ml-32 ml-24 mt-5 rounded border-0 py-1.5 text-black ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="eX74...26"
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                onClick={submit}
                className="group relative flex ml-60 justify-center rounded-md bg-indigo-600 py-2 mt-5 px-3 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {/* <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                </span> */}
                Sent
              </button>
            </div>
          </form>
        </div>
      </div>
      </div>
    </div>
  )
}

export default voterregister