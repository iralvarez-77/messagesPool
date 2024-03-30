export const sendMessage = async(req,res) => {
	const {data, statusCode} = await MessageModel.sendMessage(req.body)
	console.log('👀 👉🏽 ~  data:', data)
	res.status(statusCode).json(data)
}

static async sendMessage({ payload }) {
  try {
  
    const client = twilio(process.env.ACCOUNT_SID, process.env.TOKEN_TWILIO);

    const { sid } = await client.messages
      .create({
        body: payload,
        from: process.env.NUMBER_FROM,
        to: process.env.NUMBER_TO,
      })

    const data = {
      sid,
      message: 'Message is sent'
    }
    return responseFn(data, 200)
    
  } catch (error) {
    console.log('👀 👉🏽 ~  error:', error)
  }
}

import cron from 'node-cron';

const schedule = cron.schedule('*/10 * * * * *', async () => {
  try {
    const id = 89
    const getMessage = await fetch(`${process.env.LOCAL_HOST}/messages/${id}`)
    const { data } = await getMessage.json()
    
    const body = {
      method: 'POST', 
      body: JSON.stringify({ payload : data.content }),
      headers: {
        'Content-Type': 'application/json'
      },
    }

    const sendMessage = await fetch(`${process.env.LOCAL_HOST}/messages/sendMessage`, body)
    const sentMessage = await sendMessage.json()
  } catch (error) {
    console.log('👀 👉🏽 ~  error:', error)
  }
});


export default schedule