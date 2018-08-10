import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  CheckBox,
} from 'react-native';
import { SwipeRow } from 'react-native-swipe-list-view';

export default class Note extends Component {
    constructor() {
        super();
        this.state = {
           confirm: "    ",
        }
     }

  render() {
    return (
        <View key={this.props.keyval} style={styles.note}>
        <View style={styles.standalone} ref={this.myRef} >
            <SwipeRow rightOpenValue={-75}>
                <View style={styles.standaloneRowBack}>
                    {/* The After-Swipe view */}
                    <TouchableOpacity onPress={this.props.deleteMethod} style={styles.noteDelete}>
                        <Text style={styles.noteDeleteText}>Delete</Text>
                    </TouchableOpacity>
                
                </View>{/* The Before-Swipe view */}
                    <View style={styles.standaloneRowFront}>
                    <Text style={styles.noteText}>{this.props.val.date}</Text>
                    <Text style={styles.noteText}>{this.props.val.note}</Text>
                    
                    <TouchableOpacity onPress={this.confirm.bind(this)} style={styles.noteConfirm}>
                        <Text style={styles.noteDeleteText}>{this.state.confirm}</Text>
                    </TouchableOpacity>
                </View>
            </SwipeRow>
            </View>
        </View>
    );
  }

  confirm(){
        if(this.state.confirm!="✔")
            this.setState({confirm: "✔"});
        else
            this.setState({confirm: "    "});
  }
}

const styles = StyleSheet.create({
    note: {
    },
    standalone: {
        marginTop: 5,
        marginBottom: 5,
    },
    standaloneRowFront: {
        alignItems: 'center',
        backgroundColor: '#ddd',
        justifyContent: 'center',
        height: 80, /* The height of the swipe note */
    },
        standaloneRowBack: {
        alignItems: 'center',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 15,
    },
    noteText: {
        alignItems: 'center',
        justifyContent:'center',
    },
    noteDelete: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2980b9',
        padding: 10,
        top: 10,
        bottom: 10,
        right: 10,
        height: 30,
        marginTop: 15, /* Delete button margin from top to be in the middle */
    },
    noteConfirm: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2980b9',
        padding: 20,
        top: 10,
        bottom: 10,
        left: 10,
    },
    noteDeleteText: {
        fontSize: 12,
        color: 'white'
    }
});