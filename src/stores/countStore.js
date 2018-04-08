import {observable, action} from 'mobx'

class CountStore {
  @observable num = 123

  @action setNum = (value) => {
    this.num = value
  }
}

const countStore = new CountStore()

export default countStore