function modal(className,Id,title){

    document.querySelector('.modalClass').classList.add('modalClassCustom');
    let content =  ` 
                    <div class="customModal ${className}">
                            <div class="modalTitle">
                                <div> 
                                    <h4>${title}</h4>
                                </div> 
                                <div class="closeModal">X</div>
                            </div>

                            <div class="modalBody">
                               
                            </div>

                            <div class="modalFooter">
                            
                            </div>



                    </div>
    
    
        `

        document.querySelector('.modalClass').innerHTML=content
        modalContent(title,Id);
        close();
}


function modalContent(title,Id){
    switch(title){
        case 'Edit Supplier':
            return editSupplier(Id);
            break;
        case 'Edit Order Title':
            return editOrder(Id);
        default:

    }
}

function editSupplier(id){
    let content= `
            <div style="margin-top:20px">
                    <div class="form-group">
                        <label>Supplier name</label>
                        <input type="text" class="form-control" id="supplier_name"/>

                    <div>

                    <div class="form-group space-top-md"> 
                        <input type="submit" id="edit_supplier" class="form-control" value="Edit Supplier"/>
                    <div>

            </div>
    
            `
            document.querySelector('.modalBody').innerHTML=content
            loadDataSupplier(id,'supplier');
            edit(id)
            
}

function editOrder(id){
    let content= `
            <div style="margin-top:20px">
                    <div class="form-group">
                        <label>Supplier name</label>
                        <input type="text" class="form-control" id="order_title"/>

                    <div>

                    <div class="form-group space-top-md"> 
                        <input type="submit" id="edit_order" class="form-control" value="Edit Order Title"/>
                    <div>

            </div>
    
            `
            document.querySelector('.modalBody').innerHTML=content
            loadDataOrder(id,'orders');
            edit(id);
            
}

function close(){
    document.querySelector('.closeModal').addEventListener('click',function(e){
        document.querySelector('.modalClass').classList.remove('modalClassCustom');
        document.querySelector('.modalClass').innerHTML=""
    })
}
function forceClose() {
    document.querySelector('.modalClass').classList.remove('modalClassCustom');
        document.querySelector('.modalClass').innerHTML=""
}

function loadDataSupplier(id,supplier){
    fetch('/procurement/app/customroute/getdata',{
        method:'POST',
        body:JSON.stringify({
           tableName:supplier,
           id:id 
        }),
        headers: { "Content-type": "application/x-www-form-urlencoded"},
                                            
    })
    .then(res=>res.json())
    .then(data=>{
        console.log("data",data.data.supplier_name)
        if(data['status']){
           document.getElementById('supplier_name').value=data.data.supplier_name

        }
        
    })
    .catch(err=> {
        
        console.log(err)
      
       
    })

}
function loadDataOrder(id,order){
    fetch('/procurement/app/customroute/getdata',{
        method:'POST',
        body:JSON.stringify({
           tableName:order,
           id:id 
        }),
        headers: { "Content-type": "application/x-www-form-urlencoded"},
                                            
    })
    .then(res=>res.json())
    .then(data=>{
        console.log("data",data.data.order_title)
        if(data['status']){
           document.getElementById('order_title').value=data.data.order_title

        }
        
    })
    .catch(err=> {
        console.log(err) 
    })

}

function edit(id){
    if(document.querySelector('#edit_supplier')){
        document.querySelector('#edit_supplier').addEventListener('click',function(e){
            e.preventDefault();
            let supplier_name = document.getElementById('supplier_name').value;
    
            fetch('/procurement/app/customroute/editdata',{
                method:'POST',
                body:JSON.stringify({
                   tableName:"supplier",
                   updatedata:supplier_name,
                   affectedColumn:'supplier_name',
                   id:id
                }),
                headers: { "Content-type": "application/x-www-form-urlencoded"},
                                                    
            })
            .then(res=>res.json())
            .then(data=>{
                console.log("data",data)
                if(data['status']){
                   //document.getElementById('order_title').value=data.data.order_title
                   forceClose();
                   getAllSupplier();
                   
                   Swal.fire('Update Successfully made','','success')
                   
                }
                else{
                    Swal.fire('Update Failed...Pls try again','','error')
                }
                
            })
            .catch(err=> {
                console.log(err) 
            })
    
        })
    
    }
    

    if(document.querySelector('#edit_order')){
        document.querySelector('#edit_order').addEventListener('click',function(e){
            e.preventDefault();
            let order_title = document.getElementById('order_title').value;
    
            fetch('/procurement/app/customroute/editdata',{
                method:'POST',
                body:JSON.stringify({
                   tableName:"orders",
                   updatedata:order_title,
                   affectedColumn:'order_title',
                   id:id
                }),
                headers: { "Content-type": "application/x-www-form-urlencoded"},
                                                    
            })
            .then(res=>res.json())
            .then(data=>{
                console.log("data",data)
                if(data['status']){
                    forceClose();
                    allprocessedorders()
                    Swal.fire('Update Successfully made','','success')
                   
                }
                else{
                    Swal.fire('Update Failed...Pls try again','','error')
                }
                
            })
            .catch(err=> {
                console.log(err) 
            })
    
        })
    }
    
}