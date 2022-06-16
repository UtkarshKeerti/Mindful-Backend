const Conversations = require('../models/Conversations');
const Events = require('../models/Events');
const Members = require('../models/Members');
const Speakers = require('../models/Speakers');

// Search From all models
exports.searchFromAll = async (req, res) => {
  const { q } = req.query;
  const regexQuery = new RegExp(q, 'i');

  let searchResults = []

  try {
    // const resultConversation = await Conversations.aggregate([
    //   {
    //     $search: {
    //       index: 'searchConversation',
    //       text: {
    //         query: q,
    //         path: 'name',
    //         fuzzy: {}
    //       }
    //     }
    //   }
    // ])

    const resultConversations = await Conversations.find(
      {
        "$or": [
          { name: { $regex: regexQuery } },
          { description: { $regex: regexQuery } }
        ],
      },
    )
      .select('name description image')

    const resultEvents = await Events.find(
      {
        "$or": [
          { name: { $regex: regexQuery } },
          { description: { $regex: regexQuery } }
        ]
      }
    )
      .populate({
        path: 'speakers',
        select: 'name'
      })

    const resultSpeakers = await Speakers.find(
      {
        "$or": [
          { name: { $regex: regexQuery } },
          { about: { $regex: regexQuery } }
        ]
      }
    )

    const resultMembers = await Members.find(
      {
        "$or": [
          { name: { $regex: regexQuery } },
          { about: { $regex: regexQuery } },
          { title: { $regex: regexQuery } }
        ]
      }
    )

    searchResults = [
      [
        { tag: "conversations" },
        ...resultConversations
      ],
      [
        { tag: "events" },
        ...resultEvents
      ],
      [
        { tag: "speakers" },
        ...resultSpeakers
      ],
      [
        { tag: "members" },
        ...resultMembers
      ],
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