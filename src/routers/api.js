const express = require('express');
const router = express.Router();

// Controllers
const authController = require('../controllers/authController');
const memberController = require('../controllers/memberController');
const conversationController = require('../controllers/conversationController');
const speakerController = require('../controllers/speakerController');
const eventController = require('../controllers/eventController');
const fuzzySearchController = require('../controllers/fuzzySearchController');


// ----- Auth API ----- //

// User Signup
router.post('/signup', authController.registerUser);

// Admin Login
router.post('/admin-login', authController.adminLogin);

// User Login
router.post('/login', authController.loginUser);



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

// Get member image url
router.get('/member-image', memberController.getMemberImage);


// ----- Series/Conversation API ----- //

// Add conversation
router.post('/conversation', conversationController.addConversation);

// get the list of conversatoin
router.get('/conversation-list', conversationController.getConvoList);

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

// Get Events from conversations
router.get('/convo-speaker/:id', speakerController.getConvoSpeaker)

// Update Speaker
// pass /speaker/?id=1231231
router.put('/speaker', speakerController.updateSpeaker);

// Delete Speaker
// pass /speaker/?id=1231231
router.delete('/speaker', speakerController.deleteSpeaker);

// Get event-image
// /speaker-image/?id=12312312,123123,12edqd123
router.get('/speaker-image', speakerController.getSpeakerImage)



// ----- Event API ----- //

// Add Event
router.post('/event', eventController.addEvent);

// Get Event
// pass /event/?id=123123, to get speaker by Id
router.get('/event', eventController.getEvent);

// Get Events from conversations
router.get('/convo-event/:id', eventController.getConvoEvent)

// Update Event
// pass /Event/?id=1231231
router.put('/event', eventController.updateEvent);

// Delete Event
router.delete('/event', eventController.deleteEvent);

// Get event image
// /event-image/?id=12312312,123123,12edqd123
router.get('/event-image', eventController.getEventImage);


// ----- Fuzzy Search ----- //
// /search/?q=event12
router.get('/search', fuzzySearchController.searchEvents);

// Site-level-Search
// /site-search/?id=convr
router.get('/site-search', fuzzySearchController.searchFromAll);



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