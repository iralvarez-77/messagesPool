import {useForm} from "react-hook-form"

function MessageFormPage() {

  const {register, handleSubmit} = useForm()

  const onSubmit = handleSubmit((data)=> {
    console.log('👀 👉🏽 ~  data:', data)
  })
  return (
    <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
      <form onSubmit={onSubmit}>
        <h1 className="my-2">Message</h1>
        <textarea className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md" rows="3" placeholder="write a message" {...register("content")}  />
        <button type="submit" className="my-2 p-2 rounded-md bg-indigo-700">Save</button>
      </form>
    </div>
    
  )
}

export default MessageFormPage