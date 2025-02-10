import { format, parseISO } from 'date-fns';

const DATE_FORMAT = 'dd-MMM-yyyy';
const DATE_INPUT_FORMAT = 'yyyy-MM-dd';

export const formatDate = (date: string | Date | undefined): string => {
  if (!date) return '';

  let _date: string | Date = date;

  if (typeof date === 'string') {
    _date = parseISO(date);
  }

  return format(_date as Date, DATE_FORMAT);
};

export const formatToInputDate = (date: string | Date) => {
  if (!date) return '';

  return format(new Date(date), DATE_INPUT_FORMAT);
};
