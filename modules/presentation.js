const database = require("./datahandler");

class Presentation {

    constructor(name, descr){
        this.name = name;
        this.descr = descr;
    }

    async create() {
        try {
            let respons = await database.insertPres(this.name, this.descr);
        } catch (error) {
            console.error(error)
        }
    }

    async update(){
        try{
            let resp = await database.updatePres(this.name);
            return resp;
        }catch(err){
            console.log(err);
        }
    }

    async delete(){
        try{
            let resp = await database.deletePres(this.name);
            return resp;
        }catch(err){
            console.log(err);
        }
    }

}


module.exports = Presentation;