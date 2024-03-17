// import { BrowserRouter,Route,Routes } from "react-router-dom";
// import Connectwallets from './pages/connectwallet'
// // import Transfer from './pages/transferamount'
// import Vote from './pages/vote'
// import Result from './pages/home'
// import Register from './pages/register'
// import Voterregister from './pages/voterregister'
// import { useContext, useState } from "react";
// import { ffcontext } from "./context/ffcontext";
// import { candidatecontext } from "./context/candidatecontext";
// export default function Home() {
//   const[ff,setff]=useState()
//   const[cand,setcand]=useState()
//   return (
//     <candidatecontext.Provider value={{cand,setcand}}>
//       <ffcontext.Provider value={{ff,setff}}>
//       <BrowserRouter>
//       <Routes>
//         <Route path="/*" element={<Connectwallets/>}/>
//         {/* <Route path="/transfertoken" element={<Transfer/>}/> */}
//         <Route path="/vote" element={<Vote/>}/>
//         <Route path="/result" element={<Result/>}/>
//         <Route path="/register" element={<Register/>}/>
//         <Route path="/voterregister" element={<Voterregister/>}/>
//       </Routes>
//       </BrowserRouter>
//       </ffcontext.Provider>
//       </candidatecontext.Provider>
//   );
// }
import React, { useState } from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from './pages/Login'
import VoterRegister from './pages/VoterRegister';
import Vote from './pages/Vote';
import CandidateRegister from './pages/CandidateRegister';
import Home from './pages/Home';
import { voterContext } from './context/voterContext';
const App = () => {
  const [voter,setVoter] = useState({});
  return (
    <>
      <voterContext.Provider value={{voter,setVoter}}>
        <BrowserRouter>
          <Routes>
            <Route path="/*" element={<Login />} />
            <Route path="/voteNow" element={<Vote />} />
            <Route path="/checkResult" element={<Home />} />
            <Route path="/candidateRegister" element={<CandidateRegister />} />
            <Route path="/voterRegister" element={<VoterRegister />} />
          </Routes>
        </BrowserRouter>
      </voterContext.Provider>

    </>
  )
}

export default App