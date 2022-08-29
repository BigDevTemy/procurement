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
        case 'Pending with the supplier':
            return AwaitingShippment();
        case 'Dispatched':
            return Dispatched();
        case 'Package Received by Agent':
            return Package();
        case 'Shipped By Agent':
            return Shipped();
        case 'Delivered':
            return Delivered();
        case 'PO Approved':
            return POApproved();
        case 'Approval Report':
            return ApprovedReportClick();
        case 'PO Report':
            return POReportClick();
        case 'Shippment Report':
            return ShippmentReportClick();
        case 'Requisition Report':
            return RequisitionReportClick();
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



