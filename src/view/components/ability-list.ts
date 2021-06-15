import { Observable, Subject } from 'rxjs'
import { map, switchMap } from 'rxjs/operators'
import Ability from '../../models/Ability'
import { fetchAbilities$ } from '../../services/fetch-from-db'
import ListItem from './list-element'
class AbilityList {
  private selectedAbility: Subject<string>
  private idsToDisplay: Subject<Array<string>>
  private host: HTMLElement
  private list: HTMLUListElement
  constructor(host: HTMLElement, _myIdsToDisplay: Subject<Array<string>>) {
    this.host = host
    this.selectedAbility = new Subject()
    this.idsToDisplay = _myIdsToDisplay
  }

  public drawAbilityList(): void {
    if (this.host === null) return
    const description = document.createElement('h4')
    description.innerHTML = 'Choose your Ability'
    this.host.appendChild(description)

    this.list = document.createElement('ul')
    this.host.appendChild(this.list)
    this.configureMySteam$().subscribe(this.displayAbility)
  }

  protected configureMySteam$(): Observable<ListItem> {
    return this.idsToDisplay.pipe(
      switchMap((ids: Array<string>) => {
        this.clearList()
        return fetchAbilities$(ids)
      }),
      map((Ability: Ability) => new ListItem(this.uList, Ability))
    )
  }

  private displayAbility = (toDisplayListItem: ListItem) => {
    toDisplayListItem.drawListItem()
    toDisplayListItem.addButtonOnClick = this.onclick
  }

  protected onclick = (event: Event): void => {
    let chosenButton: HTMLButtonElement = <HTMLButtonElement>event.target
    let ids: Array<string> = chosenButton.value.split(',')
    this.selectedAbility.next('ready')
  }

  protected get uList(): HTMLUListElement {
    return this.list
  }
  public get SelectedAbility(): Subject<string> {
    return this.selectedAbility
  }

  protected clearList(): void {
    this.list.innerHTML = ''
    //this.selectedAbility.next()
  }
}

export default AbilityList
