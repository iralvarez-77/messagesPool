import { MessageContext } from "../helpers/authHelpers"
import PropTypes from 'prop-types'
import { createMessageRequest } from "../api/message"


function MessageProvider({children}) {
  
  const createMessage = async (content) => {
    const message = await createMessageRequest(content)
    return message.data
  }
  return (
    <MessageContext.Provider value={
      {
        createMessage
      }}>
      {children}
    </MessageContext.Provider>
  )
}

export default MessageProvider

MessageProvider.propTypes = {
  children: PropTypes.node.isRequired,
};