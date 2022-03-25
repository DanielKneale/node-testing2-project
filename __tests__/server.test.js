const request = require("supertest")
const db = require("../data/db-config")
const server = require("../api/server")

const Tolesto = {
    Name: "Tolesto",
    Weapontype: "Fusion Rifle",
    AmmoType: "Special",
    ExoticPerk: "Sustained damage with this weapon envelops the target in a field that weakens and disrupts them",
}
const Temp = {
    Name: "temp",
    Weapontype: "Trace Rifle",
    AmmoType: "Special",
    ExoticPerk: "Sustained damage with this weapon envelops the target in a field that weakens and disrupts them",
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

describe("server",()=>{
    describe("[GET] /exotics", ()=>{
        it("check status to be ok 200",async ()=>{
            const res = await request(server).get("/exotics")
            expect(res.status).toEqual(200)
        }) 
        it("get correct amount of exotics", async ()=>{
            let res
            await db("exotics").insert(Tolesto)
            res = await request(server).get("/exotics")
            expect(res.body).toHaveLength(1)
        })
        it("return right format",async ()=>{
            await db("exotics").insert(Tolesto)
            await db("exotics").insert(Temp)
            const res = await request(server).get("exotics")
            expect(res.body[0]).toMatchObject({id:1,...Tolesto})
            expect(res.body[1]).toMatchObject({id:2,...Temp})
        })
    })
    describe("[POST] /exotics", ()=>{
        it("responds with newly created exotic",async ()=>{
            let res
            res = await request(server).post("/exotics").send(Tolesto)
            expect(res.body).toMatchObject({id:1,...Tolesto})

            res = await request(server).post("/exotics").send(Temp)
            expect(res.body).toMatchObject({id:2,...Temp})
        })
    })
    describe("[Delete] /exotics/:id",()=>{
        it("responds with recently deleted object", async ()=>{
            let res
            await db("exotics").insert(Tolesto)
            await db("exotics").insert(Temp)
            res = await request(server).delete("/exotics/2")
            expect(res.body).toMatchObject({id:2,...Temp})

        })
    })
})