const fileService = require('../service/file.service')


const fileController = {

    // metodo principal del modulo -------------------------------------------------------
    async getDataFile() {
        return fileService.getData();
    }

}

module.exports = fileController;