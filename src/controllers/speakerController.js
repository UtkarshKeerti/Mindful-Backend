// Models
const Speakers = require('../models/Speakers');


// Add Speaker
exports.addSpeaker = async (req, res) => {
  const speaker = new Speakers(req.body);

  try {
    const addSpeaker = await speaker.save();
    res.status(200).json(addSpeaker);
  } catch (err) {
    res.status(500).json({ message: err })
  }
}

// Get Speaker
// pass id in query.id to get a particular speaker
exports.getSpeaker = async (req, res) => {
  try {
    let getSpeaker;

    if (req.query.id) {
      getSpeaker = await Speakers.findById(req.query.id)
        .populate('conversations')

    } else getSpeaker = await Speakers.find(); //get all

    // Sort the response if it is in array (in case of get all), else return the object as it is.
    res.status(200).json(
      getSpeaker.length ? getSpeaker.sort((a, b) => b.createdAt - a.createdAt)
        : getSpeaker
    );

  } catch (err) {
    res.status(500).json({ message: err })
  }
}


// Update Speaker details


// Delete Speaker