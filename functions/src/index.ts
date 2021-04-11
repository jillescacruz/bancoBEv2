import * as functions from 'firebase-functions'
import * as express from 'express'
import * as cors from 'cors';
import {getClient,addClient, addDestinatary,getClientByEmail, getDestinataries} from './controllers/clientController'
import {deposit,getHistory} from './controllers/movementController'


const app = express()
app.use(cors())

app.get('/', (req, res) => res.status(200).send('Hey there!'))
app.get('/clients/get/:rut',getClient)
app.get('/clients/get/email/:email',getClientByEmail)
app.post('/clients/add',addClient)
app.post('/clients/add/destinatary', addDestinatary)
app.get('/clients/get/destinatary/:rut', getDestinataries)
app.post('/movements/deposit', deposit)
app.get('/movements/get/history/:rut', getHistory)

exports.app = functions.https.onRequest(app)
