import React from 'react';
import { Navigation, SharedElement } from 'react-motion-router';
import { RotateEvent } from 'web-gesture-events';
import {ReactComponent as Logo} from '../assets/Logo.svg';
import EventData from '../Components/EventData';
import Navbar from '../Components/Navbar';
import '../css/Rotate.css';

interface RotateDemoProps {
    navigation: Navigation;
}

interface RotateDemoState {
    rotation: number;
    rotationBase: number;
}

export default class RotateDemo extends React.Component<RotateDemoProps, RotateDemoState> {
    private logoRef: HTMLElement | null = null;
    private onRotateListener = this.onRotate.bind(this);
    private onRotateEndListener = this.onRotateEnd.bind(this);
    private setRef = this.onRef.bind(this);

    state: RotateDemoState = {
        rotation: 0,
        rotationBase: 0
    }

    onRef(ref: HTMLElement | null) {
        if (this.logoRef) {
            this.logoRef.removeEventListener('rotate', this.onRotateListener);
            this.logoRef.removeEventListener('rotateend', this.onRotateEndListener);
        }
        this.logoRef = ref;
        if (ref) {
            ref.addEventListener('rotate', this.onRotateListener);
            ref.addEventListener('rotateend', this.onRotateEndListener);
        }
    }

    onRotate(ev: RotateEvent) {
        const rotation = this.state.rotationBase + ev.rotationDeg;
        this.setState({rotation: rotation});
    }

    onRotateEnd() {
        this.setState({rotationBase: this.state.rotation});
    }
    render() {
        return (
            <div className="rotate-demo">
                <SharedElement id="navbar">
                    <Navbar title="Rotate Demo" on_back={() => this.props.navigation.goBack()} />
                </SharedElement>
                <EventData eventData={{rotation: `${this.state.rotation}°`}} />
                <div className="content">
                    <div className="logo-wrap" ref={this.setRef} style={{transform: `rotate(${this.state.rotation}deg)`}}>
                        <Logo width={window.innerWidth} height={window.innerHeight} />
                    </div>
                </div>
            </div>
        );
    }
}