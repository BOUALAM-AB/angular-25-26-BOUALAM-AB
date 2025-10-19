let Assignment = require('../model/assignment');

// Récupérer tous les assignments (GET) paginé
function getAssignments(req, res) {
  const page  = parseInt(req.query.page)  || 1;
  const limit = parseInt(req.query.limit) || 10;

  const aggregate = Assignment.aggregate([
    { $sort: { id: 1 } } 
  ]);

  Assignment.aggregatePaginate(aggregate, { page, limit }, (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result);
  });
}

// Récupérer un assignment par son id (GET)
function getAssignment(req, res){
  const assignmentId = Number(req.params.id);
  Assignment.findOne({ id: assignmentId }, (err, assignment) =>{
    if (err) return res.status(500).send(err);
    if (!assignment) return res.status(404).json({ message: 'Not found' });
    res.json(assignment);
  });
}

// Ajout d'un assignment (POST)  
function postAssignment(req, res){
  const assignment = new Assignment({
    nom: req.body.nom,
    dateDeRendu: req.body.dateDeRendu,
    rendu: !!req.body.rendu
  });

  assignment.save((err, saved) => {
    if (err) return res.status(500).send('cant post assignment');
    res.status(201).json(saved);
  });
}

// Update d'un assignment (PUT) 
function updateAssignment(req, res) {
  const id = Number(req.body.id);
  if (Number.isNaN(id)) {
    return res.status(400).json({ message: 'id (number) is required in body' });
  }
  const { _id, __v, ...rest } = req.body;

  Assignment.findOneAndUpdate({ id }, rest, { new: true }, (err, assignment) => {
    if (err) return res.status(500).send(err);
    if (!assignment) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'updated', assignment });
  });
}

// suppression d'un assignment (DELETE)  
function deleteAssignment(req, res) {
  const id = Number(req.params.id);
  Assignment.findOneAndDelete({ id }, (err, assignment) => {
    if (err) return res.status(500).send(err);
    if (!assignment) return res.status(404).json({ message: 'Not found' });
    res.json({ message: `${assignment.nom} deleted` });
  });
}

module.exports = { getAssignments, postAssignment, getAssignment, updateAssignment, deleteAssignment };
