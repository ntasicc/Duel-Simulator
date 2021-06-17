import BaseModel from './base-model'

class Ability extends BaseModel {
  constructor(id: string, name: string, hp: number, dmg: number) {
    super(id, name, hp, dmg, [''])
  }
}

export default Ability
