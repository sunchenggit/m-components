import { App } from "vue";
import citySelect from './src/index.vue'

export default {
  install(app: App) {
    app.component('m-city-select', citySelect)
  }
}