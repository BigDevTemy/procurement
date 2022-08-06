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
                        <input type="submit" class="form-control" value="Edit Supplier"/>
                    <div>

            </div>
    
            `
            document.querySelector('.modalBody').innerHTML=content
            loadData(id,'supplier');
            
}

function close(){
    document.querySelector('.modalTitle').addEventListener('click',function(e){
        document.querySelector('.modalClass').classList.remove('modalClassCustom');
        document.querySelector('.modalClass').innerHTML=""
    })
}

function loadData(id,supplier){
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