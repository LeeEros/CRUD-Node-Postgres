const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true
    })
)

app.get("/", (request, response) => {
    response.json({
        info: 'Hello world!'
    });
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
