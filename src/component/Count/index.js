import React from 'react'
import { Button } from 'antd'
import { observer, inject } from 'mobx-react'
import DeleteModal from '../DeleteModal'
import { getTest, getTest2, getTest3, getTest4 } from '../../apis/test'

@inject('countStore', 'crowdStore')
@observer
class Count extends React.Component {

  async componentDidMount() {

    const resp2 = await getTest2();
    const resp3 = await getTest3();
    const resp4 = await getTest4();
    const resp = await getTest();
    console.log('resp', resp)
    console.log('resp', resp2)
    console.log('resp', resp3)
    console.log('resp', resp4)
  }

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