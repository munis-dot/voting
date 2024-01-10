import { BrowserRouter,Route,Routes } from "react-router-dom";
import Connectwallets from './pages/connectwallet'
// import Transfer from './pages/transferamount'
import Vote from './pages/vote'
import Result from './pages/home'
import Register from './pages/register'
import Voterregister from './pages/voterregister'
import { useContext, useState } from "react";
import { ffcontext } from "./context/ffcontext";
import { candidatecontext } from "./context/candidatecontext";
export default function Home() {
  const[ff,setff]=useState()
  const[cand,setcand]=useState()
  return (
    <candidatecontext.Provider value={{cand,setcand}}>
      <ffcontext.Provider value={{ff,setff}}>
      <BrowserRouter>
      <Routes>
        <Route path="/*" element={<Connectwallets/>}/>
        {/* <Route path="/transfertoken" element={<Transfer/>}/> */}
        <Route path="/vote" element={<Vote/>}/>
        <Route path="/result" element={<Result/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/voterregister" element={<Voterregister/>}/>
      </Routes>
      </BrowserRouter>
      </ffcontext.Provider>
      </candidatecontext.Provider>
  );
}
