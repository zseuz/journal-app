import Swal from 'sweetalert2'

import { googleAuthProvider } from '../firebase/firebase-config';
import { types } from "../components/types/types"
import { startLoading, finishLoading } from './ui';
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signInWithPopup,
    signOut,
    getAuth,
    updateProfile,

} from 'firebase/auth';
import { noteLogout } from './notes';
export const startLoginEmailPassword = (email, password) => {
    return (dispatch) => {

        dispatch(startLoading());


        signInWithEmailAndPassword(getAuth(), email, password)
            .then(({ user }) => {
                dispatch(login(user.uid, user.displayName));

                dispatch(finishLoading());
            })
            .catch(e => {
                dispatch(finishLoading());
                Swal.fire('Fail', 'user and password error', 'error');
            })
    }
}

export const startRegisterWithEmailPasswordName = (email, password, name) => {
    return (dispatch) => {

        createUserWithEmailAndPassword(getAuth(), email, password)
            .then(async ({ user }) => {

                await updateProfile(user, { displayName: name });

                dispatch(
                    login(user.uid, user.displayName)
                );
            })
            .catch(e => {
                console.log(e);
                Swal.fire('Fail', e.message, 'error');
            })

    }
}



export const startGoogleLogin = () => {
    return async (dispatch) => {
        const auth = getAuth();
        const { user } = await signInWithPopup(auth, googleAuthProvider);
        dispatch(login(user.uid, user.displayName))
    }
}


export const login = (uid, displayName) => ({
    type: types.login,
    payload: {
        uid,
        displayName
    }
});


export const startLogout = () => {
    return async (dispatch) => {
        const auth = getAuth();
        await signOut(auth);
        dispatch(logout());
        dispatch( noteLogout() );
    }
}


export const logout = () => ({
    type: types.logout
})


