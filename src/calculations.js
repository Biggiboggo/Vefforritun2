/* eslint-disable no-param-reassign */
import { deviation, max, mean, median, min, sum, variance } from 'd3';

export function calculations(str) {

  const num = [];
  let varNum = 0;
  let maxNum = 0;
  let meanNum = 0;
  let medianNum = 0;
  let minNum = 0;
  let standNum = 0;
  let sumNum = 0;
  let rangeNum = 0;
  const letters = /[A-Za-z]/g;
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < str.length; i++) {
    str[i] = str[i].replaceAll('.', '');
    str[i] = str[i].replaceAll(',', '.');
    if (!letters.test(str[i])) {
      num.push(parseFloat(str[i]));
    }
  }
  if (!num.length > 2) {
    varNum = 'Engin niðurstaða';
  }
  else {
    varNum = variance(num);
    maxNum = max(num);
    meanNum = mean(num);
    medianNum = median(num);
    minNum = min(num);
    standNum = deviation(num);
    sumNum = sum(num);
    rangeNum = maxNum - minNum;
    if (varNum === undefined) {
      varNum = 'Engin niðurstaða'
    }
    if (maxNum === undefined) {
      maxNum = 'Engin niðurstaða'
    }
    if (meanNum === undefined) {
      meanNum = 'Engin niðurstaða'
    }
    if (medianNum === undefined) {
      medianNum = 'Engin niðurstaða'
    }
    if (minNum === undefined) {
      minNum = 'Engin niðurstaða'
    }
    if (standNum === undefined) {
      standNum = 'Engin niðurstaða'
    }
    if (sumNum === undefined) {
      sumNum = 'Engin niðurstaða'
    }
    // eslint-disable-next-line no-restricted-globals
    if (isNaN(rangeNum)) {
      rangeNum = 'Engin niðurstaða'
    }
  }
  return [varNum, maxNum, meanNum, medianNum, minNum, standNum, sumNum, rangeNum];
}
