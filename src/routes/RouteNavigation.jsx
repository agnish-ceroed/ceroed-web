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
import EditEmissions from '../pages/EditEmissions';
import EmissionsDetails from '../pages/EmissionsDetails';
import Facilities from '../pages/Facilities';
import Users from '../pages/Users'
import ApprovalMonthlySummary from '../pages/ApprovalMonthlySummary'
import AuditSummaryYearly from '../pages/AuditSummaryYearly'
import CurrentYearApproval from '../pages/CurrentYearApproval'
import Home from '../pages/Home';
import CompanyList from '../pages/CompanyList';

const RootNavigation = () => {
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
                    <Route
                        path="/dashboard/approval-monthly-summary"
                        element={
                            <PrivateRoute redirectTo="/login">
                                <ApprovalMonthlySummary />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/dashboard/audit-yearly-summary"
                        element={
                            <PrivateRoute redirectTo="/login">
                                <AuditSummaryYearly />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/dashboard/current-year-approval:year"
                        element={
                            <PrivateRoute redirectTo="/login">
                                <CurrentYearApproval />
                            </PrivateRoute>
                        }
                    />
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

                    <Route
                        path="/companies"
                        element={
                            <PrivateRoute redirectTo="/">
                                <CompanyList />
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