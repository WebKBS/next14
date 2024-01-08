import sql from 'better-sqlite3';
import fs from 'node:fs';
import slugify from 'slugify';
import xss from 'xss';

const db = sql('meals.db');

export async function getMeals() {
  // await new Promise((resolve) => setTimeout(resolve, 3000));

  // throw new Error('Something went wrong');
  return db.prepare('SELECT * FROM meals').all();
}

export async function getMeal(slug) {
  // await new Promise((resolve) => setTimeout(resolve, 3000));
  return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug);
}

// slugify, xss 설치
export async function saveMeal(meal) {
  await new Promise((resolve) => setTimeout(resolve, 3000));

  // slugify는 문자열을 URL에 사용하기 적합한 형태(slug형태)로 변환해주는 라이브러리
  // xss는 사용자가 입력한 HTML을 브라우저에서 실행되지 않도록 방지해주는 라이브러리

  meal.slug = slugify(meal.title, { lower: true });
  meal.instructions = xss(meal.instructions);

  const extensions = meal.image.name.split('.').pop();
  const fileName = `${meal.slug}.${extensions}`;

  const stream = fs.createWriteStream(`public/images/${fileName}`);
  const bufferedImage = await meal.image.arrayBuffer();

  console.log('extension: ', extensions);
  console.log('fileName: ', fileName);
  console.log('stream: ', stream);
  console.log('bufferedImage: ', bufferedImage);

  stream.write(Buffer.from(bufferedImage), (error) => {
    if (error) {
      throw new Error('Saving image failed !');
    }

    meal.image = `/images/${fileName}`;

    db.prepare(
      `
      INSERT INTO meals (title, summary, instructions, creator, creator_email, image, slug)
      VALUES (@title, @summary, @instructions, @creator, @creator_email, @image, @slug)
    `
    ).run(meal);
  });
}
