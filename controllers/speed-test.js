const FastSpeedTest = require('fast-speedtest-api');
const { currentDate } = require('../util/date');
const Measure = require('../models/measure');

exports.download = async (req, res, next) => {
  const requestedUnit = req.query.unit ? req.query.unit.toLowerCase() : 'bps';

  const requestedLimit = req.query.limit;

  if (!+requestedLimit) {
    const error = new Error(`${requestedLimit} is not a valid limit. Try 10`);
    error.statusCode = 400;
    next(error);
  }

  let responseUnit;
  let measureUnit;
  let hasError = false;

  switch (requestedUnit) {
    case 'bps':
      measureUnit = FastSpeedTest.UNITS.Bps;
      responseUnit = 'Bps';
      break;
    case 'kbps':
      measureUnit = FastSpeedTest.UNITS.Kbps;
      responseUnit = 'Kbps';
      break;
    case 'mbps':
      measureUnit = FastSpeedTest.UNITS.Mbps;
      responseUnit = 'Mbps';
      break;
    case 'gbps':
      measureUnit = FastSpeedTest.UNITS.Gbps;
      responseUnit = 'Gbps';
      break;
    default:
      hasError = true;
  }

  if (hasError) {
    const error = new Error(`${requestedUnit} is not a valid unit. Try Bps`);
    error.statusCode = 400;
    next(error);
  }

  const fastSpeedTest = new FastSpeedTest({
    token: process.env.FAST_API_KEY,
    verbose: false,
    timeout: 10000,
    https: true,
    urlCount: 5,
    bufferSize: 8,
    unit: measureUnit,
  });

  const downloadSpeed = await fastSpeedTest.getSpeed();

  const measure = new Measure({
    ip: req.ip,
    date: currentDate,
    download: downloadSpeed,
    unit: responseUnit,
  });

  let pastMeasures = [];

  try {
    pastMeasures = await Measure.find({ ip: req.ip })
      .sort({
        createdAt: 'desc',
      })
      .limit(requestedLimit);
    await measure.save();
    pastMeasures = await pastMeasures.map((m) => ({
      date: m.date,
      download: m.download,
      unit: m.unit,
    }));
  } catch (err) {
    const error = new Error(
      'Something went wrong while calculating download speed.',
    );
    error.statusCode = 500;
    next(error);
  }

  res.json({
    date: measure.date,
    download: measure.download,
    unit: responseUnit,
    pastMeasures,
  });
};
