import {observable, action, computed, configure} from 'mobx'
configure({enforceActions: true})

class HomeStore {
  @observable name = 'testname'
  @observable time = {
    now: new Date()
  }
  @computed get getTimeToString() {
    return this
      .time
      .now
      .toString()
  }

  @action setName = (value) => {
    this.name = value
  }

  @action changeTime = () => {
    this.time.now = new Date()
  }

}

const homeStore = new HomeStore()

export default homeStore