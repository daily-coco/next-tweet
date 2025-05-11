import { searchTweet } from '@/service/searchService';

export async function handlerSearch(_: unknown, formData: FormData) {
  const keyword = formData.get('search')?.toString() || '';
  // console.log(keyword);
  if (!keyword.trim()) return [];

  const result = await searchTweet(keyword);
  return result;
}
