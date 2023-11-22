import { useEffect, useState } from "react";

export const Referee = () => {
  // states of Scores
  const [scores, setScores] = useState({ red: 0, blue: 0 });
  const [advantages, setAdvantages] = useState({ red: 0, blue: 0 });
  const [penalties, setPenalties] = useState({ red: 0, blue: 0 });
  const [isDisqualified, setIsDisqualified] = useState("");
  const [timer, setTimer] = useState({});
  const [timeOver, setTimeOver] = useState("");
  const [image, setImage] = useState(null);

  // Functions to get data from localStorage
  const getLocalScores = () => {
    return JSON.parse(localStorage.getItem("scores")) || { red: 0, blue: 0 };
  };

  const getLocalAdvantages = () => {
    return (
      JSON.parse(localStorage.getItem("advantages")) || { red: 0, blue: 0 }
    );
  };

  const getLocalPenalties = () => {
    return JSON.parse(localStorage.getItem("penalties")) || { red: 0, blue: 0 };
  };

  const getLocalIsDisqualified = () => {
    return JSON.parse(localStorage.getItem("isDisqualified")) || "";
  };

  const getLocalTimer = () => {
    return JSON.parse(localStorage.getItem("timer"));
  };

  const getLocalMessage = () => {
    return JSON.parse(localStorage.getItem("timeOver"));
  };

  const getLocalImage = () => {
    return JSON.parse(localStorage.getItem("image"));
  };

  // function to update ith change in localStorage
  useEffect(() => {
    setScores(getLocalScores());
    setAdvantages(getLocalAdvantages());
    setPenalties(getLocalPenalties());
    setIsDisqualified(getLocalIsDisqualified());
    setTimer(getLocalTimer());
    setTimeOver(getLocalMessage());
    setImage(getLocalImage());
  }, []);

  //  aditional function to watch changes on scores
  useEffect(() => {
    const handleScoreChange = () => {
      setScores(getLocalScores());
      setAdvantages(getLocalAdvantages());
      setPenalties(getLocalPenalties());
      setIsDisqualified(getLocalIsDisqualified());
      setTimer(getLocalTimer());
      setTimeOver(getLocalMessage());
      setImage(getLocalImage());
    };

    window.addEventListener("storage", handleScoreChange);

    return () => {
      window.removeEventListener("storage", handleScoreChange);
    };
  }, []);

  return (
    <>
      <h2>Scores</h2>
      {/* Show and change the score */}
      <div>
        <span>Red: {scores.red}</span>
        <span>Blue: {scores.blue}</span>
      </div>

      {/* Show and change the advantages */}
      <h3>Advantages</h3>
      <div>
        <span>Red: {advantages.red}</span>
        <span>Blue: {advantages.blue}</span>
      </div>

      {/* Show and change the penalties */}
      <h3>Penalties</h3>
      <div>
        <span>Red: {penalties.red}</span>
        <span>Blue: {penalties.blue}</span>
      </div>

      {/* Show Disqualified alert */}
      <div>
        <h4>{isDisqualified}</h4>
      </div>

      <h2>Tiempo</h2>
      {/* Show Timer */}
      <div>
        <span>
          Temporizador: {String(timer.minutes).padStart(2, "0")}:
          {String(timer.seconds).padStart(2, "0")}
        </span>
        <h3>{timeOver}</h3>
      </div>

      {/* Show Photo */}
      <div>
      {image && <img src={image} alt="Uploaded" style={{ maxWidth: "10%" }} />}
    </div>
    </>
  );
};
