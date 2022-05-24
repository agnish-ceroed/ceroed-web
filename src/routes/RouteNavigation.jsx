import React, { Suspense } from 'react';
import _ from 'lodash';
import { useSelector } from 'react-redux';
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
import AuditSummaryYearly from '../pages/AuditSummaryYearly'
import ApprovalStatus from '../pages/ApprovalStatus'
import MonthlyFacilityDetails from '../pages/ApprovalStatus/MonthlyFacilityDetails'
import CurrentYearApproval from '../pages/CurrentYearApproval'
import Home from '../pages/Home';
import CompanyList from '../pages/CompanyList';
import CompanyDetails from '../pages/CompanyDetails';
import AuditorDashboard from '../pages/AuditorDashboard';
import AuditDetails from '../pages/CompanyDetails/AuditDetails';
import CompanySettings from '../pages/CompanySettings';
import { rolesEnum, sideMenuItems } from '../layouts/DashboardLayout/pages';

const RootNavigation = () => {
    const role = useSelector((state) => state.auth.role);
    const redirectLink = sideMenuItems.find(item => !_.isEmpty(item.roles.find(userRole => userRole === role)))?.path
    const allRoles = Object.keys(rolesEnum).map(item => rolesEnum[item])

    return (
        <BrowserRouter>
            <Suspense fallback={<div>Loading</div>} >
                <Routes>
                    <Route
                        path="/"
                        element={
                            <PublicRoute redirectTo={redirectLink}>
                                <Home />
                            </PublicRoute>
                        }
                    />
                    <Route
                        path="/login/:userType"
                        element={
                            <PublicRoute redirectTo={redirectLink}>
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
                            <PrivateRoute redirectTo="/" rolesAllowed={allRoles}>
                                <ChangePassword />
                            </PrivateRoute>
                        }
                    />
                            {role !== rolesEnum.AUDITOR &&(<Route
                                path="/dashboard"
                                element={
                                    <PrivateRoute redirectTo="/" rolesAllowed={[rolesEnum.ADMIN,rolesEnum.SUSTAINABILITY_MANAGER, rolesEnum.FACILITY_MANAGER, rolesEnum.BUSINESS_USER, rolesEnum.APPROVER]}>
                                        <Dashboard />
                                    </PrivateRoute>
                                }
                            />)}
                            <Route
                                path="/audit-status/"
                                element={
                                    <PrivateRoute redirectTo="/" rolesAllowed={[rolesEnum.SUSTAINABILITY_MANAGER]}>
                                        <AuditSummaryYearly />
                                    </PrivateRoute>
                                }
                            />
                            <Route
                                path="/audit-status/current-year-approval/:year"
                                element={
                                    <PrivateRoute redirectTo="/" rolesAllowed={[rolesEnum.SUSTAINABILITY_MANAGER]}>
                                        <CurrentYearApproval />
                                    </PrivateRoute>
                                }
                            />
                            <Route
                                path="/approval-status/:year"
                                element={
                                    <PrivateRoute redirectTo="/" rolesAllowed={[rolesEnum.ADMIN,rolesEnum.SUSTAINABILITY_MANAGER, rolesEnum.FACILITY_MANAGER, rolesEnum.BUSINESS_USER, rolesEnum.APPROVER]}>
                                        <MonthlyFacilityDetails />
                                    </PrivateRoute>
                                }
                            />
                            <Route
                                path="/approval-status/"
                                element={
                                    <PrivateRoute redirectTo="/" rolesAllowed={[rolesEnum.ADMIN,rolesEnum.SUSTAINABILITY_MANAGER, rolesEnum.FACILITY_MANAGER, rolesEnum.BUSINESS_USER, rolesEnum.APPROVER]}>
                                        <ApprovalStatus />
                                    </PrivateRoute>
                                }
                            />
                            <Route
                                path="/emissions/:type"
                                element={
                                    <PrivateRoute redirectTo="/" rolesAllowed={[rolesEnum.FACILITY_MANAGER, rolesEnum.BUSINESS_USER, rolesEnum.APPROVER]}>
                                        <Emissions />
                                    </PrivateRoute>
                                }
                            />
                            <Route
                                path="/emissions"
                                element={
                                    <PrivateRoute redirectTo="/" rolesAllowed={[rolesEnum.FACILITY_MANAGER, rolesEnum.BUSINESS_USER, rolesEnum.APPROVER]}>
                                        <Emissions />
                                    </PrivateRoute>
                                }
                            />
                            <Route
                                path="/emissions/add/:type"
                                element={
                                    <PrivateRoute redirectTo="/" rolesAllowed={[rolesEnum.FACILITY_MANAGER, rolesEnum.BUSINESS_USER, rolesEnum.APPROVER]}>
                                        <AddEmissions />
                                    </PrivateRoute>
                                }
                            />
                            <Route
                                path="/emissions/edit/:type/:id"
                                element={
                                    <PrivateRoute redirectTo="/" rolesAllowed={[rolesEnum.FACILITY_MANAGER, rolesEnum.BUSINESS_USER, rolesEnum.APPROVER]}>
                                        <EditEmissions />
                                    </PrivateRoute>
                                }
                            />
                            <Route
                                path="/emissions/:type/details/:id"
                                element={
                                    <PrivateRoute redirectTo="/" rolesAllowed={[rolesEnum.FACILITY_MANAGER, rolesEnum.BUSINESS_USER, rolesEnum.APPROVER]}>
                                        <EmissionsDetails />
                                    </PrivateRoute>
                                }
                            />
                            <Route
                                path="/goals"
                                element={
                                    <PrivateRoute redirectTo="/" rolesAllowed={[rolesEnum.ADMIN,rolesEnum.SUSTAINABILITY_MANAGER, rolesEnum.FACILITY_MANAGER, rolesEnum.BUSINESS_USER, rolesEnum.APPROVER, rolesEnum.AUDITOR]}>
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
                                    <PrivateRoute redirectTo="/" rolesAllowed={[rolesEnum.ADMIN,rolesEnum.SUSTAINABILITY_MANAGER, rolesEnum.FACILITY_MANAGER, rolesEnum.BUSINESS_USER, rolesEnum.APPROVER]}>
                                        <Reports />
                                    </PrivateRoute>
                                }
                            />
                    {role === rolesEnum.AUDITOR && (
                        <>
                            <Route
                                path="/dashboard"
                                element={
                                    <PrivateRoute redirectTo="/" rolesAllowed={[rolesEnum.AUDITOR]}>
                                        <AuditorDashboard />
                                    </PrivateRoute>
                                }
                            />
                            <Route
                                path="/companies"
                                element={
                                    <PrivateRoute redirectTo="/" rolesAllowed={[rolesEnum.AUDITOR]}>
                                        <CompanyList />
                                    </PrivateRoute>
                                }
                            />
                            <Route
                                path="/companies/:company/audit/:id"
                                element={
                                    <PrivateRoute redirectTo="/" rolesAllowed={[rolesEnum.AUDITOR]}>
                                        <AuditDetails />
                                    </PrivateRoute>
                                }
                            />
                            <Route
                                path="/companies/:company/year/:year"
                                element={
                                    <PrivateRoute redirectTo="/" rolesAllowed={[rolesEnum.AUDITOR]}>
                                        <AuditDetails />
                                    </PrivateRoute>
                                }
                            />
                            <Route
                                path="/companies/:companyId"
                                element={
                                    <PrivateRoute redirectTo="/" rolesAllowed={[rolesEnum.AUDITOR]}>
                                        <CompanyDetails />
                                    </PrivateRoute>
                                }
                            />
                        </>
                    )}
                    <Route
                        path="/help"
                        element={
                            <PrivateRoute redirectTo="/" rolesAllowed={allRoles}>
                                <Help />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/profile"
                        element={
                            <PrivateRoute redirectTo="/" rolesAllowed={allRoles}>
                                <Profile />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/settings"
                        element={
                            <PrivateRoute redirectTo="/" rolesAllowed={allRoles}>
                                <Settings />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/company-settings"
                        element={
                            <PrivateRoute redirectTo="/" rolesAllowed={allRoles}>
                                <CompanySettings />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/facilities"
                        element={
                            <PrivateRoute redirectTo="/" rolesAllowed={[rolesEnum.ADMIN, rolesEnum.SUSTAINABILITY_MANAGER]}>
                                <Facilities />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/users"
                        element={
                            <PrivateRoute redirectTo="/" rolesAllowed={[rolesEnum.ADMIN]}>
                                <Users />
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