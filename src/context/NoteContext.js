import createDataContext from './createDataContext';
import jsonServer from '../api/jsonServer';

let id = 0;
const COLORS = ['#facaca', '#cadefa', '#f9faca', '#cafae6', '#fadfca'];

const noteReducer = (state, action) => {
    const colorIndex = Math.floor(Math.random() * 5);
    switch(action.type) {
        case 'get_notes':
            return action.payload;
        // case 'add_note':
        //     return [...state, { title: action.payload.title, content: action.payload.content, id: ++id, color: COLORS[colorIndex] }];
        case 'edit_note':
            return state.map((note) => {
                return note.id === action.payload.id ? action.payload : note;
            });
        case 'delete_note':
            return state.filter((note) => note.id !== action.payload)
        default:
            return state;
    };
};

const getNotes = (dispatch) => {
    return async () => {
        const response = await jsonServer.get('/notes');
        dispatch({ type: 'get_notes', payload: response.data })
    };
};

const addNote = (dispatch) => {
    const colorIndex = Math.floor(Math.random() * 5);
    return async (title, content, callback) => {
        await jsonServer.post('/notes', { title, content, color: COLORS[colorIndex] })
        // dispatch({ type: 'add_note', payload: { title, content } });
        if (callback) {
            callback();
        }
    };
};

const editNote = (dispatch) => {
    return async (id, title, content, color, callback) => {
        await jsonServer.put(`/notes/${id}`, { title, content, color })

        dispatch({ type: 'edit_note', payload: { id, title, content, color } });
        if (callback) {
            callback();
        }
    };
};

const deleteNote = (dispatch) => {
    return async (id) => {
        await jsonServer.delete(`/notes/${id}`);
        dispatch({ type: 'delete_note', payload: id })
    };
};

export const { Context, Provider } = createDataContext(
    noteReducer,
    { addNote, deleteNote, editNote, getNotes },
    []
);