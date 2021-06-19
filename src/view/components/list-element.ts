import BaseModel from '../../models/base-model'

class ListItem {
  private button: HTMLButtonElement
  private model: BaseModel
  private ul: HTMLUListElement
  constructor(ul: HTMLUListElement, model: BaseModel) {
    this.model = model
    this.button = document.createElement('button')
    this.button.innerHTML = model.Name
    this.ul = ul
  }

  public drawListItem() {
    const listItem: HTMLLIElement = document.createElement('li')
    this.ul.appendChild(listItem)
    this.button.value = this.model.valueForButton

    listItem.appendChild(this.button)
  }

  public set addButtonOnClick(action: (event: Event) => void) {
    this.button.onclick = action
  }
}

export default ListItem
