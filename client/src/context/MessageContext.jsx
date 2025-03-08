import { MessageContext } from "../helpers/messagesHelpers"
import PropTypes from 'prop-types'
import { createMessageRequest, getallMessagesRequest } from "../api/message"


function MessageProvider({children}) {
  const createMessage = async (content) => {
    const message = await createMessageRequest(content)
    return message.data
  }

  const getMessage =  (messageId) => {
    console.log('👀 👉🏽 ~  messageId:', messageId)
  }
  
  const getMessages = async (nunPage, pageSize) => {
    try {
      const result = await getallMessagesRequest(nunPage, pageSize);
      console.log('👀 👉🏽 ~  result:', result)
    } catch (err) {
      console.log('👀 👉🏽 ~  err:', err)
      
    }
    
  }


  return (
    <MessageContext.Provider value={
      {
        createMessage,
        getMessage,
        getMessages,
      }}>
      {children}
    </MessageContext.Provider>
  )
}

export default MessageProvider

MessageProvider.propTypes = {
  children: PropTypes.node.isRequired,
};