import { registerPlugins } from '@/plugins'
import { createApp } from 'vue'
import App from './App.vue'
import { io } from 'socket.io-client'

const app = createApp(App)

registerPlugins(app)

const socket = io('http://localhost:3001');

socket.on('notification', (event) => {
  console.log('Nova notificação recebida:', event);
});

app.config.globalProperties.$socket = socket;

app.mount('#app')
