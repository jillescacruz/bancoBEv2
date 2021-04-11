import { db } from '../config/firebase'

class MovementService{
    async getHistory(rut:string){
        let response:any =[]
        await db.collection("movements").where('rutWithOutVd','==',rut).orderBy("date", "desc").get().then((snapshot)=>{
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
                   date: doc.data().date,
                   type: doc.data().type
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

    async transfer(rut:string,amount:number,key:string){
        try{
            //Verify amount for transfer
            var clients =  db.collection('clients');
    
            var clientOriginSnapShot = await clients.doc(rut).get();
            var total=clientOriginSnapShot.data()?.totalAmount;
    
            console.log('Monto Total: '+total);
    
            if(total<amount){
                throw new Error('Monto insuficiente para realizar la transacción');
            }
    
            //GETTING DATA OF DESTINATARY
            const doc = db.collection("destinatary").doc(key);
                 const resp =await doc.get();
                 const destinatary = resp.data()
    
                 console.log("Paso 3 "+destinatary);
            ///
            //CREATE MOVEMENT TRANSFER FOR "FROM"
            await db.collection('movements').doc().create({
                rutWithOutVd:rut,
                type:'TRANSFER_TO',
                amount: amount * -1,
                rutDestinataryWithOutVd:destinatary?.rutDestinataryWithOutVd,
                name:destinatary?.name,
                bankCode:destinatary?.bankCode,
                accountType:destinatary?.accountType,
                accountNumber:destinatary?.accountNumber,
                date:Date.now()
            })
    
            
            //SUM AMOUNT AND UPDATE TOTAL AMOUNT FOR "FROM"
            var movementSnap = await db.collection('movements').where('rutWithOutVd','==',rut).get();
        
            var total:any = 0;
            movementSnap.forEach(doc => {
                console.log('Monto: '+doc.data().amount);
                total= total + doc.data().amount;
            });
            
            var clientsSnapShotTo = clients.doc(rut);
            await clientsSnapShotTo.update({
                totalAmount:total
            });
    
    
            var destinataryClient =  db.collection('clients');
            var clientsSnapShot = await destinataryClient.doc(destinatary?.rutDestinataryWithOutVd).get();
            
            if(clientsSnapShot!=null && clientsSnapShot.data()!=undefined && 
                destinatary?.bankCode==clientsSnapShot.data()?.bankCode && 
                destinatary?.accountNumber==clientsSnapShot.data()?.accountNumber){


                console.log('CLIENTE DESTINO: '+clientsSnapShot.id);
                console.log('CLIENTE DESTINO: '+clientsSnapShot.data());
                //var snap=clientsSnapShot.data();
                //CREATE MOVEMENT TRANSFER FOR "TO"
                await db.collection('movements').doc().create({
                    rutWithOutVd:destinatary?.rutDestinataryWithOutVd,
                    type:'TRANSFER_FROM',
                    amount: amount,
                    rutDestinataryWithOutVd:rut,
                    name:clientOriginSnapShot.data()?.name,
                    bankCode:clientOriginSnapShot.data()?.bankCode,
                    accountType:clientOriginSnapShot.data()?.accountType,
                    accountNumber:clientOriginSnapShot.data()?.accountNumber,
                    date:Date.now()
                })
        
                
                //SUM AMOUNT AND UPDATE TOTAL AMOUNT FOR "TO"
                var movementSnap = await db.collection('movements').where('rutWithOutVd','==',destinatary?.rutDestinataryWithOutVd).get();
            
                var totalDest:any=0;
                movementSnap.forEach(doc => {
                    console.log('Monto: '+doc.data().amount);
                    totalDest= totalDest + doc.data().amount;
                });
                
                console.log('TOTAL FROM: '+totalDest);
                var clientsSnapShotTrans =  clients.doc(destinatary?.rutDestinataryWithOutVd);
                await clientsSnapShotTrans.update({
                    totalAmount:totalDest
                });
        
        
                
            }else{
                console.log('Cliente es de otro banco.');
            }

            console.log('END---');
            return total;
        }catch(error) {
            console.error("ERROR: "+error);
            throw new Error('Ocurrió un error al realizar la transferencia');
        }
    }


}

export default new MovementService();