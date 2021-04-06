/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TextInput, Button, Alert} from 'react-native';
// import console = require('console');

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

const onButtonClick =() =>{
  Alert.alert('Herro')
}

export default class App extends Component {
  render() {
    console.log('hey-o');
    return (
      <View style={styles.container}>
        {/* <Text style={styles.welcome}>Welcomes to React Native!</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text style={styles.instructions}>{instructions}</Text> */}

        {/* <Text style={styles.usernameLabel}>Username</Text> */}
        {/* <TextInput
          style={styles.usernameInput}  
        /> */}
        {/* <Button
          onPress={onButtonClick}
          title="Alert"
          accessibilityLabel="See an information alert"
        /> */}

        <Text style={[styles.welcome, {flex: 1}]}>Welcome 1</Text>
        <Text style={[styles.welcome, {flex: 2}]}>Welcome 22</Text>
        <Text style={[styles.welcome, {flex: 1}]}>Welcome 3</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  usernameLabel: {
    fontSize: 20,
    // textAlign: 'center',
    // margin: 10,
  },
  usernameInput: {
    fontSize: 20,
    // position: 'absolute',
    // border: '1px solid black',
  },
  container: {
    flex: 1,
    justifyContent: 'space-around',
    // alignItems: 'center',
    backgroundColor: 'orange',//F5FCFF
  },
  welcome: {
    fontSize: 20,
    // textAlign: 'center',
    margin: 10,
    backgroundColor: 'rosybrown',
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
