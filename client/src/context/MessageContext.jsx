import { MessageContext } from "../helpers/authHelpers"
import PropTypes from 'prop-types'


function MessageProvider({children}) {
  return (
    <MessageContext.Provider value={{}}>
      {children}
    </MessageContext.Provider>
  )
}

export default MessageProvider

MessageProvider.propTypes = {
  children: PropTypes.node.isRequired,
};