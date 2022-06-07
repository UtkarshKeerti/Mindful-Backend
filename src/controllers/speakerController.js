// Models
const Speakers = require('../models/Speakers');
const Conversations = require('../models/Conversations');
const Events = require('../models/Events');


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

    res.status(200).json(getSpeaker);

  } catch (err) {
    res.status(500).json({ message: err })
  }
}

// Get speaker based on convo ID
exports.getConvoSpeaker = async (req, res) => {
  try {
    const convoSpeaker = await Conversations.findById(req.params.id)
      .select('speakers')
      .populate('speakers')
    res.status(200).json(convoSpeaker.speakers)

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
exports.deleteSpeaker = async (req, res) => {
  try {
    const arrayOfIds = req.query.id.split(',')

    // Remove speakers from Conversation
    const convo = await Conversations.updateMany(
      {
        speakers: {
          $in: arrayOfIds
        }
      },
      {
        $pull: {
          speakers: {
            $in: arrayOfIds
          }
        }
      }
    );

    // Remove speakers from Events
    const eve = await Events.updateMany(
      {
        speakers: {
          $in: arrayOfIds
        }
      },
      {
        $pull: {
          speakers: {
            $in: arrayOfIds
          }
        }
      }
    );

    const delSpeaker = await Speakers.deleteMany(
      {
        _id: {
          $in: arrayOfIds
        }
      }
    );

    res.status(200).json({ message: `${delSpeaker.deletedCount} speaker(s) deleted!` })

  } catch (err) {
    res.status(500).json({ message: err })
  }
}

// Get speaker image url
exports.getSpeakerImage = async (req, res) => {
  try {
    const arrayOfIds = req.query.id.split(',')
    const speaker = await Speakers.find(
      {
        _id: {
          $in: arrayOfIds
        }
      }
    )
      .select('image')

    res.status(200).json(speaker)

  } catch (err) {
    console.log("Error while fetching speaker images", err)
  }
}