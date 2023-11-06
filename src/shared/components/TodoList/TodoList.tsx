import { FC, useEffect, useRef, useContext } from 'react';
import s from './TodoList.module.scss';
import { Card } from '../Card';
import { TodosContext } from '../../contexts/TodosContext';

const PAGES_COUNT = 20;
const COUNT_CARDS_ON_PAGE = 10;

const TodoList: FC = () => {
  const blockEnd = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const numRef = useRef<number>(1);
  const { cards, loadCards } = useContext(TodosContext);

  function setObserver() {
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
  }

  useEffect(() => {
    if (cards.length === COUNT_CARDS_ON_PAGE) setObserver();
  }, [cards.length]);

  return (
    <TodosContext.Consumer>
      {({ cards }) => (
        <div className={s.todoList} ref={containerRef}>
          {cards.map((card) => {
            return <Card {...card} key={card.id} />;
          })}
          <div className={s.todoList__blockEnd} ref={blockEnd}></div>
        </div>
      )}
    </TodosContext.Consumer>
  );
};

export default TodoList;
