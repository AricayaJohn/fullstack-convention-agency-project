import React, {useEffect, useState} from "react";
import {useParams, Link} from "react-router-dom";

function AttendeesPage(){
    const {conventionId} = useParams();
    const [attendees, setAttendees] = useState([])

    useEffect(() => {
        fetch(`/attendees?convention_id=${conventionId}`)
    })
}