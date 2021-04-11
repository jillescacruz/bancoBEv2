import * as functions from 'firebase-functions'
import * as express from 'express'
import * as cors from 'cors';
import {getClient,addClient, addDestinatary,getClientByEmail, getDestinataries} from './controllers/clientController'
import {deposit,getHistory, transfer} from './controllers/movementController'
import { isAuthenticated } from './services/AuthenticationService';


const app = express()
app.use(cors())

app.get('/', (req, res) => res.status(200).send('Hey there!'))
app.get('/clients/get/:rut',isAuthenticated,getClient)
app.get('/clients/get/email/:email',isAuthenticated,getClientByEmail)
app.post('/clients/add',isAuthenticated,addClient)
app.post('/clients/add/destinatary',isAuthenticated, addDestinatary)
app.get('/clients/get/destinatary/:rut',isAuthenticated, getDestinataries)
app.post('/movements/deposit',isAuthenticated, deposit)
app.get('/movements/get/history/:rut',isAuthenticated, getHistory)
app.post('/movements/transfer',isAuthenticated, transfer)

exports.app = functions.https.onRequest(app)
