const express = require("express");
const cors = require("cors");
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.json());

app.use(cors());
app.use(express.json());

const webApi = require("./app.js")
const api = webApi();

app.get("/hostels", api.getHostels)
app.post("/hostels", api.createNewHostel)
app.put("/hostels/:id", api.updateHostel)
app.delete("/hostels/:id", api.deleteHostel)

const PORT = 6000;
app.listen(PORT, () => {
    console.log(`Server up and running on port ${PORT}`);
})
