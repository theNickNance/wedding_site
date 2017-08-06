import * as express from 'express'
import * as config from 'config'
import * as fs from 'fs'
import routes from './routes'

const app = express()
const port = config.get('expressPort')

app.use('/', express.static('public'))
app.use('/api', routes)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
})
