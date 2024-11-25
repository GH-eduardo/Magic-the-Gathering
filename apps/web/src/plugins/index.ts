import vuetify from './vuetify'
import router from '../router'

import type { App } from 'vue'
import { pinia } from './pinia'

export function registerPlugins (app: App) {
  app
    .use(pinia)
    .use(vuetify)
    .use(router)
}
