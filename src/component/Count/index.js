import React from 'react'
import {observer, inject} from 'mobx-react'

@inject('countStore')
@observer
class Count extends React.Component {
  render() {
    return (
      <div>{this.props.countStore.num}</div>
    )
  }
}

export default Count