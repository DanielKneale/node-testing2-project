const Exotics =require("./exotics-model")
const db = require("../../data/db-config")


const Tolesto = {
    Name: "Tolesto",
    Weapontype: "Fusion Rifle",
    AmmoType: "Special",
    ExoticPerk: "Sustained damage with this weapon envelops the target in a field that weakens and disrupts them"
}
const Temp = {
    Name: "temp",
    Weapontype: "Trace Rifle",
    AmmoType: "Special",
    ExoticPerk: "Sustained damage with this weapon envelops the target in a field that weakens and disrupts them"
}

beforeAll(async ()=>{
    await db.migrate.rollback()
    await db.migrate.latest()
    
})
beforeEach(async ()=>{
    await db("exotics").truncate()
})
afterAll(async ()=>{
    await db.destroy()
})

it("correct env var",()=>{
    expect(process.env.NODE_ENV).toBe("testing")
})

describe("Exotic model", ()=>{
    it("gets table with 0 entries",async ()=>{
        var data
        Exotics.getAll()
        data = await db("exotics")
        expect(data).toHaveLength(0)
    })
    it("add exotic entries",async ()=>{
        var data
        Exotics.add(Tolesto)
        data = await db("exotics")
        expect(data).toHaveLength(1)

        Exotics.add(Temp)
        data = await db("exotics")
        expect(data).toHaveLength(2)
    })
    // it("getting a specific id",async ()=>{
    //     Exotics.add(Tolesto)
    //     Exotics.add(Temp)
    //     const [{id}] = Exotics.getById(2)
        
        
        
        
    // })
    

})
