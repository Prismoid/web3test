## Expo(React Native)でのWeb3導入方法

1. Expoのアプリを作成
```
expo init
```

2. node-libs-browser をインストール
```
npm install --save node-libs-browser
```

3. rn-cli.config.js を作成し、以下のように記述する
```
const nodeLibs = require('node-libs-browser');

module.exports = {
  resolver: {
    extraNodeModules: nodeLibs
  }
};
```

4. global.js を作成し、以下のように記述する
```
// Inject node globals into React Native global scope.
global.Buffer = require('buffer').Buffer;
global.process = require('process');

if (typeof btoa === 'undefined') {
  global.btoa = function (str) {
    return new Buffer(str, 'binary').toString('base64');
  };
}

if (typeof atob === 'undefined') {
  global.atob = function (b64Encoded) {
    return new Buffer(b64Encoded, 'base64').toString('binary');
  };
}
```

5. App.js ファイル内で、global.js をインポートする
```
import './global';
```

npm で install web3.js ライブラリをインストール
```
npm install --save web3
```

App.js 内で Web3 ライブラリーを使用可能に
```
const Web3 = require('web3');
```

6. 使用例: 最新のブロックを取得
```
componentWillMount() {
  const web3 = new Web3(
    new Web3.providers.HttpProvider('https://mainnet.infura.io/')
  );
  web3.eth.getBlock('latest').then(console.log)
}
```
最新のブロック高を取得
```
web3.eth.getBlockNumber().then(console.log) 
```

## Expoのプロジェクト作成について
```
npx create-expo-app my-app
cd my-app
npx expo start # アプリ開発用サーバーの起動
```


## 参考
1. Expo (React Native) and Web3.js

https://github.com/abcoathup/expo-web3/blob/master/README.md

2. Web3.js のドキュメント(web3.ethの使い方)

https://web3js.readthedocs.io/en/v1.2.11/web3-eth.html

3. Expo: Initializing the project
https://docs.expo.dev/get-started/create-a-new-app/