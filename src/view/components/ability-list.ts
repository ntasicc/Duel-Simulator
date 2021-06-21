import { Observable, Subject } from 'rxjs'
import { map, switchMap } from 'rxjs/operators'
import Ability from '../../models/Ability'
import ParsedValueFromButton from '../../models/parsedValueInt'
import { fetchAbilities$ } from '../../services/fetch-from-db'
import AbstractList from './abstract-list'
import ListItem from './list-element'
class AbilityList extends AbstractList {
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
        this.hp = json.hp
        this.dmg = json.dmg
        return fetchAbilities$(json.ids)
      }),
      map((Ability: Ability) => new ListItem(this.uList, Ability))
    )
  }

  protected generateNext(parsedValueFromButton: ParsedValueFromButton): void {
    this.SelectedItem.next({
      hp: this.hp + Number(parsedValueFromButton.hp_Dmg[0]),
      dmg: this.dmg + Number(parsedValueFromButton.hp_Dmg[1]),
    })
  }

  protected clearList(): void {
    this.uList.innerHTML = ''
  }
}

export default AbilityList
