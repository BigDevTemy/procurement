function deleteItem(TableName,first_ID,second_ID){
    
    switch(TableName){
        case 'orders':
            return DeleteOrder(TableName,Id);
            break;
        case 'supplier':
            return DeleteSupplier(TableName,Id);
            break;
        case 'requisition':
            return DeleteRequisition(first_ID,second_ID);
            break;
            
    }
}

function DeleteOrder(tablename,id){

    
 Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
        fetch('/procurement/app/customroute/deletedata',{
            method:'POST',
            body:JSON.stringify({
               tableName:tablename,
               affectedColumn:'id',
               id:id
            }),
            headers: { "Content-type": "application/x-www-form-urlencoded"},
                                                
        })
        .then(res=>res.json())
        .then(data=>{
            
            if(data['status']){
                Swal.fire(data['data'],'','success')
                allprocessedorders();
    
            }
            else{
                Swal.fire('An Error Occurred','','error')
            }
            
        })
        .catch(err=> {
            
            console.log(err)
          
           
        }) 
    }
  })



  
}


function DeleteSupplier(tablename,id){

    
    Swal.fire({
       title: 'Are you sure?',
       text: "You won't be able to revert this!",
       icon: 'warning',
       showCancelButton: true,
       confirmButtonColor: '#3085d6',
       cancelButtonColor: '#d33',
       confirmButtonText: 'Yes, delete it!'
     }).then((result) => {
       if (result.isConfirmed) {
           fetch('/procurement/app/customroute/deletedata',{
               method:'POST',
               body:JSON.stringify({
                  tableName:tablename,
                  affectedColumn:'id',
                  id:id
               }),
               headers: { "Content-type": "application/x-www-form-urlencoded"},
                                                   
           })
           .then(res=>res.json())
           .then(data=>{
               
               if(data['status']){
                   Swal.fire(data['data'],'','success')
                   getAllSupplier();
       
               }
               else{
                   Swal.fire('An Error Occurred','','error')
               }
               
           })
           .catch(err=> {
               
               console.log(err)
             
              
           }) 
       }
     })
   
   
   
     
   }

   function DeleteRequisition(tablename,id){

    
    Swal.fire({
       title: 'Are you sure?',
       text: "You won't be able to revert this!",
       icon: 'warning',
       showCancelButton: true,
       confirmButtonColor: '#3085d6',
       cancelButtonColor: '#d33',
       confirmButtonText: 'Yes, delete it!'
     }).then((result) => {
       if (result.isConfirmed) {
           fetch('/procurement/app/customroute/deletedatarequisition',{
               method:'POST',
               body:JSON.stringify({
                  order_id:id,
                  supplier_id:tablename
               }),
               headers: { "Content-type": "application/x-www-form-urlencoded"},
                                                   
           })
           .then(res=>res.json())
           .then(data=>{
               
               if(data['status']){
                   Swal.fire(data['data'],'','success')
                   allrequisition();
       
               }
               else{
                   Swal.fire('An Error Occurred','','error')
               }
               
           })
           .catch(err=> {
               
               console.log(err)
             
              
           }) 
       }
     })
   
   
   
     
   }