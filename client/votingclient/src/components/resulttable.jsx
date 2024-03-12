import React, { useContext, useEffect, useState } from 'react'
import { useContract, useContractRead } from "@thirdweb-dev/react";
import axios from 'axios';
import { candidatecontext } from '../context/candidatecontext';
import { ffcontext } from '../context/ffcontext';
import { contractAddress } from '../env';
function Resulttable() {
    const{cand,setcand}=useContext(candidatecontext)
    const{ff,setff}=useContext(ffcontext)
    const { contract } = useContract(contractAddress);
    const { data, isLoading } = useContractRead(contract, "getcanditates")
    
   
    // console.log(data)
    useEffect(()=>{
        (!isLoading)?console.log(data):console.log("isloading")
        console.log(data)
         setff(data)
        axios.get("http://localhost:8000/getcandidate")
        .then(res=>{
           console.log(res)
           setcand(res.data)})
        .catch()
        if(Array.isArray(ff)){
            setff(ff.sort((a, b) => (b.voteCount._hex)-(a.voteCount._hex)))
        }
     },[isLoading])

     function arrayBufferToBase64(buffer) {
        let binary = '';
        const bytes = [].slice.call(new Uint8Array(buffer));
        bytes.forEach((b) =>{ (binary += String.fromCharCode(b))});
        return window.btoa(binary);
      };
      
    //   const base64String = arrayBufferToBase64(lab.profile.data.data);
    
  return (
    <div>
        <div class="relative overflow-x-auto rounded-lg shadow-md ">
        <table class="w-4/5 text-sm text-left rounded-lg border-collapse border border-slate-400 0 border-collapse border border-slate-400  m-10 ml-36" style={{border:"1px solid black"}}>
        <thead class="text-xs text-white uppercase h-16 border-black bg-slate-60 dark:text-gray-400" >
            <tr style={{border:"1px solid black"}} className='bg-slate-600'>
            <th scope="col" class="px-6 py-3">
                    Rank
                </th>
                <th scope="col" class="px-6 py-3">
                    Party logo
                </th>
                <th scope="col" class="px-6 py-3">
                    profile
                </th>
                <th scope="col" class="px-6 py-3">
                    Symbol
                </th>
                <th scope="col" class="px-6 py-3">
                    Party Name
                </th>
                <th scope="col" class="px-6 py-3">
                    candidate name
                </th>
                <th scope="col" class="px-6 py-3">
                    Votes
                </th>
            </tr>
        </thead>
        <tbody>
            {console.log(ff)}
            {(!Array.isArray(ff))?<p>loading</p>:<>
           { ff.map((key,index)=>{
                //  
                return( <tr class="border border-black">  
                <th scope="row" class="px-6 py-4 font-medium text-xl text-white bg whitespace-nowrap dark:text-white">
                 {index+1}
                    </th>             
                <td class="px-6 py-4">                  
                      {Array.isArray(cand)?   <img alt='image' src={`data:image/png;base64,${ arrayBufferToBase64(cand[cand.findIndex(obj=>obj.partyname===key[0])].partyimg.data.data)}`} className='bg-grey-800'  style={{borderRadius:'50%',width:"95px",height:'95px'}}></img>  
                      :"loading"}
                       </td>
                    <td class="px-6 py-4">
                       
                    {Array.isArray(cand)?   <img alt='image' src={`data:image/png;base64,${ arrayBufferToBase64(cand[cand.findIndex(obj=>obj.partyname===key[0])].profileimg.data.data)}`} className='bg-grey-800'  style={{borderRadius:'50%',width:"95px",height:'95px'}}></img>  
                      :"loading"}
                       </td>
                       <th scope="row" class="px-6 py-4 font-medium text-xl text-white whitespace-nowrap dark:text-white">
                      {Array.isArray(cand)?cand[cand.findIndex(obj=>obj.partyname===key[0])].partysymbol:"loading"}
                    </th>
                    <th scope="row" class="px-6 py-4 font-medium text-xl text-white whitespace-nowrap dark:text-white">
                    {Array.isArray(cand)?cand[cand.findIndex(obj=>obj.partyname===key[0])].partyname:"loading"}

                    </th>
                    <th scope="row" class="px-6 py-4 font-medium text-xl text-white whitespace-nowrap dark:text-white">
           {Array.isArray(cand)?cand[cand.findIndex(obj=>obj.partyname===key[0])].candidatename:"loading"}

                    </th>
                       <th scope="row" class="px-6 py-4 font-medium text-xl text-white whitespace-nowrap dark:text-white">
                       {parseInt(key.voteCount._hex)}
                    </th>
                </tr>)
                
            })}
            </>
           
            }
           
            
        </tbody>
    </table>
</div>

    </div>
  )
}

export default Resulttable