import {
  FC,
  Suspense,
  lazy,
  useState,
  useCallback,
  useDeferredValue,
  useEffect,
} from "react";
import s from "./TestPage.module.scss";
import AddIcon from "../assets/add_bold.svg";
import { todosService } from "../api";
import { TodosContext } from "../shared/contexts/TodosContext";
import { getCardProps } from "../shared/utils/getRandomFormattedTimestamp";
import { CardProps } from "../shared/components/Card";

const CardList = lazy(() => import("../shared/components/CardList/CardList"));

const TestPage: FC = () => {
  const [query, setQuery] = useState<number>(1);
  const deferredQuery = useDeferredValue(query);
  const [cards, setCards] = useState<CardProps[]>([]);

  const loadCards = useCallback(async () => {
    const data = await todosService.fetchCards(deferredQuery);
    const newCards = data.map((item) => getCardProps(item));
    setCards((prevCards) => [...prevCards, ...newCards]);
  }, [deferredQuery]);

  useEffect(() => {
    loadCards();
  }, [deferredQuery]);

  const loadMore = useCallback(() => {
    setQuery((prevPageNumber) => prevPageNumber + 1);
  }, [deferredQuery]);

  return (
    <TodosContext.Provider value={{ cards, loadCards: loadMore }}>
      <div className={s.testPage}>
        <div className={s.testPage__header}>
          <h2 className={s.testPage__title}>Today</h2>
          <button className={s.testPage__add}>
            <img src={AddIcon} />
          </button>
          <span className={s.testPage__count}>{cards.length}</span>
        </div>
        <Suspense fallback={<div>Loading...</div>}>
          <CardList />
        </Suspense>
      </div>
    </TodosContext.Provider>
  );
};
export default TestPage;
