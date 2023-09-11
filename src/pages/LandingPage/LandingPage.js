import React from 'react'
import { Link } from 'react-router-dom'

import '../../App.css'
import BackgroundImage from '../../assets/images/restaurant.jpg'

export default function LandingPage() {
    return (
        <header style={ HeaderStyle } className='flex flex-col items-center justify-center'>
            <div className='bg-white p-10 rounded-lg text-black'>
                <h1 className="text-3xl font-bold">EFFICIENT EATS</h1>
                <p className="main-para text-center">join us now and don't waste time!</p>
                <div className="flex items-center justify-center gap-2 mt-4">
                    <Link to="/login">
                        <button className="bg-blue-600 duration-200 border-2 border-blue-600 text-white py-1 px-3 rounded-lg
                            hover:bg-blue-500">Login</button>
                    </Link>
                    <Link to="/register">
                        <button  
                            className="outline outline-blue-600 duration-200 text-blue-600 py-1 px-3 rounded-lg 
                            hover:bg-blue-600 hover:text-white">
                            Register
                        </button>
                    </Link>
                </div>
            </div>
        </header>
    )
}

const HeaderStyle = {
    width: "100%",
    height: "100vh",
    background: `url(${"https://en.free-wallpapers.su/data/media/2319/big/fd0244.jpg"})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover"
}