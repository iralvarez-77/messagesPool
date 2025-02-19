import {useForm} from "react-hook-form"

function RegisterPage () {
  const {register, handleSubmit} = useForm()

  const onsubmit = handleSubmit(async(values) => { 
    
  })
  return (
    <div className="bg-zinc-800 max-w-md p-10 rounded-md">
      <form 
        onSubmit={onsubmit}>
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