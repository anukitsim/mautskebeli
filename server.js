const fetch = require('node-fetch');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors());

app.post('/facebook-access-token-endpoint', async (req, res) => {
  try {
    const { user_access_token, page_id } = req.body;

    const response = await fetch(`https://graph.facebook.com/v13.0/${page_id}?fields=access_token&access_token=${user_access_token}`);
    const data = await response.json();

    if (response.ok) {
      res.json({ page_access_token: data.access_token });
    } else {
      throw new Error(`Error fetching page access token: ${data.error.message}`);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});