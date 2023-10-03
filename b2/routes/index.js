var express = require('express');
const { checkAPIKey, statisticRender, accessCountStudent, accessCountTeacher, accessCountSubject } = require('../controllers');
var router = express.Router();


router.get('/student', checkAPIKey, accessCountStudent);

router.get('/teacher', checkAPIKey,  accessCountTeacher);

router.get('/subject', checkAPIKey,  accessCountSubject);

router.get('/system/statistic', statisticRender);

module.exports = router;
