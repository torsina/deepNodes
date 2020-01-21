const ContextBuilder = require("../src/ContextBuilder");
const util = require("util");
const validShema = {
	discord: {
		permission: {
			set: -1,
			get: -1
		},
		message: {
			foo: {
				get: -1,
				set: -1
			}
		}
	},
	get: -1,
	set: -1
};

const ctx1 = {
	discord: {
		permission: {
			set: 0,
			get: 1
		}
	},
	foobar: {
		test: 5
	}
};

const ctx2 = {
	get: 1,
	set: -1
};

const contextBuilder = new ContextBuilder(validShema, [ctx1, ctx2]);

const test = contextBuilder.build();
log(test);


function log(obj) {
	console.log(util.inspect(obj, false, null, true));
}
