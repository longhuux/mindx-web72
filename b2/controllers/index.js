const {users,resourceAccessCounts} = require("../app.js")


const checkAPIKey= (req, res, next)=> {
    const apiKey = req.query.apiKey;
    const user = users.find(u => u.apiKey === apiKey);
  
    if (!user) {
      return res.status(401).json({ error: 'Invalid API key' });
    }
  
    req.user = user;
    next();
  }
const accessCountStudent = (req, res) => {
    const user = req.user;
    resourceAccessCounts.student[user.username]++;
    res.json({ accessCount: resourceAccessCounts.student[user.username] });
  }
  const accessCountTeacher = (req, res) => {
    const user = req.user;
    resourceAccessCounts.teacher[user.username]++;
    res.json({ accessCount: resourceAccessCounts.teacher[user.username] });
  }
  const accessCountSubject = (req, res) => {
    const user = req.user;
    resourceAccessCounts.subject[user.username]++;
    res.json({ accessCount: resourceAccessCounts.subject[user.username] });
  }

  const statisticRender = (req, res) => {
    const statistics = users.map(user => {
      return {
        user: user.username,
        student: { accessCount: resourceAccessCounts.student[user.username] },
        teacher: { accessCount: resourceAccessCounts.teacher[user.username] },
        subject: { accessCount: resourceAccessCounts.subject[user.username] }
      };
    });
  
    res.json(statistics);

  }
module.exports = {
    checkAPIKey,
    accessCountStudent,
    accessCountSubject,
    accessCountTeacher,
    statisticRender
}