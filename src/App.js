import React from 'react'
import { createStore, applyMiddleware } from 'redux'
import { Root } from 'native-base'
import { Provider } from 'react-redux'
import allReducers from './reducers'
import { createStackNavigator, createAppContainer } from 'react-navigation';
import NavigationService from './services/NavigationService'
import Login from './screens/auth/Login'
import SignUp from './screens/auth/Signup'
import ForgetPassword from './screens/auth/ForgetPassword'
import Home from './screens/Home'
import creatSagaMiddleware from 'redux-saga'
import rootSaga from './sagas/rootSaga'
import firebase from 'react-native-firebase'

const AppNavigator = createStackNavigator(
  { SignUp, Home, Login, ForgetPassword},
  {
    headerMode: 'none',
    initialRouteName: firebase.auth().currentUser ? "Home" : "Login"
  }
)
const sagaMiddleware = creatSagaMiddleware()
let store = createStore(allReducers, applyMiddleware(sagaMiddleware))
sagaMiddleware.run(rootSaga)
const AppContainer = createAppContainer(AppNavigator)

const App = () => {
  return (
    <Root>
      <Provider store={store}>
        <AppContainer ref={navigatorRef => NavigationService.setTopLevelNavigator(navigatorRef)} />
      </Provider>
    </Root>
  )
}
export default App