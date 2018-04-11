import React from 'react'
import Card from './Card'
import {View, TextInput, StyleSheet, Text, TouchableOpacity, FlatList, ListView, Dimensions} from 'react-native'
import { connect } from 'react-redux'
import {setScore} from '../actions/action'

 class ItemView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {score: 0}; 
    }
    correct= (index, intialScore)=>{
        if(index === 0){
            return 100
        }
        else{
            return (((index*intialScore/100) +1)/(index+1))*100
        }
    }

    wrong=(index, intialScore)=>{
        if(index === 0){
            return 0
        }
        else{
            return (((index*intialScore/100))/(index+1))*100
        }
    }
    render() {
        var {height, width} = Dimensions.get('window');
        const {item, deck, index, size, get, set} = this.props
        const intialScore =this.props.data[deck]

        return(
                <View style={{  width:width, justifyContent:'flex-start', alignItems:'center'}} >
                    <Text  style={{marginTop: 10, marginBottom:15, fontSize: 22, fontWeight: 'bold'}}>
                        {deck}
                    </Text>
                    <Text  style={{marginTop: 10, marginBottom:8, fontSize:14}}>
                        {index+1} / {size} 
                    </Text>
                    <Text style={{marginTop: 10, color: "green", marginBottom:20, fontSize:16, fontWeight:'bold'}}>
                        Score: {Math.trunc(this.props.data[deck])}%
                    </Text>
                    <Card item={item}/>
                    <View style={styles.buttons}>
                        <TouchableOpacity  style={[styles.correctionButton, {backgroundColor: 'green', marginRight:5}]} onPress={()=> {const score = this.correct(index, intialScore);  this.props.set(deck, score);  }} >
                            <Text style={styles.buttonText}>Correct!</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.correctionButton, {backgroundColor: 'red', marginLeft:5}]}  onPress={()=> {const score = this.wrong(index, intialScore);  this.props.set(deck, score);  }}>
                            <Text style={styles.buttonText}>Wrong!</Text>
                        </TouchableOpacity>
                    </View>
                 </View>
        )
    }
}

const styles = StyleSheet.create({
   
    label:{
        alignSelf: 'flex-start',
        fontSize: 18,
    },
    input: {
       marginTop: 10,
       height: 40,
       borderColor: '#777',
       borderWidth: 2,
       borderRadius: 8,
       paddingLeft: 10,
    },
    button:{
        backgroundColor: '#000',
        padding: 10,
        borderRadius: 7,
        height: 35,
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
      },
      buttonText:{
        color: '#fff',
      },
      buttons:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
      },

      correctionButton:{
        
        padding: 10,
        borderRadius: 7,
        height: 40,
        marginTop: 10,
        
        justifyContent: 'center',
        alignItems: 'center',
      },
    

})

function mapStateToProps (state, { navigation }) {

    return {
      data: state.score,
      whole: state,
    }
  }
  function mapDispatchToProps (dispatch, { navigation }) {
    //const { entryId } = navigation.state.params
    return {
      set: (deck, score) => dispatch(setScore(deck, score)),
    }
  }
export default connect(mapStateToProps, mapDispatchToProps
)(ItemView)