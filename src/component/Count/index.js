import React from 'react'
import { Button } from 'antd'
import { observer, inject } from 'mobx-react'
import DeleteModal from '../DeleteModal'

@inject('countStore', 'crowdStore')
@observer
class Count extends React.Component {

  directChangeNum = () => {
    this.props.countStore.num = 100
  }

  render() {
    const { count, num } = this.props.countStore
    console.log('count: ', count, num, this.props.countStore.count.list.slice(0))
    return (
      <div>
        <div>{this.props.countStore.num}</div>
        <DeleteModal />
        {/* <Button type="primary" onClick={this.directChangeNum}>直接改变num</Button> */}
        <Button type="primary" onClick={() => this.props.crowdStore.changeDeleteVisible(true)}>hahah</Button>
      </div>
    )
  }
}

export default Count