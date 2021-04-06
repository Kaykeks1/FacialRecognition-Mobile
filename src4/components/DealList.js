import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import DealItem from './DealItem';
class DealList extends Component{
    render(){
        return(
            <View style={styles.list}>
                {/* {
                    this.props.deals.map((deal)=><Text key={deal.key}>{deal.title}</Text>)
                } */}
                <FlatList 
                    data={this.props.deals}
                    renderItem={({item, index})=><DealItem deal={item} onPress={this.props.onItemPress} index={index} />}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    list: {
        backgroundColor: '#eee',
        // flex: 1,
        width: '100%',
        // paddingTop: 50,
    },
})

export default DealList;