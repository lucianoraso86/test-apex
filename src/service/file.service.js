const fs = require("fs");
const { promisify } = require("util");
const writeFile = promisify(fs.writeFile);



const fileService = {

    // metodo para calcular la fecha ------------------------------------------------------------------------------------------------
    getDateTime() {

        var date = new Date();

        var hour = date.getHours();
        hour = (hour < 10 ? "0" : "") + hour;

        var min = date.getMinutes();
        min = (min < 10 ? "0" : "") + min;

        var sec = date.getSeconds();
        sec = (sec < 10 ? "0" : "") + sec;

        var year = date.getFullYear();

        var month = date.getMonth() + 1;
        month = (month < 10 ? "0" : "") + month;

        var day = date.getDate();
        day = (day < 10 ? "0" : "") + day;

        return day + "/" + month + "/" + year + "-" + hour + ":" + min + ":" + sec;

    },

    // metodo para escribir el archivo json --------------------------------------------------------------------------------------------
    async writeData(data) {

        var file = {
            "date": this.getDateTime(),
            "products": data
        }

        await writeFile("src/data/products.json", JSON.stringify(file));
    },

    // metodo para leer el archivo json --------------------------------------------------------------------------------------------
    async getData() {

        let data = fs.readFileSync('src/data/products.json');
        return JSON.parse(data);
    }

}


module.exports = fileService;