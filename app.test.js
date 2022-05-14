const request = require("supertest");
const app = require("./app");

describe("Todo APIs", () => {
    //----- get all todo items ------
    it("GET todos --> array todos", () => {
        return request(app).get('/todos').expect('Content-Type', /json/).expect(200).then(response => {
            //toBe is applied to primitive types only, for non-primitive use toEqual
            expect(response.body).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        name: expect.any(String),
                        is_completed: expect.any(Boolean)
                    })
                ])
            )
        })
    });
    //---- get single todo item -----
    it("GET todo/id --> specific todo object", () => {
        return request(app).get('/todos/1').expect('Content-Type', /json/).expect(200).then(response => {
            expect(response.body).toEqual(

                expect.objectContaining({
                    name: expect.any(String),
                    is_completed: expect.any(Boolean)
                })

            )
        })
    });
    //------ todo not found ------
    it("GET todo/id --> Not Found", () => {
        return request(app).get("/todos/122").expect(404);
    })

    //----- add todo --------
    it("POST todo --> newly created todo object", () => {
        return request(app).post("/todos").send({
            name: "todo 5"
        }).expect(201).then(response => {

            expect(response.body).toEqual(
                expect.objectContaining({
                    name: "todo 5",
                    is_completed: false
                })
            )
        })
    });
    //----- todo already exist --------
    it("POST todo --> todo already exist", () => {
        return request(app).post("/todos").send({
            name: "todo 1"
        }).expect(400)
    })

})
