const express = require("express")
const path = require("path")
const app = express()
// const hbs = require("hbs")
const LogInCollection = require("./mongoodb")
const port = process.env.PORT || 3000
app.use(express.json())

app.use(express.urlencoded({ extended: false }))

const tempelatePath = path.join(__dirname, '../tempelates')
const publicPath = path.join(__dirname, '../public')
console.log(publicPath);

app.set('view engine', 'hbs')
app.set('views', tempelatePath)
app.use(express.static(publicPath))


// hbs.registerPartials(partialPath)


app.get('/signup', (req, res) => {
    res.render('signup')
})
app.get('/', (req, res) => {
    res.render('login')
})



// app.get('/home', (req, res) => {
//     res.render('home')
// })

app.post('/signup', async (req, res) => {
    


    const data = {
        name: req.body.name,
        email:req.body.email,
        mob:req.body.mob,
        password: req.body.password
    }

    await LogInCollection.insertMany([data])
    res.render("confirmation")

})



app.post('/login', async (req, res) => {

    try {
        const check = await LogInCollection.findOne({ email: req.body.email })

        if (check.password === req.body.password) {
            res.status(201).render("profile", { Name: `${check.name}`,Email:`${check.email}`,Mob:`${check.mob}`})
        }

        else {
            res.send("incorrect password")
        }


    } 
    
    catch (e) {

        res.send("wrong details")
        

    }


})



app.listen(port, () => {
    console.log('port connected');
})