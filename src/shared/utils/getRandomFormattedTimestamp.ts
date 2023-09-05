import { EventDto } from "../../api/dto/Event";
import { faker } from "@faker-js/faker";
import Avatar from "../../assets/avatar.png";
import { getRandomFormattedTimestamp } from "./date";
import { CardProps } from "../components/Card";

export const getCardProps = (data: EventDto): CardProps => {
  const description = faker.lorem.text();
  const startDate = getRandomFormattedTimestamp();
  const endDate = getRandomFormattedTimestamp();

  const titleTagString = faker.lorem.word();
  const titleTag = `${titleTagString
    .charAt(0)
    .toUpperCase()}${titleTagString.slice(1)} ${faker.lorem.word()}`;
  const focusTag =
    faker.lorem.word().slice(0, 1).toUpperCase() + faker.lorem.word().slice(1);

  const result: CardProps = {
    id: data.id,
    title: data.title,
    userId: data.userId,
    completed: data.completed,
    avatar: Avatar,
    startDate,
    endDate,
    description,
    titleTag,
    focusTag,
  };
  return result;
};
