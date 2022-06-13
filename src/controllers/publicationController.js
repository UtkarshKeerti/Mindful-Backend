// Models
const Publications = require('../models/Publications');

// Add publications
exports.addPublication = async (req, res) => {
  try {
    const publication = new Publications(req.body);

    if (!publication.name) throw "Publication name is required"

    const savePubs = publication.save();

    res.status(200).json({ message: "Publication added!" })

  } catch (err) {
    res.status(500).json({ message: err })
  }
}

// Get publications
exports.getPublication = async (req, res) => {

  try {
    let getPublication;

    if (req.query.id) {
      getPublication = await Publications.findById(req.query.id)

    } else getPublication = await Publications.find(); // get all

    res.status(200).json(getPublication);

  } catch (err) {
    res.status(500).json({ message: err })
  }
}

// Update publications
exports.updatePublication = async (req, res) => {

  try {
    const updatePub = await Publications.updateOne(
      { _id: req.query.id },
      {
        $set: req.body
      }
    )

    if (!updatePub.modifiedCount) throw "Something went wrong, try again"

    res.status(200).json({ message: "Publication updated!" })

  } catch (err) {
    res.status(500).json({ message: err })
  }
}

// Delete publications
exports.deletePublication = async (req, res) => {
  try {
    const delpubs = await Publications.deleteOne({ _id: req.query.id })

    if (!delpubs.deletedCount) throw "Something went wrong, try again"

    res.status(200).json({ message: "Publication deleted!" })

  } catch (err) {
    res.status(500).json({ message: err })
  }
}