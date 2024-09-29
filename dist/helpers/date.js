"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isEvenDay = exports.isOddDay = exports.isSunday = exports.Days = void 0;
var Days;
(function (Days) {
    Days["ODD_DAY"] = "ODD_DAY";
    Days["EVEN_DAY"] = "EVEN_DAY";
    Days["EVERY_DAY"] = "EVERY_DAY";
})(Days || (exports.Days = Days = {}));
const isSunday = (date) => date.getDay() === 0;
exports.isSunday = isSunday;
const isOddDay = (date) => date.getDate() % 2 !== 0;
exports.isOddDay = isOddDay;
const isEvenDay = (date) => date.getDate() % 2 === 0;
exports.isEvenDay = isEvenDay;
