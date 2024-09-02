import React, { useState, useEffect } from 'react';
import { getRecords, deleteRecord } from './api';

export default function RecordList() {
    const [records, setRecords] = useState([]);

    useEffect(() => {
        async function fetchRecords() {
            try {
                const data = await getRecords();
                setRecords(data);
            } catch (error) {
                console.error('Error fetching records:', error);
            }
        }

        fetchRecords();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this record?')) {
            try {
                await deleteRecord(id);
                setRecords(records.filter(record => record._id !== id));
            } catch (error) {
                console.error('Error deleting record:', error);
            }
        }
    };

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
                    {records.map(record => (
                        <tr key={record._id}>
                            <td>{record.name}</td>
                            <td>{record.position}</td>
                            <td>{record.level}</td>
                            <td>
                                <Link className="btn btn-link" to={`/edit/${record._id}`}>Edit</Link> |
                                <button className="btn btn-link" onClick={() => handleDelete(record._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
