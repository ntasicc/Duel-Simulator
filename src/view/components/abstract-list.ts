import { Observable, Subject } from 'rxjs'
import { map, switchMap } from 'rxjs/operators'
import Weapon from '../../models/Weapon'
import { fetchWeapon$ } from '../../services/fetch-from-db'
import ListItem from './list-element'
import ParsedValueFromButton from '../../models/parsedValueInt'

abstract class AbstractList {
  private selectedItem: Subject<any>

  private host: HTMLElement
  private list: HTMLUListElement
  constructor(host: HTMLElement) {
    this.host = host
    this.selectedItem = new Subject()
  }

  public drawList(): void {
    if (this.host === null) return
    const description = document.createElement('h4')
    description.innerHTML = 'Choose your Weapon'
    this.host.appendChild(description)

    this.list = document.createElement('ul')
    this.host.appendChild(this.list)
    this.configureMyStream$().subscribe(this.displayElements)
  }

  protected abstract configureMyStream$(): Observable<ListItem>

  private displayElements = (toDisplayListItem: ListItem) => {
    toDisplayListItem.drawListItem()
    toDisplayListItem.addButtonOnClick = this.onclick
  }

  protected onclick = (event: Event): void => {
    let chosenButton: HTMLButtonElement = <HTMLButtonElement>event.target
    const parsedValueFromButton: ParsedValueFromButton =
      this.returnIDAndHpDmgFromButton(chosenButton.value)
    this.generateNext(parsedValueFromButton)
  }

  protected abstract generateNext(
    parsedValueFromButton: ParsedValueFromButton
  ): void

  private returnIDAndHpDmgFromButton(chosenButton: string) {
    let valueFromButton: Array<string> = chosenButton.split(',')
    let hp_Dmg: Array<string> =
      valueFromButton[valueFromButton.length - 1].split('.')
    valueFromButton.pop()
    let ids: Array<string> = valueFromButton
    ids.push(hp_Dmg[0])
    hp_Dmg.shift()
    return {
      hp_Dmg,
      ids,
    }
  }

  protected get uList(): HTMLUListElement {
    return this.list
  }

  protected get Host(): HTMLElement {
    return this.host
  }
  public get SelectedItem(): Subject<any> {
    return this.selectedItem
  }

  protected abstract clearList(): void
}

export default AbstractList
