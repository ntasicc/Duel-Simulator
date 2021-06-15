import Race from '../../models/race'

class ListItem {
  private button: HTMLButtonElement
  private race: Race
  private ul: HTMLUListElement
  constructor(ul: HTMLUListElement, race: Race) {
    this.race = race
    this.button = document.createElement('button')
    this.button.innerHTML = race.Name
    this.ul = ul
  }

  public drawListItem() {
    const listItem: HTMLLIElement = document.createElement('li')
    this.ul.appendChild(listItem)
    this.button.value = this.race.valueForButton

    listItem.appendChild(this.button)
  }

  public set addButtonOnClick(action: (event: Event) => void) {
    this.button.onclick = action
  }
}

export default ListItem
