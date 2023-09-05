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
import { EventDto } from "../api/dto/Event";
import { todosService } from "../api";
import { TodoContext } from "../shared/contexts/TodosContext";
import { getCardProps } from "../shared/utils/getRandomFormattedTimestamp";

const CardList = lazy(() => import("../shared/components/CardList/CardList"));

const TestPage: FC = () => {
  const [query, setQuery] = useState<number>(1);
  const deferredQuery = useDeferredValue(query);
  const [cards, setCards] = useState<EventDto[]>([]);

  const loadCards = useCallback(async () => {
    const data = await todosService.fetchCards(deferredQuery); 
    const newCards = data.map(item=>getCardProps(item));
    setCards((prevCards) => [...prevCards, ...newCards])
  }, [deferredQuery]);

  useEffect(() => {
    loadCards();
  }, [deferredQuery]);

  const loadMore = useCallback(() =>{
    setQuery(prevPageNumber => prevPageNumber + 1)
  },[deferredQuery])

  /*const pageEnd = useRef();
  let num = 1;
  
  useEffect(()=>{
    if(loading){
      const observer = new IntersectionObserver(entries =>{
        if(entries[0].isIntersecting){
          num++;
          loadMore();
          if(num >= 10){
            observer.unobserve(pageEnd.current)
          }
        }

      },{threshold: 1});

      observer.observe(pageEnd.current)

    }

  },[loading,num])*/

  return (
    <TodoContext.Provider value={{ cards, loadCards:loadMore }}>
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
    </TodoContext.Provider>
  );
};
export default TestPage;
