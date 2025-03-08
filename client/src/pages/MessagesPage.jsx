import { useEffect} from "react"
import { useMessage } from "../helpers/messagesHelpers";


function MessagesPage() {
  const { getMessages} = useMessage(); 

  useEffect(() => {
    getMessages(1, 4); 
  }, [getMessages]);

  return (
    <div>
      messagePage
    </div>
  );
}


export default MessagesPage