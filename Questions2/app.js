const express = require('express');
const app = express();
const port = 4001;
const {customMiddleware} = require("./controller")

app.use(customMiddleware);



app.listen(port, () => {
    console.log(`server is running on port${port}`);
});