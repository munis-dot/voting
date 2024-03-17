import React from 'react'
import img from '../images/vote.svg'
import ConnectWallet from './ConnectWallet'
const Login = () => {
    return (
        <>
            <h1 className='heading'>ONLINE VOTING</h1>
            <div className='loginPage'>
                <div className='voteImg'>
                    <img src={img} alt='vote'></img>
                </div>
                <div className='loginBtn'>
                    <ConnectWallet />
                </div>
            </div>
        </>
    )
}

export default Login