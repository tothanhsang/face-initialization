import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Button, ToastAndroid } from 'react-native';
import { RNCamera } from 'react-native-camera';
import RNRestart from 'react-native-restart';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


HomeScreen = ({ navigation }) => {
const username = 'hello'
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Training"
        onPress={() => navigation.navigate('Training')}
      />
    </View>
  );
}

function DetailsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
      <Button
        title="Go to Details... again"
        onPress={() => navigation.push('Details')}
      />
      <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
      <Button title="Go back" onPress={() => navigation.goBack()} />
      <Button
        title="Go back to first screen in stack"
        onPress={() => navigation.popToTop()}
      />
    </View>
  );
}

takePicture = () => {
  fetch('https://jsonplaceholder.typicode.com/posts/1', {
    method: 'GET',
  }).then(response => response.json())
    .then(responseJson => {
      alert(JSON.stringify(responseJson));
      console.log(responseJson)
    }).catch(error => {
      alert(Json.stringify(error));
      console.error(error);
    });
}

TrainingScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>WELLCOME TO TEKNIK GG</Text>
      <RNCamera
        style={StyleSheet.absoluteFill}
        type={RNCamera.Constants.Type.front}
        // faceDetectionClassifications={RNCamera.Constants.FaceDetection.Classifications.all}
        faceDetectionLandmarks={RNCamera.Constants.FaceDetection.Landmarks.all}
        onFacesDetected={face => {
          // if (this.state.fd) {
          //   this.setState({ fd: face.faces.length === 0 });
          //   alert(JSON.stringify(face));
          //   if (face.faces.length != 0) {
          //     this.takePicture()
          //     RNRestart.Restart();
          //   }
          // }
          fetch('https://jsonplaceholder.typicode.com/posts/1', {
            method: 'GET',
          }).then(response => response.json())
          .then(responseJson => {
            // alert(JSON.stringify(responseJson));
            ToastAndroid.show(JSON.stringify(responseJson), ToastAndroid.SHORT);
            console.log(responseJson)
          }).catch(error => {
            alert(Json.stringify(error));
            console.error(error);
          });
        }}
      >
        {/* <Button style={{ justifyContent: 'center', alignContent: 'flex-end', width: '100%', height: 30 }}
          title='back'
          onPress={() =>
            navigation.navigate('Home')
          }
        ></Button> */}
      </RNCamera>
    </View>

  );
}
const Stack = createStackNavigator();
App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen name="Training" component={TrainingScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

export default App;

// import * as React from 'react';
// import { Button, View, Text } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';

// function HomeScreen({ navigation }) {
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Text>Home Screen</Text>
//       <Button
//         title="Go to Details"
//         onPress={() => navigation.navigate('Details')}
//       />
//     </View>
//   );
// }

// function DetailsScreen({ navigation }) {
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Text>Details Screen</Text>
//       <Button
//         title="Go to Details... again"
//         onPress={() => navigation.push('Details')}
//       />
//       <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
//       <Button title="Go back" onPress={() => navigation.goBack()} />
//       <Button
//         title="Go back to first screen in stack"
//         onPress={() => navigation.popToTop()}
//       />
//     </View>
//   );
// }

// const Stack = createStackNavigator();

// function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="Home">
//         <Stack.Screen name="Home" component={HomeScreen} />
//         <Stack.Screen name="Details" component={DetailsScreen} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

// export default App;

