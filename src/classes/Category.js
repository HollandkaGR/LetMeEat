export class AdminCategory {
  constructor () {
    this.id = null
    this.name = null
  }

  toJson () {
    return {
      id: this.id,
      name: this.name
    }
  }
}
