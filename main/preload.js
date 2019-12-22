const adb = require('adbkit');

const adbClient = adb.createClient();


// Since we disabled nodeIntegration we can reintroduce
// needed node functionality here
process.once('loaded', () => {
  global.adbClient = adbClient
})