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
    private observer: ResizeObserver = new ResizeObserver(this.observe.bind(this));
    private ref: HTMLElement | null = null;
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
        
        if (this.ref) this.observer.unobserve(this.ref);
    }

    observe(entries: ResizeObserverEntry[]) {
        if (entries.length) {
            if (entries[0].contentRect.height > window.innerHeight) {
                document.body.classList.add('touch-auto');
                if (this.ref) {
                    this.ref.style.paddingBottom = '50px';
                }
            } else {
                document.body.classList.remove('touch-auto');
                if (this.ref) {
                    this.ref.style.paddingBottom = '0px';
                }
            }
        }
    }

    onContextMenu(e: Event) {
        e.preventDefault();
    }

    
    onTap() {
        this.setState({tap: true}, () => {
            setTimeout(() => {
                this.setState({tap: false});
            }, 100);
        });
    }

    onDoubleTap() {
        this.setState({doubleTap: true}, () => {
            setTimeout(() => {
                this.setState({doubleTap: false});
            }, 100);
        });
    }

    onTripleTap() {
        this.setState({tripleTap: true}, () => {
            setTimeout(() => {
                this.setState({tripleTap: false});
            }, 100);
        })
    }

    onLongPress() {
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
                ref.addEventListener('doubletap', this.onTripleTapListener);
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
            if (ref.classList.contains('tap-demo')) {
                if (this.ref) {
                    this.observer.unobserve(this.ref);
                }
                this.ref = ref;
                if (ref) {
                    this.observer.observe(ref);
                }
            }
        }
    }
    render() {
        return (
            <div className="tap-demo" ref={this.setRef}>
                <SharedElement id="navbar">
                    <Navbar title="Tap Demo" on_back={() => this.props.navigation.goBack()}/>
                </SharedElement>
                <div className="content">
                    <div ref={this.setRef} className="card tap" style={{opacity: this.state.tap ? '1' : '0.5'}}>
                        <h3>Tap</h3>
                    </div>
                    <div ref={this.setRef} className="card doubletap" style={{opacity: this.state.doubleTap ? '1' : '0.5'}}>
                        <h3>Double Tap</h3>
                    </div>
                    <div ref={this.setRef} className="card tripletap" {...{
                        "data-gesturetarget": true,
                        "data-numberoftaps": 1
                    }} style={{opacity: this.state.tripleTap ? '1' : '0.5'}}>
                        <h3>Triple Tap</h3>
                    </div>
                    <div ref={this.setRef} className="card longpress" style={{opacity: this.state.longPress ? '1' : '0.5'}}>
                        <h3>Long Press</h3>
                    </div>
                </div>
            </div>
        );
    }
}