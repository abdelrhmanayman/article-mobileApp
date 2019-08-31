import React, { useState } from 'react'
import { createStore, applyMiddleware } from 'redux'
import { Root } from 'native-base'
import { Provider } from 'react-redux'
import allReducers from './redux/reducers'
import { createStackNavigator, createAppContainer } from 'react-navigation';
import NavigationService from './services/NavigationService'
import Login from './screens/auth/Login'
import SignUp from './screens/auth/Signup'
import ArticleDetails from './screens/articles/articlesDetails'
import WriterArticles from './screens/articles/WriterArticles'
import AddArticle from './screens/articles/AddArticle'
import Home from './screens/home/Home'
import creatSagaMiddleware from 'redux-saga'
import rootSaga from './redux/sagas/rootSaga'
import { ApolloProvider } from 'react-apollo'
import client from './graphql/client'
import { AsyncStorage } from 'react-native'



const sagaMiddleware = creatSagaMiddleware()
let store = createStore(allReducers, applyMiddleware(sagaMiddleware))
sagaMiddleware.run(rootSaga)


const App = () => {
  const [check, setCheck] = useState(0)
  AsyncStorage.getItem('user').then(user => {
    if (user != null)
      setCheck(true)
    else
      setCheck(false)
  })
  const AppNavigator = createStackNavigator(
    { SignUp, Home, Login, ArticleDetails, WriterArticles, AddArticle },
    {
      headerMode: 'none',
      initialRouteName: check === true ? "Home" : "Login"
    }
  )
  const AppContainer = createAppContainer(AppNavigator)

  return (
    <ApolloProvider client={client}>
      <Root>
        <Provider store={store}>
          <AppContainer ref={navigatorRef => NavigationService.setTopLevelNavigator(navigatorRef)} />
        </Provider>
      </Root>
    </ApolloProvider>
  )
}
export default App