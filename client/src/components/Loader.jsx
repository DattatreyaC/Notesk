import { LoaderCircle } from "lucide-react";
import React from "react";

const Loader = ({ server = false }) => {
    return (
        <div className="w-full h-full flex items-center justify-center ">
            {server ? (
                <div className=" text-center place-items-center">
                    <LoaderCircle size={50} className="animate-spin" />
                    <p className="text-xl font-semibold">
                        Waiting for the server to respond...
                    </p>
                    <p>Please wait.</p>
                </div>
            ) : (
                <LoaderCircle className="animate-spin" />
            )}
        </div>
    );
};

export default Loader;
