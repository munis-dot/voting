// 0xa513E6E4b8f2a923D98304ec87F64353C4D5C853

import { Web3Button,ConnectWallet,useAddress ,useContract,useContractRead} from "@thirdweb-dev/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Connectwallets = () => {
  const [userstate,setstate]=useState(false);
  const { contract } = useContract("0xa513E6E4b8f2a923D98304ec87F64353C4D5C853");
  const { data, isLoading } = useContractRead(contract, "owner");
  const address = useAddress();
  useEffect(()=>{
    axios.post("http://localhost:8000/checkvoter",{ad:address})
    .then(res=>{
      console.log(res)
      setstate(res.data.alreadyvoted);
    })
    .catch(err=>console.log(err));
  },[address])
  return (
    <div className="flex flex-col justify-center items-center ">
      <h1 className="text-white font-bold text-4xl mt-80">Connect your wallet</h1>
      <div className="py-4">
     <ConnectWallet  theme="dark"
     btnTitle="Connect Wallet to Login"
     />
   
     </div>
     {address?<>{data===address?<> <button className="bg-black p-4 rounded-lg text-white font-lg text-xl"><Link to='/register'>Canditate registration</Link></button>
    <button className="bg-black p-4 mt-4 rounded-lg text-white font-lg text-xl"><Link to='/voterregister'>Voter registration</Link></button>
</>:
<>
{!userstate? <button className="bg-black p-4 mt-4 rounded-lg text-white font-lg text-xl"><Link to='/vote'>Vote now</Link></button>: <button className="bg-black p-4 mt-4 rounded-lg text-white font-lg text-xl"><Link to='/result'>Check Result</Link></button>}
</>}
    
</>:<></>}
    
     </div>
  );
};
export default Connectwallets;