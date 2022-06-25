import _ from 'lodash'

export const getMonth = {
    1: 'January',
    2: 'February',
    3: 'March',
    4: 'April',
    5: 'May',
    6: 'June',
    7: 'July',
    8: 'August',
    9: 'September',
    10: 'October',
    11: 'November',
    12: 'December'
}

export const getYears = (start = 1900, end = new Date().getFullYear()) => {
    const years = [];
    for(let i = end; i>= start; i--) {
        years.push({ id: i, label: i});
    }
    return years;
}

export const stringifyQuery = (params = {}, replacer) => {
    if (!_.isFunction(replacer))
      replacer = (key, value) =>
        value != null
          ? _.isArray(value)
            ? value.map(v => ({key, value: v}))
            : {key, value}
          : null
  
    return Object.keys(params)
      .reduce((pairs, key) => pairs.concat(replacer(key, params[key]) || []), [])
      .map(({key, value}) => [key, value].map(encodeURIComponent).join('='))
      .join('&')
  }