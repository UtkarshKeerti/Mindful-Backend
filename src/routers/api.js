const express = require('express');
const router = express.Router();

// Controllers
const memberController = require('../controllers/memberController');
const conversationController = require('../controllers/conversationController');
const speakerController = require('../controllers/speakerController');



// ----- Members API ----- //

// Post member
router.post('/member', memberController.addMember);

// Get members
// pass /member/?id=123123, to get member detials by Id
router.get('/member', memberController.getMembers);

// Update member
// pass /member/?id=1231231
router.put('/member', memberController.updateMember);

// Delete member
// pass /member/?id=1231231
router.delete('/member', memberController.deleteMember);


// ----- Series/Conversation API ----- //

// Add conversation
router.post('/conversation', conversationController.addConversation);

// Get conversations
// pass /conversation/?id=123123, to get conversation details by Id
router.get('/conversation', conversationController.getConversation);

// Update conversation
// pass /conversation/?id=1231231
router.put('/conversation', conversationController.updateConversation);

// Delete conversation
// pass /conversation/?id=1231231
router.delete('/conversation', conversationController.deleteConversation);



// ----- Speakers API ----- //

// Add Speaker
router.post('/speaker', speakerController.addSpeaker);

// Get Speaker
// pass /speaker/?id=123123, to get speaker by Id
router.get('/speaker', speakerController.getSpeaker)

// Update Speaker

// Delete Speaker



// ----- Event API ----- //

// Add Event

// Get Event

// Update Event

// Delete Event



// ----- Publications API ----- //

// Add publication

// Get Publication

// Update publication

// Delete Publication



// ----- Contact us API ----- //

// Add ContactUs data

// Get ContactUs data

// Update

// Delete


module.exports = router