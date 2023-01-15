import React, { useState } from 'react'
import { Button, Dimensions, TextInput, View, StyleSheet, Alert, ActivityIndicator, Text, Image } from 'react-native';
import auth from '@react-native-firebase/auth';
import { firebase } from '@react-native-firebase/database';
import { addUser } from '../reducers/currentUserSlice';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigator = useNavigation();

  const saveUser = (user) => {
    const { email, uid, displayName } = user;
    dispatch(addUser({ email, uid, displayName, role: 'admin' }));
  }

  const createUserInFirebaseDatabase = (user) => {
    const { email, uid, displayName } = user;
    let userToSave = { email, uid, displayName, role: 'admin' };
    firebase.app().database('https://shiftx-32fc1-default-rtdb.europe-west1.firebasedatabase.app/')
      .ref(`/users/${uid}`)
      .set(userToSave).then(() => {
        console.log('User added!');
        navigator.navigate('Auth');
      }).catch((error) => {
        console.log(error);
      });
  };

  const loginUser = (email, password) => {
    setIsLoading(true);
    auth().signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        saveUser(userCredential.user);
        setIsLoading(false);
        setError('');
        navigator.navigate('Auth');
      })
      .catch((error) => {
        console.log("login falhou:  " + error);
        auth().createUserWithEmailAndPassword(email,password)
          .then((userCredential) => {
            saveUser(userCredential.user);
            setIsLoading(false);
            setError('');
            createUserInFirebaseDatabase(userCredential.user);
          })
          .catch(error => {
            setIsLoading(false);
            setError(error.message);
          });
      });
  };

  return (
    <View style={styles.wrapper}>
      <Image 
    style={styles.photo}
    source={{uri: 'https://cdn3.iconfinder.com/data/icons/random-icon-set/512/tick-512.png'}}/>
  
      <TextInput style={styles.input}
        label='Email Address'
        placeholder='john@gmail.com'
        value={email}
        onChangeText={email => setEmail(email)}
        autoCapitalize={'none'}
      />

      <TextInput style={styles.input}
        label='Password'
        placeholder='enter password'
        value={password}
        onChangeText={password => setPassword(password)}
        secureTextEntry
      />
      {
        isLoading ?
          <ActivityIndicator
            size='large'
            color='#0F5340'
            style={{marginBottom: 80}}
          /> :
          <Button
            onPress={() => loginUser(email, password)}
            title={'Sign In'}
          />
      }
      { error && <Text style={styles.error}>{error}</Text> }
    </View>
  )
}

const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
  photo: {
    width: 150, 
    height: 150, 
    margin: 20, 
    borderRadius: 100 
    
  },
  wrapper: {
    backgroundColor: '#EFEFEF',
    height: height - 80,
    width: width,
    paddingVertical: height / 25,
    paddingHorizontal: width / 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  input: {
    height: 40,
    width: "75%",
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },

  error: {
    color: 'red',
    marginTop: 20
  }
})

export default Login;
