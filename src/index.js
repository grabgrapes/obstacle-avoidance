"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Curio = void 0;
var core_1 = require("@espruino-tools/core");
var Curio = /** @class */ (function (_super) {
    __extends(Curio, _super);
    function Curio() {
        var _this = _super.call(this) || this;
        _this.left = 0;
        _this.right = 0;
        _this.speed = 600;
        return _this;
    }
    Curio.prototype.move = function () {
        this.UART.write("go(".concat(this.right, ", ").concat(this.left, ", ").concat(this.speed, ")\n"));
    };
    Curio.prototype.stop = function () {
        this.UART.write("go(0, 0)\n");
    };
    Curio.prototype.setParameters = function (x, y, distance) {
        this.speed = Math.round(distance * 6);
        var angle = this.calculateAngle({ x: x, y: y });
        var tempValue = (2 * angle) / 90;
        if (x >= 0) {
            if (y >= 0) {
                this.left = 1000;
                this.right = Math.round((tempValue - 1) * 10) * 100;
            }
            else {
                this.left = -1000;
                this.right = Math.round((1 - tempValue) * 10) * 100;
            }
        }
        else {
            if (y >= 0) {
                this.right = 1000;
                this.left = Math.round((3 - tempValue) * 10) * 100;
            }
            else {
                this.right = -1000;
                this.left = Math.round((tempValue - 3) * 10) * 100;
            }
        }
    };
    /**
     * Returns the angle between the given vector and unit vector on X (1, 0).
     *
     * @param {number} x x coordinate of vector.
     * @param {number} y y coordinate of vector.
     */
    Curio.prototype.calculateAngle = function (vector) {
        var unit = { x: 1, y: 0 };
        var magUnit = Math.sqrt(unit.x * unit.x + unit.y * unit.y); //1
        var dotProduct = vector.x * unit.x + vector.y * unit.y;
        var magVector = Math.sqrt(vector.x * vector.x + vector.y * vector.y);
        var cos = (dotProduct / magVector) * magUnit;
        var angle = (Math.acos(cos) * 180) / Math.PI;
        return angle;
    };
    return Curio;
}(core_1.DeviceController));
exports.Curio = Curio;
