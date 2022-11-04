//////////////////////////////////////////////////////
//                      LOGS                        //
//////////////////////////////////////////////////////

module.exports.log = function(prefix, string, logType=0) {
  var today = new Date();
  var date = today.getHours() + "." + today.getMinutes() + "." + today.getSeconds();
  if (logType == 0) {
    console.log("[" + date + ":INFO] [" + prefix + "] " + string);
  } else if (logType == 1) {
    console.log("[" + date + ":WARN] [" + prefix + "] " + string);
  } else {
    console.log("[" + date + ":ERROR] [" + prefix + "] " + string);
  }
}