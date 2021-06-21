import { from, Observable, Subject } from 'rxjs'

import FightSimulator from './view/fight-simulator'
import Fighterfighter from './view/fighter-view'

const fighter1: Fighterfighter = new Fighterfighter()

fighter1.drawView()

const fighter2: Fighterfighter = new Fighterfighter()

fighter2.drawView()

const fightSimulator: FightSimulator = new FightSimulator(
  fighter1.fighterIsReady,
  fighter2.fighterIsReady
)
fightSimulator.waitingForFighters()
