// Models
const UserMessages = require('../models/UserMessage');

// Add Message
exports.addMessage = async (req, res) => {
  try {
    const message = new UserMessages(req.body);

    if (!message.name) throw "Name is required!"

    const saveMsg = message.save();
    res.status(200).json({ message: "Message Sent!" })

  } catch (err) {
    res.status(500).json({ message: err })
  }
}

// Get Messages
exports.getMessage = async (req, res) => {
  try {
    let getMessages;
    if (req.query.id) {
      getMessages = await UserMessages.findById(req.query.id)

    } else getMessages = await UserMessages.find();
    res.status(200).json(getMessages);
  } catch (err) {
    res.status(500).json({ message: err })
  }
}

// Delete Message(s)
exports.deleteMessages = async (req, res) => {
  try {
    const arrayOfIds = req.query.id.split(',')
    const delMsg = await UserMessages.deleteMany(
      {
        _id: {
          $in: arrayOfIds
        }
      }
    );

    if (!delMsg.deletedCount) throw "Something went wrong, try again!"
    res.status(200).json({ message: `${delMsg.deletedCount} message(s) deleted!` })
  } catch (err) {
    res.status(500).json({ message: err })
  }
}