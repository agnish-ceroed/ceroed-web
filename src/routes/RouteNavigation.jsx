import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Login from '../pages/Login';
import Home from '../pages/Home';
import Signup from '../pages/Signup';
import Dashboard from '../pages/Dashboard';
import Emissions from '../pages/EmissionList';
import Contacts from '../pages/Contacts';
import Email from '../pages/Email';
import Tasks from '../pages/Tasks';
import Settings from '../pages/Settings';
import Deals from '../pages/Deals';
import Chat from '../pages/Chat';

const RootNavigation = () => {

    return (
        <BrowserRouter>
            <Suspense fallback={<div>Loading</div>} >
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/dashboard" element={< Dashboard/>} />
                    <Route path="/emissions" element={< Emissions/>} />
                    <Route path="/contacts" element={< Contacts/>} />
                    <Route path="/email" element={< Email/>} />
                    <Route path="/tasks" element={< Tasks/>} />
                    <Route path="/deals" element={< Deals/>} />
                    <Route path="/chat" element={< Chat/>} />
                    <Route path="/settings" element={< Settings/>} />
                    <Route path="/" element={<Navigate to="/home" />} />
                </Routes>
            </Suspense>
        </BrowserRouter>
    )
};

export default RootNavigation;