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
import TimerMixin from 'react-timer-mixin';
import Contacts from 'react-native-contacts';
import ContactsWrapper from 'react-native-contacts-wrapper';

class HomeScreen extends Component{
    static navigationOptions={
        header: null,
    };

    constructor(props){
        super(props);
        this.state={
            noteArray: [],
            noteText: '',
            meetingSub: '',
            description: '',
            location: '',
            time: '',
            lastScreen: '',
        }
        global.variable='';
    }

    componentDidUpdate(){
        
        if(global.variable!=='1'){
        if(this.state.lastScreen==="NoteFinished"){
            this.state.noteArray.push({
                'subject': this.state.meetingSub,
                'description': this.state.description,
                'location': this.state.location,
                'time': this.state.time,
            });
            this.setState({ noteArray: this.state.noteArray });
            this.setState({ lastScreen: '' });
        }
        global.variable='1';
    }
    }

    render(){

        const { navigate } = this.props.navigation;
        const {state} = this.props.navigation;
        this.state.meetingSub = state.params ? state.params.meetingSub : "<undefined>";
        this.state.description = state.params ? state.params.description : "<undefined>";
        this.state.location = state.params ? state.params.location : "<undefined>";
        this.state.time = state.params ? state.params.time : "<undefined>";
        this.state.lastScreen = state.params ? state.params.lastScreen : "<undefined>";

        let notes = this.state.noteArray.map((val, key)=>{
            return <Note key={key} keyval={key} val={val}
                    deleteMethod={()=>this.deleteNote(key)}/>
        });

        return (
            <View style={styles.container}>
            <View style={styles.header} >
                <TouchableOpacity style={styles.groupBackground} onPress={()=> {navigate('Group');}}>
                    <Text style={styles.createGroup}>צור קבוצה</Text>
                </TouchableOpacity>
                <Text style={styles.headerText}>Search...</Text>
            </View>
            <ScrollView style={styles.scrollContainer}>
                {notes}
            </ScrollView>
        </View>
        );
    }

    addNote(){
        if(this.state.lastScreen=="NoteFinished"){
            this.state.noteArray.push({
                'subject': this.state.meetingSub,
                'description': this.state.description,
                'location': this.state.location,
                'time': this.state.time,
            });
            this.setState({ noteArray: this.state.noteArray });
        }
    }

    deleteNote(key){
        this.state.noteArray.splice(key, 1);
        this.setState({noteArray: this.state.noteArray});
    }
}

/////////////////////////////////////////////////////

 class GroupPage extends Component{
    static navigationOptions={
        header: null,
    };

    constructor(props){
        super(props);
        this.state={
            meetingSub: '',
            description: '',
            location: '',
            time: '',
            contactsArr: [],
        };
        insertContactToDB=this.insertContactToDB.bind(this);
    }   

    insertContactToDB(contactName,contactPhone){
        //לא לשכוח לעשות בדיקהכ שהכל ממולא
        this.state.contactsArr.push({
            name: contactName,
            phone: contactPhone,
        });
    }
    

    render(){  
        const { navigate } = this.props.navigation; {/* Navigate to comeback */}
        const {state} = this.props.navigation;
        global.variable=''; {/* reset the variable so didupdate will work every time returning to screen */}

        return (
            <View style={styles.container}>
                <View style={styles.header} >
                    <Text style={styles.headerText}>צור קבוצה חדשה</Text> 
                </View>

                <View style={styles.groupText}>
                    <Text style={styles.SubjectText}>נושא הפגישה:</Text>
                </View>
                    <TextInput
                        style={{height: 40, marginTop: 15}}
                        onChangeText={(meetingSub) => this.setState({meetingSub})}
                    />
                
                <View style={styles.groupText}>
                    <Text style={styles.SubjectText}>תיאור:</Text>
                </View>
                    <TextInput
                        style={{height: 40, marginTop: 15}}
                        onChangeText={(description) => this.setState({description})}
                    />
                
                <View style={styles.groupText}>
                    <Text style={styles.SubjectText}>מיקום:</Text>
                </View>
                    <TextInput
                        style={{height: 40, marginTop: 15}}
                        onChangeText={(location) => this.setState({location})}
                    />
                
                <View style={styles.groupText}>
                <Text style={styles.SubjectText}>זמן:</Text>
                </View>
                    <TextInput
                        style={{height: 40, marginTop: 15}}
                        onChangeText={(time) => this.setState({time})}
                    />

                <View style={styles.groupText}>
                <Text style={styles.SubjectText}>הוסף אנשי קשר שתרצה להזמין</Text>
                    <TouchableOpacity style={styles.addButton} onPress={()=> this.getAllContacts()}>
                        <Text style={styles.addButtonText}>+</Text>
                    </TouchableOpacity>
                </View>

                <View style={{position: 'absolute', bottom: 10, left: 0, right: 0}}>
                    <Button
                        onPress={()=> navigate('Home',{lastScreen: 'NoteFinished',meetingSub: this.state.meetingSub,description: this.state.description,location: this.state.location,time: this.state.time}) }
                        title="סיים"
                        color="#841584"
                    />
                </View>
            </View>
        );
    }

    getAllContacts(){
        ContactsWrapper.getContact()
        .then((contact) => {
            setTimeout(() => {
            insertContactToDB(contact.name,contact.phone);
            alert(this.state.contactsArr[0].name);
            }, (500));
        })
        .catch((error) => {
            alert( error.message);
            console.log("ERROR MESSAGE: ", error.message);
        });
        
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
        zIndex: 11,
        backgroundColor: '#E91E63',
        width: 30,
        height: 30,
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
    groupText: {
        alignItems:'center',
        justifyContent: 'center',
    },SubjectText: {
        fontSize: 20,
        marginTop: 20,
        color: 'black',
    }
});

