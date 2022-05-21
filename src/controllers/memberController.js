// Models
const Members = require('../models/Members');


// Add member
exports.addMember = async (req, res) => {
  const member = new Members(req.body);

  try {
    const addMember = await member.save();
    res.status(200).json({ message: 'Member Added!' });
  } catch (err) {
    res.status(500).json({ message: err })
  }
}

// Get members
// pass id in query.id to get a particular member
exports.getMembers = async (req, res) => {
  try {
    let getMember;
    if (req.query.id) {
      getMember = await Members.findById(req.query.id)
    } else getMember = await Members.find();

    res.status(200).json(getMember);
  } catch (err) {
    res.status(500).json({ message: err })
  }
}

// Update Member details
exports.updateMember = async (req, res) => {
  try {
    const updateMember = await Members.updateOne(
      { _id: req.query.id },
      {
        // Sending only the changed field also works. No need to send the entire object.
        $set: req.body
      }
    )
    res.status(200).json({ message: 'Member details updated!' })
  } catch (err) {
    res.status(500).json({ message: err })
  }
}

// Delete member
exports.deleteMember = async (req, res) => {
  try {
    const delMember = await Members.deleteOne({ _id: req.query.id })
    res.status(200).json({ message: "Member Deleted!" })
  } catch (err) {
    res.status(500).json({ message: err })
  }
}