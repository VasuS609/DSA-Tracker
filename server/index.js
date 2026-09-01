const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const app = express();

dotenv.config();
app.use(cors());

app.get('/api/health', (req, res) => {
    res.json({status: 'ok'});
})

api.get('/api/cf/stats/: handle', async (req, res) => {
 //todo: call getCFStatus(req.param.handle) send as JSON;
    

 //todo: wrap in try/catchy, err -> 500


})

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port: ${process.env.PORT}`);
})