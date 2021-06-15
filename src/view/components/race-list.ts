import { Observable, Subject } from 'rxjs'
import { map } from 'rxjs/operators'
import Race from '../../models/race'
import { fetchRace$ } from '../../services/fetch-from-db'
import ListItem from './list-element'
class RaceList {
  private selectedRace: Subject<Array<string>>
  private host: HTMLElement
  private list: HTMLUListElement
  constructor(host: HTMLElement) {
    this.host = host
    this.selectedRace = new Subject()
  }

  public drawRaceList(): void {
    if (this.host === null) return
    const description = document.createElement('h4')
    description.innerHTML = 'Choose your race'
    this.host.appendChild(description)

    this.list = document.createElement('ul')
    this.host.appendChild(this.list)
    this.configureMySteam$().subscribe(this.displayRace)
  }

  protected configureMySteam$(): Observable<ListItem> {
    return fetchRace$().pipe(
      map((race: Race) => {
        return new ListItem(this.uList, race)
      })
    )
  }

  private displayRace = (toDisplayListItem: ListItem) => {
    toDisplayListItem.drawListItem()
    toDisplayListItem.addButtonOnClick = this.onclick
  }

  protected onclick = (event: Event): void => {
    let chosenButton: HTMLButtonElement = <HTMLButtonElement>event.target
    let ids: Array<string> = chosenButton.value.split(',')
    this.selectedRace.next(ids)
  }

  protected get uList(): HTMLUListElement {
    return this.list
  }
  public get SelectedRace(): Subject<Array<string>> {
    return this.selectedRace
  }

  protected clearList(): void {
    this.list.innerHTML = ''
    this.selectedRace.next([])
  }
}

export default RaceList
