import React, {useState} from 'react';
import {Text, StyleSheet, View, TextInput, Button} from 'react-native';

const App = () => {
  return (
    <View >
      <Text > Demo Form </Text>
      <View>
        <TextInput 
          placeholder="Email" />
        <TextInput
          secureTextEntry={true}
          placeholder="Password"
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  //Check project repo for styles
});

export default App;