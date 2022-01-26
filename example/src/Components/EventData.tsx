import React from 'react';
import '../css/EventData.css';

interface EventDataProps {
    eventData: Object;
}

interface EventDataState {
    eventData: Object;
}

export default class EventData extends React.Component<EventDataProps, EventDataState> {
    state: EventDataState = {
        eventData: this.props.eventData
    }

    static getDerivedStateFromProps(props: EventDataProps, state: EventDataState) {
        return {
            ...state,
            eventData: props.eventData
        };
    }

    render() {
        return (
            <div className="event-data">
                <div className="title">
                    <h3>Event Data</h3>
                    
                </div>
                <div className="content">
                {
                    Object.keys(this.state.eventData).map((eventDatumKey: string, index) => {
                        return (
                            <div className="event-datum" key={index}>
                                <div className="key">
                                    <h4>{eventDatumKey}:</h4>
                                </div>
                                <div className="value">
                                    <p>
                                        {this.state.eventData[eventDatumKey as keyof typeof this.state.eventData]}
                                    </p>
                                </div>
                            </div>
                        );
                    })
                }
                </div>
            </div>
        );
    }
}