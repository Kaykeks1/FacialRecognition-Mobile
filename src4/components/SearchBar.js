import React, {Component} from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import debounce from 'lodash.debounce'

class SearchInput extends Component{
    state={
        searchTerm: '',
    }
    debouncedSearchDeals=debounce(this.props.searchDeals, 300)
    handleChange=(value)=>{
        this.setState({searchTerm: value}, ()=>{
            this.debouncedSearchDeals(this.state.searchTerm)
        })
    }
    render(){
        return(
            <TextInput 
                placeholder="Search"
                style={styles.search}
                onChangeText={this.handleChange}
            />
        )
    }
}

const styles = StyleSheet.create({
    search: {
        height: 40,
        marginHorizontal: 12,
    },
})

export default SearchInput;