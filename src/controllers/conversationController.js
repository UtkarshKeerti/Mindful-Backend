// Models
const Conversations = require('../models/Conversations');


// Add Conversation
exports.addConversation = async (req, res) => {
  const conversation = new Conversations(req.body);

  try {
    const addConversation = await conversation.save();
    res.status(200).json(addConversation);
  } catch (err) {
    res.status(500).json({ message: err })
  }
}

// Get Conversation
// pass id in query.id to get a particular Conversation
exports.getConversation = async (req, res) => {
  try {
    let getConversation;

    if (req.query.id) {
      getConversation = await Conversations.findById(req.query.id)
        .populate('events')
        .populate('speakers')

    } else getConversation = await Conversations.find(); // get all

    // Sort the response if it is in array (in case of get all), else return the object as it is.
    res.status(200).json(
      getConversation.length ? getConversation.sort((a, b) => b.createdAt - a.createdAt)
        : getConversation
    );
  } catch (err) {
    res.status(500).json({ message: err })
  }
}

// Update Conversation details
exports.updateConversation = async (req, res) => {
  try {
    const updateConversation = await Conversations.updateOne(
      { _id: req.query.id },
      {
        $set: req.body
      }
    )
    res.status(200).json(updateConversation)
  } catch (err) {
    res.status(500).json({ message: err })
  }
}

// Delete Conversation
exports.deleteConversation = async (req, res) => {
  try {
    const delConversation = await Conversations.deleteOne({ _id: req.query.id })
    res.status(200).json({ message: "Conversation Deleted!" });
  } catch (err) {
    res.status(500).json({ message: err })
  }
}