const colors = require("colors");

module.exports = function (logMessage, type = "info") {
  let logString;
  let logFormatting;

  switch (type) {
    case "debug":
      logString = colors.white(logMessage);
      logFormatting = colors.bgMagenta(colors.white(colors.bold("[ DEBUG ]")));
      break;
    case "info":
      logString = colors.white(logMessage);
      logFormatting = colors.white(colors.bold("[ INFO ]"));
      break;
    case "warn":
      logString = colors.white(logMessage);
      logFormatting = colors.black(colors.bold("[ WARNING ]"));
      break;
    case "critical":
      logString = colors.bgRed(colors.white(logMessage));
      logFormatting = colors.bgRed(colors.white(colors.bold("[ CRITICAL ]")));
      break;
    case "success":
      logString = colors.green(logMessage);
      logFormatting = colors.bgGreen(colors.black(colors.bold("[ SUCCESS ]")));
      break;
      
      // Remove this to get rid of command logging in the console
    case "cmdRan":
      logString = colors.white(logMessage);
      logFormatting = colors.bgMagenta(colors.white(colors.bold("[ COMMAND RAN ]")));
      break;
    default:
      logString = colors.white(logMessage);
      logFormatting = colors.white(colors.bold("[ INFO ]"));
      break;
  }
  console.log(logFormatting, logString);
}