import { async, stringToByteArray } from '@firebase/util';
import { deleteDoc, doc } from 'firebase/firestore';
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk';
import { startNewNote } from '../../action/notes';
import { types } from '../../components/types/types';
import { db } from '../../firebase/firebase-config';
const middlewares = [thunk]
const mockStore = configureStore(middlewares)

const store = mockStore({
    auth: {
        uid: 'TESTING'
    }
})

describe('pruebas en notes.js', () => {
    test('debe de crear una nueva nota startNewNote', async () => {
        await store.dispatch(startNewNote())
        const actions = store.getActions();
        //console.log(action)
        expect( actions[0] ).toEqual({
            type: types.notesActive,
            payload: {
                id: expect.any(String),
                title: '',
                body: '',
                date: expect.any(Number)
            }
        });
        expect( actions[1] ).toEqual({
            type: types.notesAddNew,
            payload: {
                id: expect.any(String),
                title: '',
                body: '',
                date: expect.any(Number)
            }
        });
        const docId = actions[1].payload.id;
        const noteRef = doc(db, `/TESTING/journal/notes/${docId}`);
        await deleteDoc(noteRef);
    });
});