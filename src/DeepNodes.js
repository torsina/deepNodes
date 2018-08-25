const Layer = require("./Layer");
const WildCardsHandler = require("./WildCardsHandler");
class DeepNodes {
	constructor(settings = {}) {
		this._layers = new Map();
	}
	_checkSchema(schema) {
		for(const prop in schema) {
			if(typeof schema === "object") {
				if(!Array.isArray(schema)) return this._checkSchema(schema[prop]);
				else return true;
			} else {
				throw new Error("Nodes import must be built with objects and ended with arrays");
			}
		}
		return true;
	}
	_checkPermissionArray(permissions) {
		permissions = this._handleWildCards(permissions);
		for(let i = 0, n = permissions.length; i < n; i++) {
			const perm = permissions[i].slice(0); // do a deep copy of the string to keep the original array clean
			this._checkPermission(perm);
		}
		return permissions;
	}
	_checkPermission(perm) {
		if(perm.charAt(0) === "-") perm = perm.slice(1); // remove the deny adjective as it's not needed here
		const decomposedPerm = perm.split(".");
		const decomposedPermLength = decomposedPerm.length;
		const permEndProperty = decomposedPerm[decomposedPermLength - 1];
		const permObjectProperties = decomposedPerm.slice(0, decomposedPermLength - 1);

		// validate the permission node
		let objectExplorer = this._schema;
		for(let j = 0, m = permObjectProperties.length; j < m; j++) {
			const propertyName = permObjectProperties[j];
			objectExplorer = objectExplorer[propertyName];
			if(objectExplorer === undefined) throw new Error(`"${perm}" is not a valid permission`);
		}

		if(!Array.isArray(objectExplorer) || !objectExplorer.includes(permEndProperty)) {
			throw new Error(`"${perm}" is not a valid permission`);
		}
		return true;
	}
	_handleWildCards(...permissions) {
		const resultArray = [];
		for(const permission of permissions) {
			if(Array.isArray(permission)) return this._handleWildCards(permission);
			else resultArray.concat(this._handler.mainHandler(permission));
		}
		return resultArray;
	}
	_createPermissionArray(objectExporer = this._schema, array = [], stringArray = []) {
		if(Array.isArray(objectExporer)) {
			for(let i = 0, n = objectExporer.length; i < n; i++) {
				array.push(`${stringArray.join(".")}.${objectExporer[i]}`);
			}
		} else if(typeof objectExporer === "object") {
			for(const prop in objectExporer) {
				const nextStringArray = stringArray.slice(0);
				nextStringArray.push(prop);
				this._createPermissionArray(objectExporer[prop], array, nextStringArray);
			}
		} else {
			throw new Error("Nodes import must be built with objects and ended with arrays");
		}
		this._permissionArray = array;
	}
	_createDecomposedPermissionArray() {
		this._decomposedPermissionArray = [];
		for(let i = 0, n = this._permissionArray.length; i < n; i++) {
			const permission = this._permissionArray[i];
			this._decomposedPermissionArray.push(permission.split("."));
		}
	}
	importSchema(schema) {
		if(this._checkSchema(schema)) {
			this._schema = schema;
			this._createPermissionArray();
			this._createDecomposedPermissionArray();
			this._handler = new WildCardsHandler(this);
		}
	}
	// layer methods
	addLayer(layerName) {
		if(typeof layerName !== "string") throw new TypeError(`"${layerName}" is not a string`);
		if(!this._layers.has(layerName)) {
			this._layers.set(layerName, new Layer(this));
		} else {
			throw new Error(`${layerName} layer already exists`);
		}
	}
	addLayers(...layerNames) {
		for(let i = 0, n = layerNames.length; i < n; i++) {
			const layerName = layerNames[i];
			this.addLayer(layerName);
		}
	}
	hasLayer(layerName) {
		if(typeof layerName !== "string") throw new TypeError(`"${layerName}" is not a string`);
		return this._layers.has(layerName);
	}
	getLayer(layerName) {
		if(this.hasLayer(layerName)) return this._layers.get(layerName);
		else throw new Error(`"${layerName}" layer doesn't exist`);
	}
	// item methods
	getItem(layerName, itemID) {
		return this.getLayer(layerName).getItem(itemID);
	}
	hasItem (layerName, itemID) {
		return this.getLayer(layerName).hasItem(itemID);
	}
	addItem(layerName, itemID, item) {
		return this.getLayer(layerName).setItem(itemID, item);
	}
	//
	has(permission) {

	}
}

const testPermissionSchema = {
	commands: ["ban", "kick", "ping"],
	shop: { add: ["a", "b", "etc"] }
};


module.export = DeepNodes;

const context = new DeepNodes();
context.importSchema(testPermissionSchema);
console.log(context._handleWildCards("commands.*"));
