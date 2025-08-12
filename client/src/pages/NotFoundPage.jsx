import React, { useEffect, useState } from "react";
import { Hexagon, ArrowLeftFromLine } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const NotFoundPage = () => {
    const [time, setTime] = useState(10);
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setInterval(() => {
            setTime((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        if (time === 0) {
            navigate("/dashboard");
        }
    }, [time, navigate]);

    return (
        <>
            <div className="bg w-full h-screen flex flex-col items-center justify-center bg-radial from-white/10 via-gray-200/10 to-yellow-50">
                <div className="relative flex items-center justify-center">
                    <Hexagon size={100} strokeWidth={0.5} />
                    <h1 className="text-5xl font-black absolute">404</h1>
                </div>

                <h1 className="text-4xl font-black">
                    Oh no, <span className="font-medium text-3xl">:(</span>
                </h1>
                <h2>Seems like the page you are looking for does not exist</h2>

                <div className="w-max h-max group relative mt-5">
                    <Link
                        to={"/dashboard"}
                        className="border border-black text-lg bg-black text-white hover:bg-white hover:text-black py-1 px-3 flex items-center justify-center gap-1"
                    >
                        <ArrowLeftFromLine
                            strokeWidth={2}
                            className="inline group-hover:translate-x-[-5px] duration-200"
                        />
                        <p>Go Back ({time})</p>
                    </Link>
                    <div className="bg-black w-full h-full absolute left-0 top-0 group-hover:translate-y-1 group-hover:translate-x-1 transition-transform duration-150 z-[-1]"></div>
                </div>
            </div>
        </>
    );
};

export default NotFoundPage;
