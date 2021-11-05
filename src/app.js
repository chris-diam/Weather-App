const path = require('path')
const express = require('express')
const hbs = require('hbs')
const { query } = require('express')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()
const port = process.env.PORT || 3000

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setuo handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index',{
        title: 'Weather',
        name: 'Christos Diamantakis'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Christos Diamantakis'
    })
})

app.get('/help',(req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text',
        title: 'Help',
        name: 'Christos Diamantakis'

    })
})

app.get('',(req, res) =>{
    res.send('<h1>Weather</h1>')
})

const helpDirectoryPath = path.join(__dirname, '../public')




app.get('/weather', (req,res) => {
    if(!req.query.address){
        res.send({
            error: 'You must provide an address'
        })
    }
    

    geocode(req.query.address,(error, {latitude, longtitude, location} ={}) => {
        if(error){
            return res.send({ error})
        }
    
       
        forecast(longtitude, latitude, (error, forecastData) => {
            if(error){
                return res.send({error})
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
    
    
            
          })
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})

