import {useForm} from "react-hook-form"
import { registerRequest } from "../api/auth"

function RegisterPage () {
  const {register, handleSubmit} = useForm()
  return (
    <div className="bg-zinc-800 max-w-md p-10 rounded-md">
      <form 
        onSubmit={handleSubmit(async (values) => { 
          try {
            console.log('👀 👉🏽 ~  values:', values);
            const res = await registerRequest(values);
            console.log('👀 👉🏽 ~  res:', res);
            
          } catch (errorOnSubmit) {
            console.log('👀 👉🏽 ~  errorOnSubmit:', errorOnSubmit)
          }
      })}>
        <input type="text" {...register("userName", {required:true})} className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2" placeholder="userName" />
        <input type="email" {...register("email", {required: true})} className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2" placeholder="email" />
        <input type="password" {...register("password", {required: true})} className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2" placeholder="password" />

        <button type="submit" className="my-2 rounded-md bg-zinc-700 p-2">
          Register
        </button>

      </form>
    </div>
  )
}

export default RegisterPage