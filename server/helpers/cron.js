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

    await fetch(`${process.env.LOCAL_HOST}/messages/sendMessage`, body)
    
  } catch (error) {
    console.log('👀 👉🏽 ~  error:', error)
  }
});


export default schedule