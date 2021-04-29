const config = require('../config/config');

const pageService = {

    // pagina a navegar --------------------------------------------------------------------------------------------------------------
    url: config.url,

    // metodos para rastrear los productos en la pagina--------------------------------------------------------------------------------
    async scraperProducts(browser) {

        let page = await browser.newPage();
        console.log(`- Navegando en ${this.url}`);

        // Navego por la pagina 
        await page.goto(this.url);

        // Selecciono contenedor
        await page.waitForSelector('.products-grid');

        // Recorro los elementos y busco los productos
        let data = await page.evaluate(() => {
            let results = [];
            let items = document.querySelectorAll('.product-items > li');

            items.forEach(async(item, index) => {

                let product = {
                    "id": index,
                    "a": item.querySelector('a').href,
                    "name": item.querySelector('.name').innerText,
                    "price": item.querySelector('.price').innerText,
                    "seller": item.querySelector('.seller').innerText
                }

                if (index < 20) {
                    results.push(product);
                }

            });

            return results;
        })

        page.close();
        return data;

    },

    //metodos para rastrear la descripcion de los productos en la pagina  ----------------------------------------------------------
    async scraperDesc(browser, item) {

        return new Promise(async function(resolve, reject) {
            try {
                let url = item.a
                let page = await browser.newPage();

                console.log(`- Navegando en ${url}`);

                // Navego por la pagina 
                await page.goto(url);

                // Selecciono contenedor
                await page.waitForSelector('.product-info-specifications');

                // Obtengo la descripcion
                item.desc = await page.evaluate(() => {
                    return document.querySelector('.description .value').innerText;
                });

                page.close();
                resolve(item);

            } catch (err) {
                reject(err);
            }

        });

    },
}


module.exports = pageService;