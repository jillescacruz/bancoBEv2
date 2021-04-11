import { Response } from 'express'
import { Request } from "express"

import { db } from '../config/firebase'


const getClient = async (req: Request, res: Response) => {
    try {
        console.log("Entré?????");
        const {rut}=req.params
      const querySnapshot = await db.collection('clients').doc(rut).get()
      
      return res.status(200).json(querySnapshot.data())
    } catch(error) { return res.status(500).json(error.message) }
  }



export { getClient }
