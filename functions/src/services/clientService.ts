import { db } from '../config/firebase'
import { ClientData } from '../models/clientData';
import { Destinatary } from '../models/destinatary';

class ClientService{
    async getClientData(rut:string){
        const querySnapshot = await db.collection('clients').doc(rut).get()
        return querySnapshot.data();
    }

    async addClient(client:ClientData){
            await db.collection('clients').doc(client.rutWithOutVd).create({
                rutWithOutVd:client.rutWithOutVd,
                email:client.email,
                name: client.name,
                totalAmount:0
            })
       
    }

    async addDestinatary(destinatary:Destinatary){
        await db.collection('destinatary').doc().create({
            rutOriginWithOutVd:destinatary.rutOriginWithOutVd,
            name: destinatary.name,
            email:destinatary.email,
            phone:destinatary.phone,
            bankCode:destinatary.bankCode,
            rutDestinataryWithOutVd:destinatary.rutDestinataryWithOutVd,
            accountType:destinatary.accountType,
            accountNumber:destinatary.accountNumber
        })
}


}

export default new ClientService();