import { DUMMY_NEWS } from '@/dummy-news';

interface News {
  id: string;
  title: string;
  content: string;
  date: string;
}

export function getAllNews(): News[] {
  return DUMMY_NEWS;
}

export function getLatestNews(): News[] {
  return DUMMY_NEWS.slice(0, 3);
}

export function getAvailableNewsYears(): number[] {
  return DUMMY_NEWS.reduce((years: number[], news: News) => {
    const year = new Date(news.date).getFullYear();
    if (!years.includes(year)) {
      years.push(year);
    }
    return years;
  }, []).sort((a, b) => b - a);
}

export function getAvailableNewsMonths(year: number): number[] {
  return DUMMY_NEWS.reduce((months: number[], news: News) => {
    const newsYear = new Date(news.date).getFullYear();
    if (newsYear === year) {
      const month = new Date(news.date).getMonth();
      if (!months.includes(month + 1)) {
        months.push(month + 1);
      }
    }
    return months;
  }, []).sort((a, b) => b - a);
}

export function getNewsForYear(year: number): News[] {
  return DUMMY_NEWS.filter(
    (news: News) => new Date(news.date).getFullYear() === year
  );
}

export function getNewsForYearAndMonth(year: number, month: number): News[] {
  return DUMMY_NEWS.filter((news: News) => {
    const newsYear = new Date(news.date).getFullYear();
    const newsMonth = new Date(news.date).getMonth() + 1;
    return newsYear === year && newsMonth === month;
  });
}
