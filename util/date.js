const d = new Date();

exports.currentDate =
  `${
    [
      d.getDate(),
      d.getMonth() + 1,
      d.getFullYear(),
    ].join('.')
  } ${
    [
      d.getHours(),
      d.getMinutes(),
      d.getSeconds(),
    ].join(':')
  }`;
