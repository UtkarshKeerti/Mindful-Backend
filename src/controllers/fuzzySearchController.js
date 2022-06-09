const Events = require('../models/Events');
const Speakers = require('../models/Speakers');

// Search From all models
exports.searchFromAll = async (req, res) => {
  const { q } = req.query;
  let searchResults = []

  try {
    const resultEvents = await Events.aggregate([
      {
        $search: {
          // --- Normal search --- //
          index: 'searchEvent',
          text: {
            query: q,
            path: ['name', 'description'],
            fuzzy: {}
          }
          // --- Autocomplete --- //
          // index: 'autocompleteSearch',
          // autocomplete: {
          //   query: q,
          //   path: 'name'
          // }
        }
      }
    ])

    const resultSpeaker = await Speakers.aggregate([
      {
        $search: {
          index: 'searchSpeaker',
          text: {
            query: q,
            path: ['name', 'about'],
            fuzzy: {}
          }
        }
      }
    ])

    searchResults = [
      ...resultEvents,
      ...resultSpeaker
    ]

    res.status(200).json(searchResults)

  } catch (err) {
    res.status(200).json({ message: err })
  }

}


// Test search on Events
exports.searchEvents = async (req, res) => {
  const { q } = req.query;
  const regexQuery = new RegExp(q, 'i');

  try {
    const results = await Events.find(
      {
        "$or": [
          { name: { $regex: regexQuery } },
          { description: { $regex: regexQuery } }
        ]
      }
    )

    res.status(200).json(results)

  } catch (err) {
    res.status(500).json({ message: err })
  }
}