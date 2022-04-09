import { App } from "vue";
import chooseArea from "./chooseArea";
import chooseIcon from "./chooseIcon";
import trend from './trend'

const components = [
  chooseArea,
  chooseIcon,
  trend
]

export default {
  install(app: App) {
    components.map(item => {
      app.use(item)
    })
  }
}