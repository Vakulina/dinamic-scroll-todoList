import { FC, useEffect, useRef, useContext } from "react";
import s from "./CardList.module.scss";
import { Card } from "../Card";
import { TodosContext } from "../../contexts/TodosContext";

const PAGES_COUNT = 20;

const CardList: FC = () => {
  const blockEnd = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const numRef = useRef<number>(1);
  const { loadCards } = useContext(TodosContext);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          numRef.current = numRef.current + 1;
          loadCards();
          if (numRef.current >= PAGES_COUNT) {
            if (blockEnd.current) observer.unobserve(blockEnd.current);
          }
        }
      },
      { threshold: 1 }
    );

    if (blockEnd.current) observer.observe(blockEnd.current);
  }, []);

  return (
    <TodosContext.Consumer>
      {({ cards }) => (
        <div className={s.cardList} ref={containerRef}>
          {cards.map((card) => {
            return <Card {...card} key={card.id} />;
          })}
          <div className={s.cardList__blockEnd} ref={blockEnd}></div>
        </div>
      )}
    </TodosContext.Consumer>
  );
};

export default CardList;
