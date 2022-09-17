import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Redirect
} from 'react-router-dom';
import {
  getAuth,
  onAuthStateChanged
} from 'firebase/auth';
import { AuthTouter } from './AuthRouter';
import { JournalScreen } from '../components/journal/JournalScreen';
import { useDispatch } from 'react-redux';
import { login } from '../action/auth';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';
import { startLoadingNotes } from '../action/notes';

export const AppRouter = () => {

  const dispatch = useDispatch();

  const [checking, setChecking] = useState(true);

  const [isLoggedIn, setisLoggedIn] = useState(false);

  const auth = getAuth()

  useEffect(() => {
    onAuthStateChanged(auth,async (user) => {
      if (user?.uid) {
        dispatch(login(user.uid,user.displayName ))
        setisLoggedIn(true)
        
        dispatch(startLoadingNotes(user.uid));
      }else{
        setisLoggedIn(false)
      }
      setChecking(false);
    })

  }, [dispatch,setChecking, setisLoggedIn,auth])

  if(checking){
    return(
      <h1>Wait...</h1>
    )
  }

  return (
    <div >

      <Router>
        <Switch>
          <PublicRoute
            path='/auth'
            component={AuthTouter}
            isAuthenticated={isLoggedIn}
          />
          <PrivateRoute
            exact
            isAuthenticated={isLoggedIn}
            path='/'
            component={JournalScreen}
          />
          <Redirect to='/auth/login' />
        </Switch>
      </Router>
    </div>
  )
}
