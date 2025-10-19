let mongoose = require('mongoose');
let Schema = mongoose.Schema;
const Counter = require('./counter');
const aggregatePaginate = require('mongoose-aggregate-paginate-v2'); 

let AssignmentSchema = Schema({
  id: { type: Number, index: true, unique: true }, 
  nom: { type: String, required: true },
  dateDeRendu: { type: Date, required: true },
  rendu: { type: Boolean, default: false }
});


AssignmentSchema.pre('save', async function(next) {
  try {
    if (this.isNew && (this.id === undefined || this.id === null)) {
      const c = await Counter.findByIdAndUpdate(
        'assignments',                   
        { $inc: { seq: 1 } },            
        { new: true, upsert: true }      
      );
      this.id = c.seq;
    }
    next();
  } catch (e) {
    next(e);
  }
});

AssignmentSchema.plugin(aggregatePaginate);

module.exports = mongoose.model('Assignment', AssignmentSchema);
