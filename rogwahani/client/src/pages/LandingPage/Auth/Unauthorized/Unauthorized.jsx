import { Link } from "react-router-dom";

const Unauthorized = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-3xl font-bold text-red-600">
                Unauthorized Access
            </h1>
            <p className="mt-2 text-gray-500">
                You do not have permission to view this page.
            </p>
            <Link
                to="/"
                className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
            >
                Go Home
            </Link>
        </div>
    );
};

export default Unauthorized;
