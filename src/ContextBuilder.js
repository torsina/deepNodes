const util = require("util");

class ContextBuilder {
	// we will follow the shema provided by the first argument
	// if a context doesn't provide a specific part of the context, it will not return an error but will skip that part
	// eslint-disable-next-line valid-jsdoc
	/**
	 a valid schema will look like this:
	 {
	 	"discord": {
	 		"permission": {
	 			"set": -1
	 		}
	 	}
	 }
	 an end of path is designated by having a Number -1 (Deny) as value
	 **/
	constructor(validShema, contexts) {
		this._validShema = validShema;
		this._contexts = contexts;
	}

	build() {
		// used by build when creating the object to build the context on, as we want to keep the validShema intact
		const endContext = Object.assign({}, this._validShema);
		for(let i = 0; i < this._contexts.length; i++) {
			console.log(util.inspect(this._contexts[i], false, null, true));
			this.buildSingle(endContext, this._contexts[i]);
		}
		return endContext;
	}


	/**
	 * build a single context onto the endContext
	 * @param endContext
	 * @param currentContext
	 */
	buildSingle(endContext, currentContext) {
		const keys = Object.keys(endContext);
		for(const key of keys) {
			switch(typeof endContext[key]) {
				case "number": {
					if(typeof currentContext[key] === "number") {
						switch(currentContext[key]) {
							// nothing happens for 0 because it is Ignore
							case 0: {
								break;
							}
							case -1:
							case 1: {
								endContext[key] = currentContext[key];
								break;
							}
							default: {
								throw Error(`Node value cannot be "${currentContext[key]}"`);
							}
						}
					}
					break;
				}
				case "object": {
					if(typeof currentContext[key] === "object") {
						this.buildSingle(endContext[key], currentContext[key]);
					}
					break;
				}
			}
		}
	}
}

module.exports = ContextBuilder;
