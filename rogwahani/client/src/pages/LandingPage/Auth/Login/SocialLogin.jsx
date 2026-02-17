import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
    googleProvider,
    githubProvider,
    facebookProvider,
    socialLogin,
} from "./../../../../firebase";
import { setUser } from "./../../../../store/slices/authSlice";
import axios from "axios";
import { motion } from "framer-motion";

import { BsGoogle, BsGithub, BsFacebook } from "react-icons/bs";

const SocialLogin = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // 🔹 Handle Social Login and Send Data to Backend
    const handleSocialLogin = async (provider) => {
        const user = await socialLogin(provider);
        console.log(user);

        if (user) {
            // 🔹 Extract Required Data
            const userData = {
                fullname: user.displayName,
                email: user.email,
                password: "SOCIAL_LOGIN", // Placeholder since no password is provided
                social_login: {
                    providerId: user.providerId,
                    uid: user.uid,
                    photoURL: user.photoURL,
                },
            };
            console.log(userData);

            // 🔹 Send Data to Backend
            try {
                const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
                const response = await axios.post(
                    `${BACKEND_URL}/api/auth/social-login`,
                    userData
                );

                if (response.status === 200) {
                    dispatch(
                        setUser({
                            user: response.data.user,
                            token: response.data.token,
                        })
                    );
                    navigate("/"); // Redirect after login
                } else {
                    console.error("Social login error:", response.data.message);
                }
            } catch (error) {
                console.error("Error sending signup data:", error);
            }
        }
    };

    return (
        <div className="grid grid-cols-1 gap-4 mb-8">
            <motion.button
                onClick={() => handleSocialLogin(googleProvider)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 justify-center text-white font-semibold  p-3 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors"
            >
                <BsGoogle className="text-xl text-white" /> Login with Google
            </motion.button>
            {/* <motion.button
                onClick={() => handleSocialLogin(githubProvider)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center p-3 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors"
            >
                <BsGithub className="text-xl text-white" />
            </motion.button>
            <motion.button
                onClick={() => handleSocialLogin(facebookProvider)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center p-3 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors"
            >
                <BsFacebook className="text-xl text-white" />
            </motion.button> */}
        </div>
    );
};

export default SocialLogin;
