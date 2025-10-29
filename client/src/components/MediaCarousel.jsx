import React, { useEffect, useRef, useState } from "react";

export default function MediaCarousel({
    media,
    startIndex = 0,
    showIndicators = true,
    showNav = true,
    loop = true,
}) {
    const [index, setIndex] = useState(startIndex);
    const videoRefs = useRef([]);
    const containerRef = useRef(null);
    const touchState = useRef({ startX: 0, dragging: false });
    const count = media?.length || 0;

    // keep index valid when media changes
    useEffect(() => {
        if (count === 0) return;
        if (index < 0) setIndex(0);
        if (index >= count) setIndex(count - 1);
    }, [count, index]);

    const prev = () =>
        setIndex((i) => (i <= 0 ? (loop ? count - 1 : 0) : i - 1));
    const next = () =>
        setIndex((i) => (i >= count - 1 ? (loop ? 0 : count - 1) : i + 1));

    // pause any non-visible videos
    useEffect(() => {
        videoRefs.current.forEach((v, i) => {
            if (v && i !== index) {
                try {
                    v.pause();
                } catch {}
            }
        });
    }, [index]);

    // swipe support (pointer + touch)
    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        const onStart = (e) => {
            touchState.current.startX = e.touches?.[0]?.clientX ?? e.clientX;
            touchState.current.dragging = true;
        };
        const onEnd = (e) => {
            if (!touchState.current.dragging) return;
            const endX = e.changedTouches?.[0]?.clientX ?? e.clientX;
            const dx = endX - touchState.current.startX;
            touchState.current.dragging = false;
            if (Math.abs(dx) > 40) {
                dx < 0 ? next() : prev();
            }
        };

        el.addEventListener("pointerdown", onStart);
        el.addEventListener("touchstart", onStart, { passive: true });
        window.addEventListener("pointerup", onEnd);
        window.addEventListener("touchend", onEnd);

        return () => {
            el.removeEventListener("pointerdown", onStart);
            el.removeEventListener("touchstart", onStart);
            window.removeEventListener("pointerup", onEnd);
            window.removeEventListener("touchend", onEnd);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [count]);

    if (!media || media.length === 0) return null;

    // widths used to ensure each slide equals the visible frame
    const trackWidth = `${count * 100}%`;
    const slideWidth = `${100 / count}%`;
    const translatePct = `-${(index * 100) / count}%`; // IMPORTANT: relative to track width

    return (
        <div
            className="w-full max-w-4xl mx-auto select-none"
            onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
            }}
        >
            <div
                ref={containerRef}
                className="relative overflow-hidden bg-black rounded-lg border border-neutral-300/20"
                aria-roledescription="carousel"
            >
                {/* Track */}
                <div
                    className="flex transition-transform duration-500 ease-out"
                    style={{
                        width: trackWidth,
                        transform: `translateX(${translatePct})`,
                    }}
                >
                    {media.map((item, i) => (
                        <div
                            key={item._id ?? i}
                            className="flex-shrink-0 flex items-center justify-center"
                            style={{ width: slideWidth }}
                        >
                            {/* fixed 16:9 viewport */}
                            <div className="relative w-full aspect-video bg-neutral-900 overflow-hidden ">
                                {/* Centered, scaled media */}
                                {item.type === "image" ? (
                                    <img
                                        src={item.url}
                                        alt={item.public_id ?? `media-${i}`}
                                        className="absolute inset-0 m-auto object-contain w-full h-full max-w-full max-h-full"
                                        loading="lazy"
                                        draggable="false"
                                    />
                                ) : (
                                    <video
                                        ref={(el) =>
                                            (videoRefs.current[i] = el)
                                        }
                                        src={item.url}
                                        className="absolute inset-0 m-auto object-contain w-full h-full max-w-full max-h-full"
                                        controls
                                        playsInline
                                        preload="metadata"
                                    />
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Nav buttons */}
                {showNav && count > 1 && (
                    <>
                        <button
                            onClick={prev}
                            aria-label="Previous"
                            className="absolute left-3 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/30 hover:bg-black focus:outline-none"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 text-white"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2"
                                aria-hidden="true"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15 19l-7-7 7-7"
                                />
                            </svg>
                        </button>

                        <button
                            onClick={next}
                            aria-label="Next"
                            className="absolute right-3 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/30 hover:bg-black focus:outline-none"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 text-white"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2"
                                aria-hidden="true"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M9 5l7 7-7 7"
                                />
                            </svg>
                        </button>
                    </>
                )}

                {/* Indicators */}
                {showIndicators && count > 1 && (
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-20 bg-black/40 px-2.5 py-1.5 rounded-full backdrop-blur-2xl">
                        {media.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setIndex(i)}
                                aria-label={`Go to slide ${i + 1}`}
                                className={`size-1.5 sm:size-2 rounded-full focus:outline-none ${
                                    i === index ? "bg-white" : "bg-white/40"
                                }`}
                            />
                        ))}
                    </div>
                )}
            </div>

            <div className="mt-2 text-sm text-center text-gray-500">
                {index + 1} / {count}
            </div>
        </div>
    );
}
