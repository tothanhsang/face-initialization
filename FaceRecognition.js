import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, TouchableOpacity, View, ToastAndroid } from 'react-native';
import { RNCamera } from 'react-native-camera';
import RNRestart from 'react-native-restart';
import StackActions from '@react-navigation/native';
import Axios from 'axios'

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = ({
            id: ''
        })
    }
    componentDidMount() {
        this.getIdFromNav()
    }

    getIdFromNav = () => {
        this.setState({ id: this.props.route.params.id })
    }
    render() {
        return (
            <View style={styles.container}>
                <RNCamera
                    ref={ref => {
                        this.camera = ref;
                    }}
                    style={styles.preview}
                    type={RNCamera.Constants.Type.front}
                    // flashMode={RNCamera.Constants.FlashMode.on}
                    // faceDetectionClassifications={RNCamera.Constants.FaceDetection.Classifications.all}
                    // faceDetectionLandmarks={RNCamera.Constants.FaceDetection.Landmarks.all}
                    onFacesDetected={face => {
                        if (face.faces.length != 0) {
                            this.takePicture()
                        } else {

                        }
                    }}
                />
            </View>
        );
    }

    takePicture = async () => {
        if (this.camera) {
            const options = { base64: true };
            const data = await this.camera.takePictureAsync(options);
            //   console.log("take picture", this.state.id)
            // fetch('http://192.168.0.111:5000/recognition', {
            //     method: 'POST',
            //     headers: {
            //         Accept: 'application/json',
            //         'Content-Type': 'application/json'
            //     },
            //     body: JSON.stringify({
            //         img: data.base64,
            //         id: this.state.id
            //     })
            // });

            let url = "http://192.168.43.205:5000/saveimage"
            Axios.post(url, {
                img: data.base64,
                id: this.state.id
              })
              .then(function (response) {
                //   alert(JSON.stringify(response.data));
                if(response.data == "full_image"){
                    ToastAndroid.show(JSON.stringify(response.data), ToastAndroid.SHORT);
                    this.props.navigation.dispatch(StackActions.popToTop());
                    // console.log("props: ",this.props.navigation)
                }
              })
              .catch(function (error) {
                console.log(error);
              });

        };
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'black',
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    capture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 15,
        paddingHorizontal: 20,
        alignSelf: 'center',
        margin: 20,
    },
});
export default Home;