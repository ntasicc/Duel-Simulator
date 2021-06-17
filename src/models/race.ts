import BaseModel from './base-model'

class Race extends BaseModel {
  constructor(
    id: string,
    name: string,
    hp: number,
    dmg: number,
    weaponsIds: Array<string>
  ) {
    super(id, name, hp, dmg, weaponsIds)
  }
}

export default Race
