import { useEffect, useState} from "react"
// import { useMessage } from "../helpers/messagesHelpers";
import apiClient from "../api/axios";


function MessagesPage() {
  // const { getMessages} = useMessage(); 
  const [messages, setMessages] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize ]= useState(8)
  const [totalPages, setTotalPages] = useState(1)

  const fetchMessages = async (page, size) => {
    try {
      const { data } = await apiClient.get("http://localhost:4000/api/v1/messages", {
        params: { nunPage: page, pageSize: size },
      });
      console.log('👀 👉🏽 ~  data:', data)

      setMessages(data.messages); // Asegúrate de que la API devuelve `messages`
      setTotalPages(data.totalPages || Math.ceil(data.totalItems / size));
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  useEffect(() => {
    fetchMessages(currentPage, pageSize); 
  }, [currentPage, pageSize]);


  return (
    <div>
      messagePage
    </div>
  );
}


export default MessagesPage