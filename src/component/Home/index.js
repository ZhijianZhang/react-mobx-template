import React from 'react'
import './index.less'
import {Button} from 'antd'
import {observer, inject} from 'mobx-react'

const Home = inject('homeStore')(observer(({homeStore}) => {
  const {name, time, setName, changeTime} = homeStore
  return (
    <div className='Home'>
      <div>{name}</div>
      <div>
        {time
          .now
          .toString()}
      </div>
      <div className="buttons">
        <Button className="btn" type="primary" onClick={() => setName('hahahaa')}>setName</Button>
        <Button className="btn" type="primary" onClick={() => changeTime()}>antd Button</Button>
      </div>

    </div>

  );
}))

export default Home