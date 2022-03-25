const db = require('../../data/db-config')

module.exports = {
    add,
    getAll,
    getById,
    remove,
}

function getAll(){
    return db('exotics')
}

function getById(id){
    return db("exotics").where({id}).first()
}


async function add(exotic){
    const [id] = await db("exotics").insert(exotic)
    return db("exotics").where({id}).first()
}

function remove(id) {
    return db("exotics").where({id}).del();
    
}