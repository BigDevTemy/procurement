
function switchComponentBodyRender(tab_name){
    
    switch(tab_name){
        case 'Add Requisition':
            return AddRequisition();
            break;
        case 'All Requisition':
            return AllRequisition();
        case 'Add Supplier':
            return AddSupplier();
        case 'Add Abroad/Local Clearing':
            return AddAbroadAgent();
        case 'All Supplier':
            return AllSupplier();
            case 'All Agent':
                return AllAgent();
        case 'Add Project':
            return AddProject();
        case 'All Project':
            return AllProject();
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
        case 'Pending PO Approval':
            return POPendingClicked();
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



