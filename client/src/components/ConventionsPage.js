import React, {useEffect, useState} from "react";
import {useParams, Link} from "react-router-dom";
import ConventionCard from "./ConventionCard";

function ConventionsPage() {
    const [{ data: convention, error, status }, setConvention] = useState({
        data: null,
        error: null,
        status: "pending",
    });
    const { id } = useParams();

    useEffect(() => {
        fetch(`/conventions/${id}`).then((response) => {
            if(response.ok) {
                response.json().then((data) => 
                    setConvention({ data, error: null, status: "resolved"})
                );
            } else {
                response.json().then((err) => 
                    setConvention({data: null, error: err.error, status: "rejected"})
               );
            }
        });
    }, [id]);

    if (status === "pending") return <h2>Loading...</h2>
    if (status === "rejected") return <h2>Error: {error}</h2>

    return (
        <div>
            <h1>Convention</h1>
            {convention ? (
                <ConventionCard key={convention.id} convention={convention} />
            ) : (
                <p>Convention not found</p>
            )}
            <Link to="/"> Back to Home </Link>
        </div>
    );
};

export default ConventionsPage