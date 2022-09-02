function Supplier(search){
    let content = ` 
                    <div class="supplierDiv">
                        <div class="modalClass"></div>
                        <div class="tabDiv">
                            <div class="tab-active">Add Supplier</div>
                            <div>All Supplier</div>
                            <div>Add Abroad/Local Clearing</div>
                            
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
                    <input type="text" class="form-control selector" id="supplieraddress" placeholder="Provide Company Address (optional)"/>
                </div>
                <div class="col-md-6">
                    <label>Company Contact</label>
                    <input type="text" class="form-control selector" id="suppliercontact" placeholder="Provide Company Contact Number (optional)"/>
                </div>
                <div class="col-md-6">
                    <label>Company Email</label>
                    <input type="email" id="supplier_email" class="form-control selector" placeholder="Provide Company Email (optional)"/>
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
                    <label>Company Contact</label>
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



