import { useContext } from "react"
import {useForm} from "react-hook-form"
import AuthContext from "../context/AuthContext"
import { Link } from "react-router-dom"


function LoginPage () {

  const {register, handleSubmit,formState: {errors}} = useForm()
  const {signIn} = useContext(AuthContext)

  const onSubmit = handleSubmit((data) => {
    signIn(data)
  })
  return(
    <div className="flex items-center justify-center h-screen">
      <div className=" bg-zinc-800 max-w-md w-full p-10 rounded-md">
        <h1 className="text-2xl font-bold my-2">Login</h1>
        <form 
          onSubmit={onSubmit}>
          
          <input type="email" {...register("email", {required: true})} className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2" placeholder="email" />
          {errors.email && <p className="text-red-500">Email is required</p>}

          <input type="password" {...register("password", {required: true})} className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2" placeholder="password" />
          {errors.password && <p className="text-red-500">Password is required</p>}

          <button type="submit" className="my-2 rounded-md bg-zinc-700 p-2">
            Login
          </button>
        </form>
      <p className="flex gap-x-2 justify-between">Don´t have an account? <Link className="text-sky-500" to="/register">Sign Up </Link></p>
      </div>
    </div>
  )
}

export default LoginPage