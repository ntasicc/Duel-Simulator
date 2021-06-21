import { from, Observable, Subject } from 'rxjs'
import AbilityList from './components/ability-list'
import AbstractList from './components/abstract-list'
import RaceList from './components/race-list'
import WeaponList from './components/weapon-list'

class FighterView {
  private racelist: AbstractList
  private weaponlist: AbstractList
  private abilitylist: AbilityList

  constructor() {
    this.racelist = new RaceList(document.body)
    this.weaponlist = new WeaponList(document.body, this.racelist.SelectedItem)
    this.abilitylist = new AbilityList(
      document.body,
      this.weaponlist.SelectedItem
    )
  }

  public drawView() {
    this.racelist.drawList()
    this.weaponlist.drawList()
    this.abilitylist.drawList()
  }

  public get fighterIsReady(): Subject<string> {
    return this.abilitylist.SelectedItem
  }
}

export default FighterView
