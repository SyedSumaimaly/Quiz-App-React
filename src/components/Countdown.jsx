import React from "react";
import { useState, useEffect } from "react";

function Countdown({ startingMinutes = 0, startingSeconds = 45, func, stopTimer = false}) {

    const [minutes, setMinutes] = useState(startingMinutes);
    const [seconds, setSeconds] = useState(startingSeconds);


    useEffect(() => {
        let Intreval = setInterval(() => {
            if (!stopTimer) {
                if (seconds > 0) {
                    setSeconds(seconds - 1);
                }
                if (seconds === 0) {
                    if (minutes === 0) {
                        clearInterval(Intreval);
                        func();
                        setSeconds(startingSeconds);
                    } else {
                        setMinutes(minutes - 1);
                        setSeconds(59);
                    }
                }
            }
            else { setSeconds(startingSeconds) }
        }, 1000);

        return () => {
            clearInterval(Intreval);
        };
    });

    return (
        <div>
            {(stopTimer ?
                <span className="timer">0:00</span>
                :
                <span className="timer">
                    {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
                </span>
            )}
        </div>
    );
}

export default Countdown;
