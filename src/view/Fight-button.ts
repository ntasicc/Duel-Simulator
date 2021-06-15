import { combineLatest, forkJoin, from, Observable, Subject, zip } from 'rxjs'

class FightButton {
  private fighterOne: Observable<string>
  private fighterTwo: Observable<string>

  constructor(f1: Subject<string>, f2: Subject<string>) {
    this.fighterOne = from(f1)
    this.fighterTwo = from(f2)
    this.fighterOne.subscribe((el) => console.log(el))
    this.fighterTwo.subscribe((el) => console.log(el))
  }

  public readyToFight() {
    console.log(this.fighterOne)
    combineLatest([this.fighterOne, this.fighterTwo]).subscribe(
      this.enableButton
    )
  }

  private enableButton() {
    const btn: HTMLButtonElement = document.body.querySelector('.FIGHT')
    btn.disabled = false
  }
}

export default FightButton
