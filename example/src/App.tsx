import React from 'react';
import {Router, Stack, AnimationConfig} from 'react-motion-router';
import Home from './Screens/Home';
import SwipeDemo from './Screens/SwipeDemo';
import PanDemo from './Screens/PanDemo';
import PinchDemo from './Screens/PinchDemo';
import CompoundDemo from './Screens/CompoundDemo';
import TapDemo from './Screens/TapDemo';
import RotateDemo from './Screens/RotateDemo';
import {getPWADisplayMode, iOS} from './common/utils';
import './css/App.css';

const isPWA = getPWADisplayMode() === 'standalone';
let animation: AnimationConfig = {
  type: 'fade',
  duration: 250
};
if (iOS() && !isPWA) {
  animation = {
    type: 'none',
    duration: 0
  }
}
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
        disableDiscovery: true,
        disableBrowserRouting: isPWA && iOS(),
        defaultRoute: '/',
        animation: animation
      }}>
        <Stack.Screen component={Home} path="/" />
        <Stack.Screen component={PinchDemo} path="/pinch" />
        <Stack.Screen component={TapDemo} path="/tap" />
        <Stack.Screen component={PanDemo} path="/pan" />
        <Stack.Screen component={SwipeDemo} path="/swipe" />
        <Stack.Screen component={RotateDemo} path="/rotate" />
        <Stack.Screen component={CompoundDemo} path="/compound" />
      </Router>
    );
  }
}

export default App;
