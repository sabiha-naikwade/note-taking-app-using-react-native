import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { Context } from '../context/NoteContext';
import NoteForm from '../components/NoteForm';
import { withNavigation } from 'react-navigation';

const EditScreen = ({ navigation }) => {
    // const item = navigation.getParam('item');
    const id = navigation.getParam('id');
    const { state, editNote } = useContext(Context);
    const note = state.find((note) => note.id === id)

    return <NoteForm
                initialFormValues={{ title: note.title, content: note.content, color: note.color }}
                onSubmit={(title, content, color) => {
                    editNote(id, title, content, color, () => {
                        // navigation.navigate('Show', { id })
                        navigation.pop();
                    });
                }}
            />
};

const styles = StyleSheet.create({});

export default withNavigation(EditScreen);