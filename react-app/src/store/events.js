const LOAD_EVENTS = "events/LOAD_EVENTS"
const LOAD_EVENT = "events/LOAD_EVENT"

const loadEvents = (events) => ({
    type: LOAD_EVENTS,
    events
})

const loadEvent = (event) => ({
    type: LOAD_EVENT,
    event
})

export const getEvents = () => async (dispatch) => {
    const res = await fetch('/api/event/events')
    const events = await res.json()
    dispatch(loadEvents(events))
}

export const getEvent = (id) => async (dispatch) => {
    console.log('id', id)
    const res = await fetch(`/api/event/${id}`)
    console.log('res', res)
    const event = await res.json()
    dispatch(loadEvent(event))
}

const initialState = { allEvents: {}, singleEvent: {} }

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_EVENTS:
            return { ...state, allEvents: action.events }

        case LOAD_EVENT:
            return { ...state, singleEvent: action.event }

        default:
            return state
    }


}




