// // 0x8464135c8F25Da09e49BC8782676a84730C318bC
// // 7KUjT6Sb9L79OK4EvijueRCiIsao_tXkmQHV1w5ONNWeQ4_ZhtxG9-t3e11mk7Iz825yZfdHV02HTT-wpYBp-w
// import { Web3Button, ConnectWallet, useAddress, useContract, useContractRead } from "@thirdweb-dev/react";
// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import { contractAddress } from "../env";


// const Connectwallets = () => {
//   const [userstate, setstate] = useState(false);
//   const { contract } = useContract(contractAddress);
//   const { data, isLoading } = useContractRead(contract, "owner")
//   const address = useAddress();

//   useEffect(() => {
//     axios.post("http://localhost:8000/checkvoter", { ad: address })
//       .then(res => {
//         setstate(res.data.alreadyvoted);
//       })
//       .catch(err => console.log(err));
//   }, [address])

//   return (
//     <div className="flex flex-col justify-center items-center ">
//       <h1 className="text-white font-bold text-4xl mt-80">Connect your wallet</h1>
//       <div className="py-4">
//         <ConnectWallet
//           theme={"dark"}
//           modalSize={"wide"}
//           btnTitle="Connect Wallet to Login"
//         />
//       </div>
//       {address ? <>{data === address ? <> <button className="bg-black p-4 rounded-lg text-white font-lg text-xl"><Link to='/register'>Canditate registration</Link></button>
//         <button className="bg-black p-4 mt-4 rounded-lg text-white font-lg text-xl"><Link to='/voterregister'>Voter registration</Link></button>
//       </> :
//         <>
//           {!userstate ? <button className="bg-black p-4 mt-4 rounded-lg text-white font-lg text-xl"><Link to='/vote'>Vote now</Link></button> : <button className="bg-black p-4 mt-4 rounded-lg text-white font-lg text-xl"><Link to='/result'>Check Result</Link></button>}
//         </>}

//       </> : <></>}

//     </div>
//   );
// };
// export default Connectwallets;

import React, { useContext, useEffect, useState } from 'react'
import { ConnectWallet as Connecter, useAddress, useContract, useContractRead } from "@thirdweb-dev/react";
import { contractAddress } from '../env';
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import { voterContext } from '../context/voterContext';

const ConnectWallet = () => {

  const {voter, setVoter} = useContext(voterContext)
  const { contract } = useContract(contractAddress);
  const { data, isLoading } = useContractRead(contract, "owner")
  const address = useAddress();
  console.log(data,address)

  const [state,setstate] = useState(true);

  useEffect(()=>{
    if(address){
      axios.post("http://localhost:8000/checkvoter", { address: address })
      .then(res=>{
        setstate(()=>res.data?.[0]?.alreadyvoted);
        setVoter(()=>res.data?.[0]?.alreadyvoted)
      })
      .catch(err=>console.log(err));
    }
  },[address])

  const navigation = useNavigate();
  return (
    <>
      <Connecter
        style={{ backgroundColor: 'white', color: '#3f3d56' }}
        theme={"light"}
        modalSize={"wide"}
        btnTitle="Connect Wallet to Login"
      />
      {
        data === address && data && address ?
        <>
        <button className="bg-black p-4 mt-4 rounded-lg text-white font-lg text-xl" onClick={()=>navigation('/CandidateRegister')}>Candatidate Register</button>
        <button className="bg-black p-4 mt-4 rounded-lg text-white font-lg text-xl" onClick={()=>navigation('/voterRegister')}>Voter Register</button>
        </>
        :
        <>
        {state && voter && address ? 
        <button className="bg-black p-4 mt-4 rounded-lg text-white font-lg text-xl" onClick={()=>navigation('/checkResult')}>Check Result</button>
        :
        <button className="bg-black p-4 mt-4 rounded-lg text-white font-lg text-xl" onClick={()=>navigation('/voteNow')}>Vote Now</button>
        }
        </>
      }
    </>
  )
}

export default ConnectWallet