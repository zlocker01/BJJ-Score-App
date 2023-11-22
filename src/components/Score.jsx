import { useState, useEffect } from "react";

export function Score() {
  // states for Scores
  const [scores, setScores] = useState({
    red: 0,
    blue: 0,
  });

  // states for Advantages
  const [advantages, setAdvantages] = useState({
    red: 0,
    blue: 0,
  });

  // states for Penalties
  const [penalties, setPenalties] = useState({
    red: 0,
    blue: 0,
  });

  // states for Disqualified
  const [isDisqualified, setIsDisqualified] = useState("");

  // handle events on Score
  const handleScore = (player, value) => {
    setScores((prevScores) => ({
      ...prevScores,
      [player]: prevScores[player] + value,
    }));
  };

  // handle events on Advantages
  const handleAdvantages = (player, value) => {
    setAdvantages((prevAdvantages) => ({
      ...prevAdvantages,
      [player]: prevAdvantages[player] + value,
    }));
  };

  // handle events on Penalties
  const handlePenalties = (player, value) => {
    setPenalties((prevPenalties) => ({
      ...prevPenalties,
      [player]: prevPenalties[player] - value,
    }));

    // updating Scores when penalties get -1
    if (value === 1) {
      setScores((prevScores) => ({
        ...prevScores,
        [player]: prevScores[player] - 1,
      }));
    }
  };

  // handle events on Disqualified
  const handleDisqualified = (player) => {
    setIsDisqualified(
      `¡${player === "red" ? "RED" : "BLUE"} ESTÁ DESCALIFICADO!`
    );
  };

  // handle to reset scores
  const handleReset = () => {
    setScores({ red: 0, blue: 0 });
    setAdvantages({ red: 0, blue: 0 });
    setPenalties({ red: 0, blue: 0 });
    setIsDisqualified("");
  };

  // useEffect to read data from localStorage when the component loads
  useEffect(() => {
    const localScores = JSON.parse(localStorage.getItem("scores")) || {};
    const localAdvantages =
      JSON.parse(localStorage.getItem("advantages")) || {};
    const localPenalties = JSON.parse(localStorage.getItem("penalties")) || {};
    const localIsDisqualified =
      JSON.parse(localStorage.getItem("isDisqualified")) || "";

    setScores(localScores);
    setAdvantages(localAdvantages);
    setPenalties(localPenalties);
    setIsDisqualified(localIsDisqualified);
  }, []);

  // useEffect to store data in localStorage when something changes
  useEffect(() => {
    localStorage.setItem("scores", JSON.stringify(scores));
    localStorage.setItem("advantages", JSON.stringify(advantages));
    localStorage.setItem("penalties", JSON.stringify(penalties));
    localStorage.setItem("isDisqualified", JSON.stringify(isDisqualified));
  }, [scores, advantages, penalties, isDisqualified]);

  return (
    <section className="score">
    <h2>Puntos</h2>
      {/* showing and changing the Score */}
      <div>
        <button onClick={() => handleScore("red", 1)}>
          Añadir Punto a Red
        </button>
        <span>Red: {scores.red}</span>
        <button onClick={() => handleScore("blue", 1)}>
          Añadir Punto a Blue
        </button>
        <span>Blue: {scores.blue}</span>
      </div>

      {/* showing and changing the Advantages */}
      <div>
        <button onClick={() => handleAdvantages("red", 1)}>
          Añadir Ventaja a Red
        </button>
        <span>Red: {advantages.red}</span>
        <button onClick={() => handleAdvantages("blue", 1)}>
          Añadir Ventaja a Blue
        </button>
        <span>Blue: {advantages.blue}</span>
      </div>

      {/* showing and changing the Penalties */}
      <div>
        <button onClick={() => handlePenalties("red", 1)}>
          Añadir Penalización a Red
        </button>
        <span>Red: {penalties.red}</span>
        <button onClick={() => handlePenalties("blue", 1)}>
          Añadir Penalización a Blue
        </button>
        <span>Blue: {penalties.blue}</span>
      </div>

      {/* showing Disqualified Alert */}
      <div>
        <button onClick={() => handleDisqualified("red")}>
          Descalificar a Red
        </button>
        <button onClick={() => handleDisqualified("blue")}>
          Descalificar a Blue
        </button>
        <h4>{isDisqualified}</h4>
      </div>

      {/* reseting the scores */}
      <div>
        <button onClick={handleReset}>
          Reset Marcador
        </button>
      </div>
    </section>
  );
}
