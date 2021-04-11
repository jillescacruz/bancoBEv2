import * as functions from 'firebase-functions'
import * as express from 'express'
//import * as cors from 'cors';
import {getClient,addClient, addDestinatary} from './controllers/clientController'


const app = express()
//app.use(cors)

app.get('/', (req, res) => res.status(200).send('Hey there!'))
app.get('/clients/get/:rut',getClient)
app.post('/clients/add',addClient)
app.post('/clients/add/destinatary', addDestinatary)

exports.app = functions.https.onRequest(app)
