import sql from 'better-sqlite3';
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
  meal.slug = slugify(meal.title, { lower: true });
  meal.instructions = xss(meal.instructions);
}
