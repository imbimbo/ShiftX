import React from 'react'
import PropTypes from 'prop-types'
import { Modal, View, Text, TouchableHighlight, StyleSheet, TextInput, Alert } from 'react-native';
import { firebase } from '@react-native-firebase/database';
import DatePicker from 'react-native-date-picker';

const TaskModal = ({modalVisible, setModalVisible}) => {
  const [description, setDescription] = React.useState('');
  const [dateStart, setDateStart] = React.useState(new Date())
  const [dateEnd, setDateEnd] = React.useState(new Date())

  const handleSave = () => {
    firebase.app().database('https://shiftx-32fc1-default-rtdb.europe-west1.firebasedatabase.app/').ref('/tasks')
    .push()
    .set({
      description: description,
      date: dateStart.toDateString(),
      date: dateEnd.toDateString(),
    }).then(() => {
      console.log('Added task!')
      Alert.alert('Task created successfully!');
      setModalVisible(false);
    }).catch((error) => console.log(error));
  };

  return (
    <Modal
    animationType="slide"
    transparent={false}
    visible={modalVisible}
    onRequestClose={() => {
      Alert.alert("Modal has been closed.");
      setModalVisible(!modalVisible);
    }}
  >
    <View style={styles.centeredView}>
      <View style={styles.modalView}>

        
        <Text>Start</Text>
        <TextInput style={styles.input}
                    label='description'
                    placeholder='Staff email'
                    value={description}
                    onChangeText={description => setDescription(description)}
                    autoCapitalize={'none'} />
        <DatePicker date={dateStart} mode="datetime" onDateChange={setDateStart} />
      </View>
      <View style={styles.modalView}>
        <Text styl >End</Text>

        <DatePicker date={dateEnd} mode="datetime" onDateChange={setDateEnd} />
        <View style={styles.buttonContainer}>
          <TouchableHighlight
            style={{ ...styles.openButton, backgroundColor: "black" }}
            onPress={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <Text style={styles.textStyle}>Cancel</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={{ ...styles.openButton, backgroundColor: "#93f542" }}
            onPress={() => handleSave()}
          >
            <Text style={styles.textStyle}>Assign Shift</Text>
          </TouchableHighlight>
        </View>
      </View>
    </View>
  </Modal>
  )
}

TaskModal.propTypes = {
  modalVisible: PropTypes.bool.isRequired,
  setModalVisible: PropTypes.func.isRequired,
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 10,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    margin: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  input: {
    marginBottom: 5,
    
  },
});

export default TaskModal;
