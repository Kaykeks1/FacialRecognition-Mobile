import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, PanResponder, Animated, Dimensions, Button, Linking, ScrollView, StyleSheet } from 'react-native';
import { priceDisplay } from '../utils';
import ajax from '../ajax';

class DealDetail extends Component{
    imageXPos = new Animated.Value(0)
    imagePanResponder = PanResponder.create({
        onStartShouldSetPanResponder: ()=> true,
        onPanResponderMove: (evt, gs)=>{
            this.imageXPos.setValue(gs.dx)
            console.log("Moving", gs.dx)
        },
        onPanResponderRelease: (evt, gs)=>{
            this.width = Dimensions.get('window').width
            if(Math.abs(gs.dx) > this.width * 0.4){
                console.log("Release", gs.dx," : ", this.width * 0.4)
                const direction = Math.sign(gs.dx)
                //direction is -1 if gs.dx is negative(swipe left) and +1 if gs.dx is positive(swipe right)
                Animated.timing(
                    this.imageXPos,
                    {
                        toValue: direction*this.width,
                        duration: 250,
                    }
                ).start(()=>this.handleSwipe(direction*-1))
            } else {
                Animated.spring(
                    this.imageXPos,
                    {
                        toValue: 0,
                    }
                ).start()
            }
            // this.imageXPos.setValue(0)
            console.log("Release")
        }
    })
    state={
        deal: this.props.deal,
        imageIndex: 0,
    }
    async componentDidMount(){
        const data = await ajax.fetchDealDetail(this.props.deal.key)
        this.setState({deal: data})
    }
    async componentDidUpdate(nextProps){
        console.log(nextProps.deal.key, "yo",this.props.deal.key)
        if(nextProps.deal.key!==this.props.deal.key){
            console.log('hey-yo')
            const data = await ajax.fetchDealDetail(this.props.deal.key)
            this.setState({deal: data})
        }
    }
    handleSwipe= (direction)=>{
        if(!this.state.deal.media[this.state.imageIndex + direction]){
            Animated.spring(
                this.imageXPos,
                {
                    toValue: 0,
                }
            ).start()
            return;
        }
        this.setState((prevState)=>({
            imageIndex: prevState.imageIndex + direction
        }))
        this.imageXPos.setValue(this.width*direction)
        Animated.spring(
            this.imageXPos,
            {
                toValue: 0,
            }
        ).start()
    }
    openURL =()=>{
        Linking.openURL(this.state.deal.url)
    }
    render(){
        console.log(this.state)
        console.log(this.props.deal)
        const { deal } = this.state;
        return(
            <Animated.ScrollView style={[{left: this.props.leftCSS}, styles.deals]}>
                <TouchableOpacity onPress={()=>this.props.onBack(null)}>
                    <Text style={styles.backLink}>Back</Text>
                </TouchableOpacity>
                <Animated.Image 
                    {...this.imagePanResponder.panHandlers}
                    source={{uri: deal.media[this.state.imageIndex]}}
                    style={[{left: this.imageXPos}, styles.image]}
                />
                <Animated.View {...this.props.Handlers}>
                    <View style={styles.info}>
                        <Text style={styles.title}>{deal.title}</Text>
                        <View style={styles.footer}>
                            <View style={styles.price_cause}>
                                <Text style={styles.price}>{priceDisplay(deal.price)}</Text>
                                <Text style={styles.cause}>{deal.cause.name}</Text>
                            </View>
                            {
                                deal.user &&
                                <View style={styles.user}>
                                    <Image source={{uri: deal.user.avatar}} style={styles.avatar} />
                                    <Text>{deal.user.name}</Text>
                                </View>
                            }
                        </View>
                        <View style={styles.description}>
                            <Text>{deal.description}</Text>
                        </View>
                        <Button title="Buy this deal" onPress={this.openURL} />
                    </View>
                </Animated.View>
            </Animated.ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    // deals: {
    //     marginHorizontal: 12,
    //     marginTop: 12,
    // },
    image: {
        width: '100%',
        height: 150,
    },
    backLink: {
        marginBottom: 5,
        color: '#22f',
        marginLeft: 10,
    },
    // info: {
    //     // padding: 10,
    //     backgroundColor: '#fff',
    //     borderColor: '#bbb',
    //     borderWidth: 1,
    //     borderTopWidth: 0,
    // },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: 15,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        padding: 10,
        backgroundColor: 'rgba(237, 149, 45, 0.4)',
        // marginBottom: 5,
    },
    price_cause: {
        alignItems: 'center'
    },
    user: {
        alignItems: 'center'
    },
    cause: {
        flex: 2,
    },
    price: {
        flex: 1,
        textAlign: 'right',
    },
    avatar: {
        width: 60,
        height: 60,
    },
    description: {
        borderColor: '#ddd',
        borderWidth: 1,
        borderStyle: 'dotted',
        margin: 10,
        padding: 10,
    },
})

export default DealDetail