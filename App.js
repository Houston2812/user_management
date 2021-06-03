import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Ionicons from 'react-native-vector-icons/Ionicons'

import AddStackScreen from './screens/add'
import ListStackScreen from './screens/list'

const Tab = createBottomTabNavigator()

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name == 'Add') {
            iconName = focused ? 'person-add' : 'person-add-outline'
          } else if (route.name == 'List') {
            iconName = focused ? 'list' : 'list-outline'
          }

          return <Ionicons name={iconName} size={30} color={color} />
        }
      })}
        tabBarOptions={{
          activeTintColor: '#53917E',
          inactiveTintColor: '#343330'
        }}
      >
        <Tab.Screen name='List' component={ListStackScreen} />
        <Tab.Screen name='Add' component={AddStackScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;