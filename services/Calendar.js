import dayjs from "dayjs";

const dayNames = [
  'Mon',
  'Tue',
  'Wed',
  'Thu',
  'Fri',
  'Sat',
  'Sun'
];

export default class Calendar {

  static get dayNames() {
    return dayNames;
  }

  static schedule(title, description, start, end, weeks = []) {
      const from = dayjs(end)
      const diff = from.diff(start, 'day');
      const events = [...Array(diff + 1)].reduce((day, value, index) => {
          let date = dayjs(start).add(index, 'day');
          if (weeks.length === 0 || weeks.includes(date.format('ddd'))) {
              day.push({
                  date: date.format(
                    "YYYY-MM-DD"
                  )
                });
          }
          return day;
        }, []);

      return { title, description, events };
  }
}
