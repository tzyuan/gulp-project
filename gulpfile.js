const dev = require('./build/gulpfile.dev.js');
dev();
const prod = require('./build/gulpfile.prod.js');
prod();
const init = require('./build/gulpfile.init.js');
init();