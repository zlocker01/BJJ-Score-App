import { useState, useEffect } from "react";

export const Timer = () => {
  // stati with the timer
  const [timer, setTimer] = useState({
    minutes: 6,
    seconds: 0,
    isPaused: true,
  });

  // states for input of minutes and seconds
  const [inputMinutes, setInputMinutes] = useState(6);
  const [inputSeconds, setInputSeconds] = useState(0);
  const [timeOver, setTimeOver] = useState('');

  // controller to start the timer
  const handleTimerStart = () => {
    setTimer((prevState) => ({ ...prevState, isPaused: false }));
  };

  // handle to pause up the timer
  const handleTimerPause = () => {
    setTimer((prevState) => ({ ...prevState, isPaused: true }));
  };

  // Fnction to reset the timer
  const handleTimerReset = () => {
    setTimer({ minutes: inputMinutes, seconds: inputSeconds, isPaused: true });
  };

  // handle to edit the timer
  const handleTimerEdit = () => {
    setTimer({ minutes: inputMinutes, seconds: inputSeconds, isPaused: true });
  };

  // effect to handle the time-over
  useEffect(() => {
    let interval;

    // Verify if timer is paused
    if (!timer.isPaused) {
      interval = setInterval(() => {
        setTimer((prevTimer) => {
          // updeating the last minutes and seconds
          const newSeconds =
            prevTimer.seconds === 0 ? 59 : prevTimer.seconds - 1;
          const newMinutes =
            newSeconds === 59 ? prevTimer.minutes - 1 : prevTimer.minutes;

          // stoping the timer on 0 when gets time over
          if (newMinutes === 0 && newSeconds === 0) {
            clearInterval(interval);
            // * add more to do
            setTimeOver('!Tiempo!');
          }

          // new timer state
          return { ...prevTimer, minutes: newMinutes, seconds: newSeconds };
        });
      }, 1000);
    }

    // clearing interval
    return () => clearInterval(interval);
  }, [timer.isPaused]);

  // rendering timer UI
  return (
    <div>
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
