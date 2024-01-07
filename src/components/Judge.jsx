import { Score } from "./Score";
import { Timer } from "./Timer";
import { Image } from "./Image";

export const Judge = () => {
  return (
    <section className="judge">
      <Score />
      <Timer />
      <Image />
      <a href="/referee" target="blank">Abrir Marcador</a>
    </section>
  );
};