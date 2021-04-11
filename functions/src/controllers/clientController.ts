import { Response } from 'express'
import { Request } from "express"
import { ClientData } from '../models/clientData';
import { Destinatary } from '../models/destinatary';
import clientService from '../services/clientService'


const getClient = async (req: Request, res: Response) => {
    try {
        const {rut}=req.params
        const userData = await clientService.getClientData(rut);
      
        return res.status(200).json({userData})
    } catch(error) { return res.status(500).json(error.message) }
  }

  const getClientByEmail = async (req: Request, res: Response) => {
    try {
        const {email}=req.params
        const userData = await clientService.getClientDataByEmail(email);
        console.log("Que tengo?"+userData);
        return res.status(200).json({userData})
    } catch(error) { return res.status(500).json(error.message) }
  }


  const addClient = async (req: Request, res: Response) => {
    try {
        var client=new ClientData()
        client.name=req.body.name;
        client.email=req.body.email;
        client.rutWithOutVd=req.body.rutWithOutVd;

         await clientService.addClient(client);
      
        return res.status(201).json({message:"ok"})
    } catch(error) { return res.status(500).json(error.message) }
  }

  const addDestinatary = async (req: Request, res: Response) => {
    try {
        var destinatary=new Destinatary()
        destinatary.rutOriginWithOutVd=req.body.rutOriginWithOutVd,
        destinatary.name=req.body.name;
        destinatary.email=req.body.email;
        destinatary.phone=req.body.phone;
        destinatary.bankCode=req.body.bankCode;
        destinatary.rutDestinataryWithOutVd=req.body.rutDestinataryWithOutVd;
        destinatary.accountType=req.body.accountType;
        destinatary.accountNumber=req.body.accountNumber;

         await clientService.addDestinatary(destinatary);
      
        return res.status(201).json({message:"ok"})
    } catch(error) { return res.status(500).json(error.message) }
  }

  const getDestinataries = async (req: Request, res: Response) => {
    try {
        const {rut}=req.params
        const response = await clientService.getDestinataries(rut);
      
        return res.status(200).json({response})
    } catch(error) { return res.status(500).json(error.message) }
  }

export { getClient,addClient, addDestinatary,getClientByEmail,getDestinataries}
