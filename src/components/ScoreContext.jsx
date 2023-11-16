import { useState, createContext, useContext } from "react";

// creating the context
const ScoreContext = createContext();

export const ScoreProvider = ({ children }) => {
  // score states
  const [scores, setScores] = useState({ red: 0, blue: 0 });
  const [advantages, setAdvantages] = useState({ red: 0, blue: 0 });
  const [penalties, setPenalties] = useState({ red: 0, blue: 0 });
  const [isDisqualified, setIsDisqualified] = useState("");

  // handles
  const handleScore = (player, value) => {
    setScores((prevScores) => ({
      ...prevScores,
      [player]: prevScores[player] + value,
    }));
  };

  const handleAdvantages = (player, value) => {
    setAdvantages((prevAdvantages) => ({
      ...prevAdvantages,
      [player]: prevAdvantages[player] + value,
    }));
  };

  const handlePenalties = (player, value) => {
    setPenalties((prevPenalties) => ({
      ...prevPenalties,
      [player]: prevPenalties[player] - value,
    }));

    if (value === 1) {
      setScores((prevScores) => ({
        ...prevScores,
        [player]: prevScores[player] - 1,
      }));
    }
  };
  
  const handleDesqualified = (player) => {
    setIsDisqualified(`¡${player.toUpperCase()} ESTÁ DESCALIFICADO!`);
  };
  console.log(scores);

//   rendering
  return (
    <ScoreContext.Provider
      value={{
        scores,
        advantages,
        penalties,
        isDisqualified,
        handleScore,
        handleAdvantages,
        handlePenalties,
        handleDesqualified,
      }}
    >
      {children}
    </ScoreContext.Provider>
  );
};

// using state
export const useScore = () => {
    const context = useContext(ScoreContext);
    if(!context){
        throw new Error('useScore debe usarse dentro de un ScoreProvider');
    }
    return context;
};