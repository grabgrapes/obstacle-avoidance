// import * as ESPT_core from "@espruino-tools/core";
//
// let puck = new ESPT_core.Puck();
//
// puck.connect(function () {
//   console.log("connected");
// });

// 在此处添加连接蓝牙的逻辑
export function connectBluetooth() {
  let puck = new ESPT_core.Puck();
  puck.connect(function () {
    console.log("connected");
  });
}