import {useForm} from "react-hook-form"
import { useContext, useEffect } from "react"
import AuthContext from "../context/AuthContext"
import { Link, useNavigate } from "react-router-dom"

function RegisterPage () {
  const {register, handleSubmit, formState: {errors}} = useForm()

  const {signUp, errors: registerErrors, isAuthenticated} = useContext(AuthContext)
  const navigate = useNavigate()

  useEffect(()=> {
    if (isAuthenticated) navigate("/Login")
  }, [isAuthenticated, navigate])

  const onSubmit = handleSubmit(async(values) => { 
    signUp(values)
  })
  return (
    <div className="bg-zinc-800 max-w-md p-10 rounded-md">
      {registerErrors.map((error, i) => (
        <p className="text-red-500" key={i}>{error}</p>
      ))}
      <form 
        onSubmit={onSubmit}>
        <input type="text" {...register("userName", {required:true})} className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2" placeholder="userName" />
        {errors.userName && <p className="text-red-500">Username is required</p>}

        <input type="email" {...register("email", {required: true})} className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2" placeholder="email" />
        {errors.email && <p className="text-red-500">Email is required</p>}

        <input type="password" {...register("password", {required: true})} className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2" placeholder="password" />
        {errors.password && <p className="text-red-500">Password is required</p>}

        <button type="submit" className="my-2 rounded-md bg-zinc-700 p-2">
          Register
        </button>
      </form>
      <p className="flex gap-x-2 justify-between">Already have an account? <Link className="text-sky-500" to="/login">Sign In </Link></p>
    </div>
  )
}

export default RegisterPage