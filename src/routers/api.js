const express = require('express');
const router = express.Router();

// Controllers
const memberController = require('../controllers/memberController');



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


module.exports = router