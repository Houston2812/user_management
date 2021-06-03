import React, {useState, useEffect} from 'react'
import {Button, ScrollView, StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {IMAGES} from '../src/constants/IMAGES'
import axios from 'axios'

const ListStack = createStackNavigator()

function ListStackScreen() {
    return (
      <ListStack.Navigator>
        <ListStack.Screen name='List' component={List} />
        <ListStack.Screen name='Profile' component={Profile} />
      </ListStack.Navigator>
    )
}
  
const icons = [
    'american-football-outline',  'basketball-outline',  'football-outline', 'tennisball-outline'
]

const List = ({ navigation }) => {
    let [users, setUsers] = useState([])
    let [content, setContent] = useState([])
    
    const getUsers = () => {
        axios({
            method: 'GET',
            url: 'http://localhost:3000/list'
        })
        .then(res => {
            console.log(res.data)
            setUsers(res.data)
            let tmp = []
            res.data.forEach(user => {
                const index = Math.floor((Math.random() * (icons.length - 1)))
                tmp.push(
                    <TouchableOpacity onPress={() => navigation.navigate('Profile',{id: user.id})}>
                        <View style={styles.userContainer}>
                            <Ionicons name={icons[index]} size={30} color={"#343330"} style={styles.userIcon} />
                            <Text style={styles.userText} >
                                {user.name} {user.surname}
                            </Text>
                            <TouchableOpacity onPress={() => deleteUser(user.id)} >
                                <View style={styles.deleteBtn}>
                                    <Ionicons name="close-circle-outline" size={30} color={"#FF7477"} />
                                </View>
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                )
            })
            setContent(tmp)
        })
        .catch(err => {
            console.log('ERROR!')
        })
    }

    const deleteUser = (id) =>{
        console.log(id)
        let url = `http://localhost:3000/user/${id}`
        axios.delete(url)
        .then(res => {
            alert('User deleted successfully!')
            getUsers()
            console.log(res)
        })
        .catch(err => {
            alert("Error occurred! User is not deleted.")
        }) 
    }
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getUsers()
        })
        return unsubscribe;
    }, [navigation])

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                List of the users
            </Text>
            <ScrollView>
                {content}
            </ScrollView>
        </View>
    )
}

function Profile({ route, navigation}){

    const [userInfo, setUserInfo] = useState('')

    let {id} = route.params
    id = JSON.stringify(id)

    let url = `http://localhost:3000/user/${id}`
    const getUser = () => {
        axios.get(url)
        .then(res => {
            console.log(res.data[0])
            let tmp = []
            let src ;
            if (res.data[0].id % 2 == 0) {
                src = IMAGES.LUFFY;
            }  else {
                src = IMAGES.LAW;
            }
             
            tmp.push(
                <View style={ProfileStyles.infoContainer}>
                    <Image source={src} style={[ProfileStyles.infoIcon, res.data[0].id % 2 == 0 ? ProfileStyles.luffy : ProfileStyles.law]} resizeMode="contain"/>
                    <View styles={{flexDirection: 'column'}}>
                        <Text styles={ProfileStyles.infoText}>
                            {res.data[0].name} {res.data[0].surname}
                        </Text>
                        <Text styles={ProfileStyles.infoText}>
                            {res.data[0].age} years old
                        </Text>
                    </View>

                </View>
            )
            setUserInfo(tmp)
        })
        .catch(err => {
            console.log('ERROR')
        })
    }

    useEffect(() => {
        getUser()
    }, [])
    return(
        <View style={styles.container}>
            <Text style={styles.title}>
                Profile details of users 
            </Text>
            <Text style={ProfileStyles.nameStyle}>
                {userInfo}
            </Text>
            <TouchableOpacity style={ProfileStyles.confirm} onPress={() => navigation.goBack()} >
                <Text style={ProfileStyles.returnText}>
                    Return
                </Text>
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F6FEDB',
        width: "100%"
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
    userContainer: {
        flex: 1,
        flexDirection: 'row',
        textAlign: 'center',
        justifyContent: 'space-between',
        paddingTop: 10,
        marginLeft: '5%',
        marginRight: '5%',
        marginTop: '2.5%',
        paddingBottom: 10,
        paddingLeft: 10,
        borderColor: "#343339",
        borderWidth: 1,
        borderRadius: 10
    },
    userIcon: {
        paddingTop: 3
    },
    userText: {
        paddingLeft: 10,
        alignSelf: 'center',
        color: '#343330',
        fontSize: 18
    },
    deleteBtn: {
        marginRight: 5
    }

})

const ProfileStyles = StyleSheet.create({
    nameStyle: {
        fontSize: 18,
        borderWidth: 1,
        borderRadius: 15,
        borderBottomLeftRadius: 15,
        marginTop: '2.5%',
        marginLeft: '2.5%',
        marginRight: '2.5%',
        marginBottom: '5%',
        padding: 4,
        color: '#343330'
    },
    infoContainer: {
        flexDirection: 'row',
        textAlign: 'left',
        marginTop: '2.5%',
    },
    infoIcon: {
        paddingTop: 5,
        paddingBottom: 5,
        marginLeft: '15%',
        marginRight: '15%',
        backgroundColor: '#F6FEDB',
    },
    law: {
        width: 50,
        height: 50
    },
    luffy: {
        width: 50,
        height: 50
    },
    infoText: {
        textAlign: 'center',
        fontSize: 24
    },
    confirm: {
        fontSize: 24,
        borderWidth: 1,
        borderRadius: 15,
        borderBottomLeftRadius: 15,
        marginLeft: '2.5%',
        marginRight: '2.5%',
        marginBottom: '5%',
        padding: 4,
        color: '#34330',
        textAlign: 'center',
        backgroundColor: "#91972A",
        borderColor: '#91972A',
        color: '#343330'
    },
    returnText: {
        fontSize: 22
    }

})
export default ListStackScreen;