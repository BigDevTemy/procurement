function PO(search){
    let content = ` 
                <div class="supplierDiv">
                    
                    <div class="tabDiv">
                        <div class="tab-active">Pending PO Approval</div>
                        <div class="">PO Approved</div>
                    </div>
                    <div class="modalClass"></div>
                    <div id="toprint" style="display:none">
                        bvbvbnvbnv
                    
                    </div>
                    

                    <div class="render_body_content approval">
                       ${POHTML()}
                    </div>
                

                </div>

             `
    return content;
}

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
                           
                            
                            return `<div style="cursor:pointer;text-decoration:underline" onclick="poModal(${row.order_id},${row.assigned_supplier},${row.id})">Review</div>`
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
        let suppliername,address,phonenumber,ordertitle
        res.data.forEach((d,index)=>{

            suppliername = d.supplier_name
            address = d.address
            phonenumber = d.contact
            ordertitle = d.order_title
            content += `
                        <tr>
                            <input type="hidden" id="assigned_supplier_id" value=${d.assigned_supplier} />
                            <td >${index+1}</td>
                            <td >${d.description}</td>
                            <td ><input type="${d.quantity}" value=${d.quantity} class="form-control" /></td>
                            <td ><input type="${d.price}" value=${d.price} class="form-control" /></td>
                            <td><input type="text" id="totalprice" value=${d.total} style="width:100px;text-align:center"  class="form-control"/></td>

                        </tr>
            
                            `
        })

        document.querySelector('tbody').innerHTML=content
        
    })
    .catch(err=>{
        console.log(err)
    })


    // document.querySelector('.POcontentmodal').addEventListener('click',function(e){
    //             let totalprice = document.getElementById('totalprice').value;
          
    //             let assigned_supplier_id = document.getElementById('assigned_supplier_id').value
               
    //     if(e.target.classList.contains('btn-success')){
                
    //             fetch('/procurement/app/customroute/POapproval',{
    //                 method:"POST",
    //                 headers: { "Content-type": "application/x-www-form-urlencoded"},
    //                 body:JSON.stringify({
    //                     orderid:orderid,
    //                     totalprice:totalprice,
    //                     assigned_supplier_id:assigned_supplier_id
    //                 })
    //             })
    //             .then(result=>result.json())
    //             .then(res=>{
    //                     if(res.status){
    //                         Swal.fire(res.data,'','success');
    //                         document.querySelector('.POmodal').classList.remove('overlayApproval')
    //                         document.querySelector('.POcontentmodal').classList.remove('Addapprovalmodalcard')
    //                         document.querySelector('.POcontentmodal').innerHTML=""
    //                         POfetch();
    //                     }
    //                     else{
    //                         Swal.fire('An Error Occurred','','errpr');
    //                     }
    //             })
    //             .catch(err=>{
    //                 console.log(err)
    //             })
    //     }
    //     if(e.target.classList.contains('btn-danger')){
    //         Swal.fire({
    //             title: 'Are you sure?',
    //             text: "You won't be able to revert this!",
    //             icon: 'warning',
    //             showCancelButton: true,
    //             confirmButtonColor: '#3085d6',
    //             cancelButtonColor: '#d33',
    //             confirmButtonText: 'Yes, delete it!'
    //           }).then((result) => {
    //             if (result.isConfirmed) {
    //                 fetch('/procurement/app/customroute/delete_approval_po',{
    //                     method:'POST',
    //                     headers: { "Content-type": "application/x-www-form-urlencoded"},
    //                     body:JSON.stringify({
    //                         orderid:orderid,
    //                         assigned_supplier_id:assigned_supplier_id
                            
    //                     })
    //                 })
                        
    //                     .then(result=>result.json())
    //                     .then(res=>{
    //                         if(res.status){
    //                             Swal.fire(
    //                                 'Deleted!',
    //                                 'Your Approval has been deleted.',
    //                                 'success'
    //                               )
    //                               document.querySelector('.POmodal').classList.remove('overlayApproval')
    //                             document.querySelector('.POcontentmodal').classList.remove('Addapprovalmodalcard')
    //                             document.querySelector('.POcontentmodal').innerHTML=""
    //                               POfetch();
    //                         }
    //                         else{
    //                             Swal.fire(
    //                                 'Internal Server Error',
    //                                 '',
    //                                 'error'
    //                               )
    //                         }
    //                     })
                    
    //             }
    //           })
    //     }
    //     if(e.target.classList.contains('btn-secondary')){
    //         document.querySelector('.POmodal').classList.remove('overlayApproval')
    //         document.querySelector('.POcontentmodal').classList.remove('Addapprovalmodalcard')
    //         document.querySelector('.POcontentmodal').innerHTML=""
    //     }
    // })

}

function PendingPOApproval(){
   
    let content = `
            
    
            <table id="poclick" class="table table-striped table-bordered" style="width:100%">
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
            document.querySelector('.render_body_content').innerHTML=content
            POClickfetch();
}
function POClickfetch(){
    $(document).ready(function () {

       let table = $('#poclick').DataTable({
        
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
                            console.log('yytyu',row)
                            return `<div style="cursor:pointer;text-decoration:underline" onclick="reviewPO(${row.order_id},${row.id})">Review</div>`
                          } 
                    }
                
           ]   

        });


    });
    
    
}
function POApproved(){
    let content = `
                    <table id="poapproved" class="table table-striped table-bordered" style="width:100%">
                        <thead>
                            <tr>
                                <th>SN</th>
                                <th>ORDER TYPE</th>
                                <th>SUPPLIER NAME</th>
                                <th>STATUS</th>
                                <th>PO APPROVAL STATUS</th>
                                <th>DATE</th>
                                <th>REVIEW</th>
                                <th>PRINT</th>
                                
                                
                            </tr>
                        </thead>
                    </table>`
    document.querySelector('.render_body_content').innerHTML=content
    POClickfetchapproved();
}

function POClickfetchapproved(){
    let table = $('#poapproved').DataTable({
        
        "processing":true,
         "destroy":true,
        "serverSide":true,
        "bFilter": true,
        dom: "Bfrtip",
        "ajax":{
             url:'/procurement/app/customroute/getPOapproved',
             type:"GET",
             
            
        },
        "columns":[
             
                 {data:"id"},
                 {data:"order_title"},
                 {data:"supplier_name"},
                 {data:"level_1_approval"},
                 {data:"po_approval"},
                 {data:"created_at"},
                 {
                     data:"",
                     render:function(data,type,row){
                         
                         return `<div style="cursor:pointer;text-decoration:underline" onclick="deleteItem('po',${row.order_id},${row.supplier_id},${row.id})">Delete Approval</div>`
                       } 
                 },
                 {
                    data:"",
                    render:function(data,type,row){
                        return  `
                                    <div style="cursor:pointer;width:100%">
                                            <button class="btn btn-sm btn-primary" onclick="printpart()">Print</button>
                                    </div>
                                `
                    }
                 }
    
             
        ]   

     });


}

function printpart () {
    var printwin = window.open("");
    printwin.document.write(document.getElementById("toprint").innerHTML);
    printwin.stop();
    printwin.print();
    printwin.close();
  }


function POreview(id){
    console.log(id)
}