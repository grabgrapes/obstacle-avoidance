const { DeviceController } = require("@espruino-tools/core");

class Curio extends DeviceController {
	constructor() {
		super();
		this.left = 0;
		this.right = 0;
		this.speed = 600;
	}

	move() {
		this.UART.write(`go(${this.right}, ${this.left}, ${this.speed})\n`);
	}

	stop() {
		this.UART.write(`go(0, 0)\n`);
	}

	setParameters(x, y, distance) {
		this.speed = Math.round(distance * 6);

		const angle = this.calculateAngle({ x, y });
		const tempValue = (2 * angle) / 90;

		if (x >= 0) {
			if (y >= 0) {
				this.left = 1000;
				this.right = Math.round((tempValue - 1) * 10) * 100;
			} else {
				this.left = -1000;
				this.right = Math.round((1 - tempValue) * 10) * 100;
			}
		} else {
			if (y >= 0) {
				this.right = 1000;
				this.left = Math.round((3 - tempValue) * 10) * 100;
			} else {
				this.right = -1000;
				this.left = Math.round((tempValue - 3) * 10) * 100;
			}
		}
	}

	/**
	 * Returns the angle between the given vector and unit vector on X (1, 0).
	 *
	 * @param {Object} vector - The vector.
	 */
	calculateAngle(vector) {
		const unit = { x: 1, y: 0 };
		const magUnit = Math.sqrt(unit.x * unit.x + unit.y * unit.y); //1

		const dotProduct = vector.x * unit.x + vector.y * unit.y;
		const magVector = Math.sqrt(vector.x * vector.x + vector.y * vector.y);
		const cos = (dotProduct / magVector) * magUnit;
		const angle = (Math.acos(cos) * 180) / Math.PI;
		return angle;
	}
}

module.exports = Curio;