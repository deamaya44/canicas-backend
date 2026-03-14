const admin = require('firebase-admin');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    projectId: process.env.FIREBASE_PROJECT_ID || 'canicas-todo'
  });
}

const verifyToken = async (req) => {
  const authHeader = req.headers['authorization'] || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;

  if (!token) throw new Error('No token');

  const decoded = await admin.auth().verifyIdToken(token);
  return decoded.uid;
};

module.exports = { verifyToken };
