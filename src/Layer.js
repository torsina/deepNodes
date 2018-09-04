const Item = require("Item");
class Layer {
	constructor(name, deepNodes) {
		this._deepNodes = deepNodes;
		this._itemsMap = new Map();
		this._compiledPermArray = [];
		this._compiledPermMapArray = new Map();
		this._layerName = name;
	}
	setItem(id, array) {
		// delete compiled cache
		this._compiledPermArray = [];
		this._compiledPermMapArray = new Map();
		// check if array is valid
		array = this._deepNodes._checkPermissionArray(array);
		const item = new Item({ id, array, layerName: this._layerName }, this._deepNodes);
		this._itemsMap.set(id, item);
	}
	getItem(id) { // eslint-disable-line consistent-return
		if(this.hasItem(id)) return this._itemsMap.get(id);
	}
	hasItem(id) {
		if(!this._itemsMap.has(id)) throw new Error(`"${id}" layer doesn't exist`);
		return true;
	}
	buildLayer() {
		this._itemsMap.forEach((permArray) => {
			for(let i = 0, n = permArray.length; i < n; i++) {
				const perm = permArray[i];
				const deny = perm.charAt(0) === "-";
				let positivePerm, positiveIndex;
				let negativePerm, negativeIndex;
				// only search for the needed indexes
				if(deny) {
					positivePerm = deny ? perm.slice(1) : perm;
					positiveIndex = this._compiledPermMapArray.get(positivePerm);
				} else {
					negativePerm = deny ? perm : null;
					negativeIndex = this._compiledPermMapArray.get(negativePerm);
				}
				// no index on both sides
				if(!positiveIndex && !negativeIndex) {
					// add the perm to the array and the map
					this._compiledPermMapArray.set(perm, this._compiledPermArray.length);
					this._compiledPermArray.push(perm);
				} else if(!deny && !!negativeIndex) {
					// there is negative index + allow
					this._compiledPermArray[negativeIndex] = perm;
					this._compiledPermMapArray.delete(negativePerm);
					this._compiledPermMapArray.set(perm, negativeIndex);
				} else if(deny && !!positiveIndex) {
					// we edit the map and the array
					// from a positive perm to a negative perm
					this._compiledPermArray[positiveIndex] = perm;
					this._compiledPermMapArray.delete(positivePerm);
					this._compiledPermMapArray.set(perm, positiveIndex);
				}
			}
		});
	}
}
module.exports = Layer;
