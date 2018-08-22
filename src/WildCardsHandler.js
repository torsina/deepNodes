class wildCardsHandler {
	constructor(deepNodes) {
		this._deepNodes = deepNodes;
		this._permissionArray = deepNodes._permissionArray;
		this._decomposedPermissionArray = deepNodes._decomposedPermissionArray;
	}
	mainHandler(permission) {
		return this.starHandler(permission);
	}
	starHandler(permission) {
		const decomposedPermission = permission.split(".");
		const results = this._decomposedPermissionArray.slice(0);
		for(let i = 0, n = decomposedPermission.length; i < n; i++) {
			const node = decomposedPermission[i];
			if(node !== "*") {
				for(let j = 0; j < results.length; j++) {
					const searchedPerm = results[j];
					if(node !== searchedPerm[i]) {
						results.splice(j, 1);
						j--;
					}
				}
			}
		}
		return results;
	}
}
module.exports = wildCardsHandler;

// shop.*.a
// commands.*
// *.add.*
