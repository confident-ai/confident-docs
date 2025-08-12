"use client";

import { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';

export default function Counter({
    target = 1000,
    duration = 4000,
    formatFn = (n) => n.toLocaleString(),
}) {
    const [count, setCount] = useState(0);
    const [pageLoaded, setPageLoaded] = useState(false);
    const start = useRef(null);
    const hasStarted = useRef(false);
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 1,
    });

    useEffect(() => {
        // Check if page is already loaded
        if (document.readyState === "complete") {
            setPageLoaded(true);
        } else {
            const handleLoad = () => setPageLoaded(true);
            window.addEventListener("load", handleLoad);
            return () => window.removeEventListener("load", handleLoad);
        }
    }, []);

    useEffect(() => {
        if (!inView || !pageLoaded || hasStarted.current) return;

        hasStarted.current = true;

        const step = (timestamp) => {
            if (!start.current) start.current = timestamp;
            const progress = timestamp - start.current;
            const progressRatio = Math.min(progress / duration, 1);
            const eased = progressRatio * (2 - progressRatio);
            const currentValue = Math.floor(eased * target);
            setCount(currentValue);

            if (progress < duration) {
                requestAnimationFrame(step);
            }
        };

        requestAnimationFrame(step);
    }, [inView, target, duration, pageLoaded]);

    return <span style={{ color: 'white' }} ref={ref}>{formatFn(count)}+</span>;
}