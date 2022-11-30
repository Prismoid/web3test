import React, { useState, useEffect } from 'react';
import { View, StyleSheet, SafeAreaView, Text, TextInput } from 'react-native';
import './global';
// import * as Crypto from 'expo-crypto';


// Web3 インストール方法:  https://github.com/abcoathup/expo-web3
export default function App() {
    // web3インスタンスの作成
    const Web3 = require('web3');
    const provider = 'https://mainnet.infura.io/v3/bdc0b085953b453aa824a95288492245';
    web3Provider = new Web3.providers.HttpProvider(provider);
    const web3 = new Web3(web3Provider);

    // useStateを利用した変数の宣言
    const [blockNumber, setBlockNumber] = useState([]);
    const [block, setBlock] = useState([]);
    const [blockHash, setBlockHash] = useState([]);
    const [txNum, setTxNum] = useState([]);
    const [usageRate, setUsageRate] = useState([]);
    const [baseFee, setBaseFee] = useState([]);
    const [text, onChangeText] = React.useState(null);
    const [number, onChangeNumber] = React.useState(10000000);

    // Cryptoのインストール
    // Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256,'seike').then(console.log);

    //---------------------------------------------------//
    // web3でブロックチェーンのデータを取得する関数群
    //---------------------------------------------------//
    // 現在のブロック高を取得
    const fetchBlockNumber = async () => {
	try {
	    const response = await web3.eth.getBlockNumber();
	    setBlockNumber(response);
	} catch (error) {
	    console.error(error);
	}}
    // 指定した番号のブロックを取得
    const fetchBlock = async (_blockNumber=number) => {
	try {
	    const response = await web3.eth.getBlock(_blockNumber);
	    console.log(response);
	    setBlockHash(response["hash"]);
	    setTxNum(response["transactions"].length);
	    setUsageRate(response["gasUsed"] / response["gasRatio"]);
	    setBaseFee(response["baseFeePerGas"] / 1000 / 1000 / 1000);
	} catch (error) {
	    console.error(error);
	}}
    
    // パラメータ更新時の処理
    useEffect(() => { fetchBlockNumber(); }, [blockNumber]); // 空配列を渡すと、初回マウント時にのみ実行
    useEffect(() => { fetchBlock(); }, [block, blockHash, txNum, baseFee]); // 空配列を渡すと、初回マウント時にのみ実行

    // SecureStore: https://docs.expo.dev/versions/latest/sdk/crypto/
    // SecureRandom: https://docs.expo.dev/versions/latest/sdk/random/ 
    //<SafeAreaView style={styles.itemContainer}>
    //	</SafeAreaView>
    /* レンダリング部分 */
    return (
	<SafeAreaView style={styles.itemContainer}>
	    <Text style={{fontSize: 32, color: "blue"}} onPress={async () => {setBlockNumber()}}>-> ブロック高を取得: </Text>
	    <Text style={styles.text}>{ blockNumber }</Text>
	    <View style={{ flexDirection: 'row'}}>
		<Text style={{fontSize: 32, color: "blue"}} onPress={async () => {setBlock(number); }}>-> 指定したブロックを取得: </Text>
		<TextInput
		    style={styles.input}
		    mode="outlined"
		    muiltiline
		    onChangeText={onChangeNumber}
		    value={number}
		    placeholder="10000000"
		    keyboardType="numeric"
		/>
	    </View>
	    <Text style={styles.text}>--- ブロックハッシュ --- { blockHash }</Text>
	    <Text style={styles.text}>--- 含んでいるトランザクション数 ---{"\n"} { txNum }</Text>
	    <Text style={styles.text}>--- GAS使用率 ---{"\n"} { txNum }</Text>
	    <Text style={styles.text}>--- ベースとなる手数料 (12,965,000以降のみ) --- {"\n"} { baseFee } GWei </Text>
	</SafeAreaView>
    );
}

const styles = StyleSheet.create({
  itemContainer: {
    width: '100%',
    flexDirection: 'column',
  },
  leftContainer: {
      fontSize: 32,
  },
  rightContainer: {
    flex: 1,
    padding: 10,
    justifyContent: 'space-between',
    fontSize: 32,  
  },
  text: {
    fontSize: 32,
  },
  subText: {
    fontSize: 12,
    color: 'gray',
  },
  input: {
      fontSize: 32, 
  }, 
});
/*
const styles = StyleSheet.create({
    container: {
	flex: 1,
	backgroundColor: 'white',
	fontSize: 16, 
    },
    button: {
	justifyContent: 'left',
	paddingVertical: 12,
	paddingHorizontal: 32,
	borderRadius: 4,
	elevation: 3,
	backgroundColor: 'blue',
	fontSize: 16, 
    },
    text: {
	fontSize: 16,
	lineHeight: 21,
	fontWeight: 'bold',
	letterSpacing: 0.25,
	color: 'white',
    },
});
*/
