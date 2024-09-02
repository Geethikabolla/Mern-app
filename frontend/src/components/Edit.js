import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function Edit() {
    const [form, setForm] = useState({
        name: "",
        position: "",
        level: ""
    });
    const [isLoading, setIsLoading] = useState(true);
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            const id = params.id;
            try {
                const response = await fetch(`${process.env.REACT_APP_YOUR_HOSTNAME}/record/${id}`);
                if (!response.ok) {
                    const message = `An error occurred: ${response.statusText}`;
                    window.alert(message);
                    navigate("/");
                    return;
                }

                const record = await response.json();
                setForm(record);
            } catch (error) {
                console.error("Error fetching record:", error);
                window.alert("Failed to fetch record. Please try again.");
                navigate("/");
            } finally {
                setIsLoading(false);
            }
        }

        fetchData();
    }, [params.id, navigate]);

    function updateForm(value) {
        setForm((prev) => ({
            ...prev,
            ...value
        }));
    }

    async function onSubmit(e) {
        e.preventDefault();

        if (!form.name || !form.position || !form.level) {
            window.alert("All fields are required.");
            return;
        }

        try {
            const response = await fetch(`${process.env.REACT_APP_YOUR_HOSTNAME}/record/update/${params.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(form)
            });

            if (!response.ok) {
                const message = `An error occurred: ${response.statusText}`;
                window.alert(message);
                return;
            }

            navigate("/");
        } catch (error) {
            console.error("Error updating record:", error);
            window.alert("Failed to update record. Please try again.");
        }
    }

    if (isLoading) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h3>Update Record</h3>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        value={form.name}
                        onChange={(e) => updateForm({ name: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="position">Position</label>
                    <input
                        type="text"
                        className="form-control"
                        id="position"
                        value={form.position}
                        onChange={(e) => updateForm({ position: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="positionOptions"
                            id="positionIntern"
                            value="Intern"
                            checked={form.level === "Intern"}
                            onChange={(e) => updateForm({ level: e.target.value })}
                        />
                        <label htmlFor="positionIntern" className="form-check-label">Intern</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="positionOptions"
                            id="positionJunior"
                            value="Junior"
                            checked={form.level === "Junior"}
                            onChange={(e) => updateForm({ level: e.target.value })}
                        />
                        <label htmlFor="positionJunior" className="form-check-label">Junior</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="positionOptions"
                            id="positionSenior"
                            value="Senior"
                            checked={form.level === "Senior"}
                            onChange={(e) => updateForm({ level: e.target.value })}
                        />
                        <label htmlFor="positionSenior" className="form-check-label">Senior</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="positionOptions"
                            id="positionTeamLead"
                            value="TeamLead"
                            checked={form.level === "TeamLead"}
                            onChange={(e) => updateForm({ level: e.target.value })}
                        />
                        <label htmlFor="positionTeamLead" className="form-check-label">TeamLead</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="positionOptions"
                            id="positionManager"
                            value="Manager"
                            checked={form.level === "Manager"}
                            onChange={(e) => updateForm({ level: e.target.value })}
                        />
                        <label htmlFor="positionManager" className="form-check-label">Manager</label>
                    </div>
                </div>
                <div className="form-group">
                    <input
                        type="submit"
                        value="Update Record"
                        className="btn btn-primary"
                    />
                </div>
            </form>
        </div>
    );
}
