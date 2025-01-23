import React, {useState} from "react";

function AddAttendeeForm({conventionId, onAddAttendee}) {
    const [name, setName] = useState("");
    const [profession, setProfession] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('/attendees', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                profession,
                conventionId: parseInt(conventionId)
            }),
        })
        .then(response => response.json())
        .then(newAttendee => {
            onAddAttendee(newAttendee);
            setName("");
            setProfession("");
        })
        .catch(error => console.error('Error:', error));
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Add New Attendee</h2>
            <label>
                name:
                <input 
                    type = "text"
                    value = {name}
                    onChange={(e) => setName(e.target.value)}
                />
            </label>
            <label>
                Profession:
                <input 
                    type = "text"
                    value = {profession}
                    onChange={(e) => setProfession(e.target.value)}
                />
            </label>
            <button type="submit">Add Attendee</button>
        </form>
    );
}

export default AddAttendeeForm;