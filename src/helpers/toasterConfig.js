import { Toast } from 'quasar'

export class Popup {
  constructor (message, type) {
    this.options = {
      html: 'Nincs lekezelve',
      icon: 'feedback',
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
      case 'success':
        this.options.icon = 'done'
        this.options.bgColor = '#388e3c'
        this.options.color = 'white'
        this.options.button.color = 'white'
        break

      case 'warning':
        this.options.icon = 'feedback'
        this.options.bgColor = '#f4511e'
        this.options.color = 'white'
        this.options.button.color = 'white'
        break
    }

    return Toast.create(this.options)
  }
}
