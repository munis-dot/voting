import React from 'react'
import img from '../images/vote.svg'
import Connectwallet from './Connectwallet'
const Login = () => {
    return (
        <>
            <h1 className='heading'>ONLINE VOTING</h1>
            <div className='loginPage'>
                <div className='voteImg'>
                    <img src={img} alt='vote'></img>
                </div>
                <div className='loginBtn'>
                    <Connectwallet />
                </div>
            </div>
        </>
    )
}

export default Login