class Item {
	constructor(_data, deepNodes) {
		const { id, array, layerName } = _data;
		this._deepNodes = deepNodes;
		this.permissionArray = array;
		this._permissionArrayMap = new Map();
		this.id = id;
		this.layerName = layerName;
	}
	save() {
		const obj = {};
		Object.entries(this).forEach(([key, value]) => {
			if(!key.startsWith("_")) obj[key] = value;
		});

		return obj;
	}
	give(permission) {
		let index;
		this._deepNodes._checkPermission(permission);
		const opposite = permission.charAt(0) === "-" ? permission.slice(1) : `-${permission}`;
		if(this._permissionArrayMap.has(opposite)) {
			index = this._permissionArrayMap.get(opposite);
			this._permissionArrayMap.delete(opposite);
		}
		this._permissionArrayMap.set(permission, index);
		this.permissionArray[index] = permission;
	}
	take (permission) {

	}
}
module.exports = Item;
