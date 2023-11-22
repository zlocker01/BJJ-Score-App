import { useState, useEffect } from "react";

export const Timer = () => {
  // states of timer
  const [timer, setTimer] = useState({
    minutes: 6,
    seconds: 0,
    isPaused: true,
  });
  

  const [inputMinutes, setInputMinutes] = useState(6);
  const [inputSeconds, setInputSeconds] = useState(0);
  const [timeOver, setTimeOver] = useState("");

  // handle eventes
  const handleTimerStart = () => {
    setTimer((prevState) => ({ ...prevState, isPaused: false }));
  };

  const handleTimerPause = () => {
    setTimer((prevState) => ({ ...prevState, isPaused: true }));
  };

  const handleTimerReset = () => {
    setTimer({ minutes: inputMinutes, seconds: inputSeconds, isPaused: true });
    setTimeOver("");
  };

  const handleTimerEdit = () => {
    setTimer({ minutes: inputMinutes, seconds: inputSeconds, isPaused: true });
    setTimeOver("");
  };

  // effect of time and time-over
  useEffect(() => {
    let interval;

    if (!timer.isPaused) {
      interval = setInterval(() => {
        setTimer((prevTimer) => {
          const newSeconds =
            prevTimer.seconds === 0 ? 59 : prevTimer.seconds - 1;
          const newMinutes =
            newSeconds === 59 ? prevTimer.minutes - 1 : prevTimer.minutes;

          if (newMinutes === 0 && newSeconds === 0) {
            clearInterval(interval);
            const message = "¡Tiempo!";
            setTimeOver(message);
            localStorage.setItem("message", JSON.stringify(message));
          }

          return { ...prevTimer, minutes: newMinutes, seconds: newSeconds };
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [timer.isPaused]);

  // saving timer and time-over messagein localStorage 
  useEffect(() => {
    localStorage.setItem("timer", JSON.stringify(timer));
    localStorage.setItem("timeOver", JSON.stringify(timeOver));
  }, [timer, timeOver]);

  // getting timer and time-over message from localStorage
  useEffect(() => {
    const localTimer = JSON.parse(localStorage.getItem("timer"));
    if (localTimer) {
      setTimer(localTimer);
      setInputMinutes(localTimer.minutes);
      setInputSeconds(localTimer.seconds);
    }
  }, []);

  // rendering
  return (
    <section className="timer">
      <h2>Tiempo</h2>
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
      {timeOver && <h3>{timeOver}</h3>}
    </section>
  );
};
