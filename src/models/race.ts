import BaseModel from './base-model'

class Race extends BaseModel {
  constructor(id: string, name: string, weaponsIds: Array<string>) {
    super(id, name, weaponsIds)
  }
}

export default Race
