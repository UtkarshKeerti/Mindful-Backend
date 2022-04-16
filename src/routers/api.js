const express = require('express');
const router = express.Router();

// Controllers
const memberController = require('../controllers/memberController');
const conversationController = require('../controllers/conversationController');



// ----- Members API ----- //

// Post member
router.post('/member', memberController.addMember);

// Get member
// pass /member/?id=123123, to get member by Id
router.get('/member', memberController.getMembers);

// Update member
// pass /member/?id=1231231
router.put('/member', memberController.updateMember);

// Delete member
// pass /member/?id=1231231
router.delete('/member', memberController.deleteMember);


// ----- Series API ----- //

// Add Series
router.post('/series', conversationController.addConversation);

// Get Series
// pass /series/?id=123123, to get series by Id
router.get('/series', conversationController.getConversation);

// Update Series
// pass /series/?id=1231231
router.put('/series', conversationController.updateConversation);

// Delete Series
// pass /series/?id=1231231
router.delete('/series', conversationController.deleteConversation);



// ----- Speakers API ----- //

// Add Speaker

// Get Speaker

// Update Speaker

// Delete Speaker


// ----- Event API ----- //

// Add Event

// Get Event

// Update Event

// Delete Event



module.exports = router