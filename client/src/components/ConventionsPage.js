import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ConventionCard from "./ConventionCard";
import AddConventionForm from "./AddConventionForm";

function ConventionsPage() {
    const [{ data: conventions, error, status }, setConventions] = useState({
        data: null,
        error: null,
        status: "pending",
    });
    
    const { areaId } = useParams(); 
    
    useEffect(() => {
        fetch(`/conventions?convention_area_id=${areaId}`)
            .then((response) => {
                if (response.ok) {
                    response.json().then((data) =>
                        setConventions({ data, error: null, status: "resolved" })
                    );
                } else {
                    response.json().then((err) =>
                        setConventions({ data: null, error: err.error, status: "rejected" })
                    );
                }
            })
            .catch((err) =>
                setConventions({ data: null, error: err.message, status: "rejected" })
            );
    }, [areaId]); 

    const handleAddConvention = (newConvention) => {
        setConventions((prevState) => ({
            ...prevState,
            data: [...prevState.data, newConvention]
        }))
    }
    const handleDeleteConvention = (id) => {
        setConventions((prevState) => ({
            ...prevState,
            data: prevState.data.filter(convention => convention.id !== id)
        }));
    };
    
    if (status === "pending") return <h2>Loading...</h2>;
    if (status === "rejected") return <h2>Error: {error}</h2>;

    return (
        <div>
            <h1>Conventions in Area {areaId}</h1>
            {conventions && conventions.length > 0 ? (
                conventions.map((convention) => (
                    <ConventionCard 
                        key={convention.id} 
                        convention={convention}
                        onDelete={handleDeleteConvention}
                    />
                ))
            ) : (
                <p>No conventions found for this area.</p>
            )}
            <AddConventionForm areaId={areaId} onAddConvention={handleAddConvention} />
            <Link to="/">Back to Home</Link>
        </div>
    );
}

export default ConventionsPage;
