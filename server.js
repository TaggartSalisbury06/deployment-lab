const express = require('express')

const app = express()

app.use(express.json())

app.use(express.static(`${__dirname}/public`))

var Rollbar = require('rollbar')
var rollbar = new Rollbar({
  accessToken: '1fbca6b36432429bb8de6c63176dac2a',
  captureUncaught: true,
  captureUnhandledRejections: true,
})

const cities = ['Salt Lake City', 'Seattle', 'San Francisco']

app.get('/api/cities', (req, res) => {
    rollbar.info('The cities were sent')
    res.status(200).send(cities)
})

app.post('/api/cities', (req, res) => {
   let {cityName} = req.body

   const index = cities.findIndex(city => {
       return city === cityName
   })

   try {
       if (index === -1 && cityName !== '') {
           cities.push(cityName)
           rollbar.info(`New student name added: ${cityName}`)
           res.status(200).send(cities)
       } else if (cityName === ''){
            rollbar.warning('Empty input')
           res.status(400).send('You must enter a city.')
       } else {
            rollbar.warning('Input already exists')
           res.status(400).send('That city already exists.')
       }
   } catch (err) {
        rollbar.error(err)
       console.log(err)
   }
})

app.delete('/api/cities/:index', (req, res) => {
    const targetIndex = +req.params.index
    
    cities.splice(targetIndex, 1)
    rollbar.info(`City deleted`)
    res.status(200).send(cities)
})

app.listen(4000, () => { console.log('up on 4000')})