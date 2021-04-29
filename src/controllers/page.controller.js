const puppeteer = require('puppeteer');
const pageService = require('../service/page.service');
const fileService = require('../service/file.service')

const pageController = {

    // metodo principal del modulo -------------------------------------------------------
    async scrapeAll() {

        let browser;
        let result = [];
        let data;

        try {

            // Inicio el browser
            console.log("- Abriendo browser.");
            browser = await puppeteer.launch({
                headless: true,
                args: ["--disable-setuid-sandbox"],
                'ignoreHTTPSErrors': true
            });

            // Obtengo el listado de productos
            data = await pageService.scraperProducts(browser);

            // Recorro el listado de productos para obtener sus descripciones
            let promises = [];
            data.forEach(async(item, index) => {
                promises.push(pageService.scraperDesc(browser, item));
            });

            // Espero que finalicen todas las peticiones para cerrar el browser y guardar
            await Promise.all(promises).then((response) => {
                result = response;
                console.log("- Cerrando el browser.");
                browser.close();

                fileService.writeData(result); //aca guardo el archivo
            }).catch((err) => {
                console.log('Error al obtener datos de descripcion');
            });


        } catch (err) {
            console.log("Error al intentar obtener datos del browser", err);
        }

        return result;
    }

}

module.exports = pageController;