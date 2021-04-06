import React from 'react';
import {AppRegistry, View, Text, StyleSheet, Button, Image, TouchableHighlight, Dimensions} from 'react-native';
import FontAwesome, {SolidIcons, RegularIcons, BrandIcons} from 'react-native-fontawesome';
import Icon from 'react-native-vector-icons/FontAwesome';
import PropTypes from 'prop-types';

class ViewStudent extends React.Component {
    // state ={
    //     photo: null,
    // }
    static propTypes = {
        photo: PropTypes.object,
    };
    render(){
        const { photo, data }= this.props;
        console.log('yon3', photo)
        console.log(data)
        return(
            <View style={styles.container}>
                <View style={styles.back}>
                    <Button
                        title="Back"
                        onPress={this.props.goBack}
                    />
                </View>
                {photo &&
                    (<Image
                        source={{uri: photo.uri}}
                        // style={{width: 300, height: 300}}
                        style={styles.img}
                    />)
                }
                <View style={styles.information}>
                    <Text style={styles.nameTitle}>{data.lastName} {data.firstName}</Text>
                    <View>
                        <Text style={styles.TextItem}><Text style={styles.textTitle}>Matric no:</Text> {data.matricNo}</Text>
                        <Text style={styles.TextItem}><Text style={styles.textTitle}>Programme:</Text> {data.Programme}</Text>
                        <Text style={styles.TextItem}><Text style={styles.textTitle}>Gender:</Text> {data.Gender}</Text>
                        <Text style={styles.TextItem}><Text style={styles.textTitle}>DOB:</Text> {data.DOB}</Text>
                        <Text style={styles.TextItem}><Text style={styles.textTitle}>Email:</Text> {data.Email}</Text>
                        <Text style={styles.TextItem}><Text style={styles.textTitle}>Phone:</Text> {data.Phone}</Text>
                    </View>
                </View>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    //   justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#dde',//F5FCFF
    },
    back: {
        marginTop: 10,
        marginRight: 250,
        // float: 'right',
    },
    img: {
        width: 300,
        height: 300,
        marginTop: 10,
        // borderRadius: '50%',
    },
    information: {
        marginTop: 35,
    },
    nameTitle:{
        fontSize: 25,
        marginBottom: 10,
        fontWeight: 'bold',
    },
    TextItem: {
        borderBottomWidth: 1,
        fontSize: 20,
    },
    textTitle: {
        fontWeight: 'bold',
    }
    // uploadIcon: {
    //     marginTop: '100px';
    // },
  });


export default ViewStudent;