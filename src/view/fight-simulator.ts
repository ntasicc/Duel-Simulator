import { combineLatest, forkJoin, from, Observable, Subject, zip } from 'rxjs'

class FightSimulator {
  private fighterOne: Observable<any>
  private fighterTwo: Observable<any>
  private buttonForFight: HTMLButtonElement
  private hp1: number
  private hp2: number
  private dmg1: number
  private dmg2: number
  constructor(f1: Subject<any>, f2: Subject<any>) {
    this.fighterOne = from(f1)
    this.fighterTwo = from(f2)
  }

  public waitingForFighters() {
    this.readyToFight().subscribe((x) => {
      this.hp1 = Number(x[0].hp)
      this.hp2 = Number(x[1].hp)
      this.dmg1 = Number(x[0].dmg)
      this.dmg2 = Number(x[1].dmg)
      if (
        Number(x[0].hp) / Number(x[1].dmg) >
        Number(x[1].hp) / Number(x[0].dmg)
      )
        console.log('fighter one has won')
      else console.log('fighter two has won')
    })
  }

  public readyToFight(): Observable<any> {
    return combineLatest([this.fighterOne, this.fighterTwo])
  }
}

export default FightSimulator
