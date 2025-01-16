"use client";
import { useEffect, useState } from "react";

export const useCountdown = (initialSeconds: number) => {
    const [timeRemaining, setTimeRemaining] = useState(initialSeconds);
    const [isCountdownActive, setIsCountdownActive] = useState(false);

    useEffect(() => {
        let intervalId: NodeJS.Timeout;

        if (isCountdownActive && timeRemaining > 0) {
            intervalId = setInterval(() => {
                setTimeRemaining((prev) => prev - 1);
            }, 1000);
        } else if (timeRemaining === 0) {
            setIsCountdownActive(false);
            setTimeRemaining(initialSeconds);
        }

        return () => clearInterval(intervalId);
    }, [isCountdownActive, timeRemaining, initialSeconds]);

    const startCountdown = () => {
        setIsCountdownActive(true);
        setTimeRemaining(initialSeconds);
    };

    return {
        timeRemaining,
        isCountdownActive,
        startCountdown,
    };
};