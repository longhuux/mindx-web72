
const checkAPIKey= (req, res, next) => {
    const apiKey = req.query.apiKey;
    const user = users.find(u => u.apiKey === apiKey);
  
    if (!user) {
      return res.status(401).json({ error: 'Invalid API key' });
    }
  
    req.user = user;
    next();
  }
const logMiddleware=(req, res, next) => {
  console.log(`Received ${req.method} request to ${req.path}`);
  next();
}
module.exports={
  checkAPIKey,
  logMiddleware
}