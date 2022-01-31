import React, { Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Login from '../pages/Login';
import Home from '../pages/Home';
import Signup from '../pages/Signup';

const RootNavigation = () => {

    return (
        <BrowserRouter>
            <Suspense fallback={<div>Loading</div>} >
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/" element={<Navigate to="/home" />} />
                </Routes>
            </Suspense>
        </BrowserRouter>
    )
};

export default RootNavigation;