import React from 'react';
import {Navigation, SharedElement} from 'react-motion-router';
import ListItemComponent from '../Components/ListItem';
import Navbar from '../Components/Navbar';
import '../css/Home.css';

interface HomeProps {
    navigation: Navigation;
}

interface ListItem {
    title: string;
    description: string;
    onClick: () => void;
}
export default function Home(props: HomeProps) {
    const list = [
        {
            title: 'Tap Demo',
            description: "Tap, Double Tap, Triple Tap or Long Press cards",
            onClick: () => props.navigation.navigate('/tap')
        },
        {
            title: 'Swipe Demo',
            description: "Swipe cards with swipe event listener",
            onClick: () => props.navigation.navigate('/swipe')
        },
        {
            title: 'Pan Demo',
            description: 'Pan map with pan event listener',
            onClick: () => props.navigation.navigate('/pan')
        },
        {
            title: 'Pinch Demo',
            description: 'Pinch to scale SVG',
            onClick: () => props.navigation.navigate('/pinch')
        }
    ]
    return (
        <div className="home">
            <SharedElement id="navbar">
                <Navbar title="Gesture Event Demo" />
            </SharedElement>
            <div className="list">
                {
                    list.map((item: ListItem, index: number) => {
                        return <ListItemComponent
                                    key={index}
                                    title={item.title}
                                    description={item.description}
                                    onClick={item.onClick}
                                />
                    })
                }
            </div>
        </div>
    )
}