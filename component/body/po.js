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
            
    
            <table id="fetchpendingpo" class="table table-striped table-bordered" style="width:100%">
                <thead>
                    <tr>
                        <th>SN</th>
                        <th>ORDER TYPE</th>
                        <th>ORDER REF</th>
                        <th>SUPPLIER NAME</th>
                        <th>STATUS</th>
                        <th>DATE</th>
                        <th>REVIEW</th>
                        
                        
                    </tr>
                </thead>
            </table>`
}

function POPendingClicked(){

    
    let content =`
            
    
            <table id="fetchpendingpo" class="table table-striped table-bordered" style="width:100%">
                <thead>
                    <tr>
                        <th>SN</th>
                        <th>ORDER TYPE</th>
                        <th>ORDER REF</th>
                        <th>SUPPLIER NAME</th>
                        <th>STATUS</th>
                        <th>DATE</th>
                        <th>REVIEW</th>
                        
                        
                    </tr>
                </thead>
            </table>`

            document.querySelector('.render_body_content').innerHTML=content
            POfetch();
}


function POfetch(){
    $(document).ready(function () {

        fetch('/procurement/app/customroute/getPO',{
            method:'GET'
           
        })
        .then(result=>result.json())
        .then(res=>{

           let dataset="";
           if(res.status){
    
                let table = $('#fetchpendingpo').DataTable({
                    data:res.data,
                    destroy:true,
                    "columns":[
                
                        {data:"id"},
                        {data:"order_title"},
                        {data:"order_ref"},
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
           
                })
            }
            
 
            
        })
        .catch(err=>console.log(err))




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


        fetch('/procurement/app/customroute/getPO')
        .then(result=>result.json())
        .then(res=>{
           
           let dataset="";
           if(res.status){
    
                let table = $('#poclick').DataTable({
                    data:res.data,
                    destroy:true,
                    columns:[
                
                        {
                            
                            data:"",
                            render:function(){
                                return count = count+ 1;
                            }
                        
                        },
                        {data:"order_title"},
                        {data:"order_ref"},
                        {data:"supplier_name"},
                        {data:"level_1_approval"},
                        {data:"created_at"},
                        {
                            data:"",
                            render:function(data,type,row){
                                
                                return `<div style="cursor:pointer;text-decoration:underline" onclick="reviewPO(${row.order_id},${row.id})">Review</div>`
                              } 
                        }
                    
               ] 
    
                    
                })
            
           
                CloseButton();
               
           }
            
        })
        .catch(err=>console.log(err))
    

    });
    
    
}
function POApproved(){
    let content = `
                    <table id="poapproved" class="table table-striped table-bordered" style="width:100%">
                        <thead>
                            <tr>
                                <th>SN</th>
                                <th>ORDER TYPE</th>
                                <th>ORDER REF</th>
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
    let count = 0;
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
             
                 {
                    
                    data:"",
                    render:function(){
                        return count = count+ 1;
                    }
                
                },
                 {data:"order_title"},
                 {data:'order_ref'},
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