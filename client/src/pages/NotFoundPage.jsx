import React from "react";

const NotFoundPage = () => {
    return (
        <>
            <div className="w-full h-screen flex flex-col items-center justify-center bg-radial from-white via-yellow-50 to-yellow-100">
                <h1 className="text-5xl font-black">404</h1>
                <h1 className="text-4xl font-black">OOPS!</h1>
                <h2>Seems like the page you are looking for does not exist</h2>
            </div>
        </>
    );
};

export default NotFoundPage;
