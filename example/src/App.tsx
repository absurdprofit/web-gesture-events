import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'web-gesture-events';
import {TapEvent, LongPressEvent, DoubleTapEvent} from 'web-gesture-events';

interface AppState {
  eventType: string;
}
class App extends React.Component<{}, AppState> {
  private ref: HTMLElement | null = null;
  state: AppState = {
    eventType: ''
  }

  componentDidMount() {
    window.addEventListener('tap', (ev: TapEvent) => {
      this.setState({eventType: ev.type});
    });
    window.addEventListener('longpress', (ev: LongPressEvent) => {
      this.setState({eventType: ev.type});
      console.log(ev);
    });
    window.addEventListener('doubletap', (ev: DoubleTapEvent) => {
      this.setState({eventType: ev.type});
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            {this.state.eventType.length ? this.state.eventType + '!' : ''}
          </p>
        </header>
      </div>
    );
  }
}

export default App;
