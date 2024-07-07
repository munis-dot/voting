import React, { useContext, useEffect, useState } from 'react'
import { useContract, useContractRead, useContractWrite, useAddress } from "@thirdweb-dev/react";
import axios from 'axios';
import { contractAddress } from '../env';
import { voterContext } from '../context/voterContext';

function tables() {

  
  const {setVoter} = useContext(voterContext);
  const { contract } = useContract(contractAddress);
  const { data, isLoading } = useContractRead(contract, "getcanditates")
  const { mutateAsync: vote, isLoadings } = useContractWrite(contract, "vote")
  const address = useAddress();
  const candidates = data;
  const [candidate, setcandidate] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/getcandidate")
      .then(res => {
        console.log(res)
        setcandidate(res.data)
      })
      .catch()
  }, [])




  const call = async (index) => {
    try {
      const data = await vote({ args: [index] });
      console.info("contract call successs", data);
      alert("voted successfully")
    } catch (err) {
      console.error("contract call failure", err);
      alert(err?.reason);
    }
  }



  const votes = (who) => {
    console.log(who)
    const index = candidates.findIndex(item => item.name === who);
    console.log(index)
    call(index).then(()=>{
      axios.post('http://localhost:8000/updatevoter',{address:address})
      .then(res=>{
        console.log(res)
        setVoter(true);
      })
    });
  }


  function arrayBufferToBase64(buffer) {
    var binary = '';
    var bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => binary += String.fromCharCode(b));
    return window.btoa(binary);
  };

  return (
    <div>
      <div class="relative overflow-x-auto rounded-lg shadow-md ">
        <table class="w-4/5 text-sm text-left rounded-lg border-collapse border border-slate-400 0 border-collapse border border-slate-400  m-10 ml-36" style={{ border: "1px solid black" }}>
          <thead class="text-xs text-white uppercase h-16 border-black bg-slate-60 dark:text-gray-400" >
            <tr style={{ border: "1px solid black" }} className='bg-slate-600'>
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
            {candidate?.map((_id) => {
              var base64String = arrayBufferToBase64(_id?.partyImage?.data?.data)
              var base64String2 = arrayBufferToBase64(_id?.candidateImage?.data?.data)
              return (
                <tr class="border border-black">
                  <td class="px-6 py-4">
                    <img alt='image' src={"data:image/png;base64," + base64String} className='bg-grey-800' style={{ borderRadius: '50%', width: "95px" }}></img>
                  </td>
                  <td class="px-6 py-4">
                    <img alt='image' src={"data:image/png;base64," + base64String2} className='bg-grey-800' style={{ borderRadius: '50%', width: "95px" }}></img>
                  </td>
                  <th scope="row" class="px-6 py-4 font-medium text-xl text-white whitespace-nowrap dark:text-white">
                    {_id.partySymbol}
                  </th>
                  <th scope="row" class="px-6 py-4 font-medium text-xl text-white whitespace-nowrap dark:text-white">
                    {_id.partyName}
                  </th>
                  <th scope="row" class="px-6 py-4 font-medium text-xl text-white whitespace-nowrap dark:text-white">
                    {_id.candidateName}
                  </th>
                  <th scope="row" class="px-6 py-4 font-medium text-xl text-white whitespace-nowrap dark:text-white">
                    <button onClick={e => votes(_id.partyName)} class="text-base bg-white p-3 rounded px-8 text-blue-600 dark:text-blue-500 hover:bg-blue-500 hover:text-white">Vote</button>
                  </th>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default tables