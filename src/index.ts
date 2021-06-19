import { from, Observable, Subject } from 'rxjs'
import FightButton from './view/Fight-button'
import FightSimulatorView from './view/Fight-simulator-view'

const view: FightSimulatorView = new FightSimulatorView()

view.drawView()

const view1: FightSimulatorView = new FightSimulatorView()

view1.drawView()

const btn: FightButton = new FightButton(
  view.fighterIsReady,
  view1.fighterIsReady
)
btn.drawButton()
