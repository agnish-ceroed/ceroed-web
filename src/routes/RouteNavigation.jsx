import React, { Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Login from '../pages/Login';
import Home from '../pages/Home'

const RootNavigation = () => {

    return (
        <BrowserRouter>
            <Suspense fallback={<div>Loading</div>} >
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/" element={<Navigate to="/home" />} />
                </Routes>
            </Suspense>
        </BrowserRouter>
    )
};

export default RootNavigation;