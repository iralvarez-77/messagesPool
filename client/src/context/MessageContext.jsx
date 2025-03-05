import { MessageContext } from "../helpers/authHelpers"
import PropTypes from 'prop-types'
import { createMessageRequest } from "../api/message"


function MessageProvider({children}) {
  
  const createMessage = async (content) => {
    const message = await createMessageRequest(content)
    return message.data
  }

  const getMessage =  (messageId) => {
    console.log('👀 👉🏽 ~  messageId:', messageId)
  }
  const getMessages =  () => {
    console.log('👀 👉🏽 ~  messageId:')
  }


  return (
    <MessageContext.Provider value={
      {
        createMessage,
        getMessage,
        getMessages
      }}>
      {children}
    </MessageContext.Provider>
  )
}

export default MessageProvider

MessageProvider.propTypes = {
  children: PropTypes.node.isRequired,
};