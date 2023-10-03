const express = require('express');
const app = express();
const PORT = 3000;
const { logMiddleware } = require('./middlewares');

app.use(express.json()); 

app.use(logMiddleware);

const users = [
  { username: 'alice', apiKey: 'alice@123' },
  { username: 'bob', apiKey: 'bob@123' },
  { username: 'charlie', apiKey: 'charlie@123' }
];

const checkAPIKey=(req, res, next) =>{
  const apiKey = req.query.apiKey;
  const user = users.find(u => u.apiKey === apiKey);

  if (!user) {
    return res.status(401).json({ error: 'Invalid API key' });
  }

  req.user = user;
  next();
}

const resourceAccessCounts = {
  student: { alice: 0, bob: 0, charlie: 0 },
  teacher: { alice: 0, bob: 0, charlie: 0 },
  subject: { alice: 0, bob: 0, charlie: 0 }
};

app.get('/student', checkAPIKey, (req, res) => {
  const user = req.user;
  resourceAccessCounts.student[user.username]++;
  res.json({ accessCount: resourceAccessCounts.student[user.username] });
});

app.get('/teacher', checkAPIKey, (req, res) => {
  const user = req.user;
  resourceAccessCounts.teacher[user.username]++;
  res.json({ accessCount: resourceAccessCounts.teacher[user.username] });
});

app.get('/subject', checkAPIKey, (req, res) => {
  const user = req.user;
  resourceAccessCounts.subject[user.username]++;
  res.json({ accessCount: resourceAccessCounts.subject[user.username] });
});

app.get('/system/statistic', (req, res) => {
  const statistics = users.map(user => {
    return {
      user: user.username,
      student: { accessCount: resourceAccessCounts.student[user.username] },
      teacher: { accessCount: resourceAccessCounts.teacher[user.username] },
      subject: { accessCount: resourceAccessCounts.subject[user.username] }
    };
  });

  res.json(statistics);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
