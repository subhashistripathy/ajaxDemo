const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const port = 3000

app.use(morgan("dev"))
app.use(express.static("public"))
app.use(cors(
    {
        origin: '*'
    }
))
app.set("view engine", "ejs")

app.get('/', (req, res) => {
    console.log('nav page request received')
    res.render("nav");
})

app.get('/one', (req, res) => {
    res.render('one');
})

app.get('/two', (req, res) => {
    res.render('two');
})



app.get('/home', (req, res) => {
    fetch("https://fakestoreapi.com/products?limit=10").then(async (response) => {
        const data = await response.json();
        res.render("home", { products: data })
        console.log(data);
    }).catch((error) => {
        console.log(error);
        res.send("Error occured")
    })
})
app.listen(port, () => console.log(`Example app listening on port ${port}!`))