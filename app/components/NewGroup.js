import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Button,
  BackHandler,
} from 'react-native';
import Main from './Main';
import{ StackNavigator,NavigationActions  } from 'react-navigation';

export default class NewGroup extends Component {

    render(){  
        
        return (
            <NavigationApp />
        );
    }
}

class Groups extends Component{
    static navigationOptions={
        header: null,
    };

    constructor(props){
        super(props)
        this.state={
            prevVal: 's',
        };
    }

    render(){  
        const { navigate } = this.props.navigation; {/* Navigate to comeback */}
        const { params } = this.props.navigation.state;
        alert(params);

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
                        onChangeText={(text) => this.setState({text})}
                    />
                
                <View style={styles.groupText}>
                    <Text style={styles.SubjectText}>תיאור:</Text>
                </View>
                    <TextInput
                        style={{height: 40, marginTop: 15}}
                        onChangeText={(text) => this.setState({text})}
                    />
                
                <View style={styles.groupText}>
                    <Text style={styles.SubjectText}>מיקום:</Text>
                </View>
                    <TextInput
                        style={{height: 40, marginTop: 15}}
                        onChangeText={(text) => this.setState({text})}
                    />

                <View style={styles.groupText}>
                <Text style={styles.SubjectText}>זמן:</Text>
                </View>
                    <TextInput
                        style={{height: 40, marginTop: 15}}
                        onChangeText={(text) => this.setState({text})}
                    />
                    <Text></Text>
                <View style={{position: 'absolute', bottom: 10, left: 0, right: 0}}>
                    <Button
                        onPress={()=> navigate('Home')}
                        title="סיים"
                        color="#841584"
                    />
                </View>
            </View>
        );
    }
}

class MainPage extends Component{
    static navigationOptions={
        header: null,
    };
    render(){
        return (
             <Main /> /* Call Main Page */
        );
    }
}

const NavigationApp= StackNavigator({
    Group: {screen: Groups },
    Home: {screen: MainPage },
});/* Define Pages */

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
        fontSize: 20,
        padding: 26,
    },
    groupText: {
        alignItems: 'center',
    },SubjectText: {
        fontSize: 26,
        marginTop: 20,
        color: 'black',
    }
});