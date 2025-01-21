import React, {useState} from "react";
import {Link} from "react-router-dom";

function ConventionAreaForm(){
    const [locationName, setLocationName] = useState("");
    const [venue, setVenue] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const newArea = {location_name: locationName, venue: venue};

        fetch("/convention_areas", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(newArea),
        }).then((response) => {
            if (response.ok) {
                response.json().then(() => {
                    setLocationName("");
                    setVenue("");
                })
            }
        })
    }
}

return (
    <div>
        <h1>Add Convention Area</h1>
        <form onSubmit={handleSubmit}>
            <label>
                Location Name:
                <input 
                    type = "text"
                    value = {locationName}
                    onChange ={(e) => setLocationName(e.target.value)}
                />
            </label>
            <br />
            <label>
                Venue:
                <input 
                    type = "text"
                    value = {venue}
                    onChange ={(e) => setVenue(e.target.value)}
                />
            </label>
            <br />
            <button type = "submit"> Submit </button>
        </form>
        <Link to="/"> Back to Home </Link>
    </div>
)

export default ConventionAreaForm