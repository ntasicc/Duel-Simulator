import BaseModel from './base-model'

class Weapon extends BaseModel {
  constructor(
    id: string,
    name: string,
    hp: number,
    dmg: number,
    abilitiesIds: Array<string>
  ) {
    super(id, name, hp, dmg, abilitiesIds)
  }
}

export default Weapon
