import React from 'react';
import Navbar from '../Components/Navbar';
import { Navigation, SharedElement } from 'react-motion-router';
import Map from '../assets/map.jpg';
import '../css/Pan.css';
import { PanEvent } from 'web-gesture-events';

interface PanDemoProps {
    navigation: Navigation;
}

interface PanDemoState {
    translate: {
        x: number;
        y: number;
    }
}
export default class PanDemo extends React.Component<PanDemoProps, PanDemoState> {
    private mapRef: HTMLElement | null = null;
    private onPanListener = this.onPan.bind(this);
    private setRef = this.onRef.bind(this);
    
    state: PanDemoState = {
        translate: {
            x: 10800 / 2,
            y: 5400 / 2
        }
    }

    onRef(ref: HTMLElement | null) {
        if (this.mapRef) {
            this.mapRef.removeEventListener('pan', this.onPanListener);
        }
        this.mapRef = ref;
        if (ref) {
            ref.addEventListener('pan', this.onPanListener);
        }
    }

    onPan(ev: PanEvent) {
        this.setState({translate: {
            x: this.state.translate.x + (ev.translation.clientX / 10),
            y: this.state.translate.y + (ev.translation.clientY / 10)
        }});
    }

    render() {
        return (
            <div className="pan-demo">
                <SharedElement id="navbar">
                    <Navbar title="Pan Event Demo" on_back={() => this.props.navigation.go_back()} />
                </SharedElement>
                <div className="content" ref={this.setRef}>
                    <div
                        style={{
                            backgroundImage: `url(${Map})`,
                            backgroundPositionX: `${this.state.translate.x}px`,
                            backgroundPositionY: `${this.state.translate.y}px`,
                            width: '100vw',
                            height: '100vh'
                        }}
                    />
                </div>
            </div>
        );
    }
}