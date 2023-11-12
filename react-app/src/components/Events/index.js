import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getEvents } from '../../store/events';
import { useDispatch, useSelector } from 'react-redux';


const Events = () => {
    const dispatch = useDispatch();
    const events = useSelector(state => state.events.allEvents);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        dispatch(getEvents())
        setIsLoaded(true)
    }, [dispatch])

    if (!isLoaded) {
        return null;
    }

    return (
        <div className="events-container">
            <div className="events-header">
                <h1>Events</h1>
            </div>
            <div className="events-body">
                {Object.values(events).map((event) => (
                    <div className="event-card">
                        <div className="event-card-header">
                            <h3>{event.event_name}, {event.event_city}</h3>
                        </div>
                        <div className="event-card-body">
                            <p>{event.description}</p>
                        </div>
                        <div className="event-card-footer">
                            <Link to={`/singleEvent/${event.id}`}><button>View Event</button></Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Events;