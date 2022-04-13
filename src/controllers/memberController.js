// Models
const Members = require('../models/Members');


// Add member
exports.addMember = async (req, res) => {
  const member = new Members(req.body);

  try {
    const addMember = await member.save();
    res.json(addMember);
  } catch (err) {
    res.json({ message: err })
  }
}

// Get members
// pass id in query.id to get a particular member
exports.getMembers = async (req, res) => {
  try {
    const getMember = await Members.find(req.query.id ? { _id: req.query.id } : null)
    res.json(getMember.sort((a, b) => b.createdAt - a.createdAt));
  } catch (err) {
    res.json({ message: err })
  }
}

// Update Member details
exports.updateMember = async (req, res) => {
  try {
    const updateMember = await Members.updateOne(
      { _id: req.query.id },
      {
        // Sending only the changed field also works. No need to send the entire object.
        $set: {
          name: req.body.name,
          image: req.body.image,
          title: req.body.title,
          about: req.body.about
        }
      }
    )
    res.json(updateMember)
  } catch (err) {
    res.json({ message: err })
  }
}

// Delete member details
exports.deleteMember = async (req, res) => {
  try {
    const delMember = await Members.remove({ _id: req.query.id })
    res.json(delMember)
  } catch (err) {
    res.json({ message: err })
  }
}