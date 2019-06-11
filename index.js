const Petri = require('./petri')
const petri = new Petri();
petri.visual = process.argv.slice(2).includes('-visual'); //Set to true in order to see visual representation used for testing
petri.setSize();