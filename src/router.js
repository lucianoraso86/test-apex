const { Router } = require('express');
const router = Router();

const pageController = require('./controllers/page.controller');
const fileController = require('./controllers/file.controller');


router.post('/products', async(req, res) => {
    let data = await pageController.scrapeAll();
    res.json(data);
});


router.get('/products', async(req, res) => {
    let data = await fileController.getDataFile();
    res.json(data);
});



module.exports = router;