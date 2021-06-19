import { Observable, Subject } from 'rxjs'
import { map, switchMap } from 'rxjs/operators'
import Weapon from '../../models/Weapon'
import { fetchWeapon$ } from '../../services/fetch-from-db'
import ListItem from './list-element'
class WeaponList {
  private selectedWeapon: Subject<any>
  private idsToDisplay: Subject<any>
  private hp: number
  private dmg: number
  private host: HTMLElement
  private list: HTMLUListElement
  constructor(host: HTMLElement, _myIdsToDisplay: Subject<any>) {
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
      switchMap((json: any) => {
        this.clearList()
        this.hp = Number(json.hp)
        this.dmg = Number(json.dmg)
        return fetchWeapon$(json.ids)
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
    let valueFromButton: Array<string> = chosenButton.value.split(',')
    let hp_Dmg: Array<string> =
      valueFromButton[valueFromButton.length - 1].split('.')
    valueFromButton.pop()
    let ids: Array<string> = valueFromButton
    ids.push(hp_Dmg[0])
    hp_Dmg.shift()
    console.log(this.hp)
    console.log(this.dmg)
    this.selectedWeapon.next({
      ids: ids,
      hp: this.hp + Number(hp_Dmg[0]),
      dmg: this.dmg + Number(hp_Dmg[1]),
    })
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
