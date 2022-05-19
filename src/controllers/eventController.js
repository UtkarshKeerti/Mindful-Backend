// Models
const Events = require('../models/Events');
const Conversations = require('../models/Conversations');


// Add Event
exports.addEvent = async (req, res) => {
  try {
    const events = new Events(req.body);

    // Pushing the Event to Conversation
    const convo = await Conversations.findById(events.conversation)
    convo.events.push(events._id);

    await events.save();
    await convo.save();

    res.status(200).json({ message: "Event added!" });

  } catch (err) {
    res.status(500).json({ message: err })
  }
}

// Get Event
// pass id in query.id to get a particular Event
exports.getEvent = async (req, res) => {
  try {
    const getEvent = await Events.find(req.query.id ? { _id: req.query.id } : null)
    // .populate('conversation')

    res.status(200).json(getEvent.sort((a, b) => b.createdAt - a.createdAt));
  } catch (err) {
    res.status(500).json({ message: err })
  }
}


// Update Speaker details


// Delete Speaker