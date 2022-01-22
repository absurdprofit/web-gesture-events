import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'web-gesture-events';
import {TapEvent, LongPressEvent, DoubleTapEvent, SwipeEvent, PanEvent, PinchEvent} from 'web-gesture-events';

interface AppState {
  eventType: string;
  scale: number;
}
class App extends React.Component<{}, AppState> {
  private ref: HTMLElement | null = null;
  private onTapListener = this.onTap.bind(this);
  private onLongPressListener = this.onLongPress.bind(this);
  private onDoubleTapListener = this.onDoubleTap.bind(this);
  private onSwipeListener = this.onSwipe.bind(this);
  private onPanListener = this.onPan.bind(this);
  private onPinchListener = this.onPinch.bind(this);
  private onContextMenuListener = this.onContextMenu.bind(this);
  state: AppState = {
    eventType: '',
    scale: 0
  }

  componentDidMount() {
    // window.gestureProvider.config.minPointers = 2;
    window.addEventListener('tap', this.onTapListener);
    window.addEventListener('longpress', this.onLongPressListener);
    window.addEventListener('doubletap', this.onDoubleTapListener);
    window.addEventListener('swipe', this.onSwipeListener);
    window.addEventListener('pan', this.onPanListener);
    window.addEventListener('pinch', this.onPinchListener);
    window.addEventListener('contextmenu', this.onContextMenuListener);
  }

  componentWillUnmount() {
    window.removeEventListener('tap', this.onTapListener);
    window.removeEventListener('longpress', this.onLongPressListener);
    window.removeEventListener('doubletap', this.onDoubleTapListener);
    window.removeEventListener('swipe', this.onSwipeListener);
    window.removeEventListener('pan', this.onPanListener);
    window.removeEventListener('pinch', this.onPinchListener);
    window.removeEventListener('contextmenu', this.onContextMenuListener);
  }

  onTap(ev: TapEvent) {
    this.setState({eventType: ev.type, scale: ev.touches.length});
  }

  onLongPress(ev: LongPressEvent) {
    this.setState({eventType: ev.type});
  }

  onDoubleTap(ev: DoubleTapEvent) {
    this.setState({eventType: ev.type});
  }

  onSwipe(ev: SwipeEvent) {
    this.setState({eventType: `${ev.type} ${ev.direction}`});
  }

  onPan(ev: PanEvent) {
    this.setState({eventType: ev.type});
  }

  onPinch(ev: PinchEvent) {
    this.setState({eventType: ev.type, scale: ev.scale});
    // if (this.ref) {
    //   this.ref.style.transform = `scale(${this.state.scale})`;
    // }
  }

  onContextMenu(ev: Event) {
    ev.preventDefault();
    ev.stopPropagation();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header" ref={(ref) => {
          this.ref = ref;
        }}>
          <img src={logo} className="App-logo" alt="logo" />
          <p {...{longpressdelay: 600}}>
            {this.state.eventType.length ? this.state.eventType + '!' : ''}
          </p>
          <p>
            {this.state.scale ? 'Scale: ' + this.state.scale : ''}
          </p>
        </header>
      </div>
    );
  }
}

export default App;
