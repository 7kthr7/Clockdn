import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { getEvent } from '../../store/events';
import { useDispatch, useSelector } from 'react-redux';

const SingleEvent = () => {
    const dispatch = useDispatch();
    const event = useSelector(state => state.events.singleEvent);
    const [isLoaded, setIsLoaded] = useState(false);
    const { eventId } = useParams();

    useEffect(() => {
        dispatch(getEvent(eventId))
        setIsLoaded(true)
    }, [dispatch, eventId])

    if (!isLoaded) {
        return null;
    }

    return (
        <div className="event-container">
            <div className="event-header">
                <h1>{event.event_name}</h1>
            </div>
            <div className="event-body">
                <div className="event-card">
                    <div className="event-card-header">
                        <h2>{event.event_name}</h2>
                        <h3>{event.event_city}, {event.event_state}</h3>
                    </div>
                    <div className="event-card-image">
                    <img src={event.event_image} alt="event" style={{ width: '250px', border: '1px solid pink' }}/>

                    </div>
                    <div className="event-card-body">
                        <p>{event.event_description}</p>
                        <p>{event.event_start_date}</p>
                        <p>{event.event_end_date}</p>
                        <p>{event.event_start_time}</p>
                        <p>{event.event_end_time}</p>
                        <p>{event.event_type}</p>
                        <p>{event.event_address}</p>
                        <p>{event.event_link}</p>
                        <p>{event.event_owner}</p>
        // have to figure out how to get the event owner to show up with their name and lastname


                    </div>
                    <div className="event-card-footer">
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SingleEvent;