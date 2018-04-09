import React from 'react'
import {Button} from 'antd'
import {observer, inject} from 'mobx-react'

@inject('countStore')
@observer
class Count extends React.Component {

  directChangeNum = () => {
    this.props.countStore.num = 100
  }
  render() {
    return (
      <div>
        <div>{this.props.countStore.num}</div>
        <Button type="primary" onClick={this.directChangeNum}>直接改变num</Button>
      </div>
    )
  }
}

export default Count