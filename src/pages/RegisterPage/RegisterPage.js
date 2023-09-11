import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { auth } from '../../config/firebase';
import { 
    createUserWithEmailAndPassword, 
    sendEmailVerification,
  } from "firebase/auth";
import '../../App.css'

export default function SignUpPage() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");



    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
           
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)
            .then(() => {
                alert(`Hello ${username}! You have succesfully created an account!`)
                navigate("/home");

            });
            await sendEmailVerification(userCredential.user);
        } catch (error) {
            alert(`Error: ${error}`);
        }
    }
    return (
        <div className="min-h-screen flex flex-col justify-center items-center">
            <div className='border p-10 w-100 max-w-[350px] bg-white drop-shadow-2xl  text-black'>

            <h2 className='text-5xl font-bold'>Join us</h2>
            <h5 className='text-lg font-semibold'>Create your personal account</h5>
            <form onSubmit={handleSubmit}>
                <p className='mt-2'>
                    <label>Username</label><br/>
                    <input 
                        type="text" 
                        value={username} 
                        className='w-100 border border-black rounded-lg'
                        onChange={(e)=> setUsername(e.target.value)}
                        required 
                    />
                </p>
                <p className='mt-2'>
                    <label>Email address</label><br/>
                    <input 
                        type="email" 
                        value={email}
                        className='w-100 border border-black rounded-lg'
                        onChange={(e)  => setEmail(e.target.value)}
                        required 
                    />
                </p>
                <p className='mt-2' >
                    <label>Password</label><br/>
                    <input 
                        type="password" 
                        value={password}
                        className='w-100 border border-black rounded-lg'
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </p>
                <p>
                    <input type="checkbox" name="checkbox" id="checkbox" required /> <span>I agree all statements in <a href="https://google.com" target="_blank" rel="noopener noreferrer">terms of service</a></span>.
                </p>
                <p>
                    <button 
                        className='w-100 bg-blue-600 text-white py-2 rounded-lg mt-2'
                        type="submit">Register</button>
                </p>
            </form>
            <Link to="/" className='flex justify-center text-blue-600 mt-2'>Back to Homepage</Link>
            </div>
        </div>
    )

}
