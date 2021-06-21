import { Observable, Subject } from 'rxjs'
import { map, switchMap } from 'rxjs/operators'
import ParsedValueFromButton from '../../models/parsedValueInt'
import Weapon from '../../models/Weapon'
import { fetchWeapon$ } from '../../services/fetch-from-db'
import AbstractList from './abstract-list'
import ListItem from './list-element'
class WeaponList extends AbstractList {
  private idsToDisplay: Subject<any>
  private hp: number
  private dmg: number
  constructor(host: HTMLElement, _myIdsToDisplay: Subject<any>) {
    super(host)
    this.idsToDisplay = _myIdsToDisplay
  }

  protected configureMyStream$(): Observable<ListItem> {
    return this.idsToDisplay.pipe(
      switchMap((json: any) => {
        this.clearList()
        this.hp = Number(json.hp)
        this.dmg = Number(json.dmg)
        return fetchWeapon$(json.ids)
      }),
      map((weapon: Weapon) => new ListItem(this.uList, weapon))
    )
  }

  protected generateNext(parsedValueFromButton: ParsedValueFromButton): void {
    this.SelectedItem.next({
      ids: parsedValueFromButton.ids,
      hp: this.hp + Number(parsedValueFromButton.hp_Dmg[0]),
      dmg: this.dmg + Number(parsedValueFromButton.hp_Dmg[1]),
    })
  }

  protected clearList(): void {
    this.uList.innerHTML = ''
    this.SelectedItem.next([])
  }
}

export default WeaponList
