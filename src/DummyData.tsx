import { faker } from '@faker-js/faker';

export const generateDummyData = (count:number) => {
  const dummyData = [];

  for (let i = 0; i < count; i++) {
    const username = faker.internet.userName().slice(0, 25);

    const image = faker.image.avatar();
    const email = faker.internet.email();

    dummyData.push({ username, image, email});
  }

  return dummyData;
};


