// Models
const Events = require('../models/Events');
const Conversations = require('../models/Conversations');

// Add Event
exports.addEvent = async (req, res) => {
  try {
    const events = new Events(req.body);

    // Pushing the Event and its speakers to Conversation
    const convoSpk = await Conversations.updateOne(
      { _id: events.conversation },
      {
        $addToSet: {
          events: events._id,
          speakers: {
            $each: events.speakers
          }
        }
      },
      { multi: true }
    )

    await events.save();

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

// Get Event based on Convo ID
exports.getConvoEvent = async (req, res) => {
  try {
    const convoEvent = await Conversations.findById(req.params.id)
      .select('events')
      .populate('events')
      .populate({
        path: 'events',
        populate: {
          path: 'speakers',
          select: 'name'
        }
      })

    res.status(200).json(convoEvent.events.sort((a, b) => b.createdAt - a.createdAt));

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


// Delete Event(s)
exports.deleteEvent = async (req, res) => {
  try {
    const arrayOfIds = req.query.id.split(',')
    const eve = await Events.findById(arrayOfIds[0]);

    // Removing Event(s) from conversation.events array
    const convo = await Conversations.updateOne(
      { _id: eve.conversation },
      {
        $pull: {
          events: {
            $in: arrayOfIds
          },
          // TODO: Remove event-speakers as well.
        }
      }
    );

    // Delete Event(s)
    const delEvent = await Events.deleteMany(
      {
        _id: {
          $in: arrayOfIds
        }
      }
    );

    res.status(200).json({ message: `${delEvent.deletedCount} event(s) deleted!` });
  } catch (err) {
    res.status(500).json({ message: err })
  }
}

// Get event Image url
exports.getEventImage = async (req, res) => {
  try {
    const arrayOfIds = req.query.id.split(',')
    const eve = await Events.find(
      {
        _id: {
          $in: arrayOfIds
        }
      }
    )
      .select('image')

    res.status(200).json(eve)

  } catch (error) {
    console.log("Error while fetching event images", error)
  }
}