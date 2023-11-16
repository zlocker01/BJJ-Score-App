import { useContext } from "react";
import {  useScore } from "./ScoreContext";

export const Referee = () => {
  const {
    scores,
    advantages,
    penalties,
    isDisqualified,
  } = useScore();
// ! no llegan valores aqui
  console.log(scores);

  // Resto del código de tu componente Score
  return (
    <>
      <h2>Puntos</h2>
      {/* showing and changing the Score */}
      <div>
        <span>Red: {scores.red}</span>
        <span>Blue: {scores.blue}</span>
      </div>

      {/* showing and changing the Advantages */}
      <h3>Ventajas</h3>
      <div>
        <span>Red: {advantages.red}</span>
        <span>Blue: {advantages.blue}</span>
      </div>

      {/* showing and changing the Penalties */}
      <h3>Penalizaciones</h3>
      <div>
        <span>Red: {penalties.red}</span>
        <span>Blue: {penalties.blue}</span>
      </div>

      {/* showing Disqualified Alert */}
      {/* <h3>Descalificaciones</h3> */}
      <div>
        <h4>{isDisqualified}</h4>
      </div>
    </>
  );
};

