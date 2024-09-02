import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Record = (props) => {
    return (
        <tr>
            <td>{props.record.name}</td>
            <td>{props.record.position}</td>
            <td>{props.record.level}</td>
            <td>
                <Link className="btn btn-link" to={`/edit/${props.record._id}`}>Edit</Link> |
                <button
                    className="btn btn-link"
                    onClick={() => props.deleteRecord(props.record._id)}
                >
                    Delete
                </button>
            </td>
        </tr>
    );
};

export default function RecordList() {
    const [records, setRecords] = useState([]);

    useEffect(() => {
        async function getRecords() {
            try {
                const response = await fetch(`${process.env.REACT_APP_YOUR_HOSTNAME}/record/`);

                if (!response.ok) {
                    throw new Error(`An error occurred: ${response.statusText}`);
                }

                const records = await response.json();
                setRecords(records);
            } catch (error) {
                window.alert(error.message);
            }
        }

        getRecords();
    }, []);  // Empty dependency array

    async function deleteRecord(id) {
        const result = window.confirm("Will this employee be removed from the list?");
        if (!result) {
            return;
        }

        try {
            const response = await fetch(`${process.env.REACT_APP_YOUR_HOSTNAME}/record/${id}`, {
                method: "DELETE"
            });

            if (!response.ok) {
                throw new Error(`An error occurred: ${response.statusText}`);
            }

            const newRecords = records.filter((el) => el._id !== id);
            setRecords(newRecords);
        } catch (error) {
            window.alert(error.message);
        }
    }

    return (
        <div>
            <h3>Record List</h3>
            <table className="table table-striped" style={{ marginTop: 20 }}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Position</th>
                        <th>Level</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {records.map((record) => (
                        <Record key={record._id} record={record} deleteRecord={deleteRecord} />
                    ))}
                </tbody>
            </table>
        </div>
    );
}
