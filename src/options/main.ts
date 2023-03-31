import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import store from './store'

(async () => {
    const app = createApp(App)
    app.use(store)

    await store.restored

    app.mount('#app')
})()
