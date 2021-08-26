import { nanoid } from 'nanoid';
import faker from 'faker';

export interface IPost {
  id: string;
  message: string;
  data: string;
}

export const postsResponse: IPost[] = new Array(100)
  .fill('😎👺🐳')
  .map((item) => ({
    id: nanoid(12),
    message: item,
    data: faker.internet.avatar(),
  }));

export const getSomething = async (): Promise<IPost[]> => {
  return await new Promise((resole, reject) => {
    setTimeout(() => {
      resole(postsResponse);
    }, 500);
  });
};
