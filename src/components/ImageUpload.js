import React from 'react';
import {AppRegistry, View, Text, StyleSheet, Button, Image, TouchableHighlight, Dimensions} from 'react-native';
import FontAwesome, {SolidIcons, RegularIcons, BrandIcons} from 'react-native-fontawesome';
import Icon from 'react-native-vector-icons/FontAwesome';
import ImagePicker from "react-native-image-picker";
import EditUpload from './EditUpload.js';

class ImageUpload extends React.Component {
    state ={
        photo: null,
        // show: false,
    }
    capturePhoto=()=>{
        console.log('bro')
        const options = {
            // noData: true,
        }
        ImagePicker.launchCamera(options,response => {//launchCamera or launchImageLibrary
            console.log("response",response);
            if(response.uri){
                this.setState({photo: response})
            }
        })
    }
    uploadPhoto=()=>{
        console.log('bro')
        const options = {
            // noData: true,
        }
        ImagePicker.launchImageLibrary(options,response => {//launchCamera or launchImageLibrary
            console.log("response",response);
            if(response.uri){
                this.setState({photo: response})
            }
        })
    }
    // changePage=()=>{
    //     console.log('Its hereeeee1')
    //     this.setState({show: true})
    // }
    render(){
        const { photo }= this.state;
        console.log('yon', photo)
        return(
            <View>
                {
                    !!photo ?
                    (<EditUpload photo={photo}/>)
                    :
                    (<View style={styles.container}>
                        {/* {photo &&
                            (<Image
                                source={{uri: photo.uri}}
                                style={{width: 300, height: 300}}
                                // style={styles.img}
                            />)
                        } */}
                        {/* <Text>Yo! swadup!!</Text> */}
                        {/* <Button
                            title="Capture"
                            onPress={this.capturePhoto}
                        /> */}
                        <Text style={styles.mainTitle}>Student Verification</Text>
                        <Icon name="camera" size={120} color="#900" onPress={this.capturePhoto} style={{marginBottom: 20, top: -20}}/>
                        <Icon name="image" size={120} color="#900" onPress={this.uploadPhoto} style={{marginTop: 20}}/>

                        {/* </Button> */}
                        {/* <Button
                            title="Upload"
                            onPress={this.uploadPhoto}
                        /> */}
                        {/* <FontAwesome icon={SolidIcons.smile} />
                        <FontAwesome icon={RegularIcons.smileWink} />
                        <FontAwesome icon={BrandIcons.github} /> */}
                    </View>)
                }
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
    img: {
        width: '300',
        height: '300',
    },
    mainTitle: {
        fontSize: 40,
        color: '#900',
        fontWeight: 'bold',
        top: -110,
    }
    // uploadIcon: {
    //     marginTop: '100px';
    // },
  });


export default ImageUpload;