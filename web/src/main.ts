
import { registerPlugins } from '@/plugins'
import { createApp } from 'vue'
import App from './App.vue'

// dotenv.config({ path: '.env.development' })

console.log(import.meta.env)

const app = createApp(App)

registerPlugins(app)

app.mount('#app')
