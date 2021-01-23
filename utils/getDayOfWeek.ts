export function getDayOfWeek (day: number, month: number, year: number) {
  return new Date(year, month, day).toLocaleString('en-US', {
    weekday: 'long'
  })
}
