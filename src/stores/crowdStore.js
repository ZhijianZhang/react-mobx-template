import { observable, action, configure } from 'mobx'
configure({ enforceActions: true })

class CrowdStore {
  @observable deleteModalStore = {
    visible: false
  }

  // deleteModal
  @action changeDeleteVisible = (bool) => {
    this.deleteModalStore.visible = typeof bool === 'boolean' ? bool : false
  }

}

export default new CrowdStore()