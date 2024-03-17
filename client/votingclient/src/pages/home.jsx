import React, { useState, useEffect } from 'react'
import { useContract, useContractRead } from "@thirdweb-dev/react";
import Header from '../components/header'
import Charts from '../components/charts'
import Tables from '../components/tables'
import Timer from '../components/Timer'
import Resulttable from '../components/resulttable'
import Winner from '../components/winner'
import { contractAddress } from '../env';
import { convertUnixTimestamp } from '../util/timeChanger'
import CountdownTimer from '../components/CountdownTimer'
import axios from 'axios';

function Home() {
    const { contract } = useContract(contractAddress);
    const { data: voteCount, isLoading:a } = useContractRead(contract, "getcanditates");
    const { data:winner, isLoading:b } = useContractRead(contract, "getWinner");
    const { data: timeLeft, isLoading: timeLoading } = useContractRead(contract, "votingEndTime");
    const timeRemain = Number(timeLeft?._hex);
    const targetTime = convertUnixTimestamp(timeRemain).getTime();

    const [candidate, setCandidate] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8000/getcandidate")
            .then(res => {
                setCandidate(res.data)
            })
            .catch()
    }, [])

    return (

        <div>
            <div style={{ position: "absolute" }}><h1 className='text-white font-bold ml-10'>w3 VOTING</h1></div>
            <Header />
            {convertUnixTimestamp(timeRemain).getTime() > new Date().getTime() ?
                <>
                    <h1 className='text-white text-center font-bold text-5xl mb-10'>VOTING ANNOUNCEMENT IN</h1>
                    <CountdownTimer targetTime={targetTime} />
                </>
                :
                <>
                    <div className='grid grid-cols-2 place-content-center'>
                        <div className='ml-44 w-4/6'>
                            <div> <h1 className='text-white font-bold text-4xl ml-52 mb-10'>VOTING RESULT</h1></div>
                            <Charts voteCount={voteCount} />

                        </div>

                        <div className='w-5/6 ml-28 '>
                            <div> <h1 className='text-white font-bold text-4xl ml-60 mb-10'>WINNER</h1></div>
                            <Winner voteCounts={voteCount} winner={winner} candidates={candidate} />
                        </div>


                    </div>
                    <div className='flex justify-center'>
                        <div> <h1 className='text-white font-bold text-4xl mt-24 mb-10'>RESULT TABLE</h1></div>
                    </div>
                    <Resulttable voteCount={voteCount} candidates={candidate} />
                </>
            }

        </div>


    )
}

export default Home