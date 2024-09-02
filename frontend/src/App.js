import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import RecordList from './components/RecordList';
import Edit from './components/Edit';
import Create from './components/Create';

function App() {
    return (
        <Router>
            <Navbar />
            <div className="container mt-4">
                <Routes>
                    <Route path="/" element={<RecordList />} />
                    <Route path="/edit/:id" element={<Edit />} />
                    <Route path="/create" element={<Create />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
