class Node {
	constructor() {
		// ex: `discord.permission.set`, _name="permission"
		this._name = null;
		this._value = 0;
		this._childrens = {};
	}

	addChildren(children) {
		if(this._value !== null) {
			throw Error("");
		}
	}

	setValue(value) {
		value = parseInt(value, 10);
		if(isNaN(value)) throw Error("Node value cannot be NaN");
		switch(value) {
			case -1:
			case 0:
			case 1: {
				this._value = value;
				break;
			}
			default: {
				throw Error(`Node value cannot be "${value}"`);
			}
		}
	}
}

module.exports = Node;
