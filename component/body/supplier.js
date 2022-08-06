function Supplier(search){
    let content = ` 
                    <div class="supplierDiv">
                        <div class="modalClass"></div>
                        <div class="tabDiv">
                            <div class="tab-active">Add Supplier</div>
                            <div>All Supplier</div>
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
                <div>
                    <label>Company Name</label>
                    <input type="text" class="form-control selector" placeholder="Provide Supplier Name" id="supplier_name"/>
                </div>

                <div>
                    <label>Company Address</label>
                    <input type="text" class="form-control selector" id="supplieraddress" placeholder="Provide Company Address (optional)"/>
                </div>
                <div>
                    <label>Company Contact</label>
                    <input type="text" class="form-control selector" id="suppliercontact" placeholder="Provide Company Contact Number (optional)"/>
                </div>
                <div>
                    <input type="submit" class="form-control selectorSave" value="Save" id="saveSupplier"/>
                </div>

                `
        //document.querySelector('.render_body_content').innerHTML = content
}
function AddSupplier(){
    let content =`
                    <div>
                    <label>Company Name</label>
                    <input type="text" class="form-control selector" placeholder="Provide Supplier Name" id="supplier_name"/>
                    </div>

                <div>
                    <label>Company Address</label>
                    <input type="text" class="form-control selector" placeholder="Provide Supplier Address" id="supplieraddress"/>
                </div>
                <div>
                    <label>Company Contact</label>
                    <input type="text" id="suppliercontact" class="form-control selector" placeholder="Provide Company Contact Number (optional)"/>
                </div>
                <div>
                    <input type="submit" class="form-control selectorSave" value="Save" id="saveSupplier"/>
                </div>

                `
        document.querySelector('.render_body_content').innerHTML = content
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

        let table = $('#supplier').DataTable({
         
            "processing":true,
            "destroy":true,
            "serverSide":true,
            
            'dom': "Bfrtip",
            "ajax":{
                 url:'/procurement/app/customroute/alldatasupplier',
                 type:"GET"
                 
            },
            "columns":[
                 
                     {data:"id"},
                     {data:"supplier_name"},
                     {data:"address"},
                     {data:"contact"},
                     {data:"created_at"},
                     {
                         data:"",
                         render:function(data,type,row){
                         
                             return `<div>
                                        <button class="btn btn-secondary" onclick="modal('modalSupplier',${row.id},'Edit Supplier')">Edit</button>
                                        <button  class="btn btn-danger" onclick="deleteApprove(${row.id})">Delete</button>
                                    </div>`
                           } 
                     }
                 
            ]   
    
             
    
         });
    
      
}


