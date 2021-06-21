import { from, Observable, zip, empty } from 'rxjs'
import { map, concatAll } from 'rxjs/operators'
import Ability from '../models/ability'
import Race from '../models/race'
import Weapon from '../models/weapon'

const DB_URL: string = 'http://localhost:3000/'

function getEntityFromDB(specificEntity: string): Observable<any> {
  return from(
    fetch(DB_URL + specificEntity).then((data: Response) => data.json())
  ).pipe(concatAll())
}

function createArrayOfIdsFromData(typesOfWeapon: Array<any>): Array<string> {
  let ids: Array<string> = new Array<string>()
  ids = typesOfWeapon.map((weapon: any) => weapon.id)
  return ids
}

export function fetchRace$(): Observable<Race> {
  return getEntityFromDB('race').pipe(
    map((el: any) => {
      return new Race(
        el.id,
        el.raceName,
        el.health,
        el.damage,
        createArrayOfIdsFromData(el.typesOfWeapon)
      )
    })
  )
}

export function fetchWeapon$(ids: Array<string>): Observable<Weapon> {
  if (ids.length === 0) return empty()
  let weapons: Array<Observable<Weapon>> = ids.map((id: string) => {
    return getEntityFromDB(`weapon?id=${id}`).pipe(
      map((el: any) => {
        return new Weapon(
          el.id,
          el.weaponName,
          el.health,
          el.damage,
          createArrayOfIdsFromData(el.availableAbilities)
        )
      })
    )
  })
  return zip(...weapons).pipe(concatAll())
}

export function fetchAbilities$(ids: Array<string>): Observable<Ability> {
  if (ids === undefined || ids.length === 0) return empty()
  let abilities: Array<Observable<Ability>> = ids.map((id: string) => {
    return getEntityFromDB(`abilities?id=${id}`).pipe(
      map((el: any) => {
        return new Ability(el.id, el.abilityName, el.health, el.damage)
      })
    )
  })
  return zip(...abilities).pipe(concatAll())
}
