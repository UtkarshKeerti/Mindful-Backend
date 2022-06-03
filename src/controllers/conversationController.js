// Models
const Conversations = require('../models/Conversations');
const Events = require('../models/Events');
const fs = require('fs');
const path = require('path')
require('dotenv/config');


// Add Conversation
// NO async due to multer image thingy
exports.addConversation = async (req, res) => {

  // console.log('FILE', req.file)

  // const obj = {
  //   name: req.body.name,
  //   about: req.body.about,
  //   events: req.body.events,
  //   speakers: req.body.speakers,
  //   image: {
  //     data: fs.readFileSync(path.join(appRootPath + '/uploads/' + req.file.filename)),
  //     contentType: req.file.mimetype
  //   }
  // }

  try {

    // const data = fs.readFileSync(path.join(appRootPath + '/uploads/' + req.file.filename)).toString('base64')

    const obj = {
      ...req.body,
      image: {
        data: `${process.env.SERVER_URL}/uploads/${req.file.filename}`,
        // data: `data:${req.file.mimetype};base64,${data}`,
        filename: req.file.filename
      }
    }

    const conversation = new Conversations(obj)
    const convoSave = conversation.save();

    if (!conversation.name) throw "Conversation not saved"
    res.status(200).json({ message: "Conversation Added!" });

  } catch (err) {
    res.status(500).json({ message: err })
  }
}

// Get the list of conversations
exports.getConvoList = async (req, res) => {
  try {
    const convoList = await Conversations.find()
      .select('name')
    // _id comes by default

    res.status(200).json(convoList.sort((a, b) => b.createdAt - a.createdAt));
  } catch (err) {
    res.status(500).json({ message: err })
  }
}


// Get Conversation
// pass id in query.id to get a particular Conversation
exports.getConversation = async (req, res) => {

  // const cursor = bucket.find();
  // cursor.forEach(doc => console.log(doc));

  try {
    let getConversation;

    if (req.query.id) {
      getConversation = await Conversations.findById(req.query.id)
        .populate('events')
        .populate('speakers')

    } else getConversation = await Conversations.find(); // get all

    // Sort the response if it's in array (in case of get all), else return the object as it is.
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

    // Delete all events under that Conversation
    const eves = await Events.deleteMany(
      {
        conversation: {
          $in: [req.query.id]
        }
      },
    )

    res.status(200).json({ message: "Conversation Deleted!" });
  } catch (err) {
    res.status(500).json({ message: err })
  }
}