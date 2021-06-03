import React, {useState} from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';

import axios from 'axios'

const AddStack = createStackNavigator()

export default function AddStackScreen() {
    return (
      <AddStack.Navigator>
        <AddStack.Screen name='Add' component={Add} />
      </AddStack.Navigator>
    )
  }
  
function Add () {
    let [name, setName] = useState('')
    let [surname, setSurname] = useState('')
    let [age, setAge] = useState('')
    let [isNameFocused, setNameFocus] = useState(false)
    let [isSurnameFocused, setSurnameFocus] = useState(false)
    let [isAgeFocused, setAgeFocus] = useState(false)
    let [errName, setErrName] = useState(false)
    let [errSurname, setErrSurname] = useState(false)
    let [errAge, setErrAge] = useState(false)    

    const addNewUser = () => {
        if (errName == true || errSurname == true) {
            alert('Entered data is not valid! Name and surname must be at least 3 characters long and consists only from letters!')
        } else if (errAge == true) {
            alert('Age must be in between 1 and 3 charters long!')
        } else {
            const url = 'http://localhost:3000/add'
            axios.post(url,{
                name: name,
                surname: surname, 
                age: age
            })
            .then(res => {
                alert('New user added successfully')
                console.log('Added new user')
            })
            .catch(err => {
                alert('Error ocured when adding new user')
                console.log('ERROR')
            })
        }
       
    }
    
    const onEnterText = (text, inputType) => {
        let alpha = /^[a-zA-Z]{3,}$/
        let number = /^[0-9]{1,2}$/

        if (inputType == 'name') {
            if (!alpha.test(text)) {
                setErrName(true)
            } else {
                setErrName(false)
                setName(text)
            }
        }
        if (inputType == 'surname') {
            if (!alpha.test(text)) {
                setErrSurname(true)
            } else {
                setErrSurname(false)
                setSurname(text)
            }
        } 
        if (inputType == 'age') {
            if (!number.test(text)) {
                setErrAge(true)
            } else {
                setErrAge(false)
                setAge(text)
            }
        }
    }
    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Add new item
            </Text>
            <View style={styles.formContainer}>
                <TextInput
                    onBlur = {() => setNameFocus(false)}
                    onFocus = {() => setNameFocus(true)}
                    style={[styles.nameInput, {
                        borderColor: isNameFocused ? '#D8D174' : '#B6C454'
                    }]}
                    placeholder="Enter your name..."
                    onChangeText={text => onEnterText(text, 'name')}
                />
                <TextInput
                    onBlur = {() => setSurnameFocus(false)}
                    onFocus = {() => setSurnameFocus(true)}
                    style={[styles.surnameInput, {
                        borderColor: isSurnameFocused ? '#D8D174' : '#B6C454'
                    }]}
                    placeholder="Enter your surname..."
                    onChangeText={text => onEnterText(text, 'surname')}
                />
                <TextInput
                    onBlur = {() => setAgeFocus(false)}
                    onFocus = {() => setAgeFocus(true)}
                    style={[styles.ageInput, {
                        borderColor: isAgeFocused ? '#D8D174' : '#B6C454'
                    }]}
                    placeholder="Enter your age..."
                    onChangeText={text => onEnterText(text, 'age')}
                />
                <TouchableOpacity style={styles.confirm} onPress={() => addNewUser()}>
                    <Text style={styles.confirmText}>
                        Add 
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F6FEDB', 
        width: '100%'
    },
    title: {
        color: 'snow',
        fontSize: 28,
        borderBottomWidth: 2,
        borderBottomColor: '#E6D3A3',
        backgroundColor: '#E6D3A3',
        width: '100%',
        textAlign: 'center',
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
    },
    formContainer: {
        alignItems: 'center',
        marginTop: '2.5%'
    },
    nameInput: {
        fontSize: 24,
        color: '#343330',
        borderWidth: 1,
        borderColor: '#B6C454',
        borderRadius: 15,
        marginTop: 5,
        marginBottom: 5,
        marginLeft: 5,
        paddingTop: 3,
        paddingLeft: 8,
        paddingRight: 2,
        width: '75%'
    },
    surnameInput: {
        fontSize: 24,
        color: '#343330',
        borderColor: '#B6C454',
        borderWidth: 1,
        borderRadius: 15,
        marginTop: 5,
        marginBottom: 5,
        marginLeft: 5,
        paddingTop: 3,
        paddingLeft: 8,
        paddingRight: 2,
        width: '75%'
    },
    ageInput: {
        fontSize: 24,
        color: '#343330',
        borderWidth: 1,
        borderColor: '#B6C454',
        borderRadius: 15,
        marginTop: 5,
        marginBottom: 5,
        marginLeft: 5,
        paddingTop: 3,
        paddingLeft: 8,
        paddingRight: 2,
        width: '75%'
    },
    confirm: {
        fontSize: 26,
        borderWidth: 1,
        borderRadius: 15,
        backgroundColor: '#91972A',
        borderColor: '#91972A',
        width: '75%',
        marginTop: 5,
        marginBottom: 5,
        marginLeft: 5,
        paddingTop: 3,
        paddingLeft:  4 ,
        paddingRight:  2 ,
        textAlign: 'center',
        color: '#343330'
    },
    confirmText: {
        color: '#d9e4e4',
        paddingBottom:  4,   
        fontSize: 20
    },
})