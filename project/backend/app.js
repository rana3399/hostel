const { Pool } = require("pg");
const secret = require("./secret.json")
const pool = new Pool(secret);

const api = () => {
    const getHostels = (req, res) => {
        pool
            .query("select * from hostels")
            .then((result) => res.json(result.rows))
            .catch((error) => console.error(error))
    }

    const createNewHostel = async (request, res) => {
        const reqBody = request.body;

        const result = await pool.query(
            `insert into hostels (hostel_name) 
            values ($1) RETURNING hostel_name, id`, [reqBody.hostel_name]
        )

        console.log("result.rows", result.rows[0]);

        return res
            .status(201)
            .json({
                status: "New hostel is created.",
                id: result.rows[0].id,
                hostelName: result.rows[0].hostel_name
            })
    }

    const updateHostel = async (req, res) => {
        try {
            const reqId = parseInt(req.params.id)
            const reqBody = req.body
            console.log("reqId", reqId);

            const result = await pool.query(
                `update hostels SET hostel_name = $1 where id = $2 RETURNING hostel_name`,
                [reqBody.hostel_name, reqId]
            )

            if (reqId && result.rows.length > 0) {
                const reqHostelName = result.rows[0].hostel_name;
                return res.status(200).json({
                    status: "Hostel name successfully updated",
                    updatedName: reqHostelName
                })
            } else {
                console.log("Please check your input data");
                return res
                    .status(401)
                    .send("Please check your input data")
            }
        } catch (error) {
            console.log(error);
            return res
                .status(401)
                .send(error)
        }
    }

    const deleteHostel = async (req, res) => {
        try {
            const reqId = parseInt(req.params.id);
            console.log(reqId);

            const result = await pool.query(
                `delete from hostels where id=$1 returning id`, [reqId]
            )

            if (reqId && result.rows.length > 0) {
                return res
                    .status(200)
                    .send(`Hostel with id: ${result.rows[0].id} is successfully deleted`)
            } else {
                console.log("error", error);
                res.status(404).send("Hostel id does not exists!")
            }

        } catch (error) {
            console.log(error);
            res.status(404).send("Please check your input data")
        }
    }

    return {
        getHostels,
        createNewHostel,
        updateHostel,
        deleteHostel
    }

}

module.exports = api;