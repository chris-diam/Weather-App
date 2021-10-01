const request = require('request')

const forecast = (x,y, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=bc1d5ec2ba4a7483e72cbadb6b8c61ff&query='+ y +','+ x +'&units=m'
    request({url, json: true},(error, { body }) =>{
        if(error){
            callback('Unable to connect to server.',undefined)
        }
        else if(body.error){
            callback('Unable to find location.Try an other one.',undefined)
        }else{
            callback(undefined,'It is currently ' + body.current.temperature + ' degrees.It feels ' + body.current.feelslike
                
            )
        }

    })
}

module.exports = forecast