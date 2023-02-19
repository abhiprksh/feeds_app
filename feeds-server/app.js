const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors({
    origin : '*'
}))

app.get('/feeds/:page', (req, res)=>{
    fetch('https://englishapi.pinkvilla.com/app-api/v1/photo-gallery-feed-page/page/'+ req.params.page)
    .then(result => result.json())
    .then(data => {
        // console.log(data)
        res.send(data)
    })
    .catch(err => console.log(err))
})

app.listen(8000, ()=>{
    console.log('Server started!! listening at port 8000')
})