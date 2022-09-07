function Supplier(search){
    let content = ` 
                    <div class="supplierDiv">
                        <div class="modalClass"></div>
                        <div class="tabDiv">
                            <div class="tab-active">Add Supplier</div>
                            <div>All Supplier</div>
                            <div>Add Abroad/Local Clearing</div>
                            <div>All Agent</div>
                        </div>
                        <div class="tab-body render_body_content">
                            ${loadSupplierDefault()}
                           
                        </div>
                    </div>
    
                `
    return content;
   
}



function loadSupplierDefault(){
    return `
                <div class="col-md-6">
                    <label>Company Name</label>
                    <input type="text" class="form-control selector" placeholder="Provide Supplier Name" id="supplier_name"/>
                </div>

                <div class="col-md-6">
                    <label>Company Address</label>
                    <input type="text" class="form-control selector" id="supplieraddress" placeholder="Provide Company Address"/>
                </div>
                <div class="col-md-6">
                    <label>Supplier's Phonenumber</label>
                    <input type="text" class="form-control selector" id="suppliercontact" placeholder="Provide Company Contact Number"/>
                </div>
                <div class="col-md-6">
                    <label>Company Email</label>
                    <input type="email" id="supplier_email" class="form-control selector" placeholder="Provide Company Email "/>
                </div>
                <div>
                    <input type="submit" class="form-control selectorSave" value="Save" id="saveSupplier"/>
                </div>

                `
        //document.querySelector('.render_body_content').innerHTML = content
}
function AddSupplier(){
    let content =`
                    <div class="col-md-6">
                    <label>Company Name</label>
                    <input type="text" class="form-control selector" placeholder="Provide Supplier Name" id="supplier_name"/>
                    </div>

                <div class="col-md-6">
                    <label>Company Address</label>
                    <input type="text" class="form-control selector" placeholder="Provide Supplier Address" id="supplieraddress"/>
                </div>
                <div class="col-md-6">
                    <label> Supplier's Phonenumber</label>
                    <input type="text" id="suppliercontact" class="form-control selector" placeholder="Provide Company Contact Number (optional)"/>
                </div>
                <div class="col-md-6">
                    <label>Company Email</label>
                    <input type="email" id="supplier_email" class="form-control selector" placeholder="Provide Company Email (optional)"/>
                </div>
                <div class="col-md-6">
                    <input type="submit" class="form-control selectorSave" value="Save" id="saveSupplier"/>
                </div>

                `
        document.querySelector('.render_body_content').innerHTML = content
        saveSupplierModule()
}

function AddAbroadAgent(){
    let content =`
                    <div class="col-md-6">
                    <label>Agent Name</label>
                    <input type="text" class="form-control selector" placeholder="Provide Agent Name" id="agent_name"/>
                    </div>

                <div class="col-md-6">
                    <label>Agent Address</label>
                    <input type="text" class="form-control selector" placeholder="Provide Agent Address" id="agentaddress"/>
                </div>
                <div class="col-md-6">
                    <label>Agent Contact</label>
                    <input type="text" id="agentcontact" class="form-control selector" placeholder="Provide Agent Contact Number"/>
                </div>
                <div class="col-md-6">
                    <label>Agent Email</label>
                    <input type="email" id="agent_email" class="form-control selector" placeholder="Provide Agent Email"/>
                </div>
                <div class="col-md-6">
                    <input type="submit" class="form-control selectorSave" value="Save" id="saveAgent"/>
                </div>

                `
        document.querySelector('.render_body_content').innerHTML = content
        saveAgentModule()
}

function AllSupplier(){
   
 
    let content = `<table id="supplier" class="table table-striped table-bordered" style="width:100%">
                <thead>
                    <tr>
                        <th>SN</th>
                        <th>SUPPLIER NAME</th>
                        <th>SUPPLIER ADDRESS</th>
                        <th>SUPPLIER CONTACT</th>
                        <th>DATE</th>
                        <th>ACTION</th>
                    </tr>
                </thead>
            </table>`

            document.querySelector('.render_body_content').innerHTML = content
    
            getAllSupplier();
}


function AllAgent(){
   
 
    let content = `<table id="supplier" class="table table-striped table-bordered" style="width:100%">
                <thead>
                    <tr>
                        <th>SN</th>
                        <th>AGENT NAME</th>
                        <th>AGENT ADDRESS</th>
                        <th>AGENT CONTACT</th>
                        <th>DATE</th>
                        <th>ACTION</th>
                    </tr>
                </thead>
            </table>`

            document.querySelector('.render_body_content').innerHTML = content
    
            getAllAgent();
}

function getAllSupplier(){

    let count=0;

        fetch('/procurement/app/customroute/alldatasupplier')
        .then(response=>response.json())
        .then(res=>{
            console.log(res)
            let tableSupplier= $('#supplier').DataTable({
                dom: 'Blfrtp',
                
                data:res.data,
                destroy:true,
                buttons: ['excel', 'pdf' ],
                columns:[
                 
                                {
                                
                                data:"",
                                render:function(){
                                    return count = count+ 1;
                                }
                            
                            },
                                {data:"supplier_name"},
                                {data:"address"},
                                {data:"contact"},
                                {data:"created_at"},
                                {
                                    data:"",
                                    render:function(data,type,row){
                                    
                                        return `<div>
                                                <button class="btn btn-secondary" onclick="modal('modalSupplier',${row.id},'Edit Supplier')">Edit</button>
                                                
                                            </div>`
                                    } 
                                }
                
                 ]



            })
        }
                
            )
        .catch(err=>console.log(err))

        
    
      
}

function getAllAgent(){

    let count=0;

        fetch('/procurement/app/customroute/alldataAgent')
        .then(response=>response.json())
        .then(res=>{
            console.log(res)
            let tableSupplier= $('#supplier').DataTable({
                dom: 'Blfrtp',
                
                data:res.data,
                destroy:true,
                buttons: ['excel', 'pdf' ],
                columns:[
                 
                                {
                                
                                data:"",
                                render:function(){
                                    return count = count+ 1;
                                }
                            
                            },
                                {data:"agent_name"},
                                {data:"agent_address"},
                                {data:"agent_contact"},
                                {data:"created_at"},
                                {
                                    data:"",
                                    render:function(data,type,row){
                                    
                                        return `<div>
                                                <button class="btn btn-secondary" onclick="modal('modalAgent',${row.id},'Edit Agent')">Edit</button>
                                                
                                            </div>`
                                    } 
                                }
                
                 ]



            })
        }
                
            )
        .catch(err=>console.log(err))

        
    
      
}

function saveSupplierModule(){
    document.getElementById('saveSupplier').addEventListener('click',function(e){
        e.preventDefault();

        let supplier_name = document.getElementById('supplier_name').value
        let supplier_address =document.getElementById('supplieraddress').value;
        let supplier_contact = document.getElementById('suppliercontact').value
        let supplier_email = document.getElementById('supplier_email').value
        let author = document.getElementById('username').value
                    
        if(supplier_name === ""){
            
            Swal.fire('Supplier Name is Required!','', 'error') 
            return false 
        }
        if(supplier_contact === ""){
            
            Swal.fire('Supplier Contact is Required!','', 'error') 
            return false 
        }
        if(supplier_address === ""){
            
            Swal.fire('Supplier Address is Required!','', 'error') 
            return false 
        }

        if(supplier_email === ""){
            
            Swal.fire('Supplier Email is Required!','', 'error') 
            return false 
        }


        

        if(supplier_name){
            
            document.querySelector('.loader').classList.add('overlayLoader');
            document.querySelector('.rounding').classList.add('roundLoader');
            fetch('/procurement/app/customroute/addsupplier',{
                method:'POST',
                body:JSON.stringify({
                    supplier_name:supplier_name,
                    author:author,
                    supplier_address:supplier_address,
                    supplier_contact:supplier_contact,
                    supplier_email:supplier_email
                    
                }),
                headers: { "Content-type": "application/x-www-form-urlencoded"},
                                                    
            })
            .then(res=>res.json())
            .then(data=>{
                console.log("data",data)
                if(data['status']){
                    document.querySelector('.loader').classList.remove('overlayLoader');
                    document.querySelector('.rounding').classList.remove('roundLoader');
                    Swal.fire(data['data'],'', 'success') 
                    document.getElementById('supplier_name').value=""
                    document.getElementById('supplieraddress').value=""
                    document.getElementById('suppliercontact').value=""
                    document.getElementById('supplier_email').value=""
                }else{
                    document.querySelector('.loader').classList.remove('overlayLoader');
                    document.querySelector('.rounding').classList.remove('roundLoader');
                    Swal.fire(data['data'],'', 'error') 
                }
                
            })
            .catch(err=> {
                
                console.log(err)
                document.querySelector('.loader').classList.remove('overlayLoader');
                //document.querySelector('.rounding').classList.remove('roundLoader');
                Swal.fire(data['data'],'', 'error') 
               
            })



            


        }
                        

    })
}

function saveAgentModule(){
    document.getElementById('saveAgent').addEventListener('click',function(e){
        e.preventDefault();

        let agent_name = document.getElementById('agent_name').value
        let agent_address =document.getElementById('agentaddress').value;
        let agent_contact = document.getElementById('agentcontact').value
        let agent_email = document.getElementById('agent_email').value
        let author = document.getElementById('username').value
                    
        if(agent_name === ""){
            
            Swal.fire('Agent Name is Required!','', 'error') 
            return false 
        }
        if(agent_contact === ""){
            
            Swal.fire('Agent Contact is Required!','', 'error') 
            return false 
        }
        if(agent_address === ""){
            
            Swal.fire('Agent Address is Required!','', 'error') 
            return false 
        }

        if(agent_email === ""){
            
            Swal.fire('Agent Email is Required!','', 'error') 
            return false 
        }


        

        if(agent_name ){
            
            document.querySelector('.loader').classList.add('overlayLoader');
            document.querySelector('.rounding').classList.add('roundLoader');
            fetch('/procurement/app/customroute/addagent',{
                method:'POST',
                body:JSON.stringify({
                    agent_name,agent_address,agent_contact,author,agent_email
                    
                }),
                headers: { "Content-type": "application/x-www-form-urlencoded"},
                                                    
            })
            .then(res=>res.json())
            .then(data=>{
                console.log("data",data)
                if(data['status']){
                    document.querySelector('.loader').classList.remove('overlayLoader');
                    document.querySelector('.rounding').classList.remove('roundLoader');
                    Swal.fire(data['data'],'', 'success') 
                    document.getElementById('agent_name').value=""
                    document.getElementById('agentaddress').value=""
                    document.getElementById('agentcontact').value=""
                    document.getElementById('agent_email').value=""

                }else{
                    document.querySelector('.loader').classList.remove('overlayLoader');
                    document.querySelector('.rounding').classList.remove('roundLoader');
                    Swal.fire(data['data'],'', 'error') 
                }
                
            })
            .catch(err=> {
                
                console.log(err)
                document.querySelector('.loader').classList.remove('overlayLoader');
                //document.querySelector('.rounding').classList.remove('roundLoader');
                Swal.fire(data['data'],'', 'error') 
               
            })



            


        }
                        

    })
}




