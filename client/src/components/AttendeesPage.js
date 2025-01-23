import React, {useEffect, useState} from "react";
import {useParams, Link} from "react-router-dom";
import AddAttendeeForm from "./AddAttendeeForm";

function AttendeesPage(){
    const {conventionId} = useParams();
    const [attendees, setAttendees] = useState([])
    const [status, setStatus] = useState("pending");
    const [error, setError] = useState(null)

    useEffect(() => {
        fetch(`/attendees?convention_id=${conventionId}`)
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Failed to fetch attendees")
            }
        })
        .then((data) => {
            setAttendees([data]);
            setStatus("resolved")
        })
        .catch((err) => {
            setError(err.message);
            setStatus("rejected")
        });
    }, [conventionId])

    const handleAddAttendee = (newAttendee) => {
        setAttendees((prevState) => [...prevState, newAttendee]);
    };

    const handleDeleteAttendee = (id) => {
        fetch(`/attendees/${id}`, {
            method: 'DELETE',
        })
        .then((response) => {
            if (response.ok) {
                setAttendees((prevState) => prevState.filter(attendee => attendee.id !== id));
            } else {
                throw new Error ("Failede to delete attendee");
            }
        })
        .catch((error) => console.error('Error', error));
    }

    if (status === "pending") return <h2>Loading</h2>
    if (status === "rejected") return <h2>Error: {error}</h2>

    return (
        <div>
            <h1>Attendees for Convention {conventionId}</h1>
            {attendees.length > 0 ? (
                <ul>
                    {attendees.map((attendee) => (
                        <li key={attendee.id}>
                            <h3>{attendee.name}</h3>
                            <p>Profession: {attendee.profession}</p>
                            <button onClick={() => handleDeleteAttendee(attendee.id)}>Delete Attendee</button>
                        </li>
                    ))}
                </ul>
            ) :(
                <p> No attendees found for this convention.</p>
            )}
            <AddAttendeeForm conventionId={conventionId} onAddAttendee={handleAddAttendee} />
            <Link to={`/conventions/${conventionId}`}>Back to Convention Page</Link>
        </div>
    );
}

export default AttendeesPage;