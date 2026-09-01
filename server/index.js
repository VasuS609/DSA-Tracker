const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const run = require('./services/cfService');


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
    res.json({status: 'ok'});
})

app.get('/api/cf/stats/:handle', async (req, res) => {
 //todo: call getCFStatus(req.param.handle) send as JSON;
    try{
        const data = await run(req.params.handle);
        res.json(data);
    }catch(e){
        console.error(e);
        res.status(500).json({
            error:'Failed to fetch CF stats'
        });
    }
    
 //todo: wrap in try/catchy, err -> 500


})

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port: ${process.env.PORT}`);
})