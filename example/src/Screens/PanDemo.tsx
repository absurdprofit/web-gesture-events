import React from 'react';
import Navbar from '../Components/Navbar';
import { Navigation, SharedElement } from 'react-motion-router';

interface PanDemoProps {
    navigation: Navigation;
}

export default class PanDemo extends React.Component<PanDemoProps, {}> {
    render() {
        return (
            <div className="pan-demo">
                <SharedElement id="navbar">
                    <Navbar title="Pan Event Demo" on_back={() => this.props.navigation.go_back()} />
                </SharedElement>
                Pan Demo
            </div>
        );
    }
}