Face recognition
---------------------------------------------------
- Add permissions to your app android/app/src/main/AndroidManifest.xml file:
<!-- Required -->
<uses-permission android:name="android.permission.CAMERA" />

<!-- Include this only if you are planning to use the camera roll -->
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />

<!-- Include this only if you are planning to use the microphone for video recording -->
<uses-permission android:name="android.permission.RECORD_AUDIO"/>
---------------------------------------------------
npm install react-native-camera --save
react-native link react-native-camera
- android/app/build.gradle
implementation project(':react-native-camera')
- android/app/build.gradle
android {
  ...
  defaultConfig {
    ...
    missingDimensionStrategy 'react-native-camera', 'general' // <--- insert this line
  }
}
- android/app/build.gradle
android {
  ...
  defaultConfig {
    ...
    missingDimensionStrategy 'react-native-camera', 'mlkit' // <--- replace general with mlkit
  }
}

1- Register your app in Firebase console.
2- Download google-services.json and place it in android/app/
3- Add the folowing to project level build.gradle:
buildscript {
  dependencies {
  // Add this line
  classpath 'com.google.gms:google-services:4.0.1' // <--- you might want to use different version
  }
}
4- add to the bottom of android/app/build.gradle file
apply plugin: 'com.google.gms.google-services'
5- "package_name": "com.mlkit" => "package_name": "com.nameproject"
---------------------------------------------------
npm install --save react-native-restart
react-native link react-native-restart
- android/app/build.gradle
...
 
dependencies {
    ...
 
    implementation project(':react-native-restart')
}

---------------------------------------------------