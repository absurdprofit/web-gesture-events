import React from 'react';
import { Navigation, SharedElement } from 'react-motion-router';
import { PinchEndEvent, PinchEvent } from 'web-gesture-events';
import {ReactComponent as Logo} from '../assets/Logo.svg';
import Navbar from '../Components/Navbar';
import '../css/Pinch.css'

interface PinchDemoProps {
    navigation: Navigation;
}

interface PinchDemoState {
    scale: number;
    scaleBase: number;
}

export default class PinchDemo extends React.Component<PinchDemoProps, PinchDemoState> {
    private logoRef: HTMLElement | null = null;
    private onPinchListener = this.onPinch.bind(this);
    private onPinchEndListener = this.onPinchEnd.bind(this);
    private setRef = this.onRef.bind(this);

    state: PinchDemoState = {
        scale: 1,
        scaleBase: 1
    }

    onRef(ref: HTMLElement | null) {
        if (this.logoRef) {
            this.logoRef.removeEventListener('pinch', this.onPinchListener);
            this.logoRef.removeEventListener('pinchend', this.onPinchEndListener);
        }
        this.logoRef = ref;
        if (ref) {
            ref.addEventListener('pinch', this.onPinchListener);
            ref.addEventListener('pinchend', this.onPinchEndListener);
        }
    }
    
    onPinch(ev: PinchEvent) {
        const scale = (this.state.scaleBase * ev.scale).clamp(0.5, 30).toFixed(2);
        this.setState({scale: parseFloat(scale)});
    }
    onPinchEnd(ev: PinchEndEvent) {
        this.setState({scaleBase: this.state.scale});
    }

    render() {
        return(
            <div className="pinch-demo">
                <SharedElement id="navbar">
                    <Navbar title="Pinch Demo" on_back={() => this.props.navigation.goBack()} />
                </SharedElement>
                <div className="content">
                    <div className="logo-wrap" ref={this.setRef} style={{transform: `scale(${this.state.scale})`}}>
                        <Logo width={window.innerWidth} height={window.innerHeight} />
                    </div>
                </div>
            </div>
        );
    }
}