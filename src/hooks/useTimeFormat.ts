import dayjs from 'dayjs';

export default function useTimeFormat(timestamp: number) {
  return dayjs.unix(timestamp).format('YYYY-MM-DD HH:mm:ss');
}
