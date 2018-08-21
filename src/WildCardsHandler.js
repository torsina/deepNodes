class wildCardsHandler {
	constructor(deepNodes) {
		this._deepNodes = deepNodes;
		this._permissionArray = deepNodes._permissionArray;
		this._decomposedPermissionArray = deepNodes._decomposedPermissionArray;
	}
	mainHandler(permission) {
		return this.foo(permission);
	}
	starHandler(permission) {
		const decomposedPermission = permission.split(".");
		const starIndexes = [];
		const resultCache = this._decomposedPermissionArray.slice(0);
		const results = [];
		for(let i = 0, n = decomposedPermission.length; i < n; i++) {
			const node = decomposedPermission[i];
			if(node === "*") starIndexes.push(i);
		}
		// loop for each star found
		for(let i = 0, n = starIndexes.length; i < n; i++) {
			const starIndex = starIndexes[i];
			console.log("starIndex " + starIndex);
			// loop for each tier of node up to the one of the star
			for(let j = 0; j < starIndex; j++) {
				console.log("searchTierIndex " + j);
				// loop to search on the cache
				for(let k = 0; k < resultCache.length; k++) {
					console.log(resultCache);
					const searchedPerm = resultCache[k];
					console.log("searchedPerm " + searchedPerm);
					if(decomposedPermission[j] !== searchedPerm[j]) {
						resultCache.splice(k, 1);
						k--;
					}
				}
			}
		}
		return resultCache;
	}
	foo(permission) {
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
