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
		if(this._deepNodes._useIndex) {
			this._map.forEach((permArray) => {
				for(let i = 0, n = permArray.length; i < n; i++) {
					const perm = permArray[i];
					const deny = perm.charAt(0) === "-";
					const positivePerm = deny ? perm.slice(1) : perm;
					const negativePerm = deny ? perm : null;
					const positiveIndex = this._compiledPermArray.indexOf(positivePerm);
					const negativeIndex = this._compiledPermArray.indexOf(negativePerm);
					/*
					deny + positive
					deny + negative
					deny + nothing
					!deny + positive
					!deny + negative
					!deny + nothing
					 */
					switch(deny) {
						case true: {
							// if positive index !== 0
							if(positiveIndex) {
								this._compiledPermArray
									.splice(positiveIndex, 1)
									.push(perm);
							} else if(negativeIndex) {
								// nothing
							}
							break;
						}
						case false: {
							
							break;
						}
					}
				}
			});
		}
	}
}
module.exports = Layer;
