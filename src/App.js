import React from 'react';
import {AppRegistry, View, Text, StyleSheet, TouchableHighlight, Dimensions} from 'react-native';
// import Camera from 'react-native-camera';
import ImageUpload from './components/ImageUpload.js';
import EditUpload from './components/EditUpload.js';
import ViewStudent from './components/ViewStudent.js';

class Appa extends React.Component {
    render(){
        console.log('yon')
        // console.log(Camera)
        return(
            <View style={styles.container}>
                <ImageUpload />
                {/* <View style={styles.information}>
                    <Text style={{fontSize: 20, marginBottom: 10, fontWeight: 'bold'}}>Kekere-Ekun Fawaz Kayode</Text>
                    <View>
                        <Text style={{borderBottomWidth: 1}}><Text style={{fontWeight: 'bold'}}>Matric No:</Text> 150805517</Text>
                        <Text style={{borderBottomWidth: 1}}><Text style={{fontWeight: 'bold'}}>Programme:</Text> BSc in Computer Science</Text>
                        <Text style={{borderBottomWidth: 1}}><Text style={{fontWeight: 'bold'}}>Gender:</Text> Male</Text>
                        <Text style={{borderBottomWidth: 1}}><Text style={{fontWeight: 'bold'}}>DOB:</Text> 20/10/1997</Text>
                        <Text style={{borderBottomWidth: 1}}><Text style={{fontWeight: 'bold'}}>Email:</Text> kayuskeks@gmail.com</Text>
                        <Text style={{borderBottomWidth: 1}}><Text style={{fontWeight: 'bold'}}>Phone:</Text> 08088090868</Text>
                    </View>
                </View> */}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#dde',//F5FCFF
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    capture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        color: '#000',
        padding: 10,
        margin: 40
    },
    information: {
        marginTop: 50,
    }
  });

// AppRegistry.registerComponent('Appa', () => Appa);

export default Appa;