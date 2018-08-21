class Layer {
	constructor(deepNodes) {
		this._deepNodes = deepNodes;
		this._map = new Map();
		this._compiledPermArray = [];
	}
	addItem(id, item) {
		this._map.set(id, item);
	}
	getItem(id) { // eslint-disable-line consistent-return
		if(this.hasItem(id)) return this._map.get(id);
	}
	hasItem(id) {
		if(!this._map.has(id)) throw new Error(`"${id}" layer doesn't exist`);
		return true;
	}
	buildLayer() {
		if (this._deepNodes._useIndex) {
			this._map.forEach((permArray) => {
				for (let i = 0, n = permArray.length; i < n; i++) {
					const perm = permArray[i];
					const index = this._compiledPermArray.indexOf(perm);
					if (index )
				}
			})
		}
	}
}
module.exports = Layer;
