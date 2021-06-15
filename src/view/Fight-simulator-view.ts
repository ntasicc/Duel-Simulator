import { from, Observable, Subject } from 'rxjs'
import AbilityList from './components/ability-list'
import RaceList from './components/race-list'
import WeaponList from './components/weapon-list'

class FightSimulatorView {
  private racelist: RaceList
  private weaponlist: WeaponList
  private abilitylist: AbilityList

  constructor() {
    this.racelist = new RaceList(document.body)
    this.weaponlist = new WeaponList(document.body, this.racelist.SelectedRace)
    this.abilitylist = new AbilityList(
      document.body,
      this.weaponlist.SelectedWeapon
    )
  }

  public drawView() {
    this.racelist.drawRaceList()
    this.weaponlist.drawWeaponList()
    this.abilitylist.drawAbilityList()
  }

  public get fighterIsReady(): Subject<string> {
    return this.abilitylist.SelectedAbility
  }
}

export default FightSimulatorView
