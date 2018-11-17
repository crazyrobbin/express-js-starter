var mongoose = require('mongoose');
var Schema = mongoose.Schema;
if (mongoose.connection.readyState === 0) {
  mongoose.connect(require('./connection-string'));
}


var newSchema = new Schema({
  
  '_id': { type: String },
  'seq': { type: Number },
  'createdAt': { type: Date, default: Date.now },
  'updatedAt': { type: Date, default: Date.now }
});

newSchema.pre('save', function(next){
  this.updatedAt = Date.now();
  next();
});

newSchema.pre('update', function() {
  this.update({}, { $set: { updatedAt: Date.now() } });
});

newSchema.pre('findOneAndUpdate', function() {
  this.update({}, { $set: { updatedAt: Date.now() } });
});



newSchema.statics.findAndModify = function (query, sort, doc, options, callback) {
  	return this.collection.findAndModify(query, sort, doc, options, callback);
};

module.exports = mongoose.model('Counter', newSchema);

module.exports.getNextSequence = function(name, callback) {
	Counter.findAndModify({ _id: name }, [], { $inc: { seq: 1 } }, {}, function (err, counter) {
  		if (err) throw err;
  		return callback(counter.value.seq);
	});
};
