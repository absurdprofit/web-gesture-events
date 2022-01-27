import React from 'react';
import '../css/Swipe.css';
import Navbar from '../Components/Navbar';
import { Navigation, SharedElement } from 'react-motion-router';
import { SwipeEvent } from 'web-gesture-events';
import EventData from '../Components/EventData';
import { resetCanvas } from '../common/utils';

interface SwipeDemoState {
    eventData: {
        direction: string;
        velocity: string;
    };
    touches: TouchList;
    draw: boolean;
}

interface SwipeDemoProps {
    navigation: Navigation;
}

export default class SwipeDemo extends React.Component<SwipeDemoProps, SwipeDemoState> {
    private canvasRef: HTMLCanvasElement | null = null;
    private swipeAreaRef: HTMLElement | null = null;
    private canvasContext: CanvasRenderingContext2D | null = null
    private setCanvasRef = this.onCanvasRef.bind(this);
    private setSwipeAreaRef = this.onSwipeAreaRef.bind(this);
    private onSwipeListener = this.onSwipe.bind(this);
    private onSwipeEndListener = this.onSwipeEnd.bind(this);
    private drawTouch = this.draw.bind(this);
    private endTimeout: number = 0;
    state: SwipeDemoState = {
        eventData: {
            direction: '',
            velocity: '',
        },
        touches: [] as unknown as TouchList,
        draw: true
    }

    componentDidMount() {
        this.drawTouch();
    }
    draw() {
        let devicePixelRatio = window.devicePixelRatio || 1;
        if (this.canvasRef && this.canvasContext && this.state.draw) {
            if(this.canvasRef.height !== window.innerHeight * devicePixelRatio) {
                resetCanvas(this.canvasRef, this.canvasContext);
            } else {
                // this.canvasContext.clearRect(0,0,this.canvasRef.width, this.canvasRef.height);
            }
            this.canvasContext.fillStyle= "#5A0FC8";
            this.canvasContext.lineWidth = 10;

            for (let i = 0; i < this.state.touches.length; i++) {
                this.canvasContext.beginPath();
                this.canvasContext.arc(this.state.touches[i].clientX, this.state.touches[i].clientY, 40, 0, Math.PI * 2, true);
                this.canvasContext.fill();
            }
        }
        requestAnimationFrame(this.drawTouch);
    }

    onSwipeAreaRef(ref: HTMLElement | null) {
        if (this.swipeAreaRef !== ref) {
            if (this.swipeAreaRef) {
                this.swipeAreaRef.removeEventListener('swipe', this.onSwipeListener);
                this.swipeAreaRef.removeEventListener('swipeend', this.onSwipeEndListener);
            }
            this.swipeAreaRef = ref;
            if (ref) {
                ref.addEventListener('swipe', this.onSwipeListener);
                ref.addEventListener('swipeend', this.onSwipeEndListener);
            }
        }
    }
    onCanvasRef(ref: HTMLCanvasElement | null) {
        if (this.canvasRef !== ref) {
            this.canvasRef = ref;
            if (ref) {
                // reset canvas
                this.canvasContext = ref.getContext('2d');
                if (this.canvasContext) {
                    resetCanvas(ref, this.canvasContext);
                }
            }
        }
    }

    onSwipe(ev: SwipeEvent) {
        if (this.endTimeout) {
            clearTimeout(this.endTimeout);
        }
        this.setState({eventData: {
                direction: ev.direction,
                velocity: ev.velocity.toFixed(2) + ' px/s'
            },
            touches: ev.changedTouches,
            draw: true
        });
    }

    onSwipeEnd() {
        this.endTimeout = window.setTimeout(() => {
            this.setState({eventData: {
                    direction: '',
                    velocity: ''
                },
                draw: false
            });
            if (this.canvasContext && this.canvasRef) {
                this.canvasContext.clearRect(0,0,this.canvasRef.width, this.canvasRef.height);
            }
        }, 500);
    }

    render() {
        return (
            <div className="swipe-demo">
                <SharedElement id="navbar">
                    <Navbar title="Swipe Event Demo" on_back={() => this.props.navigation.go_back()} />
                </SharedElement>
                <EventData eventData={this.state.eventData} />
                <div ref={this.setSwipeAreaRef} className="swipe-area"></div>
                <canvas ref={this.setCanvasRef}></canvas>
            </div>
        );
    }
}