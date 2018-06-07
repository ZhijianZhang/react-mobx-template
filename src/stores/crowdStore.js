import { observable, action, configure } from 'mobx'
configure({ enforceActions: true })

class CrowdStore {
  @observable deleteModalStore = {
    visible: false,
    testList: [1, 2, 3, 5]
  }

  // deleteModal
  @action changeDeleteVisible = (bool) => {
    this.deleteModalStore.visible = typeof bool === 'boolean' ? bool : false
  }

}

export default new CrowdStore()