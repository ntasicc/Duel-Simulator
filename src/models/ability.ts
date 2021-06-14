import BaseModel from './base-model'

class Ability extends BaseModel {
  constructor(id: string, name: string) {
    super(id, name, [''])
  }
}

export default Ability
