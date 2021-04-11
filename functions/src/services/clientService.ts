import { db } from '../config/firebase'
import { ClientData } from '../models/clientData';
import { Destinatary } from '../models/destinatary';

class ClientService{
    async getClientData(rut:string){
        const userData = await db.collection('clients').doc(rut).get()
        return userData.data();
    }

    async addClient(client:ClientData){
            await db.collection('clients').doc(client.rutWithOutVd).create({
                rutWithOutVd:client.rutWithOutVd,
                email:client.email,
                name: client.name,
                bankCode:client.bankCode,
                accountType:client.accountType,
                accountNumber:client.accountNumber,
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

    async getDestinataries(rut:string){
        let response:any =[];
         await db.collection("destinatary").where('rutOriginWithOutVd','==',rut).get().then((snapshot)=>{
            snapshot.docs.forEach(doc=>{
                console.log(doc.data());
                const resp={
                    key:doc.id,
                    accountNumber: doc.data().accountNumber,
                    rutOriginWithOutVd: doc.data().rutOriginWithOutVd,
                    bankCode: doc.data().bankCode,
                    phone: doc.data().phone,
                    name: doc.data().name,
                    rutDestinataryWithOutVd: doc.data().rutDestinataryWithOutVd,
                    email: doc.data().email,
                    accountType: doc.data().accountType
                }
                response.push(resp);
            })
             //console.log(snapshot.docs);
         });;
        return response;
    }

    async getClientDataByEmail(email:string){
        let userData=null;
        await db.collection("clients").where('email','==',email).limit(1).get().then(snapshot=>{
                if(!snapshot.empty){
                    console.log(snapshot.docs[0].data());
                    userData=snapshot.docs[0].data();
                }else{
                    console.log("No document corresponding to the query!");
                    userData=null;
                }
            }

        );
        return userData;
    }
}

export default new ClientService();