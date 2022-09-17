import { authReducer } from "../../components/reducer/authReducer";
import { types } from "../../components/types/types";

describe('pruebas en el authreducer', () => {
    test('debe de realizar el login', () => {
        const initialState= {};
        const action={
            type: types.login,
            payload:{
                uid: 'abc',
                displayName: 'Pepe'
            }
        }
        const state = authReducer(initialState, action)
        expect(state).toEqual({
            uid:'abc',
            name:'Pepe'
        })
    });


    test('debe de realizar el Logout', () => {
        const initialState= {
            uid:'123456',
            name:'Pepe'

        };
        const action={
            type: types.logout,
        }
        const state = authReducer(initialState, action)
        expect(state).toEqual({})
    });
    test('no debe de hacer cambios en el state', () => {

        const initState = {
            uid: '147852',
            name: 'pepe'
        };

        const action = {
            type: 'asdf',
        };

        const state = authReducer( initState, action );

        expect( state ).toEqual( initState );
 
    });
});