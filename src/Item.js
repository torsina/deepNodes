class Item {
	constructor(_data, deepNodes) {
		const { id, array } = _data;
		this._deepNodes = deepNodes;
		this._permissionArray = array;
		this._permissionArrayMap = new Map();
		this._id = id;
	}
	give(permission) {
		this._deepNodes._checkPermission(permission);
		const opposite = permission.charAt(0) === "-" ? permission.slice(1) : `-${permission}`;

	}
	take (permission) {

	}
}
module.exports = Item;
