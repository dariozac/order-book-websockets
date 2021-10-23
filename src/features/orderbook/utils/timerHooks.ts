import React from "react";

export function useCurrentVisibilityTimer(shouldIncrement: boolean): boolean {
  const [timerVal, setTimerVal] = React.useState(0);

  React.useEffect(() => {
    let intervalId: any;

    if (shouldIncrement) {
      intervalId = setInterval(() => {
        setTimerVal(timerVal + 1);
      }, 1000);
    } else {
      setTimerVal(0);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [shouldIncrement, timerVal]);

  return timerVal as unknown as boolean;
}

export function useTotalVisibilityTimer(shouldIncrement: boolean): boolean {
  const [timerVal, setTimerVal] = React.useState(0);

  React.useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (shouldIncrement) {
      intervalId = setInterval(() => {
        setTimerVal(timerVal + 1);
      }, 1000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [shouldIncrement, timerVal]);

  return timerVal as unknown as boolean;
}