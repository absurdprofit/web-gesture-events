import React from 'react';
import {Router, Stack} from 'react-motion-router';
import Home from './Screens/Home';
import SwipeDemo from './Screens/SwipeDemo';
import PanDemo from './Screens/PanDemo';
import PinchDemo from './Screens/PinchDemo';
import CompoundDemo from './Screens/CompoundDemo';
import TapDemo from './Screens/TapDemo';
import './css/App.css';

interface AppState {
  eventType: string;
  scale: number;
  rotation: number;
  translateX: number;
  translateY: number;
  touchPointers: number;
}
class App extends React.Component<{}, AppState> {
  render() {
    return (
      <Router config={{
        animation: {
          type: 'fade',
          duration: 250
        }
      }}>
        <Stack.Screen component={Home} path="/" />
        <Stack.Screen component={PinchDemo} path="/pinch" />
        <Stack.Screen component={TapDemo} path="/tap" />
        <Stack.Screen component={PanDemo} path="/pan" />
        <Stack.Screen component={SwipeDemo} path="/swipe" />
        <Stack.Screen component={CompoundDemo} path="/compound" />
      </Router>
    );
  }
}

export default App;
