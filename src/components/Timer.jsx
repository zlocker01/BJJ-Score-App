import { useState, useEffect } from "react";

export const Timer = () => {
  // state for the timer
  const [timer, setTimer] = useState({
    minutes: 6,
    seconds: 0,
    isPaused: true,
  });

  // states for input of minutes and seconds
  const [inputMinutes, setInputMinutes] = useState(6);
  const [inputSeconds, setInputSeconds] = useState(0);
  const [timeOver, setTimeOver] = useState("");

  // function to start the timer
  const handleTimerStart = () => {
    setTimer((prevState) => ({ ...prevState, isPaused: false }));
  };

  // function to pause the timer
  const handleTimerPause = () => {
    setTimer((prevState) => ({ ...prevState, isPaused: true }));
  };

  // function to reset the timer
  const handleTimerReset = () => {
    setTimer({ minutes: inputMinutes, seconds: inputSeconds, isPaused: true });
    setTimeOver("");
  };

  // function to edit the timer
  const handleTimerEdit = () => {
    setTimer({ minutes: inputMinutes, seconds: inputSeconds, isPaused: true });
    setTimeOver("");
  };

  // effect to handle the time-over
  useEffect(() => {
    let interval;

    // Verify if the timer is paused
    if (!timer.isPaused) {
      interval = setInterval(() => {
        setTimer((prevTimer) => {
          // updating the minutes and seconds
          const newSeconds =
            prevTimer.seconds === 0 ? 59 : prevTimer.seconds - 1;
          const newMinutes =
            newSeconds === 59 ? prevTimer.minutes - 1 : prevTimer.minutes;

          // stopping the timer on 0 when it's time over
          if (newMinutes === 0 && newSeconds === 0) {
            clearInterval(interval);
            const message = "¡Tiempo!";
            setTimeOver(message);
            // store timeOver in localStorage
            localStorage.setItem("message", JSON.stringify(message));
          }

          // new timer state
          return { ...prevTimer, minutes: newMinutes, seconds: newSeconds };
        });
      }, 1000);
    }

    // clearing interval
    return () => clearInterval(interval);
  }, [timer.isPaused]);

  // effect to store data in localStorage when timer starts
  useEffect(() => {
    localStorage.setItem("timer", JSON.stringify(timer));
  }, [timer]);

  // effect to read data from localStorage
  useEffect(() => {
    const localTimer = JSON.parse(localStorage.getItem("timer"));
    if (localTimer) {
      setTimer(localTimer);
      setInputMinutes(localTimer.minutes);
      setInputSeconds(localTimer.seconds);
    }

    // get timeOver from localStorage
    const localMessage = JSON.parse(localStorage.getItem("message"));
    if (localMessage) {
      setTimeOver(localMessage);
    }
  }, []);

  // rendering timer UI
  return (
    <div>
      <h3>Tiempo</h3>
      <button onClick={handleTimerStart}>Iniciar Temporizador</button>
      <button onClick={handleTimerPause}>Pausar Temporizador</button>
      <button onClick={handleTimerReset}>Reiniciar Temporizador</button>
      <div>
        <label>
          Minutos:
          <input
            type="number"
            value={inputMinutes}
            onChange={(e) => setInputMinutes(parseInt(e.target.value, 10))}
          />
        </label>
        <label>
          Segundos:
          <input
            type="number"
            value={inputSeconds}
            onChange={(e) => setInputSeconds(parseInt(e.target.value, 10))}
          />
        </label>
        <button onClick={handleTimerEdit}>Establecer Temporizador</button>
      </div>
      <span>
        Temporizador: {String(timer.minutes).padStart(2, "0")}:
        {String(timer.seconds).padStart(2, "0")}
      </span>
      <h3>{timeOver}</h3>
    </div>
  );
};
