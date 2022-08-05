// function AddRequisitionDefault(){
//     let username = document.getElementById('username').value
    
//     return `
//                 <div class="tab-body-order-2">
//                     <div>
//                         <label>User</label>
//                         <input type="text" class="form-control selector" value=${username} disabled placeholder="Create Order"/>
//                     </div>
//                     <div class="div-2-element">
//                         <div>
//                             <label>Select Order</label>
//                             <select class="form-control ordertype" id="ordertype">
//                                 <option value="">SELECT ORDER TYPE</option>
                                
                            
//                             </select>
//                         </div>
//                         <div>
//                             <label>Select Supplier</label>
//                             <select class="form-control allsupplier" id="allsupplier">
//                                 <option value="">SELECT SUPPLIER</option>
                                
//                             </select>
//                         </div>
                        
//                     </div>

//                 </div>

//                 <div class="tab-body-more">
//                     <div class="contentHeader">
//                         <div>SN</div>
//                         <div>Description</div>
//                         <div>Quantity</div>
//                         <div>ABC Price</div>
//                         <div>ABC Total</div>
//                         <div>Unit Price</div>
//                         <div>Total Price</div>
//                     </div>
//                     <div class="contentParent">
//                         <div class="content">
//                             <div ><input type="text" value=1 class="form-control" /></div>
//                             <div><input type="text" placeholder="description" class="form-control"/></div>
//                             <div><input type="text" placeholder="quantity"  class="form-control"/></div>
//                             <div><input type="text" placeholder="abc price"  class="form-control"/></div>
//                             <div><input type="text" placeholder="abc total"  class="form-control"/></div>
//                             <div><input type="text" placeholder="unit price"  class="form-control"/></div>
//                             <div><input type="text" placeholder="total price"  class="form-control"/></div>
                            
//                         </div>
//                     </div>
//                     <div class="addrow">
//                     <button class="btn btn-secondary rowplus">+ Add row(s)</button>
//                     </div>
                    
//                     <div class="uploadattachment">Add/Upload Attachment</div>
//                     <div class="fileuploadDiv"> 
//                         <input type="file" id="fileInput" name="file[]" class="fileUploadInput" accept="application/pdf" multiple />
//                         <button class="btn btn-bg">Choose File</button>
//                         <span class="number_files">No File Selected</span>
//                     </div>
//                     <div class="selectedFiles">
                        
                        
//                     </div>

                    
//                     <div class="submitBtnParent">
//                         <button class="btn btn-bg uploadRequisition">Upload Requisition For Approval</button>
//                     </div>
//                 </div>
    
//             `
            
// }

// function AddRequisition(){
//     let username = document.getElementById('username').value
    
//     let content = `
//                 <div class="tab-body-order-2">
//                     <form method="POST" enctype="multipart/form-data">
//                         <div>
//                             <label>User</label>
//                             <input type="text" class="form-control selector" value=${username} disabled placeholder="Create Order"/>
//                         </div>
//                         <div class="div-2-element">
//                             <div>
//                                 <label>Select Order</label>
//                                 <select class="form-control ordertype" id="ordertype">
//                                     <option value="">SELECT ORDER TYPE</option>
                                    
                                
//                                 </select>
//                             </div>
//                             <div>
//                                 <label>Select Supplier</label>
//                                 <select class="form-control allsupplier" id="allsupplier">
//                                     <option value="">SELECT SUPPLIER</option>
                                    
//                                 </select>
//                             </div>
                            
//                         </div>

//                     </div>

//                     <div class="tab-body-more">
//                         <div class="contentHeader">
//                             <div>SN</div>
//                             <div>Description</div>
//                             <div>Quantity</div>
//                             <div>ABC Price</div>
//                             <div>ABC Total</div>
//                             <div>Unit Price</div>
//                             <div>Total Price</div>
//                         </div>
//                         <div class="contentParent">
//                             <div class="content">
//                                 <div ><input type="text" value=1 class="form-control" /></div>
//                                 <div><input type="text" placeholder="description" class="form-control"/></div>
//                                 <div><input type="text" placeholder="quantity"  class="form-control"/></div>
//                                 <div><input type="text" placeholder="abc price"  class="form-control"/></div>
//                                 <div><input type="text" placeholder="abc total"  class="form-control"/></div>
//                                 <div><input type="text" placeholder="unit price"  class="form-control"/></div>
//                                 <div><input type="text" placeholder="total price"  class="form-control"/></div>
                                
//                             </div>
//                         </div>
//                         <div class="addrow">
//                         <button class="btn btn-secondary rowplus">+ Add row(s)</button>
//                         </div>
                        
//                         <div class="uploadattachment">Add/Upload Attachment</div>
//                         <div class="fileuploadDiv"> 
//                             <input type="file" id="fileInput" name="file[]" class="fileUploadInput" accept="application/pdf" multiple />
//                             <button class="btn btn-bg">Choose File</button>
//                             <span class="number_files">No File Selected</span>
//                         </div>
//                         <div class="selectedFiles">
                            
                            
//                         </div>

                        
//                         <div class="submitBtnParent">
//                             <button class="btn btn-bg uploadRequisition">Upload Requisition For Approval</button>
//                         </div>
//                     </form>
//                 </div>
    
//             `

//         document.querySelector('.render_body_content').innerHTML = content
            
// }





// function AllRequisition(){
//     let content =  `
//                 <h1>NO DATA</h1>
//             `
//         document.querySelector('.render_body_content').innerHTML = content
// }

function switchComponentBodyRender(tab_name){
    
    switch(tab_name){
        case 'Add Requisition':
            return AddRequisition();
            break;
        case 'All Requisition':
            return AllRequisition();
        case 'Add Supplier':
            return AddSupplier();
        case 'All Supplier':
            return AllSupplier();
        case 'Add Order':
             return AddOrder();
        case 'All Order':
            return AllOrder();
        case 'Treated Approval':
            return TreatedApproval();
        case 'Pending Approval':
            return PendingApproval();
        case 'Awaiting Shippment':
            return AwaitingShippment();
        case 'Processing':
            return Processing();
        case 'Delivered':
            return Delivered();
        default:
            
    }
}

// function PendingApproval(){
//     approvalfetch();
//         let content = `<table id="example" class="table table-striped table-bordered" style="width:100%">
//                     <thead>
//                         <tr>
//                             <th>SN</th>
//                             <th>ORDER TYPE</th>
//                             <th>STATUS</th>
//                             <th>DATE</th>
                            
//                         </tr>
//                     </thead>
//                 </table>`
//         document.querySelector('.render_body_content').innerHTML = content
// }

// function TreatedApproval(){
//     allapproved();
//         let content = `<table id="example" class="table table-striped table-bordered" style="width:100%">
//                     <thead>
//                         <tr>
//                             <th>SN</th>
//                             <th>ORDER TYPE</th>
//                             <th>SUPPLIER ASSIGNED</th>
//                             <th>STATUS</th>
//                             <th>DATE</th>
//                             <th>ACTION</th>
                            
//                         </tr>
//                     </thead>
//                 </table>`
//         document.querySelector('.render_body_content').innerHTML = content
// }
// function allapproved(){
    
//     let table = $('#example').DataTable({
     
//         "processing":true,
//         "destroy":true,
//         "serverSide":true,
//         "bFilter": true,
//         'dom': "Bfrtip",
//         "ajax":{
//              url:'/procurement/app/customroute/allapproved',
//              type:"GET"
             
//         },
//         "columns":[
             
//                  {data:"id"},
//                  {data:"order_title"},
//                  {data:"supplier_name"},
//                  {data:"level_1_approval"},
//                  {data:"created_at"},
//                  {
//                      data:'',
//                      render:function(data,type,row){
                     
//                          return `<div style="text-decoration:underline;color:#ff0000" onclick="deleteApprove(${row.id},${row.order_id})">Delete</div>`
//                        } 
//                  }
             
//         ]   
//      });
// }
// function ApprovalHTML(){

//         approvalfetch();
//         return `<table id="example" class="table table-striped table-bordered" style="width:100%">
//                     <thead>
//                         <tr>
//                             <th>SN</th>
//                             <th>ORDER TYPE</th>
//                             <th>STATUS</th>
//                             <th>DATE</th>
                            
                            
//                         </tr>
//                     </thead>
//                 </table>`
// }

// function approvalfetch(){
    

//        let table = $('#example').DataTable({
        
//            "processing":true,
//             "destroy":true,
//            "serverSide":true,
//            "bFilter": true,
//            dom: "Bfrtip",
//            "ajax":{
//                 url:'/procurement/app/customroute/getpendingApproval',
//                 type:"GET",
                
               
//            },
//            "columns":[
                
//                     {data:"id"},
//                     {
//                       data:"order_title",
//                       render:function(data,type,row){
                        
//                         return `<a href=#Approval/details/${row.id}>${data}</a>`
//                       }  
                        
//                     },
//                     {data:"level_1_approval"},
//                     {data:"created_at"},
                
//            ]   

            

//         });


    
// }

function POHTML(){

    POfetch();
    return `
            
    
            <table id="example" class="table table-striped table-bordered" style="width:100%">
                <thead>
                    <tr>
                        <th>SN</th>
                        <th>ORDER TYPE</th>
                        <th>SUPPLIER NAME</th>
                        <th>STATUS</th>
                        <th>DATE</th>
                        <th>REVIEW</th>
                        
                        
                    </tr>
                </thead>
            </table>`
}


function POfetch(){
    $(document).ready(function () {

       let table = $('#example').DataTable({
        
           "processing":true,
            "destroy":true,
           "serverSide":true,
           "bFilter": true,
           dom: "Bfrtip",
           "ajax":{
                url:'/procurement/app/customroute/getPO',
                type:"GET",
                
               
           },
           "columns":[
                
                    {data:"id"},
                    {data:"order_title"},
                    {data:"supplier_name"},
                    {data:"level_1_approval"},
                    {data:"created_at"},
                    {
                        data:"",
                        render:function(data,type,row){
                            
                            return `<div style="cursor:pointer;text-decoration:underline" onclick="reviewPO(${row.order_id})">Review</div>`
                          } 
                    }
                
           ]   

        });


    });
    
    
}

function ShippmentHTML(){

    Shippmentfetch();
    return `
            
    
            <table id="example" class="table table-striped table-bordered" style="width:100%">
                <thead>
                    <tr>
                        <th>SN</th>
                        <th>ORDER TYPE</th>
                        <th>SUPPLIER NAME</th>
                        <th>APPROVAL STATUS</th>
                        <th>PO STATUS</th>
                        <th>SHIPPMENT STATUS</th>
                        <th>DATE</th>
                        <th>LEVEL</th>
                        
                    </tr>
                </thead>
            </table>`
}


function Shippmentfetch(){
    $(document).ready(function () {

       let table = $('#example').DataTable({
        
           "processing":true,
            "destroy":true,
           "serverSide":true,
           "bFilter": true,
           dom: "Bfrtip",
           "ajax":{
                url:'/procurement/app/customroute/getShippment',
                type:"GET",
                
               
           },
           "columns":[
                
                    {data:"id"},
                    {data:"order_title"},
                    {data:"supplier_name"},
                    {data:"level_1_approval"},
                    {data:"po_approval"},
                    {data:"shipment_status"},
                    {data:"created_at"},
                    {
                        data:"",
                        render:function(data,type,row){
                            
                            return `<div style="cursor:pointer;text-decoration:underline" onclick="reviewPO(${row.order_id})"><button class="btn btn-warning btn-sm">Review</button></div>`
                          } 
                    }
                
           ]   

        });


    });
    
    
}







function reviewPO(orderid){
    document.querySelector('.POmodal').classList.add('overlayApproval')
    document.querySelector('.POcontentmodal').classList.add('Addapprovalmodalcard')
    
    fetch('/procurement/app/customroute/adjustPO',{
        method:"POST",
        headers: { "Content-type": "application/x-www-form-urlencoded"},
        body:JSON.stringify({
            orderid:orderid
            
        })
    })
    .then(result=>result.json())
    .then(res=>{

        console.log(res.data)
        let content;
        res.data.forEach((d,index)=>{
            
            content = `
                             <div> ${d.supplier_name.toUpperCase()}</div>
                             <address>No 5, Oladele street, Ikotun lagos.</address>
                             <div class="invoice">
                                    INVOICE FOR ${d.order_title}
                             </div>

                             <table class="table table-stripe table-bordered mytable">
                                <thead>
                                    <tr>
                                        <td>SN</td>
                                        <td> QUANTITY</td>
                                        <td> UNIT PRICE</td>
                                        <td> TOTAL PRICE</td>
                                    </tr>

                                </thead>
                                <tbody>

                                    <tr>
                                       
                                        <input type="hidden" id="assigned_supplier_id" value=${d.assigned_supplier} />
                                        <td >${index+1}</td>
                                        <td >${d.quantity}</td>
                                        <td >${d.unit}</td>
                                        <td><input type="text" id="totalprice" value=${d.total_price} style="width:100px;text-align:center" /></td>

                                    </tr>


                                </tbody>

                             </table>
                             
                            <div>
                                <button class="btn btn-success">Approve</button>
                                <button class="btn btn-danger">Reject</button>
                                <button class="btn btn-secondary">Close</button>
                            </div>

            
                            `
        })

        document.querySelector('.POcontentmodal').innerHTML=content
        
    })
    .catch(err=>{
        console.log(err)
    })


    document.querySelector('.POcontentmodal').addEventListener('click',function(e){
                let totalprice = document.getElementById('totalprice').value;
          
                let assigned_supplier_id = document.getElementById('assigned_supplier_id').value
               
        if(e.target.classList.contains('btn-success')){
                
                fetch('/procurement/app/customroute/POapproval',{
                    method:"POST",
                    headers: { "Content-type": "application/x-www-form-urlencoded"},
                    body:JSON.stringify({
                        orderid:orderid,
                        totalprice:totalprice,
                        assigned_supplier_id:assigned_supplier_id
                    })
                })
                .then(result=>result.json())
                .then(res=>{
                        if(res.status){
                            Swal.fire(res.data,'','success');
                            document.querySelector('.POmodal').classList.remove('overlayApproval')
                            document.querySelector('.POcontentmodal').classList.remove('Addapprovalmodalcard')
                            document.querySelector('.POcontentmodal').innerHTML=""
                            POfetch();
                        }
                        else{
                            Swal.fire('An Error Occurred','','errpr');
                        }
                })
                .catch(err=>{
                    console.log(err)
                })
        }
        if(e.target.classList.contains('btn-danger')){
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
                    fetch('/procurement/app/customroute/delete_approval_po',{
                        method:'POST',
                        headers: { "Content-type": "application/x-www-form-urlencoded"},
                        body:JSON.stringify({
                            orderid:orderid,
                            assigned_supplier_id:assigned_supplier_id
                            
                        })
                    })
                        
                        .then(result=>result.json())
                        .then(res=>{
                            if(res.status){
                                Swal.fire(
                                    'Deleted!',
                                    'Your Approval has been deleted.',
                                    'success'
                                  )
                                  document.querySelector('.POmodal').classList.remove('overlayApproval')
                                document.querySelector('.POcontentmodal').classList.remove('Addapprovalmodalcard')
                                document.querySelector('.POcontentmodal').innerHTML=""
                                  POfetch();
                            }
                            else{
                                Swal.fire(
                                    'Internal Server Error',
                                    '',
                                    'error'
                                  )
                            }
                        })
                    
                }
              })
        }
        if(e.target.classList.contains('btn-secondary')){
            document.querySelector('.POmodal').classList.remove('overlayApproval')
            document.querySelector('.POcontentmodal').classList.remove('Addapprovalmodalcard')
            document.querySelector('.POcontentmodal').innerHTML=""
        }
    })

}




function AwaitingShippment(){

    Shippmentfetch();
    let content = `
            <table id="example" class="table table-striped table-bordered" style="width:100%">
                <thead>
                    <tr>
                        <th>SN</th>
                        <th>ORDER TYPE</th>
                        <th>SUPPLIER NAME</th>
                        <th>APPROVAL STATUS</th>
                        <th>PO STATUS</th>
                        <th>SHIPPMENT STATUS</th>
                        <th>DATE</th>
                        <th>LEVEL</th>
                        
                    </tr>
                </thead>
            </table>`

            document.querySelector('.render_body_content').innerHTML = content

            
}


function Shippmentfetch(){
    $(document).ready(function () {

       let table = $('#example').DataTable({
        
           "processing":true,
            "destroy":true,
           "serverSide":true,
           "bFilter": true,
           "dom": "Bfrtip",
           "ajax":{
                url:'/procurement/app/customroute/getShippment',
                type:"GET",
                
               
           },
           "columns":[
                
                    {data:"id"},
                    {data:"order_title"},
                    {data:"supplier_name"},
                    {data:"level_1_approval"},
                    {data:"po_approval"},
                    {data:"shipment_status"},
                    {data:"created_at"},
                    {
                        data:"",
                        render:function(data,type,row){
                            
                            return `<div style="cursor:pointer;text-decoration:underline" onclick="reviewPO(${row.order_id})"><button class="btn btn-warning btn-sm">Review</button></div>`
                          } 
                    }
                
           ]   

        });


    });
    
    
}


function Processing(){

    processingfetch();
    let content = `
            
    
            <table id="example" class="table table-striped table-bordered" style="width:100%">
                <thead>
                    <tr>
                        <th>SN</th>
                        <th>ORDER TYPE</th>
                        <th>SUPPLIER NAME</th>
                        <th>APPROVAL STATUS</th>
                        <th>PO STATUS</th>
                        <th>SHIPPMENT STATUS</th>
                        <th>DATE</th>
                        <th>LEVEL</th>
                        
                    </tr>
                </thead>
            </table>`
            document.querySelector('.render_body_content').innerHTML = content
}


function processingfetch(){
    $(document).ready(function () {

       let table = $('#example').DataTable({
        
           "processing":true,
            "destroy":true,
           "serverSide":true,
           "bFilter": true,
           dom: "Bfrtip",
           "ajax":{
                url:'/procurement/app/customroute/getShippment_in_processing',
                type:"GET",
                
               
           },
           "columns":[
                
                    {data:"id"},
                    {data:"order_title"},
                    {data:"supplier_name"},
                    {data:"level_1_approval"},
                    {data:"po_approval"},
                    {data:"shipment_status"},
                    {data:"created_at"},
                    {
                        data:"",
                        render:function(data,type,row){
                            
                            return `<div style="cursor:pointer;text-decoration:underline" onclick="reviewPO(${row.order_id})"><button class="btn btn-warning btn-sm">Review</button></div>`
                          } 
                    }
                
           ]   

        });


    });
    
    
}



function Delivered(){

    Deliveredfetch();
    let content = `
            
    
            <table id="example" class="table table-striped table-bordered" style="width:100%">
                <thead>
                    <tr>
                        <th>SN</th>
                        <th>ORDER TYPE</th>
                        <th>SUPPLIER NAME</th>
                        <th>APPROVAL STATUS</th>
                        <th>PO STATUS</th>
                        <th>SHIPPMENT STATUS</th>
                        <th>DATE</th>
                        <th>LEVEL</th>
                        
                    </tr>
                </thead>
            </table>`
            document.querySelector('.render_body_content').innerHTML = content
}


function Deliveredfetch(){
    $(document).ready(function () {

       let table = $('#example').DataTable({
        
           "processing":true,
            "destroy":true,
           "serverSide":true,
           "bFilter": true,
           dom: "Bfrtip",
           "ajax":{
                url:'/procurement/app/customroute/deliveredShippment',
                type:"GET",
                
               
           },
           "columns":[
                
                    {data:"id"},
                    {data:"order_title"},
                    {data:"supplier_name"},
                    {data:"level_1_approval"},
                    {data:"po_approval"},
                    {data:"shipment_status"},
                    {data:"created_at"},
                    {
                        data:"",
                        render:function(data,type,row){
                            
                            return `<div style="cursor:pointer;text-decoration:underline" onclick="reviewPO(${row.order_id})"><button class="btn btn-warning btn-sm">Review</button></div>`
                          } 
                    }
                
           ]   

        });


    });
    
    
}


