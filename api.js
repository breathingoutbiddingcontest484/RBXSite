const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3001;

const COUNTER_FILE = path.join(__dirname, 'visits.json');

function getVisits() {
  if (!fs.existsSync(COUNTER_FILE)) {
    return 0;
  }
  const data = fs.readFileSync(COUNTER_FILE, 'utf8');
  try {
    return JSON.parse(data).count || 0;
  } catch {
    return 0;
  }
}

function saveVisits(count) {
  fs.writeFileSync(COUNTER_FILE, JSON.stringify({ count }), 'utf8');
}

app.get('/api/visits', (req, res) => {
  let count = getVisits();
  count++;
  saveVisits(count);
  res.json({ visits: count });
});

app.listen(PORT, () => {
  console.log(`Visit counter API running on port ${PORT}`);
});
