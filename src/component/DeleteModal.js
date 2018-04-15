import React from 'react'
import { Modal, Checkbox } from 'antd'
import { observer, inject } from 'mobx-react'


const modal = ({ deleteModalStore, changeDeleteVisible }) => {

  function handleOk(e) {
    console.log(e);
    changeDeleteVisible(false)
  }
  function handleCancel(e) {
    console.log(e);
    changeDeleteVisible(false)
  }

  return (<div>
    <Modal
      title="删除数据源"
      visible={deleteModalStore.visible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <p>无法删除！！！！</p>
    </Modal>
  </div>);
}

const DeleteModal = inject(
  stores => ({
    deleteModalStore: stores.crowdStore.deleteModalStore,
    changeDeleteVisible: stores.crowdStore.changeDeleteVisible
  })
)(observer(modal))

export default DeleteModal