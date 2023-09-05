import { FC } from "react";
import s from "./Card.module.scss";

export type CardProps = {
  id: number;
  title: string;
  userId: number;
  completed: boolean;
  avatar: string;
  startDate: string;
  endDate: string;
  description: string;
  titleTag: string;
  focusTag: string;
};

export const Card: FC<CardProps> = ({
  title,
  completed,
  avatar,
  startDate,
  endDate,
  description,
  titleTag,
  focusTag,
}) => {
  return (
    <article className={s.card}>
      <div className={s.card__wrapper}>
        <div className={s.card__header}>
          <input
            className={s.card__checkbox}
            type="checkbox"
            checked={completed}
            readOnly
          />
          <h3 className={s.card__title}>{title}</h3>
        </div>
        <div className={s.card__dateField}>
          <time className={s.card__startDate}>{startDate}</time>
          <time className={s.card__endDate}>{endDate}</time>
        </div>
        <p className={s.card__description}>{description}</p>
        <div className={s.card__footer}>
          <span className={s.card__titleTag}>{titleTag}</span>
          <span className={s.card__focusTag}>{focusTag}</span>
          <img className={s.card__avatar} src={avatar} alt="Avatar" />
        </div>
      </div>
    </article>
  );
};
