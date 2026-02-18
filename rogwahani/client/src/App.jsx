import React from "react";
import { useState, useEffect, useCallback } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthGuard from "./routes/AuthGuard";
import { useSelector } from "react-redux";

// Splash Screen
import SplashScreen from "./pages/SplashScreen/SplashScreen";
import "./pages/SplashScreen/SplashScreen.css";

// pages
import LandingPageNavbar from "./pages/LandingPage/Navbar";
import LandingPage from "./pages/LandingPage/LandingPage";
import Signup from "./pages/LandingPage/Auth/Signup/Signup";
import AuthLogin from "./pages/LandingPage/Auth/Login/Login";
import Unauthorized from "./pages/LandingPage/Auth/Unauthorized/Unauthorized";

// users
import AppLayout from "./pages/Users/components/AppLayout";
import Profile from "./pages/Users/Profile/Profile";
import NotFound from "./pages/Users/components/NotFound";
import UserDashboard from "./pages/Users/Dashboard/Dashboard";
import BookAmbulance from "./pages/Users/Book_Ambulance/Book_Ambulance";
import BookingHistory from "./pages/Users/Booking_History/Booking_History";
import SavedLocations from "./pages/Users/SavedLocations/SavedLocations";
import EmergencyContacts from "./pages/Users/EmergencyContacts/EmergencyContacts";
import RateAndReview from "./pages/Users/RateAndReview/RateAndReview";
import NearbyHospitals from "./pages/Users/NearbyHospitals/NearbyHospitals";
import TrackAmbulance from "./pages/Users/TrackAmbulance/TrackAmbulance";

// driver
import DriverDashboardLayout from "./pages/Driver/Components/DriverDashboardLayout";
import DriverDashboard from "./pages/Driver/Dashboard/DriverDashboard";
import VehicleDetails from "./pages/Driver/VehicleDetails/VehicleDetails";

// admin
import DashboardLayout from "./pages/Admin/Components/DashboardLayout";
import Dashboard from "./pages/Admin/Dashboard/Dashboard";
import All_users from "./pages/Admin/All_users/All_users";
import Hospitals from "./pages/Admin/Hospitals/Hospitals";

const App = () => {
    const [showSplash, setShowSplash] = useState(true);
    const { user, token } = useSelector((state) => state.auth);

    const handleSplashFinish = useCallback(() => {
        setShowSplash(false);
    }, []);

    // Show splash screen
    if (showSplash) {
        return <SplashScreen onFinish={handleSplashFinish} />;
    }

    return (
        <Router>
            {user === null && token === null ? (
                <>
                    <LandingPageNavbar />
                    <Routes>
                        <Route path="/" element={<LandingPage />} />
                        <Route path="/login" element={<AuthLogin />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route
                            path="/unauthorized"
                            element={<Unauthorized />}
                        />
                    </Routes>
                </>
            ) : (
                ""
            )}

            {user?.role == "user" && token ? (
                <AppLayout>
                    <Routes>
                        <Route
                            element={
                                <AuthGuard allowedRoles={["user", "admin"]} />
                            }
                        >
                            <Route path="/" element={<UserDashboard />} />
                            <Route
                                path="/book-ambulance"
                                element={<BookAmbulance />}
                            />
                            <Route
                                path="/history"
                                element={<BookingHistory />}
                            />
                            <Route
                                path="/saved-locations"
                                element={<SavedLocations />}
                            />
                            <Route
                                path="/emergency-contacts"
                                element={<EmergencyContacts />}
                            />
                            <Route
                                path="/reviews"
                                element={<RateAndReview />}
                            />
                            <Route
                                path="/nearby-hospitals"
                                element={<NearbyHospitals />}
                            />
                            <Route
                                path="/track-ambulance"
                                element={<TrackAmbulance />}
                            />

                            <Route path="/profile" element={<Profile />} />
                            <Route path="*" element={<NotFound />} />
                        </Route>
                    </Routes>
                </AppLayout>
            ) : (
                ""
            )}

            {user?.role == "driver" && token ? (
                <DriverDashboardLayout>
                    <Routes>
                        <Route
                            element={
                                <AuthGuard allowedRoles={["driver", "admin"]} />
                            }
                        >
                            <Route path="/" element={<DriverDashboard />} />
                            <Route
                                path="/vehicle-details"
                                element={<VehicleDetails />}
                            />
                            <Route
                                path="/book-ambulance"
                                element={<BookAmbulance />}
                            />
                            <Route
                                path="/history"
                                element={<BookingHistory />}
                            />
                            <Route
                                path="/saved-locations"
                                element={<SavedLocations />}
                            />
                            <Route
                                path="/emergency-contacts"
                                element={<EmergencyContacts />}
                            />
                            <Route
                                path="/reviews"
                                element={<RateAndReview />}
                            />
                            <Route
                                path="/nearby-hospitals"
                                element={<NearbyHospitals />}
                            />
                            <Route
                                path="/track-ambulance"
                                element={<TrackAmbulance />}
                            />

                            <Route path="/profile" element={<Profile />} />
                            <Route path="*" element={<NotFound />} />
                        </Route>
                    </Routes>
                </DriverDashboardLayout>
            ) : (
                ""
            )}

            {/* Admin-Only Route */}
            {user?.role == "admin" && token ? (
                <DashboardLayout>
                    <Routes>
                        <Route element={<AuthGuard allowedRoles={["admin"]} />}>
                            <Route path="/" element={<Dashboard />} />
                            <Route path="/dashboard" element={<Dashboard />} />
                            <Route path="/all_users" element={<All_users />} />
                            <Route path="/hospitals" element={<Hospitals />} />
                        </Route>
                    </Routes>
                </DashboardLayout>
            ) : (
                ""
            )}
        </Router>
    );
};
export default App;
