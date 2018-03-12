const Schedule = require('node-schedule');

var _app = {
  errMap: {},
  printFirstError(key, printContent){
    if(!this.errMap[key]){
      this.errMap[key] = true;
      console.error('-----------------first error data-----------------');
      console.error(printContent);
      console.error('-----------------end error data-----------------');
    }
  },
  error(...p){
    console.error.apply(console, p);
  },
  log(...p){
    console.log.apply(console, p);
  }
};

Schedule.scheduleJob(`0 0 2 * * 1`, function(){
  _app.errMap = {};
});

module.exports = _app;
