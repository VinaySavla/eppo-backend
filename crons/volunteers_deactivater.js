const time = require('../constants/time');

module.exports = async function() {
    console.log("(-: I run every day :-)");
    return 1 * time.DAY;
}
