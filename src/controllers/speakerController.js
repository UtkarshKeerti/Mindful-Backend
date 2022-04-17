// Models
const Speakers = require('../models/Speakers');


// Add Speaker
exports.addSpeaker = async (req, res) => {
  const speaker = new Speakers(req.body);

  try {
    const addSpeaker = await speaker.save();
    res.json(addSpeaker);
  } catch (err) {
    res.json({ message: err })
  }
}

// Get Speaker
// pass id in query.id to get a particular speaker
exports.getSpeaker = async (req, res) => {
  try {
    const getSpeaker = await Speakers.find(req.query.id ? { _id: req.query.id } : null);
    res.json(getSpeaker.sort((a, b) => b.createdAt - a.createdAt));
  } catch (err) {
    res.json({ message: err })
  }
}


// Update Speaker details


// Delete Speaker