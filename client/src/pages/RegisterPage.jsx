import {useForm} from "react-hook-form"
import { useContext } from "react"
import AuthContext from "../context/AuthContext"
import { Link } from "react-router-dom"

function RegisterPage () {
  const {register, handleSubmit} = useForm()

  const {signUp} = useContext(AuthContext)

  const onSubmit = handleSubmit(async(values) => { 
    signUp(values)
  })
  return (
    <div className="bg-zinc-800 max-w-md p-10 rounded-md">
      <form 
        onSubmit={onSubmit}>
        <input type="text" {...register("userName", {required:true})} className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2" placeholder="userName" />
        <input type="email" {...register("email", {required: true})} className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2" placeholder="email" />
        <input type="password" {...register("password", {required: true})} className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2" placeholder="password" />

        <button type="submit" className="my-2 rounded-md bg-zinc-700 p-2">
          Register
        </button>
      </form>
      <p className="flex gap-x-2 justify-between">Already have an account? <Link className="text-sky-500" to="/login">Sign In </Link></p>
    </div>
  )
}

export default RegisterPage