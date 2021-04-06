import React, { Component } from 'react';
import { View, Text, Animated, Easing, Dimensions, PanResponder, StyleSheet } from 'react-native';
import ajax from './ajax';
import DealList from './components/DealList';
import DealDetail from './components/DealDetail';
import SearchBar from './components/SearchBar';
class App extends Component{
    titleXpos = new Animated.Value(0)
    dealDetailXPos = new Animated.Value(0)
    dealDetailPanResponder = PanResponder.create({
        onStartShouldSetPanResponder: ()=> true,
        onPanResponderMove: (evt, gs)=>{
            if (Math.abs(gs.dx) > this.width * 0.2) {
                this.dealDetailXPos.setValue(gs.dx)
                console.log("Moving", gs.dx)
            }
        },
        onPanResponderRelease: (evt, gs)=>{
            this.width = Dimensions.get('window').width
            if(Math.abs(gs.dx) > this.width * 0.4){
                console.log("Release", gs.dx," : ", this.width * 0.4)
                const direction = Math.sign(gs.dx)
                //direction is -1 if gs.dx is negative(swipe left) and +1 if gs.dx is positive(swipe right)
                Animated.timing(
                    this.dealDetailXPos,
                    {
                        toValue: direction*this.width,
                        duration: 250,
                    }
                ).start(()=>this.handleSwipe(direction*-1))
            } else {
                Animated.spring(
                    this.dealDetailXPos,
                    {
                        toValue: 0,
                    }
                ).start()
            }
            // this.dealDetailXPos.setValue(0)
            console.log("Release")
        }
    })
    state = {
        deals: [],
        searchedDeals: [],
        currentId: null,
        dealIndex: 0
    }
    animatedTitle =(direction=1)=>{
        const width = Dimensions.get('window').width-150
        Animated.timing(
            this.titleXpos,
            {
                toValue: width/2 * direction,
                duration: 1000,
                easing: Easing.ease,
            }
        ).start(({finished})=>{
            if(finished){
                this.animatedTitle(-1*direction)
            }
        })
    }
    
    async componentDidMount(){
        this.animatedTitle()
        const data = await ajax.fetchInitialDeals()
        this.setState({deals: data})
        // console.log(deals)
    }

    searchDeals = async (searchTerm)=>{
        console.log(searchTerm)
        let searchedDeals= []
        if(searchTerm){
            searchedDeals = await ajax.fetchSearchTerm(searchTerm);
        }
        this.setState({searchedDeals: searchedDeals})
    }

    // clearSearch=()=>{
    //     this.setState({searchedDeals: []})
    // }

    setCurrentDeal=(dealId, index)=>{
        console.log('hey', index)
        this.setState({currentId: dealId, dealIndex: index});
    }

    // unSetCurrentDeal=()=>{
    //     console.log('hey')
    //     this.setState({currentId: null});
    // }
    deal=null
    currentDeal=()=>{
        const {deals, currentId} = this.state;
        console.log(this.state)
        // const index = deals.findIndex((item)=>item.key === currentId)
        // this.setState({dealIndex: index})
        this.deal= deals.find((item)=>item.key === currentId)
        // return deals.find((item)=>item.key === currentId)

    }

    handleSwipe= (direction)=>{
        console.log('got here')
        if(!this.state.deals[this.state.dealIndex + direction]){
            Animated.spring(
                this.dealDetailXPos,
                {
                    toValue: 0,
                }
            ).start()
            return;
        }
        this.setState((prevState)=>({
            dealIndex: prevState.dealIndex + direction,
            currentId: prevState.deals[prevState.dealIndex + direction].key
        }), ()=> {
            console.log(this.state.dealIndex, " ::: ", this.state.currentId)
            const {deals, currentId} = this.state;
            this.deal= deals.find((item)=>item.key === currentId)
            console.log(" deal ", this.deal)

        })
        this.dealDetailXPos.setValue(this.width*direction)
        Animated.spring(
            this.dealDetailXPos,
            {
                toValue: 0,
            }
        ).start()
    }
    render(){
        // console.log(this.state)
        if(this.state.currentId){
            return (
                <View style={styles.main}>
                    <DealDetail call={this.currentDeal()} onBack={this.setCurrentDeal} Handlers={this.dealDetailPanResponder.panHandlers} leftCSS={this.dealDetailXPos} deal={this.deal} />
                </View>
            )
        }
        const dealsToDisplay = this.state.searchedDeals.length>0 ? this.state.searchedDeals : this.state.deals
        if(dealsToDisplay.length > 0 ){
            return (
                <View style={styles.main}>
                    <SearchBar searchDeals={this.searchDeals} />
                    <DealList deals={dealsToDisplay} onItemPress={this.setCurrentDeal} />
                </View>
            )
        }
        return(
            <Animated.View style={[{left: this.titleXpos}, styles.container]}>
                <Text style={styles.header}>Bakesale</Text>
            </Animated.View>
        );
    }
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        paddingTop: 12,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        fontSize: 40,
    },
})

export default App;