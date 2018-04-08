# react-mobx-template模板项目搭建

## 技术栈

- react

- mobx

- less

- antd

  ​



## 步骤

### add react+antd+less

1. 脚手架工具 `create-react-app` 

   ```
   cnpm i -g create-react-app
   create-react-app react-mobx-template
   // 最新的create-react-app 已经会在创建项目的时候自动yarn依赖了，如果脚手架版本比较旧，那就手动cnpm i
   cd react-mobx-template
   npm start
   ```

2. 需要继续添加webpack的配置

   ```
   // 添加自定义配置，如less等
   npm run eject
   // 执行这个命令之后多了 script 和 config 目录
   ```

3. 添加less 支持

   ```
   cnpm install --save-dev less less-loader
   ```

   接着对`config/webpack.config.dev.js` 和 `config/webpack.config.prod.js`进行修改，添加less编译器

   ```
             {
               test: /\.(css|less)$/,
               use: [
                 require.resolve('style-loader'), {
                   loader: require.resolve('css-loader'),
                   options: {
                     importLoaders: 1
                   }
                 }, {
                   loader: require.resolve('postcss-loader'),
                   options: {
                     // Necessary for external CSS imports to work
                     // https://github.com/facebookincubator/create-react-app/issues/2677
                     ident: 'postcss',
                     plugins: () => [
                       require('postcss-flexbugs-fixes'),
                       autoprefixer({
                         browsers: [
                           '>1%', 'last 4 versions', 'Firefox ESR', 'not ie < 9', // React doesn't support IE8 anyway
                         ],
                         flexbox: 'no-2009'
                       })
                     ]
                   }
                 },
                 // mrj add
                 {
                   loader: require.resolve('less-loader')
                 }
               ]
             },
   ```

   检验一下是否添加成功。

   在src目录下新建component存放组件，新建Home 文件夹，index.js 和 index.less

   ```
   // index.js
   import React from 'react'
   import './index.less'

   const Home = () => {
       return(
           <div className='Home'>
               <div>react demo</div>
               <div>react demo</div>
               <div>react demo</div>
           </div>

       );
   }

   export default Home
      //index.less
   .Home {
     background: beige;
     display: flex;
     flex-direction: column;
     justify-content: flex-start;
     align-items: flex-end;
   }
   ```
   修改`App.js`:
   ```
   import React, { Component } from 'react';
   import logo from './logo.svg';
   import './App.css'
   import Home from './component/Home'

   class App extends Component {
     render() {
       return (
         <div className="App">
           <Home />
         </div>
       );
     }
   }

   export default App;
   ```

   打开浏览器查看less是否生效。

4. 引入antd， 并添加按需加载配置。

   ```
   cnpm install --save antd
   cnpm install babel-plugin-import --save-dev
   ```

   修改配置文件（按需加载）：

   ```
   //webpack.config.dev.js

             {
               test: /\.(js|jsx|mjs)$/,
               include: paths.appSrc,
               loader: require.resolve('babel-loader'),
               options: {
    
                 // This is a feature of `babel-loader` for webpack (not Babel itself). It
                 // enables caching results in ./node_modules/.cache/babel-loader/ directory for
                 // faster rebuilds.
                 cacheDirectory: true,
                 // antd 按需加载
                 plugins: [
                   [
                     "import", {
                       "libraryName": "antd",
                       "style": true
                     }
                   ]
                 ]
               }
             },

   //webpack.config.prod.js
             {
               test: /\.(js|jsx|mjs)$/,
               include: paths.appSrc,
               loader: require.resolve('babel-loader'),
               options: {
                 compact: true,
                 // antd 按需加载
                 plugins: [
                   [
                     "import", {
                       "libraryName": "antd",
                       "style": true
                     }
                   ]
                 ]
               }
             },
   ```

   检查一下是否配置成功。

   ```
   // index.js
   import React from 'react'
   import './index.less'
   import {Button} from 'antd'

   const Home = () => {
       return (
           <div className='Home'>
               <Button type="primary">antd Button</Button>
               <Button type="primary">antd Button</Button>
               <Button type="primary">antd Button</Button>
               <Button type="primary">antd Button</Button>
           </div>
    
       );
   }

   export default Home
   ```

   结果报错了：

   ```
   ./node_modules/_antd@3.4.0@antd/lib/button/style/index.less
   Module build failed: 

   // https://github.com/ant-design/ant-motion/issues/44
   .bezierEasingMixin();
   ^
   Inline JavaScript is not enabled. Is it set in your options?
         in F:\kaiyuan\react\react-mobx-template\node_modules\_antd@3.4.0@antd\lib\style\color\bezierEasing.less (line 110, column 0)
   ```

   查询资料之后发现如果 package.json里less是不是3.x或者3.x以上的话，less-loader还需要加个options

   ```
   { loader: 'less-loader', options: { javascriptEnabled: true } }
   ```

   问题就解决啦，antd 引入成功~


### add mobx

1. 安装 mobx,mobx-react

   ```
   cnpm i --save mobx mobx-react
   ```

2. 安装装饰器所需的babel插件并配置

   ```
   cnpm i babel-plugin-transform-decorators-legacy -D
   ```

   在`package.json`中 或者 建立`.babelrc`文件, 或者在webpack配置中都可以配置`babel`配置（`presets`和 `plugins`）:

   ```
     "babel": {
       "plugins": [
         "transform-decorators-legacy"
       ],
       "presets": [
         "react-app"
       ]
     },
   ```

   安装了这个之后才能使用装饰器。

3. 下面来检查一下是否有问题：

   1. 建立store文件：

      ```
      mkdir src/stores
      touch src/stores/index.js
      touch src/stores/homeStore.js
      ```

   2. 添加`homeStore.js`如下内容：

      ```
      import {observable, action, computed} from 'mobx'

      class HomeStore {
        @observable name = 'testname'
        @observable time = {
          now: new Date()
        }
        @computed get getTimeToString() {
          return this
            .time
            .now
            .toString()
        }

        @action setName = (value) => {
          this.name = value
        }

        @action changeTime = () => {
          this.time.now = new Date()
        }

      }

      const homeStore = new HomeStore()

      export default homeStore
      ```

   3. 添加`index.js` 和 `index.less`如下内容：

      ```
      // index.js
      import HomeStore from './homeStore'

      const stores = {
        HomeStore
      }

      export default stores

      // index.less
      .Home {
          background: beige;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-content: center;
          .buttons {
            display: flex;
            flex-direction: row;
            margin-top: 20px;
            .btn {
              margin: 0 10px;
            }
          }
        }
        
      ```

      ​

   4. 使用`provider`和`inject`渗透`store`, 修改`App.js`:

      ```
      import React, {Component} from 'react';
      import {Provider} from 'mobx';
      import './App.css';
      import Home from './component/Home'
      import stores from './stores'

      class App extends Component {
        render() {
          return (
            <Provider {...stores}>
              <div className="App">
                <Home/>
              </div>
            </Provider>
          );
        }
      }

      export default App;
      ```

   5. 尽情使用`store`吧：

      ```
      // home文件加中的index.js
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
      ```

      ```
      // 新建的一个count组件，不使用无状态组件创建，注意与home组件写法上的不同。
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
      ```

   6. 注意到`homeSTore.js`文件内有很多红线警告，虽然这不影响项目，但是看着真的非常难受，[移除vscode装饰器报错](https://blog.csdn.net/greekmrzzj/article/details/79842657)

   7. 安装MobX Developer Tools插件有助于调试~


