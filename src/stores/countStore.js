import { observable, action, configure } from 'mobx'
configure({ enforceActions: true })

class CountStore {
  @observable num = 123
  @observable count = {
    list: [1, 2, 4, 5],
    name: '1234'
  }

  @action setNum = (value) => {
    this.num = value
  }
}

const countStore = new CountStore()

export default countStore