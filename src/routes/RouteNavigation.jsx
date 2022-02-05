import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import Goals from '../pages/Goals';
import Simulations from '../pages/Simulations';
import Emissions from '../pages/EmissionList';
import Settings from '../pages/Settings';
import Benchmarking from '../pages/Benchmarking';
import Reports from '../pages/Reports';
import Help from '../pages/Help';
import Profile from '../pages/Profile';
import Signup from '../pages/Signup';

const RootNavigation = () => {

    return (
        <BrowserRouter>
            <Suspense fallback={<div>Loading</div>} >
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/dashboard" element={< Dashboard/>} />
                    <Route path="/emissions" element={< Emissions/>} />
                    <Route path="/goals" element={< Goals/>} />
                    <Route path="/simulations" element={< Simulations/>} />
                    <Route path="/benchmarking" element={< Benchmarking/>} />
                    <Route path="/reports" element={< Reports/>} />
                    <Route path="/help" element={< Help/>} />
                    <Route path="/profile" element={< Profile/>} />
                    <Route path="/" element={<Navigate to="/login" />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/settings" element={< Settings/>} />
                </Routes>
            </Suspense>
        </BrowserRouter>
    )
};

export default RootNavigation;