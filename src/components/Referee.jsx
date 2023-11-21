import { useEffect, useState } from "react";

export const Referee = () => {
  // states of Scores
  const [scores, setScores] = useState({ red: 0, blue: 0 });
  const [advantages, setAdvantages] = useState({ red: 0, blue: 0 });
  const [penalties, setPenalties] = useState({ red: 0, blue: 0 });
  const [isDisqualified, setIsDisqualified] = useState("");

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

  // function to update ith change in localStorage
  useEffect(() => {
    setScores(getLocalScores());
    setAdvantages(getLocalAdvantages());
    setPenalties(getLocalPenalties());
    setIsDisqualified(getLocalIsDisqualified());
  }, []);

  //  aditional function to watch changes on scores
  useEffect(() => {
    const handleScoreChange = () => {
      setScores(getLocalScores());
      setAdvantages(getLocalAdvantages());
      setPenalties(getLocalPenalties());
      setIsDisqualified(getLocalIsDisqualified());
    };

    window.addEventListener('storage', handleScoreChange);

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
    </>
  );
};
