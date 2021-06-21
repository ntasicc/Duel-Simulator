import { Observable, Subject } from 'rxjs'
import { map } from 'rxjs/operators'
import ParsedValueFromButton from '../../models/parsedValueInt'
import Race from '../../models/race'
import { fetchRace$ } from '../../services/fetch-from-db'
import AbstractList from './abstract-list'
import ListItem from './list-element'

class RaceList extends AbstractList {
  constructor(host: HTMLElement) {
    super(host)
  }

  protected configureMyStream$(): Observable<ListItem> {
    return fetchRace$().pipe(
      map((race: Race) => {
        return new ListItem(this.uList, race)
      })
    )
  }

  protected generateNext(parsedValueFromButton: ParsedValueFromButton): void {
    this.SelectedItem.next({
      ids: parsedValueFromButton.ids,
      hp: parsedValueFromButton.hp_Dmg[0],
      dmg: parsedValueFromButton.hp_Dmg[1],
    })
  }

  protected clearList(): void {
    this.uList.innerHTML = ''
    this.SelectedItem.next([])
  }
}

export default RaceList
