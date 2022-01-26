import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'web-gesture-events';
import {TapEvent, LongPressEvent, DoubleTapEvent, SwipeEvent, PanEvent, PinchEvent, RotateEvent, GestureEvent} from 'web-gesture-events';

interface AppState {
  eventType: string;
  scale: number;
  rotation: number;
  translateX: number;
  translateY: number;
  touchPointers: number;
}
class App extends React.Component<{}, AppState> {
  private ref: HTMLElement | null = null;
  private onTapListener = this.onTap.bind(this);
  private onLongPressListener = this.onLongPress.bind(this);
  private onDoubleTapListener = this.onDoubleTap.bind(this);
  private onSwipeListener = this.onSwipe.bind(this);
  private onPanListener = this.onPan.bind(this);
  private onPinchListener = this.onPinch.bind(this);
  private onRotateListener = this.onRotate.bind(this);
  private onGestureLifecycleListener = this.onGestureLifecycle.bind(this);
  private onContextMenuListener = this.onContextMenu.bind(this);
  state: AppState = {
    eventType: '',
    scale: 1,
    rotation: 0,
    translateX: 0,
    translateY: 0,
    touchPointers: 0
  }

  componentDidUpdate() {
    // console.log(JSON.stringify(this.state));
  }

  componentDidMount() {
    // window.gestureProvider.config.minPointers = 2;
    window.addEventListener('tap', this.onTapListener);
    window.addEventListener('longpress', this.onLongPressListener);
    window.addEventListener('doubletap', this.onDoubleTapListener);
    window.addEventListener('swipestart', this.onGestureLifecycleListener);
    window.addEventListener('swipe', this.onSwipeListener);
    window.addEventListener('swipeend', this.onGestureLifecycleListener);
    window.addEventListener('panstart', this.onGestureLifecycleListener);
    window.addEventListener('pan', this.onPanListener);
    window.addEventListener('panend', this.onGestureLifecycleListener);
    window.addEventListener('pinchstart', this.onGestureLifecycleListener);
    window.addEventListener('pinch', this.onPinchListener); 
    window.addEventListener('pinchend', this.onGestureLifecycleListener);
    window.addEventListener('rotatestart', this.onGestureLifecycleListener);
    window.addEventListener('rotate', this.onRotateListener);
    window.addEventListener('rotateend', this.onGestureLifecycleListener);
    window.addEventListener('contextmenu', this.onContextMenuListener);
  }

  componentWillUnmount() {
    window.removeEventListener('tap', this.onTapListener);
    window.removeEventListener('longpress', this.onLongPressListener);
    window.removeEventListener('doubletap', this.onDoubleTapListener);
    window.removeEventListener('swipestart', this.onGestureLifecycleListener);
    window.removeEventListener('swipe', this.onSwipeListener);
    window.removeEventListener('swipeend', this.onGestureLifecycleListener);
    window.removeEventListener('panstart', this.onGestureLifecycleListener);
    window.removeEventListener('pan', this.onPanListener);
    window.removeEventListener('panend', this.onGestureLifecycleListener);
    window.removeEventListener('pinchstart', this.onGestureLifecycleListener);
    window.removeEventListener('pinch', this.onPinchListener);
    window.removeEventListener('pinchend', this.onGestureLifecycleListener);
    window.removeEventListener('rotatestart', this.onGestureLifecycleListener);
    window.removeEventListener('rotate', this.onRotateListener);
    window.removeEventListener('rotateend', this.onGestureLifecycleListener);
    window.removeEventListener('contextmenu', this.onContextMenuListener);
  }

  onTap(ev: TapEvent) {
    this.setState({eventType: ev.type, touchPointers: ev.touches.length});
  }

  onLongPress(ev: LongPressEvent) {
    this.setState({eventType: ev.type});
  }

  onDoubleTap(ev: DoubleTapEvent) {
    this.setState({eventType: ev.type});
  }

  onGestureLifecycle(ev: GestureEvent) {
    console.log(ev.type);
  }

  onSwipe(ev: SwipeEvent) {
    this.setState({eventType: `${ev.type} ${ev.direction}`});
  }

  onPan(ev: PanEvent) {
    this.setState({eventType: ev.type, translateX: ev.translation.clientX, translateY: ev.translation.clientY});
  }

  onPinch(ev: PinchEvent) {
    this.setState({scale: ev.scale});
    // if (this.ref) {
    //   this.ref.style.transform = `scale(${this.state.scale})`;
    // }
  }

  onRotate(ev: RotateEvent) {
    this.setState({rotation: ev.rotationDeg});
  }

  onContextMenu(ev: Event) {
    ev.preventDefault();
    ev.stopPropagation();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header" style={{transform: `translate(${this.state.translateX}px, ${this.state.translateY}px) scale(${this.state.scale}) rotate(${this.state.rotation}deg)`}} ref={(ref) => {
          this.ref = ref;
        }} {...{"data-gesturetarget": true}}>
          <p>Max Touch Points: {navigator.maxTouchPoints}</p>
          <img src={logo} className="App-logo" alt="logo" />
          <p {...{longpressdelay: 600}}>
            {this.state.eventType.length ? this.state.eventType + '!' : ''}
          </p>
          <p>
            {this.state.scale ? 'Scale: ' + this.state.scale : ''}
          </p>
          <p>
            {this.state.rotation + '°'}
          </p>
          <p>Pointers: {this.state.touchPointers}</p>
        </header>
      </div>
    );
  }
}

export default App;
