class BaseModel {
  private id: string
  private name: string
  private upgradesIds: Array<string>
  private health: number
  private damage: number
  constructor(
    id: string,
    name: string,
    hp: number,
    dmg: number,
    upgradesIds: Array<string>
  ) {
    this.id = id
    this.name = name
    this.upgradesIds = upgradesIds
  }

  get Id(): string {
    return this.id
  }

  get Name(): string {
    return this.name
  }

  get Health(): number {
    return this.health
  }

  get Damage(): number {
    return this.damage
  }

  get UpgradesIds(): Array<string> {
    return this.upgradesIds
  }

  get valueForButton(): string {
    return this.upgradesIds.reduce((acc, id) => (acc = acc + ',' + id))
  }
}

export default BaseModel
