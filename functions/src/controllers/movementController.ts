import { Response } from 'express'
import { Request } from "express"
import movementService from '../services/movementService'


const getHistory = async (req: Request, res: Response) => {
    try {
        const {rut}=req.params
        const response = await movementService.getHistory(rut);
      
        return res.status(200).json({response})
    } catch(error) { return res.status(500).json(error.message) }
  }

  const deposit= async (req: Request, res: Response) => {
    try {
        const response = await movementService.deposit(req.body.rut, req.body.amount);
      
        return res.status(201).json({response})
    } catch(error) { return res.status(500).json(error.message) }
  }

  const transfer= async (req: Request, res: Response) => {
    try {
        const totalAmount = await movementService.transfer(req.body.rutWithOutVd, req.body.amount, req.body.key);
      
        return res.status(201).json({totalAmount})
    } catch(error) { return res.status(500).json(error.message) }
  }




export {getHistory,deposit,transfer}