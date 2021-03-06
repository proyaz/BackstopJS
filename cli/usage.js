var version = require('../package.json').version;
var makeSpaces = require('../core/util/makeSpaces');

var commandsDescription = {
  test: 'Create test screenshots and compare against the set you previously approved/referenced.',
  approve: 'Promotes all test bitmaps from last test run to reference bitmaps.',
  reference: 'Creates new reference screenshots. Deletes all existing reference files.',
  init: 'Generate BackstopJS boilerplate files in your CWD. NOTE: Overwrites existing config files!',
  remote: 'Launch BackstopJS remote service.',
  openReport: 'View the last test report in your browser.'
};

var optionsDescription = {
  '--config': 'Path to config file name',
  '--filter': 'A RegEx string used to filter by scenario labels when running "test" or "approve" commands',
  '-h, --help': 'Display usage',
  '-v, --version': 'Display version',
  '-i': 'Prevent deletion of non-matching reference files when running "reference" command (newer matching reference files are still overwritten)'
};

function makeDescription (descriptions) {
  return Object.keys(descriptions)
    .map(function (commandName) {
      return makeSpaces(4) + commandName + spacesBetweenCommandAndDescription(commandName) + descriptions[commandName];
    })
    .join('\n');
}

function spacesBetweenCommandAndDescription (commandName) {
  return makeSpaces(2 + leftPaddingOfDescription - commandName.length);
}

// Number of spaces to echo before writing description
var leftPaddingOfDescription = Object.keys(commandsDescription)
  .concat(Object.keys(optionsDescription))
  .map(function (string) {
    return string.length;
  })
  .reduce(function maxReducer (max, length) {
    return Math.max(max, length);
  }, 0);

var usage = '\
Welcome to BackstopJS ' + version + ' CLI\n\
\n\
Commands:\n\
' + makeDescription(commandsDescription) + '\n\
\n\
Options:\n\
' + makeDescription(optionsDescription) + '\n\
\n';

module.exports = usage;
