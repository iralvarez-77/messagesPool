import { MessageContext } from "../helpers/authHelpers"
import PropTypes from 'prop-types'
import { createMessageRequest } from "../api/message"


function MessageProvider({children}) {
  
  const createMessage = async (content) => {
  const result = await createMessageRequest(content)
  console.log('👀 👉🏽 ~  result:', result)

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