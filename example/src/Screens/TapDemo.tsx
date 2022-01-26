import React from 'react';
import Navbar from '../Components/Navbar';
import {SharedElement, Navigation} from 'react-motion-router';
import '../css/Tap.css';
import { DoubleTapEvent, LongPressEvent, TapEvent } from 'web-gesture-events';

interface TapDemoProps {
    navigation: Navigation;
}

interface TapDemoState {
    tap: boolean;
    doubleTap: boolean;
    tripleTap: boolean;
    longPress: boolean;
}
export default class TapDemo extends React.Component<TapDemoProps, TapDemoState> {
    private tapRef: HTMLElement | null = null;
    private doubleTapRef: HTMLElement | null = null;
    private tripleTapRef: HTMLElement | null = null;
    private longPressRef: HTMLElement | null = null;
    private onTapListener = this.onTap.bind(this);
    private onDoubleTapListener = this.onDoubleTap.bind(this);
    private onTripleTapListener = this.onTripleTap.bind(this);
    private onLongPressListener = this.onLongPress.bind(this);
    private onTouchEndListener = this.onTouchEnd.bind(this);
    private onContextMenuListener = this.onContextMenu.bind(this);
    private setRef = this.onRef.bind(this);

    state: TapDemoState = {
        tap: false,
        doubleTap: false,
        tripleTap: false,
        longPress: false
    }

    componentDidMount() {
        window.addEventListener('contextmenu', this.onContextMenuListener);
    }

    componentWillUnmount() {
        window.removeEventListener('contextmenu', this.onContextMenuListener);
    }

    onContextMenu(e: Event) {
        e.preventDefault();
    }

    onTap(ev: TapEvent) {
        if (ev.gestureTarget !== this.tapRef) return;
        this.setState({tap: true}, () => {
            setTimeout(() => {
                this.setState({tap: false});
            }, 100);
        });
    }

    onDoubleTap(ev: DoubleTapEvent) {
        if (ev.gestureTarget !== this.doubleTapRef) return;
        this.setState({doubleTap: true}, () => {
            setTimeout(() => {
                this.setState({doubleTap: false});
            }, 100);
        });
    }

    onTripleTap(ev: DoubleTapEvent) {
        if (ev.gestureTarget !== this.tripleTapRef) return;
        this.setState({tripleTap: true}, () => {
            setTimeout(() => {
                this.setState({tripleTap: false});
            }, 100);
        })
    }

    onLongPress(ev: LongPressEvent) {
        if (ev.gestureTarget !== this.longPressRef) return;
        if ('vibrate' in navigator) {
            navigator.vibrate(100);
        }
        this.setState({longPress: true});
    }

    onTouchEnd() {
        this.setState({longPress: false});
    }

    onRef(ref: HTMLElement | null) {
        if (ref) {
            if (ref.classList.contains('tap')) {
                if (this.tapRef) {
                    this.tapRef.removeEventListener('tap', this.onTapListener);
                }
                this.tapRef = ref;
                ref.addEventListener('tap', this.onTapListener);
            }
            if (ref.classList.contains('doubletap')) {
                if (this.doubleTapRef) {
                    this.doubleTapRef.removeEventListener('doubletap', this.onDoubleTapListener);
                }
                this.doubleTapRef = ref;
                ref.addEventListener('doubletap', this.onDoubleTapListener);
            }
            if (ref.classList.contains('tripletap')) {
                if (this.tripleTapRef) {
                    this.tripleTapRef.removeEventListener('doubletap', this.onTripleTapListener);
                }
                this.tripleTapRef = ref;
                ref.addEventListener('tap', this.onTripleTapListener);
            }
            if (ref.classList.contains('longpress')) {
                if (this.longPressRef) {
                    this.longPressRef.removeEventListener('longpress', this.onLongPressListener);
                    this.longPressRef.addEventListener('touchend', this.onTouchEndListener);
                }
                this.longPressRef = ref;
                ref.addEventListener('longpress', this.onLongPressListener);
                ref.addEventListener('touchend', this.onTouchEndListener);
            }
        }
    }
    render() {
        return (
            <div className="tap-demo">
                <SharedElement id="navbar">
                    <Navbar title="Tap Demo" on_back={() => this.props.navigation.go_back()}/>
                </SharedElement>
                <div className="content">
                    <div ref={this.setRef} className="card tap" {...{"data-gesturetarget": true}} style={{opacity: this.state.tap ? '1' : '0.5'}}>
                        <h3>Tap</h3>
                    </div>
                    <div ref={this.setRef} className="card doubletap" {...{"data-gesturetarget": true}} style={{opacity: this.state.doubleTap ? '1' : '0.5'}}>
                        <h3>Double Tap</h3>
                    </div>
                    <div ref={this.setRef} className="card tripletap" {...{
                        "data-gesturetarget": true,
                        "data-numberoftaps": 2
                    }} style={{opacity: this.state.tripleTap ? '1' : '0.5'}}>
                        <h3>Triple Tap</h3>
                    </div>
                    <div ref={this.setRef} className="card longpress" {...{"data-gesturetarget": true}} style={{opacity: this.state.longPress ? '1' : '0.5'}}>
                        <h3>Long Press</h3>
                    </div>
                </div>
            </div>
        );
    }
}