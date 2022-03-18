import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import ForgotPassword from '../pages/ForgotPassword';
import Dashboard from '../pages/Dashboard';
import Goals from '../pages/Goals';
import Simulations from '../pages/Simulations';
import Emissions from '../pages/EmissionList';
import Settings from '../pages/Settings';
import ChangePassword from '../pages/ChangePassword'
import Benchmarking from '../pages/Benchmarking';
import Reports from '../pages/Reports';
import Help from '../pages/Help';
import Profile from '../pages/Profile';
import AddEmissions from '../pages/AddEmissions';
import Facilities from '../pages/Facilities';
import Users from '../pages/Users'

const RootNavigation = () => {
    return (
        <BrowserRouter>
            <Suspense fallback={<div>Loading</div>} >
                <Routes>
                    <Route
                        path="/login"
                        element={
                            <PublicRoute redirectTo="/dashboard">
                                <Login />
                            </PublicRoute>
                        }
                    />
                    <Route
                        path="/signup"
                        element={
                            <PublicRoute redirectTo="/dashboard">
                                <Signup />
                            </PublicRoute>
                        }
                    />
                    <Route
                        path="/change-password"
                        element={
                            <PrivateRoute redirectTo="/login">
                                <ChangePassword />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/dashboard"
                        element={
                            <PrivateRoute redirectTo="/login">
                                <Dashboard />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/emissions/:type"
                        element={
                            <PrivateRoute redirectTo="/login">
                                <Emissions />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/emissions"
                        element={
                            <PrivateRoute redirectTo="/login">
                                <Emissions />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/emissions/add/:type"
                        element={
                            <PrivateRoute redirectTo="/login">
                                <AddEmissions />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/goals"
                        element={
                            <PrivateRoute redirectTo="/login">
                                <Goals />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/simulations"
                        element={
                            <PrivateRoute redirectTo="/login">
                                <Simulations />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/benchmarking"
                        element={
                            <PrivateRoute redirectTo="/login">
                                <Benchmarking />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/reports"
                        element={
                            <PrivateRoute redirectTo="/login">
                                <Reports />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/help"
                        element={
                            <PrivateRoute redirectTo="/login">
                                <Help />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/profile"
                        element={
                            <PrivateRoute redirectTo="/login">
                                <Profile />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/settings"
                        element={
                            <PrivateRoute redirectTo="/login">
                                <Settings />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/facilities"
                        element={
                            <PrivateRoute redirectTo="/login">
                                <Facilities />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/users"
                        element={
                            <PrivateRoute redirectTo="/login">
                                <Users />
                            </PrivateRoute>
                        }
                    />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/" element={<Navigate to="/login" />} />
                </Routes>
            </Suspense>
        </BrowserRouter>
    )
};

export default RootNavigation;