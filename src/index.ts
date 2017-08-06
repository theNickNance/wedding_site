import * as express from 'express'
import * as config from 'config'
import * as fs from 'fs'

const app = express()
const port = config.get('expressPort')

app.use('/', express.static('public'))

app.get('/api/guests', (req, resp) => {
    const readStream = fs.createReadStream('./fixtures/guests.json')
    readStream.pipe(resp)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
})
