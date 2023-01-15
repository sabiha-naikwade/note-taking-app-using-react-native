import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Context } from '../context/NoteContext';

const BLUE = '#428AF8';
const GRAY = '#D3D3D3';

const NoteForm = ({ onSubmit, initialFormValues }) => {
    const color = initialFormValues.color;
    const [title, setTitle] = useState(initialFormValues.title);
    const [content, setContent] = useState(initialFormValues.content);
    const [titleFocused, setTitleFocused] = useState(false);
    const verb = initialFormValues.title ? 'Update' : 'Add';

    return (
        <>
            <TextInput
                value={title}
                onChangeText={(text) => setTitle(text)}
                placeholder='Title'
                selectionColor={BLUE}
                underlineColorAndroid={ titleFocused ? BLUE : GRAY }
                onFocus={() => setTitleFocused(true)}
                onBlur={() => setTitleFocused(false)}
                style={styles.titleInput}
            />

            <View style={styles.contentContainer}>
                <TextInput
                    value={content}
                    onChangeText={(content) => setContent(content)}
                    multiline={true}
                    placeholder="Enter Content"
                    numberOfLines={20}
                    style={styles.contentInput}
                />
            </View>
            <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => onSubmit(title, content, color)}>
                <Text style={styles.buttonStyle}>{verb} Note</Text>
            </TouchableOpacity>

        </>
    );
};


// NoteForm.defaultProps = {
//     initialFormValues: {
//         title: '',
//         content: ''
//     }
// };


const styles = StyleSheet.create({
    titleInput: {
        height: 60,
        paddingLeft: 6,
        fontSize: 22,
        marginBottom: 10,
        marginHorizontal: 5,
    },
    contentInput: {
        margin: 10,
        padding: 5,
        textAlignVertical: "top",
        fontSize: 18,
        backgroundColor: '#ffffff',
        borderRadius: 5
    },
    contentContainer: {
        flex: 1,
        marginHorizontal: 10, 
        backgroundColor: '#e4ecf7'
    },
    buttonStyle: {
        marginVertical: 10,
        width: 150,
        fontSize: 18,
        padding: 15,
        color: 'white',
        backgroundColor: '#428AF8',
        textAlign: 'center',
        borderRadius: 5
    }
});

export default NoteForm;