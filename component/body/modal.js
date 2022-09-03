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
        case 'Edit Agent':
            return editAgent(Id);
            break;
        
        case 'Edit Order Title':
            return editOrder(Id);
        case 'Edit Projectname':
            return editProject(Id);
        default:

    }
}

function editSupplier(id){
    let content= `
            <div style="margin-top:20px">
                    <div class="form-group mt-4">
                        <label>Supplier name</label>
                        <input type="text" class="form-control" id="supplier_name"/>

                    <div>
                    <div class="form-group mt-4">
                        <label>Supplier email</label>
                        <input type="email" class="form-control" id="email"/>

                    <div>
                    <div class="form-group mt-4">
                        <label>Supplier contact</label>
                        <input type="text" class="form-control" id="contact"/>

                    <div>
                    <div class="form-group mt-4">
                        <label>Supplier address</label>
                        <input type="text" class="form-control" id="address"/>

                    <div>

                    <div class="form-group space-top-md"> 
                        <input type="submit" id="edit_supplier" class="form-control" value="Save"/>
                    <div>

            </div>
    
            `
            document.querySelector('.modalBody').innerHTML=content
            loadDataSupplier(id,'supplier');
            edit(id)
            
}

function editAgent(id){
    let content= `
            <div style="margin-top:20px">
                    <div class="form-group mt-4">
                        <label>Agent name</label>
                        <input type="text" class="form-control" id="agent_name"/>

                    <div>
                    <div class="form-group mt-4">
                        <label>Agent email</label>
                        <input type="email" class="form-control" id="agent_email"/>

                    <div>
                    <div class="form-group mt-4">
                        <label>Agent contact</label>
                        <input type="text" class="form-control" id="agent_contact"/>

                    <div>
                    <div class="form-group mt-4">
                        <label>Agent address</label>
                        <input type="text" class="form-control" id="agent_address"/>

                    <div>

                    <div class="form-group space-top-md"> 
                        <input type="submit" id="edit_agent" class="form-control" value="Save"/>
                    <div>

            </div>
    
            `
            document.querySelector('.modalBody').innerHTML=content
            loadDataAgent(id,'agent');
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
                        <input type="submit" id="edit_order" class="form-control" value="Save"/>
                    <div>

            </div>
    
            `
            document.querySelector('.modalBody').innerHTML=content
            loadDataOrder(id,'orders');
            edit(id);
            
}

function editProject(id){
    let content= `
            <div style="margin-top:20px">
                    <div class="form-group">
                        <label>Project name</label>
                        <input type="text" class="form-control" id="project_name"/>

                    <div>

                    <div class="form-group space-top-md"> 
                        <input type="submit" id="edit_project" class="form-control" value="Save"/>
                    <div>

            </div>
    
            `
            document.querySelector('.modalBody').innerHTML=content
            loadDataProject(id,'project');
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
           document.getElementById('contact').value=data.data.contact
           document.getElementById('address').value=data.data.address
           document.getElementById('email').value=data.data.email
        }
        
    })
    .catch(err=> {
        
        console.log(err)
      
       
    })

}


function loadDataAgent(id,agent){
    fetch('/procurement/app/customroute/getdata',{
        method:'POST',
        body:JSON.stringify({
           tableName:agent,
           id:id 
        }),
        headers: { "Content-type": "application/x-www-form-urlencoded"},
                                            
    })
    .then(res=>res.json())
    .then(data=>{
        
        if(data['status']){
           document.getElementById('agent_name').value=data.data.agent_name
           document.getElementById('agent_contact').value=data.data.agent_contact
           document.getElementById('agent_address').value=data.data.agent_address
           document.getElementById('agent_email').value=data.data.agent_email
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
function loadDataProject(id,project){
    console.log(project)
    fetch('/procurement/app/customroute/getdata',{
        method:'POST',
        body:JSON.stringify({
           tableName:project,
           id:id 
        }),
        headers: { "Content-type": "application/x-www-form-urlencoded"},
                                            
    })
    .then(res=>res.json())
    .then(data=>{
        
        if(data['status']){
           document.getElementById('project_name').value=data.data.project_name

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
            let contact = document.getElementById('contact').value;
            let address = document.getElementById('address').value;
            let email = document.getElementById('email').value;
    
            fetch('/procurement/app/customroute/editdata',{
                method:'POST',
                body:JSON.stringify({
                   tableName:"supplier",
                   updatedata:supplier_name,
                   contact,
                   address,
                   email,
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

    if(document.querySelector('#edit_agent')){
        document.querySelector('#edit_agent').addEventListener('click',function(e){
            e.preventDefault();
            let agent_name = document.getElementById('agent_name').value;
            let contact = document.getElementById('agent_contact').value;
            let address = document.getElementById('agent_address').value;
            let email = document.getElementById('agent_email').value;
    
            fetch('/procurement/app/customroute/editdata',{
                method:'POST',
                body:JSON.stringify({
                   tableName:"agent",
                   updatedata:agent_name,
                   contact,
                   address,
                   email,
                   affectedColumn:'agent_name',
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
                   getAllAgent();
                   
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

    
    if(document.querySelector('#edit_project')){
        document.querySelector('#edit_project').addEventListener('click',function(e){
            e.preventDefault();
            let project_new_name = document.getElementById('project_name').value;
    
            fetch('/procurement/app/customroute/editdata',{
                method:'POST',
                body:JSON.stringify({
                   tableName:"project",
                   updatedata:project_new_name,
                   affectedColumn:'project_name',
                   id:id
                }),
                headers: { "Content-type": "application/x-www-form-urlencoded"},
                                                    
            })
            .then(res=>res.json())
            .then(data=>{
                console.log("data",data)
                if(data['status']){
                    forceClose();
                    AllProject()
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