import React from 'react';
import {SharedElement, Navigation} from 'react-motion-router';
import { PinchEvent, RotateEvent, PanEvent, PinchEndEvent } from 'web-gesture-events';
import Map from '../assets/map.jpg';
import Navbar from '../Components/Navbar';
import '../css/Compound.css';

interface CompoundDemoProps {
    navigation: Navigation;
}

interface CompoundDemoState {
    translate: {
        x: number;
        y: number;
    };
    rotation: number;
    scale: number;
    scaleBase: number;
}

export default class CompoundDemo extends React.Component<CompoundDemoProps, CompoundDemoState> {
    private onPanListener = this.onPan.bind(this);
    private onPinchListener = this.onPinch.bind(this);
    private onPinchEndListener = this.onPinchEnd.bind(this);
    private onRotateListener = this.onRotate.bind(this);
    private mapRef: HTMLElement | null = null;
    private setRef = this.onRef.bind(this);
    state: CompoundDemoState = {
        translate: {
            x: 10800 / 2,
            y: 5400 / 2
        },
        rotation: 0,
        scale: 0.3,
        scaleBase: 0.3
    }

    onRef(ref: HTMLElement | null) {
        if (this.mapRef) {
            this.mapRef.removeEventListener('pan', this.onPanListener);
            this.mapRef.removeEventListener('pinch', this.onPinchListener);
            this.mapRef.removeEventListener('pinchend', this.onPinchEndListener);
            this.mapRef.removeEventListener('rotate', this.onRotateListener);
        }
        this.mapRef = ref;
        if (ref) {
            ref.addEventListener('pan', this.onPanListener);
            ref.addEventListener('pinch', this.onPinchListener);
            ref.addEventListener('pinchend', this.onPinchEndListener);
            ref.addEventListener('rotate', this.onRotateListener);
        }
    }

    onRotate(ev: RotateEvent) {
        this.setState({rotation: this.state.scale + ev.rotationDeg});
    }

    onPinch(ev: PinchEvent) {
        const scale = (this.state.scaleBase * ev.scale).clamp(0.1, 30).toFixed(2);
        this.setState({scale: parseFloat(scale)});
    }

    onPinchEnd(ev: PinchEndEvent) {
        this.setState({scaleBase: this.state.scale});
    }
    onPan(ev: PanEvent) {
        if (ev.touches.length > 1) return;
        const x = this.state.translate.x + (ev.translation.clientX / this.state.scale * (ev.velocity / 400) / 10);
        const y = this.state.translate.y + ((ev.translation.clientY / this.state.scale * (ev.velocity / 400)) / 10);
        this.setState({
            translate: {
                x: x,
                y: y
            }
        });
    }
    render() {
        return (
            <div className="compound-demo">
                <SharedElement id="navbar">
                    <Navbar title="Compound Demo" on_back={() => this.props.navigation.go_back()} />
                </SharedElement>
                <div className="content" ref={this.setRef}>
                    <div
                        style={{
                            backgroundImage: `url(${Map})`,
                            backgroundPositionX: `${this.state.translate.x * this.state.scale}px`,
                            backgroundPositionY: `${this.state.translate.y * this.state.scale}px`,
                            backgroundSize: `${10800 * this.state.scale}px ${5400 * this.state.scale}px`,
                            width: '400vw',
                            height: '400vh',
                            transform: `translate(-200vw, -200vw) rotate(${this.state.rotation}deg)`
                        }}
                    />
                    </div>
            </div>
        );
    }
}