import { app } from './app'

app.listen(process.env.API_PORT, () => {
  console.log('🚀 server started!');
})