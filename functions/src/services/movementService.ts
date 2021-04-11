import { db } from '../config/firebase'

class MovementService{
    async getHistory(rut:string){
        let response:any =[]
        await db.collection("movements").where('rutWithOutVd','==',rut).get().then((snapshot)=>{
           snapshot.docs.forEach(doc=>{
               console.log(doc.data());
               const resp={
                   accountNumber: doc.data().accountNumber,
                   rutOriginWithOutVd: doc.data().rutOriginWithOutVd,
                   bankCode: doc.data().bankCode,
                   phone: doc.data().phone,
                   name: doc.data().name,
                   rutDestinataryWithOutVd: doc.data().rutDestinataryWithOutVd,
                   email: doc.data().email,
                   accountType: doc.data().accountType,
                   amount: doc.data().amount,
                   date: doc.data().date
               }
               response.push(resp);
           })
        });;
        return response;
    }

    async deposit(rut:string,amount:number){
         //ADD AMOUNT TO THE MOVEMENT
        var movements =  db.collection('movements');
        await movements.doc().create({
            rutWithOutVd:rut,
            type:'DEPOSIT',
            amount: amount,
            date:Date.now()
        })

        //SUM AMOUNT AND UPDATE TOTAL AMOUNT
        var movementSnap = await movements.where('rutWithOutVd','==',rut).get();
      
        var total =0;
        movementSnap.forEach(doc => {
            console.log('Monto: '+doc.data().amount);
            total= total + doc.data().amount;
          });
        
        console.log('TOTAL: '+total);
        const clients = db.collection("clients");
        var clientsSnapShot = clients.doc(rut);
        clientsSnapShot.update({
            totalAmount:total
        });
    }


}

export default new MovementService();