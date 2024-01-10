import React from 'react'
import { useContract, useContractRead } from "@thirdweb-dev/react";
import Header from '../components/header'
import Charts from '../components/charts'
import Tables from '../components/tables'
import Timer from '../components/Timer'
import Resulttable from '../components/resulttable'
import Winner from '../components/winner'
function home() {
    // const { contract } = useContract("0xa513E6E4b8f2a923D98304ec87F64353C4D5C853");
    // const { data, isLoading } = useContractRead(contract, "getWinner");
  
    // console.log(data)

  return (
    
         <div>
            {"data"==="Voting has not ended yet"?
        <><div> <h1 className='text-white text-center font-bold text-5xl mt-96 mb-10'>VOTING IS NOT ENDED</h1></div></>
        :
        <><div style={{position:"absolute"}}><h1 className='text-white font-bold ml-10'>w3 VOTING</h1></div>
        <Header/>
        
            <div className='grid grid-cols-2 place-content-center'>
          
                    <div className='ml-44 w-4/6'>
                    <div> <h1 className='text-white font-bold text-4xl ml-52 mb-10'>VOTING RESULT</h1></div>
                        <Charts />
                        
                    </div>
                   
            <div className='w-5/6 ml-28 '>
            <div> <h1 className='text-white font-bold text-4xl ml-60 mb-10'>WINNER</h1></div>
            <Winner/>
            </div>
            
                    
                </div>
                <div className='flex justify-center'>
                <div> <h1 className='text-white font-bold text-4xl mt-24 mb-10'>RESULT TABLE</h1></div>
                
                </div>
                <Resulttable/></>    
        }
            
    </div>
   
    
  )
}

export default home