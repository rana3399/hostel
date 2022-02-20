const express = require("express");
const app = express();
const { Pool } = require("pg");

app.use(express.json())

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "Node-practice-1",
    password: "Pro@450",
    port: 5432,

})

const getHostels = (req, res) => {
    pool
        .query("select * from hostels")
        .then((result) => res.json(result.rows))
        .catch((error) => console.error(error))
}

const createNewHostel = async (request, res) => {
    const reqBody = request.body;
    console.log("reqBody", reqBody);

    const result = await pool.query(
        `insert into hostels (hostel_name) 
        values ($1) RETURNING hostel_name, id`, [reqBody.hostel_name]
    )

    console.log("result.rows", result.rows[0]);

    return res
        .status(201)
        .json({
            status: "New hotel is created.",
            id: result.rows[0].id,
            hostelName: result.rows[0].hostel_name
        })
}

app.get("/hostels", getHostels)
app.post("/hostels", createNewHostel)

const PORT = 6000;
app.listen(PORT, () => {
    console.log(`Server up and running on port ${PORT}`);
})
