import { App } from "vue";
import chooseArea from "./chooseArea";
import chooseIcon from "./chooseIcon";
import trend from './trend'
import notification from './notification'
import list from './list'
import menu from './menu'
import progress from './progress'
import chooseTime from './chooseTime'
import chooseDate from './chooseDate'
import citySelect from './citySelect'
import form from './form'
import modalForm from './modalForm'

const components = [
  chooseArea,
  chooseIcon,
  trend,
  notification,
  list,
  menu,
  progress,
  chooseTime,
  chooseDate,
  citySelect,
  form,
  modalForm
]

export default {
  install(app: App) {
    components.map(item => {
      app.use(item)
    })
  }
}