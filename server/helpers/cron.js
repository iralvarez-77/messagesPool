import cron from 'node-cron';
import { MessageModel } from '../models/mysql/messages.js';

const schedule = cron.schedule('*/20 * * * * *', async () => {
  try {
    const id = 89
    const { data } = await MessageModel.getMessageByID(id)
    await MessageModel.sendMessage(data.content)
  
    
  } catch (error) {
    console.log('👀 👉🏽 ~  error:', error)
  }
});


export default schedule
