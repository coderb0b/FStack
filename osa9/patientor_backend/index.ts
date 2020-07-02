import express from 'express';
import cors from 'cors';
const app = express();
//const cors = require('cors');
app.use(cors());
app.use(express.json());

const PORT = 3005;

app.get('/api/ping', (_req, res) => {
    res.send('pong');
});




app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});