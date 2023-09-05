import {
  FC,
  useEffect,
  useRef,
} from "react";
import s from "./CardList.module.scss";
import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";
import { getCardProps } from "../../utils/getRandomFormattedTimestamp";
import { Card } from "../Card";
import { TodoContext } from "../../../shared/contexts/TodosContext";

const CardList: FC = () => {
  const articleRefs = useRef<Array<HTMLDivElement>>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const observer = useRef<any>(null);

  useEffect(() => {}, []);

  return (
    <TodoContext.Consumer>
      {({ cards, loadCards }) => (
        <div className={s.cardList} ref={containerRef}>
          {cards.map((card, index) => {

            return <Card {...card} key={card.id} />;
          })}
                <button onClick={loadCards}>Load</button>
        </div>
      )
      
      }

    </TodoContext.Consumer>
  );
};

export default CardList;
