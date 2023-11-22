import { Score } from "./Score";
import { Timer } from "./Timer";
import { Image } from "./Image";

export const Judge = () => {
  return (
    <section className="judge">
      <Score />
      <Timer />
      <Image />
      <a href="http://localhost:5173/referee" target="blank">Abrir Marcador</a>
    </section>
  );
};