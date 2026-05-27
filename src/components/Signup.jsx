import React, {useState} from 'react'
import authService from '../appwrite/auth'
import { Link, useNavigate } from 'react-router-dom'
// import {login} from '../store/store'
import { login } from '../store/authSlice'
import {Button, Input, Logo} from './index'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'


function Signup() {
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm()

    const create = async(data) => {
        setError("")
        try {
            const session = await authService.createAccount(data)
            if(session) {
                const userData = await authService.getCurrentUser()
                if(userData) dispatch(login({userData}));
                navigate("/")
            }
        } catch (error) {
            setError(error.message)
        }
    }
    return (
        <div className='flex w-full items-center justify-center px-4'>
            <div className={`mx-auto w-full max-w-lg rounded-2xl border border-slate-200 bg-white/95 p-8 shadow-xl md:p-10`}>
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-25">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight text-slate-900">Create your account</h2>
                <p className="mt-2 text-center text-base text-slate-600">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-blue-700 transition-all duration-200 hover:text-blue-600 hover:underline"
                    >
                        Sign In
                    </Link>
                </p>
                {error && <p className='mt-8 text-center text-red-600'>{error}</p> }

                <form onSubmit={handleSubmit(create)} className="mt-8">
                    <div className='space-y-5'>
                        <Input
                        label = "Full Name: "
                        type="text"
                        placeholder="Enter your full name"
                        {...register("name", {
                            required: true,
                        })}
                        />
                        <Input
                        label = "Email: "
                        type="email"
                        placeholder = "Enter your email address"
                        {...register("email", {
                            required:true,
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: "enter valid email address"
                            }
                        })}
                        />
                        <Input
                        label="Password"
                        type="password"
                        placeholder="Enter your password"
                        {...register("password", {
                            required:true,
                        })}
                        />
                        <Button
                        type="submit"
                        className="w-full"
                        >Create Account</Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signup
