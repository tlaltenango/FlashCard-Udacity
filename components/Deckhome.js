import React from 'react'
import {View, TextInput, StyleSheet, Text, TouchableOpacity} from 'react-native'
import { connect } from 'react-redux'

class Deckhome extends React.Component {
    render() {
      const { params } = this.props.navigation.state;
      const deck = params ? params.deck : null;
      const dataDeck= this.props.data[deck];
      const questionArray= dataDeck['questions']
        return (
          <View style={styles.container}>
            <Text style={{marginTop:50, marginBottom:10, fontSize:40}}>{deck}</Text>
            <Text style={{marginButtom:30, fontSize:18}}>{questionArray.length} cards</Text>
          <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate(
              'Play',
              {deck: deck}

            )}>
            <Text style={styles.buttonText}>Play</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate(
              'Addcard',
              {deck: deck}
            )}>
            <Text style={styles.buttonText}>Add Card</Text>
          </TouchableOpacity>
        </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    button:{
      backgroundColor: '#000',
      padding: 10,
      borderRadius: 7,
      height: 45,
      marginLeft: 40,
      marginRight: 40,
      marginTop: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttonText:{
      color: '#fff',
    },
  });

  function mapStateToProps (state, { navigation }) {
    //const { entryId } = navigation.state.params
    return {
      data: state.cards,
    }
  }
export default connect(mapStateToProps
)(Deckhome)