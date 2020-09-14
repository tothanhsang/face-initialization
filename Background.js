import React, { Component } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import Axios from 'axios'
import { Picker } from '@react-native-community/picker';
import CheckListModal from './CheckCoursesModal';
import config from './config';

class Background extends Component {
  constructor(props) {
    super(props)
    this.state = ({
      selectedValue: '',
      students: [],
      student: "",
      isLoading: false,
      showStudentModal: false,
      students_train: [],
    })
  }

  componentDidMount() {
    // let url = config.baseUrl + `/students/getAll`;
    let url = config.baseUrl + `/students`;
    Axios.get(url)
      .then((response) => {
        console.log("response: ", response.data)
        this.setState({
          students: response.data.data,
          students_train: response.data.data,
        })
      })
      .catch((err) => {
        console.log(err);
      })
  }

  nevigateTakePicture = () => {
    if (this.state.student != "") {
      this.props.navigation.navigate('TakePicture', { id: this.state.student })
    }
  }

  // componentDidMount() {
  //   this.trainData(); // Call home screen get data API function
  // }

  trainData = () => {
    console.log("training data")
    this.setState({ showStudentModal: true })
    // this.setState({ isLoading: true });
    // Axios.get("http://192.168.1.179:5000/training")
    //   .then((response) => {
    //     console.log("response: ", response.data)
    //     this.setState({ isLoading: false });
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   })
  }

  trainDataAll = () => {
    console.log("training all")
    // this.setState({ showStudentModal: true })
    this.setState({ isLoading: true });
    let url = config.baseUrlTraining + `/training`;
    Axios.get(url)
      .then((response) => {
        console.log("response: ", response.data)
        this.setState({ isLoading: false });
      })
      .catch((err) => {
        console.log(err);
      })
  }

  handleCloseStudentModal = () => {
    this.setState({ showStudentModal: false })
  }

  // handleCourseRequest = (courses) => {
  //   this.props.navigation.navigate('admin_CourseAttendanceReport', { courses, startDate: this.state.startDate, endDate: this.state.endDate })
  // }


  render() {
    return (
      <View>
        <Text style={{ fontSize: 20, marginTop: 10, marginLeft: 10 }} >Select Student</Text>
        <Picker
          style={{ fontSize: 14, color: '#222, height: 100, width: 200' }}
          selectedValue={this.state.student}
          onValueChange={student => this.setState({ student })}>
          {
            this.state.students.map(item => <Picker.Item key={item.studentID} value={item.studentID} label={item.name}
              keyExtractor={item => { item.studentID }}
            />)
          }
        </Picker>

        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 4,
            padding: 15,
            marginTop: 150,
            marginBottom: 10,
            marginLeft: 60,
            marginRight: 60,
          }}>

        </View>

        {/* Take Picture */}
        <TouchableOpacity onPress={() => this.nevigateTakePicture()}>
          {/* {!this.state.isLoading && */}
          <View
            style={{
              backgroundColor: '#468f40ed',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 4,
              padding: 15,
              marginTop: 40,
              marginBottom: 10,
              marginLeft: 60,
              marginRight: 60,
            }}>

            <Text style={{ color: 'white', fontSize: 20, fontWeight: '800' }}>
              Take Picture
                  </Text>
          </View>
          {/* } */}
        </TouchableOpacity>

             {/* Training Data */}
             <TouchableOpacity onPress={() => this.trainData()}>
          {/* {!this.state.isLoading && */}
          <View
            style={{
              backgroundColor: '#ff6500',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 4,
              padding: 15,
              marginBottom: 10,
              marginLeft: 60,
              marginRight: 60,
            }}>
            <Text style={{ color: 'white', fontSize: 20, fontWeight: '800' }}>
              Training Data
              </Text>
          </View>
          {/* } */}
        </TouchableOpacity>

        {/* Training Data */}
        <TouchableOpacity onPress={() => this.trainDataAll()}>
          {/* {!this.state.isLoading && */}
          <View
            style={{
              backgroundColor: '#ff6500',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 4,
              padding: 15,
              marginBottom: 10,
              marginLeft: 60,
              marginRight: 60,
            }}>
            <Text style={{ color: 'white', fontSize: 20, fontWeight: '800' }}>
              Train All Data
              </Text>
          </View>
          {/* } */}
        </TouchableOpacity>

        {/* Choose Student to training */}
        {
          this.state.showStudentModal &&
          <CheckListModal
            data={this.state.students_train}
            itemTitlePropName={'studentID'}
            itemOtherProp={'name'}
            onClose={this.handleCloseStudentModal}
          />
        }

        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          {this.state.isLoading && <ActivityIndicator color={"red"} />}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  appButtonContainer: {
    elevation: 8,
    backgroundColor: "#009688",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12
  },
  appButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  }
});

export default Background
