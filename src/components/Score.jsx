import { useScore } from "./ScoreContext";

export function Score() {
  const {
    scores,
    advantages,
    penalties,
    isDisqualified,
    handleScore,
    handleAdvantages,
    handlePenalties,
    handleDisqualified
  } = useScore();

  return (
    <>
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
      <h3>Ventajas</h3>
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
      <h3>Penalizaciones</h3>
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
      <h3>Descalificaciones</h3>
      <div>
        <button onClick={() => handleDisqualified("red")}>
          Descalificar a Red
        </button>
        <button onClick={() => handleDisqualified("blue")}>
          Descalificar a Blue
        </button>
        <h4>{isDisqualified}</h4>
      </div>
    </>
  );
}