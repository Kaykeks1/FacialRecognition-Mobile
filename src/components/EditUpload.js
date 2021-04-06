import React from 'react';
import {AppRegistry, View, Text, StyleSheet, Button, Image, TouchableHighlight, Dimensions, Alert, ActivityIndicator} from 'react-native';
import FontAwesome, {SolidIcons, RegularIcons, BrandIcons} from 'react-native-fontawesome';
import Icon from 'react-native-vector-icons/FontAwesome';
import ImagePicker from "react-native-image-picker";
import ViewStudent from './ViewStudent.js';
import PropTypes from 'prop-types';
import ajax from '../ajax';

class EditUpload extends React.Component {
    static propTypes = {
        photo: PropTypes.object,
    }
    state ={
        photo: !!this.props.photo ? this.props.photo : null,//null
        show: false,
        data: null,
        is: {
            ok: false,
            fetching: false,
            error: false,
        },
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
    async changePage(){
        console.log('Its hereeeee');
        const { photo } = this.state;
        // var body = new FormData();
        // body.append('image', photo.data);
        const result = await this.fetchStudentInformation(photo);//const result = await ajax.fetchStudentInformation(photo);
        if (result.error){
            Alert.alert(
                'Error',
                result.error,
                [{
                    text: 'OK',
                    onPress: ()=> console.log('Clicked OK')
                }]
            )
        } else {
            this.setState({show: true, data: result})
        }
        console.log("result", result)
    }

    async fetchStudentInformation(data) {
        try {
            this.setState({is: {ok: false, fetching: true, error: false}})
            console.log('fea', data)
            const body = new FormData();
            body.append('image', data.data);
            let response = await fetch('http://Kaykeks.pythonanywhere.com/student/get',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Accept: 'application/json'
                },
                body,
            }
             );
            let responseJson = await response.json();
            this.setState({is: {ok: true, fetching: false, error: false}})
            return responseJson
         } catch(error) {
            this.setState({is: {ok: false, fetching: false, error: true}})
             console.error("error: ", error);
             return error;
         }
    }
    handleBack=()=>{
        this.setState({show: false, data: null})
    }
    render(){
        const { photo, show, is, data }= this.state;
        console.log('yo22', photo)
        console.log('type: ', typeof photo.data)
        return(
            <View>
            {   show ?
                (<ViewStudent photo={photo} data={data} goBack={this.handleBack} />)
                :
                (<View style={styles.container}>
                    {photo &&
                        (<Image
                            source={{uri: photo.uri}}
                            style={{width: 300, height: 300}}
                            // style={styles.img}
                        />)
                    }
                    <View style={styles.edit}>
                        <Text style={{marginBottom: 10, marginTop: 10}}>Do you want to change this image?</Text>
                        {/* .................... */}
                        <View style={styles.editButton}>
                            <View style={{width: 90}}>
                            <Button
                                title="Recapture"
                                onPress={this.capturePhoto}
                            />
                            </View>
                            <View style={{width: 90, position: 'absolute', marginLeft: 160}}>
                            <Button
                                title="Reupload"
                                onPress={this.uploadPhoto}
                            />
                            </View>
                        </View>
                    </View>
                    {
                        is.fetching ?
                        (<ActivityIndicator size="large" color="#900" />)
                        : null
                    }
                    <View style={{marginTop: 100}}>
                    <Button
                        title="Verify Student"
                        onPress={() => this.changePage()}
                        style={{width: 100, height: 30}}
                    />
                    </View>
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
        width: 200,
        height: 200,
    },
    edit: {
        width: 250,
        // border: '1px grey solid',
        // borderRadius: '5',
        // borderColor: 'black',
    },
    editButton: {
        // border: '1px grey solid',
        // borderRadius: '5px',
        display: 'flex',
        justifyContent: 'space-evenly',
    }
  });


export default EditUpload;