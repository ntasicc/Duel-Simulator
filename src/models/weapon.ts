import BaseModel from './base-model'

class Weapon extends BaseModel {
  constructor(id: string, name: string, abilitiesIds: Array<string>) {
    super(id, name, abilitiesIds)
  }
}

export default Weapon
