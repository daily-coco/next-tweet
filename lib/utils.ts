export function formatToTimeAgo(date: string): string {
  const dayInMs = 1000 * 60 * 60 * 24;
  const time = new Date(date).getTime();
  const now = new Date().getTime();
  const diff = Math.round((time - now) / dayInMs);
  const formatter = new Intl.RelativeTimeFormat('ko');
  // 오늘 등록된 데이터 경우에는 `0일 전` 식으로 나옴에 따라 오늘로 보여주고 싶다!
  if (diff === 0) {
    return '오늘';
  }
  return formatter.format(diff, 'days');
}

export function formatToWon(price: number): string {
  return price.toLocaleString('ko-KR');
}
