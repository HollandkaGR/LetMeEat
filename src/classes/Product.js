export class AdminProduct {
  constructor () {
    this.id = null
    this.name = null
    this.description = null
    this.price = null
    this.inAction = false
    this.salePercent = 0
  }

  toJson () {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      price: this.price,
      inAction: this.inAction,
      salePercent: this.salePercent
    }
  }
}
