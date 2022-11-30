import React, { useState, useEffect } from 'react';
import {FlatList, ScrollView, View, StyleSheet, SafeAreaView, Text, TextInput, Button, TouchableOpacity} from 'react-native';
import './global';
import * as Crypto from 'expo-crypto';

/* Web3 インストール方法:  https://github.com/abcoathup/expo-web3 */
export default function App() {
    // web3インスタンスの作成
    const Web3 = require('web3');
    const provider = 'https://mainnet.infura.io/v3/bdc0b085953b453aa824a95288492245'
    web3Provider = new Web3.providers.HttpProvider(provider);
    const web3 = new Web3(web3Provider);
    // デバッグ用
    // web3.eth.getBlockNumber().then(console.log) 
    // useStateを利用した変数の宣言
    const [blockNumber, setBlockNumber] = useState([]);
    const [miner, checkMiner] = useState([]);
    const [text, onChangeText] = React.useState(null);
    const [number, onChangeNumber] = React.useState(null);
    // Cryptoのインストール
    Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256,'seike').then(console.log);
    // 副作用
    useEffect(() => {
	fetchBlockNumber();
    }, [blockNumber]); // 空配列を渡すと、初回マウント時にのみ実行
    // ブロック高を取得する関数
    const fetchBlockNumber = async () => {
	try {
	    const response = await web3.eth.getBlockNumber();
	    setBlockNumber(response);
	} catch (error) {
	    console.error(error);
	}
    }
    // SecureStore: https://docs.expo.dev/versions/latest/sdk/crypto/
    // SecureRandom: https://docs.expo.dev/versions/latest/sdk/random/ 
    //<SafeAreaView style={styles.itemContainer}>
    //	</SafeAreaView>
    /* レンダリング部分 */
    return (
	<SafeAreaView style={styles.itemContainer}>
	    <Text style={{fontSize: 32, color: "blue"}} onPress={async () => {setBlockNumber()}}>•ブロック高を取得: </Text>
	    <Text style={styles.text}>{ blockNumber }</Text>
	    <TextInput
		style={styles.input}
		onChangeText={onChangeText}
		value={text}
		placeholder="useless placeholder"
		keyboardType="text"
	    />
	    <TextInput
		style={styles.input}
		onChangeText={onChangeNumber}
		value={number}
		placeholder="useless placeholder"
		keyboardType="numeric"
	    />
	</SafeAreaView>
    );
}

const styles = StyleSheet.create({
  itemContainer: {
    height: 80,
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
