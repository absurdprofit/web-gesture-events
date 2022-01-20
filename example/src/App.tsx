import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'web-gesture-events';
import {TapEvent, LongPressEvent, DoubleTapEvent, SwipeEvent} from 'web-gesture-events';

interface AppState {
  eventType: string;
}
class App extends React.Component<{}, AppState> {
  private ref: HTMLElement | null = null;
  private onTapListener = this.onTap.bind(this);
  private onLongPressListener = this.onLongPress.bind(this);
  private onDoubleTapListener = this.onDoubleTap.bind(this);
  private onSwipeListener = this.onSwipe.bind(this);
  state: AppState = {
    eventType: ''
  }

  componentDidMount() {
    window.gestureProvider.config.minPointers = 2;
    window.addEventListener('tap', this.onTapListener);
    window.addEventListener('longpress', this.onLongPressListener);
    window.addEventListener('doubletap', this.onDoubleTapListener);
    window.addEventListener('swipe', this.onSwipeListener);
  }

  componentWillUnmount() {
    window.removeEventListener('tap', this.onTapListener);
    window.removeEventListener('longpress', this.onLongPressListener);
    window.removeEventListener('doubletap', this.onDoubleTapListener);
    window.removeEventListener('swipe', this.onSwipeListener);
  }

  onTap(ev: TapEvent) {
    this.setState({eventType: ev.type});
    console.log(ev);
  }

  onLongPress(ev: LongPressEvent) {
    this.setState({eventType: ev.type});
  }

  onDoubleTap(ev: DoubleTapEvent) {
    this.setState({eventType: ev.type});
  }

  onSwipe(ev: SwipeEvent) {
    this.setState({eventType: `${ev.type} ${ev.direction}`});
    console.log("swipe");
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p {...{longpressdelay: 600}}>
            {this.state.eventType.length ? this.state.eventType + '!' : ''}
          </p>
        </header>
      </div>
    );
  }
}

export default App;
