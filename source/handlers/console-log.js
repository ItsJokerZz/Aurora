const colors = require("colors");

const prefixes = {
  newLine: "✎ ",
  dropDown: "    ➤ ".cyan,
  warn: "◉ ".yellow.bold,
  error: "✗ ".red.bold,
  success: "✓ ".green.bold,
};

module.exports = Object.fromEntries(
  Object.entries(prefixes).map(([key, value]) => [
    key,
    (args, breakBefore = false, breakAfter = false) =>
    console.log(`${breakBefore ? "\n" : ""}${value}${args}${breakAfter ? "\n" : ""}`)
  ])
);