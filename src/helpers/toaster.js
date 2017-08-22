import { Toast } from 'quasar'

export class Popup {
  constructor (message, type) {
    this.options = {
      html: 'Nincs lekezelve',
      icon: 'alarm_add',
      timeout: 2500,
      color: 'white',
      bgColor: 'black',
      button: {
        color: 'black'
      }
    }
    this.options.html = message
    this.type = type
    this.createPopup()
  }

  createPopup () {
    switch (this.type) {
      case 'info': {
        this.options.icon = 'done'
        this.options.bgColor = '#388e3c'
        this.options.color = 'white'
        this.options.button.color = 'white'
        break
      }
    }

    return Toast.create(this.options)
  }
}
