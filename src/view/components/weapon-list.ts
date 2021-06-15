import { Observable, Subject } from 'rxjs'
import { map, switchMap } from 'rxjs/operators'
import Weapon from '../../models/Weapon'
import { fetchWeapon$ } from '../../services/fetch-from-db'
import ListItem from './list-element'
class WeaponList {
  private selectedWeapon: Subject<Array<string>>
  private idsToDisplay: Subject<Array<string>>
  private host: HTMLElement
  private list: HTMLUListElement
  constructor(host: HTMLElement, _myIdsToDisplay: Subject<Array<string>>) {
    this.host = host
    this.selectedWeapon = new Subject()
    this.idsToDisplay = _myIdsToDisplay
  }

  public drawWeaponList(): void {
    if (this.host === null) return
    const description = document.createElement('h4')
    description.innerHTML = 'Choose your Weapon'
    this.host.appendChild(description)

    this.list = document.createElement('ul')
    this.host.appendChild(this.list)
    this.configureMySteam$().subscribe(this.displayWeapon)
  }

  protected configureMySteam$(): Observable<ListItem> {
    return this.idsToDisplay.pipe(
      switchMap((ids: Array<string>) => {
        this.clearList()
        return fetchWeapon$(ids)
      }),
      map((weapon: Weapon) => new ListItem(this.uList, weapon))
    )
  }

  private displayWeapon = (toDisplayListItem: ListItem) => {
    toDisplayListItem.drawListItem()
    toDisplayListItem.addButtonOnClick = this.onclick
  }

  protected onclick = (event: Event): void => {
    let chosenButton: HTMLButtonElement = <HTMLButtonElement>event.target
    let ids: Array<string> = chosenButton.value.split(',')
    this.selectedWeapon.next(ids)
  }

  protected get uList(): HTMLUListElement {
    return this.list
  }
  public get SelectedWeapon(): Subject<Array<string>> {
    return this.selectedWeapon
  }

  protected clearList(): void {
    this.list.innerHTML = ''
    this.selectedWeapon.next([])
  }
}

export default WeaponList
