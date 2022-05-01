import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

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
import EditEmissions from '../pages/EditEmissions';
import EmissionsDetails from '../pages/EmissionsDetails';
import Facilities from '../pages/Facilities';
import Users from '../pages/Users'
import ApprovalStatus from '../pages/ApprovalStatus'
import MonthlyFacilityDetails from '../pages/ApprovalStatus/MonthlyFacilityDetails'
import Home from '../pages/Home';
import CompanyList from '../pages/CompanyList';
import CompanyDetails from '../pages/CompanyDetails';
import { rolesEnum } from '../layouts/DashboardLayout/pages';

const RootNavigation = () => {
    const role = useSelector((state) => state.auth.role);

    return (
        <BrowserRouter>
            <Suspense fallback={<div>Loading</div>} >
                <Routes>
                    <Route
                        path="/"
                        element={
                            <PublicRoute redirectTo="/dashboard">
                                <Home />
                            </PublicRoute>
                        }
                    />
                    <Route
                        path="/login/:userType"
                        element={
                            <PublicRoute redirectTo="/dashboard">
                                <Login />
                            </PublicRoute>
                        }
                    />
                    <Route
                        path="/signup"
                        element={
                            <PublicRoute>
                                <Signup />
                            </PublicRoute>
                        }
                    />
                    <Route
                        path="/change-password"
                        element={
                            <PrivateRoute redirectTo="/">
                                <ChangePassword />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/dashboard"
                        element={
                            <PrivateRoute redirectTo="/">
                                <Dashboard />
                            </PrivateRoute>
                        }
                    />
                    { role === rolesEnum.ADMIN && (
                        <>
                            <Route
                                path="/emissions/:type"
                                element={
                                    <PrivateRoute redirectTo="/">
                                        <Emissions />
                                    </PrivateRoute>
                                }
                            />
                            <Route
                                path="/emissions"
                                element={
                                    <PrivateRoute redirectTo="/">
                                        <Emissions />
                                    </PrivateRoute>
                                }
                            />
                            <Route
                                path="/emissions/add/:type"
                                element={
                                    <PrivateRoute redirectTo="/">
                                        <AddEmissions />
                                    </PrivateRoute>
                                }
                            />
                            <Route
                                path="/emissions/edit/:type/:id"
                                element={
                                    <PrivateRoute redirectTo="/">
                                        <EditEmissions />
                                    </PrivateRoute>
                                }
                            />
                            <Route
                                path="/emissions/:type/:id"
                                element={
                                    <PrivateRoute redirectTo="/">
                                        <EmissionsDetails />
                                    </PrivateRoute>
                                }
                            />
                            <Route
                                path="/approval-status/"
                                element={
                                    <PrivateRoute redirectTo="/login">
                                        <ApprovalStatus />
                                    </PrivateRoute>
                                }
                            />
                            <Route
                                path="/approval-status/:details"
                                element={
                                    <PrivateRoute redirectTo="/login">
                                        <MonthlyFacilityDetails />
                                    </PrivateRoute>
                                }
                            />
                            <Route
                                path="/goals"
                                element={
                                    <PrivateRoute redirectTo="/">
                                        <Goals />
                                    </PrivateRoute>
                                }
                            />
                            <Route
                                path="/simulations"
                                element={
                                    <PrivateRoute redirectTo="/">
                                        <Simulations />
                                    </PrivateRoute>
                                }
                            />
                            <Route
                                path="/benchmarking"
                                element={
                                    <PrivateRoute redirectTo="/">
                                        <Benchmarking />
                                    </PrivateRoute>
                                }
                            />
                            <Route
                                path="/reports"
                                element={
                                    <PrivateRoute redirectTo="/">
                                        <Reports />
                                    </PrivateRoute>
                                }
                            />
                            <Route
                                path="/help"
                                element={
                                    <PrivateRoute redirectTo="/">
                                        <Help />
                                    </PrivateRoute>
                                }
                            />
                            <Route
                                path="/facilities"
                                element={
                                    <PrivateRoute redirectTo="/">
                                        <Facilities />
                                    </PrivateRoute>
                                }
                            />
                            <Route
                                path="/users"
                                element={
                                    <PrivateRoute redirectTo="/">
                                        <Users />
                                    </PrivateRoute>
                                }
                            />
                        </>
                    )}
                    {role === rolesEnum.AUDITOR && (
                        <>
                            <Route
                                path="/companies"
                                element={
                                    <PrivateRoute redirectTo="/">
                                        <CompanyList />
                                    </PrivateRoute>
                                }
                            />
                            <Route
                                path="/company/:companyId"
                                element={
                                    <PrivateRoute redirectTo="/">
                                        <CompanyDetails />
                                    </PrivateRoute>
                                }
                            />
                        </>
                    )}
                    
                    <Route
                        path="/profile"
                        element={
                            <PrivateRoute redirectTo="/">
                                <Profile />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/settings"
                        element={
                            <PrivateRoute redirectTo="/">
                                <Settings />
                            </PrivateRoute>
                        }
                    />
                    
                    <Route path="/forgot-password/:userType" element={<ForgotPassword />} />
                    <Route path="/" element={<Navigate to="/" />} />
                </Routes>
            </Suspense>
        </BrowserRouter>
    )
};

export default RootNavigation;