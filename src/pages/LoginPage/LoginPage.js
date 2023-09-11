import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../../config/firebase';
import '../../App.css'
import { signInWithEmailAndPassword } from 'firebase/auth';

export default function SignInPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            
            await signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                alert(`You have succesfully login!`)
                navigate("/home");
            });
           
        } catch (error) {
            alert(`Error: ${error}`);
        }
    }
    return (
        <div className="min-h-screen flex flex-col justify-center items-center">
            <div className='border p-10 w-100 max-w-[350px] bg-white drop-shadow-2xl  text-black'>
                <h2 className='text-4xl font-bold'>Sign in to us</h2>
                <form onSubmit={handleSubmit}>
                    <p  className='mt-2'>
                        <label>Email address</label><br/>
                        <input 
                            type="text"
                            value={email} 
                            className='w-100 border border-black rounded-lg'
                            onChange={(e)=> setEmail(e.target.value)} 
                            required 
                        />
                    </p>
                    <p  className='mt-2'>
                        <label>Password</label>
                        <br/>
                        <input 
                            type="password" 
                            value={password}
                            className='w-100 border border-black rounded-lg'
                            onChange={(e)=> setPassword(e.target.value)}
                            required 
                        />
                    </p>
                    <Link to="/forget-password">Forget password?</Link>

                    <p>
                        <button type="submit"
                        className='w-100 bg-blue-600 text-white py-2 rounded-lg mt-2'>Login</button>
                    </p>
                </form>
                <footer className='mt-2 flex flex-col items-center justify-center'>
                    <p>First time? <Link to="/register" className='text-blue-600'>Create an account</Link>.</p>
                    <p><Link to="/" className='text-blue-600'>Back to Homepage</Link>.</p>
                </footer>
            </div>
        </div>
    )
}
