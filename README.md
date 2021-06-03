# Demo CRUD app for user management   
This application provides examples on the following topics in React Native:  
 * State management
 * Communication with API
 * Communication with MYSQL database through an express.js based API
* Nested navigation between screens using two navigators:
    * Bottom Tab Navigator as main Navigator
    * Stack Navigator as nester Navigator
* Client and server side validation of the entered data

# Installation  
Before starting application all dependencies should be installed. It can be done in 2 ways:  
 1. npm install  - it will install all dependencies mentioned in the package.json
 2. intalling all dependencies one by one  
    Installing using  ``` expo install ```:
    * react-native-gesture-handler 
    * react-native-reanimated
    * react-native-screens
    * react-native-safe-area-context
    * @react-native-community/masked-view
   
    Installing using ``` npm install ```:
    * @react-navigation/native
    * @react-navigation/stack
    * @react-navigation/bottom-tabs
    * axios
    * body-parser
    * cors
    * express
    * mysql 
    * nodemon

# Running the project
There should be accomplished 4 main steps to run the project.  
1. Create mysql tables via  
    ``` source {path_to_current_dir}/users.sql ```  
2. Change _username_ and _password_ for the **MYSQL** database in the _server.js_ file.  
3. Start express server via  
    ``` nodemon server.js ```
4. Start React Native application via  
    ``` expo start ```  
    And then run application either directly on web browser or in the mobile phone using **Expo Go**.

## Note 
To get the correct styling it is suggested to change the view to the **Galaxy S5** through _Inspect_ screen of Google Chrome. 

