import React from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet, Text} from 'react-native'

const TaskList = ({description, dateStart, dateEnd}) => {
  return (
    <View style={styles.container}>
      <Text>Description : {description}</Text>
      <Text>date: {dateStart}</Text>
      <Text>date: {dateEnd}</Text>
    </View>
  )
}

TaskList.propTypes = {
  description: PropTypes.string,
  dateStart: PropTypes.string,
  dateEnd: PropTypes.string,

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default TaskList
