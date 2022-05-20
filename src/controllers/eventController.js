// Models
const Events = require('../models/Events');
const Speakers = require('../models/Speakers');
const Conversations = require('../models/Conversations');


// Add Event
exports.addEvent = async (req, res) => {
  try {
    const events = new Events(req.body);

    // Pushing the Event to Conversation
    const convo = await Conversations.findById(events.conversation)
    convo.events.push(events._id);
    // Add speakers in convoversation list
    convo.speakers.push([...events.speakers])

    await events.save();
    await convo.save();

    console.log('AAAA', convo)

    res.status(200).json({ message: "Event added!" });

  } catch (err) {
    res.status(500).json({ message: err })
  }
}

// Get Event
// pass id in query.id to get a particular Event
exports.getEvent = async (req, res) => {
  try {
    let getEvent;

    if (req.query.id) {
      getEvent = await Events.findById(req.query.id)
      // .populate('speakers')
      // .populate('conversation')

    } else getEvent = await Events.find(); //get all

    // Sort the response if it is in array (in case of get all), else return the object as it is.
    res.status(200).json(
      getEvent.length ? getEvent.sort((a, b) => b.createdAt - a.createdAt)
        : getEvent
    );
  } catch (err) {
    res.status(500).json({ message: err })
  }
}


// Update Event details
exports.updateEvent = async (req, res) => {
  try {
    const updateEvent = await Events.updateOne(
      { _id: req.query.id },
      { $set: req.body }
    )
    res.status(200).json({ message: 'Event details updated successfully!' })
  } catch (err) {
    res.status(500).json({ message: err })
  }
}


// Delete Event