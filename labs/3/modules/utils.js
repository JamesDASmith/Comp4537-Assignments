const messages = require("./lang/en/en.js");

class Utils {
  static getDate(name) {
    const now = new Date();
    const message = messages.greeting.replace("%1", name);
    return `${message} ${now.toString()}`;
  }
}

module.exports = Utils;
