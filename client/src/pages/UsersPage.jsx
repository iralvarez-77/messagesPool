import { useEffect } from "react"
import { useMessage } from "../helpers/messagesHelpers"


function UsersPage() {
  const { getMessages }= useMessage()


  useEffect(()=>{
    getMessages()
  }, [])


  return (
    <div>UsersPage</div>
  )
}

export default UsersPage