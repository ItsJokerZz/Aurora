const colors = require("colors");

function newLine(args, breakBefore = false, breakAfter = false) {
  console.log((breakBefore ? "\n" : "") + "✎ " + args + (breakAfter ? "\n" : ""));
}

function dropDown(args, breakBefore = false, breakAfter = false) {
  console.log((breakBefore ? "\n" : "") + "    ➤ ".cyan + args.gray + (breakAfter ? "\n" : ""));
}

function warn(args, breakBefore = false, breakAfter = false) {
  console.log((breakBefore ? "\n" : "") + "◉ ".yellow + args.bold + (breakAfter ? "\n" : ""));
}

function error(args, breakBefore = false, breakAfter = false) {
  console.log((breakBefore ? "\n" : "") + "✗ ".red + args.bold + (breakAfter ? "\n" : ""));
}

function success(args, breakBefore = false, breakAfter = false) {
  console.log((breakBefore ? "\n" : "") + "✓ ".green + args.bold + (breakAfter ? "\n" : ""));
}

module.exports = {
  newLine,
  dropDown,
  warn,
  error,
  success,
};