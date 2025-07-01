// import React from 'react';
// import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
// import { NewAppScreen } from '@react-native/new-app-screen';

// const App = () => {
//   const isDarkMode = useColorScheme() === 'dark';

//   return (
//     <View style={styles.container}>
//       <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
//       <NewAppScreen templateFileName="App.js" />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
// });

// export default App;

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import remoteConfig from '@react-native-firebase/remote-config';

const App = () => {
  const [message, setMessage] = useState('Loading...');

  useEffect(() => {
    const fetchRemoteConfig = async () => {
      // Optional: set default values
      await remoteConfig().setDefaults({
        welcome_message: 'Default Welcome',
      });

      // Optional: For testing — fetch every second
      await remoteConfig().setConfigSettings({
        minimumFetchIntervalMillis: 1000,
      });

      // Fetch and apply values
      await remoteConfig().fetchAndActivate();

      const value = remoteConfig().getValue('welcome_message').asString();
      setMessage(value);
    };

    fetchRemoteConfig();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 20 },
});

export default App;

