// Models
const Speakers = require('../models/Speakers');


// Add Speaker
exports.addSpeaker = async (req, res) => {
  const speaker = new Speakers(req.body);

  try {
    const addSpeaker = await speaker.save();
    res.status(200).json({ message: 'Speaker added!' });
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
      // .populate('conversations')

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
exports.updateSpeaker = async (req, res) => {
  try {
    const updateSpeaker = await Speakers.updateOne(
      { _id: req.query.id },
      {
        // Sending only the changed field also works. No need to send the entire object.
        $set: req.body
      }
    )
    res.status(200).json({ message: 'Speaker details updated!' });

  } catch (err) {
    res.status(500).json({ message: err })
  }
}

// Delete Speaker