import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Button,
} from 'react-native';
import{ StackNavigator, NavigationActions } from 'react-navigation';
import Note from './Note';
import NewGroup from './NewGroup';

class HomeScreen extends Component{
    static navigationOptions={
        header: null,
    };

    constructor(props){
        super(props);
        this.state={
            noteArray: [],
            noteText: '',
        }
    }

    render(){

        const setParamsAction = NavigationActions.setParams({
            params: { title: 'Hello' },
            key: 'screen-123',
          });
          this.props.navigation.dispatch(setParamsAction);

        const { navigate } = this.props.navigation;

        let notes = this.state.noteArray.map((val, key)=>{
            return <Note key={key} keyval={key} val={val}
                    deleteMethod={()=>this.deleteNote(key)}/>
        });

        return (
            <View style={styles.container}>
            <View style={styles.header} >
                <TouchableOpacity style={styles.groupBackground} onPress={()=> navigate('Group',{preVal2: 'Ysso'})}>
                    <Text style={styles.createGroup}>צור קבוצה</Text>
                </TouchableOpacity>
                <Text style={styles.headerText}>Search...</Text>
                
            </View>

            <ScrollView style={styles.scrollContainer}>
                {notes}
            </ScrollView>
            <View style={styles.footer}>
                <TextInput 
                    style={styles.textInput}
                    placeholder='Write a Note:'
                    onChangeText={(noteText)=> this.setState({noteText})}
                    value={this.state.noteText}
                    placeholderTextColor='white'
                    underlineColorAndroid='transparent'>
                </TextInput>
            </View>
            <TouchableOpacity onPress={ this.addNote.bind(this) } style={styles.addButton}>
                <Text style={styles.addButtonText}>+</Text>
            </TouchableOpacity>
            
            
        </View>
            
                
        );
    }
    addNote(){
        if(this.state.noteText){
            var d = new Date();
            this.state.noteArray.push({
                'date':d.getFullYear()+
                "/"+(d.getMonth()+1) +
                "/"+ d.getDate(),
                'note': this.state.noteText
            });
            this.setState({ noteArray: this.state.noteArray });
            this.setState({noteText:''});
        }
    }

    deleteNote(key){
        this.state.noteArray.splice(key, 1);
        this.setState({noteArray: this.state.noteArray});
    }
}

 class GroupPage extends Component{
    static navigationOptions={
        header: null,
    };
    render(){
        return (
             <NewGroup />
        );
    }
}

const NavigationApp= StackNavigator({
    Home: {screen: HomeScreen },
    Group: {screen: GroupPage },
});

export default class Main extends Component {
  render() {
    return <NavigationApp />;
  }
}


const styles = StyleSheet.create({
    container: {
        flex: 1, 
    },
    header: {
        backgroundColor: '#E91E63',
        alignItems: 'center',
        justifyContent:'center',
        borderBottomWidth: 10,
        borderBottomColor: '#ddd',
        flexDirection: 'row',
        
    },
    headerText: {
        color: 'white',
        fontSize: 18,
        padding: 26,
    },
    scrollContainer: {
        flex: 1,
        marginBottom: 100
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 10
    },
    textInput: {
        alignSelf: 'stretch',
        color: '#fff',
        padding: 20,
        backgroundColor: '#252525',
        borderTopWidth:2,
        borderTopColor: '#ededed'
    },
    addButton: {
        position: 'absolute',
        zIndex: 11,
        right: 20,
        bottom: 90,
        backgroundColor: '#E91E63',
        width: 70,
        height: 70,
        borderRadius: 35,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 8
    },
    addButtonText: {
        color: '#fff',
        fontSize: 24
    },
    createGroup: {
        color: '#fff',
        fontSize: 12,
    },
    groupBackground: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'purple',
        padding: 10,
        top: 10,
        bottom: 10,
        left: 10,
    },
});

