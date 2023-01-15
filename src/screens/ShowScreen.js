import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Context } from '../context/NoteContext';
import { FontAwesome } from '@expo/vector-icons';
import { withNavigation } from 'react-navigation';

const ShowScreen = ({ navigation }) => {
    // const item = navigation.getParam('id');
    const { state } = useContext(Context);

    const note = state.find((note) => note.id === navigation.getParam('id'))

    return (
        <>
            <Text style={styles.title}>{note.title}</Text>
            <ScrollView>
                <Text style={{ ...styles.contentContainer, backgroundColor: note.color }}>{note.content}</Text>
            </ScrollView>
        </>
    );
};

ShowScreen.navigationOptions = ({ navigation }) => {
    return {
        headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Edit', { id: navigation.getParam('id') })}>
                <FontAwesome name="pencil" size={30} />
            </TouchableOpacity>
        )
    };
};

const styles = StyleSheet.create({
    title: {
        height: 65,
        paddingLeft: 6,
        fontSize: 22,
        marginBottom: 10,
        margin: 10,
        padding: 5,
        textAlign: 'center',
        textAlignVertical: "top",
        backgroundColor: '#ffffff',
        borderRadius: 5
    },
    contentContainer: {
        flex: 1,
        marginHorizontal: 10,
        margin: 10,
        padding: 5,
        textAlignVertical: "top",
        fontSize: 18,
        borderRadius: 5
    }
});

export default withNavigation(ShowScreen);