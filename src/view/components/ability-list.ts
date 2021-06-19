import { Observable, Subject } from 'rxjs'
import { map, switchMap } from 'rxjs/operators'
import Ability from '../../models/Ability'
import { fetchAbilities$ } from '../../services/fetch-from-db'
import ListItem from './list-element'
class AbilityList {
  private selectedAbility: Subject<any>
  private idsToDisplay: Subject<any>
  private host: HTMLElement
  private list: HTMLUListElement
  private hp: number
  private dmg: number
  constructor(host: HTMLElement, _myIdsToDisplay: Subject<any>) {
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
      switchMap((json: any) => {
        this.clearList()
        this.hp = json.hp
        this.dmg = json.dmg
        return fetchAbilities$(json.ids)
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
    let valueFromButton: Array<string> = chosenButton.value.split(',')
    let hp_Dmg: Array<string> =
      valueFromButton[valueFromButton.length - 1].split('.')
    valueFromButton.pop()
    let ids: Array<string> = valueFromButton
    ids.push(hp_Dmg[0])
    hp_Dmg.shift()
    console.log(this.hp)
    console.log(this.dmg)
    this.selectedAbility.next({
      hp: this.hp + Number(hp_Dmg[0]),
      dmg: this.dmg + Number(hp_Dmg[1]),
    })
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
