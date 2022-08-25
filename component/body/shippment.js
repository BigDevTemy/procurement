
const counter = true;
function Shippment(search){
    let content = ` 
                <div class="supplierDiv">

                    <div class="tabDiv">
                        <div class="tab-active">Pending with the supplier</div>
                        <div class="">Dispatched</div>
                        <div class="">Package Received by Agent</div>
                        <div class="">Shipped By Agent</div>
                        <div class="">Delivered</div>
                    </div>
                    <div class="POmodal">
                        <div class="POcontentmodal"></div>
                    </div>

                    <div class="render_body_content approval">
                       ${ShippmentHTML()}
                    </div>
                

                </div>

             `
    return content;
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
                    {data:"shippment_status"},
                    {data:"created_at"},
                    {
                        data:"",
                        render:function(data,type,row){
                            
                            return `<div style="cursor:pointer;text-decoration:underline" onclick="reviewShippment(${row.id})"><button class="btn btn-warning btn-sm">Review</button></div>`
                          } 
                    }
                
           ]   

        });


    });
    
    
}

function ShippmentHTML(){

    if(counter){
        Shippmentfetch();
        count=false
    }
    
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



function AwaitingShippment(){
    
    if(counter){
        Shippmentfetch();
        counter=false
    }
    let content = `
            <table id="exampleAwaiting" class="table table-striped table-bordered" style="width:100%">
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
                    {data:"shippment_status"},
                    {data:"created_at"},
                    {
                        data:"",
                        render:function(data,type,row){
                            console.log(row)
                            return `<div style="cursor:pointer;text-decoration:underline" onclick="reviewShippment(${row.id})"><button class="btn btn-warning btn-sm">Review</button></div>`
                          } 
                    }
                
           ]   

        });


    });
    
    
}




function Dispatched(){

    
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
            ShippmentfetchDispached();

            
}


function ShippmentfetchDispached(){
    $(document).ready(function () {

       let table = $('#example').DataTable({
        
           "processing":true,
            "destroy":true,
           "serverSide":true,
           "bFilter": true,
           "dom": "Bfrtip",
           "ajax":{
                url:'/procurement/app/customroute/getShippmentDispatched',
                type:"GET",
                
               
           },
           "columns":[
                
                    {data:"id"},
                    {data:"order_title"},
                    {data:"supplier_name"},
                    {data:"level_1_approval"},
                    {data:"po_approval"},
                    {data:"shippment_status"},
                    {data:"created_at"},
                    {
                        data:"",
                        render:function(data,type,row){
                            
                            return `<div style="cursor:pointer;text-decoration:underline" onclick="reviewShippment(${row.id})"><button class="btn btn-warning btn-sm">Review</button></div>`
                          } 
                    }
                
           ]   

        });


    });
    
    
}



function Package(){

    
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
            ShippmentfetchPackage();

            
}


function ShippmentfetchPackage(){
    $(document).ready(function () {

       let table = $('#example').DataTable({
        
           "processing":true,
            "destroy":true,
           "serverSide":true,
           "bFilter": true,
           "dom": "Bfrtip",
           "ajax":{
                url:'/procurement/app/customroute/getShippmentPackage',
                type:"GET",
                
               
           },
           "columns":[
                
                    {data:"id"},
                    {data:"order_title"},
                    {data:"supplier_name"},
                    {data:"level_1_approval"},
                    {data:"po_approval"},
                    {data:"shippment_status"},
                    {data:"created_at"},
                    {
                        data:"",
                        render:function(data,type,row){
                            
                            return `<div style="cursor:pointer;text-decoration:underline" onclick="reviewShippment(${row.id})"><button class="btn btn-warning btn-sm">Review</button></div>`
                          } 
                    }
                
           ]   

        });


    });
    
    
}

function Shipped(){

    
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
            ShippmentfetchShipped();

            
}


function ShippmentfetchShipped(){
    $(document).ready(function () {

       let table = $('#example').DataTable({
        
           "processing":true,
            "destroy":true,
           "serverSide":true,
           "bFilter": true,
           "dom": "Bfrtip",
           "ajax":{
                url:'/procurement/app/customroute/getShippmentShipped',
                type:"GET",
                
               
           },
           "columns":[
                
                    {data:"id"},
                    {data:"order_title"},
                    {data:"supplier_name"},
                    {data:"level_1_approval"},
                    {data:"po_approval"},
                    {data:"shippment_status"},
                    {data:"created_at"},
                    {
                        data:"",
                        render:function(data,type,row){
                            
                            return `<div style="cursor:pointer;text-decoration:underline" onclick="reviewShippment(${row.id})"><button class="btn btn-warning btn-sm">Review</button></div>`
                          } 
                    }
                
           ]   

        });


    });
    
    
}


function Delivered(){

    
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
            ShippmentfetchDelivered();

            
}


function ShippmentfetchDelivered(){
    $(document).ready(function () {

       let table = $('#example').DataTable({
        
           "processing":true,
            "destroy":true,
           "serverSide":true,
           "bFilter": true,
           "dom": "Bfrtip",
           "ajax":{
                url:'/procurement/app/customroute/getShippmentDelivery',
                type:"GET",
                
               
           },
           "columns":[
                
                    {data:"id"},
                    {data:"order_title"},
                    {data:"supplier_name"},
                    {data:"level_1_approval"},
                    {data:"po_approval"},
                    {data:"shippment_status"},
                    {data:"created_at"},
                    {
                        data:"",
                        render:function(data,type,row){
                            
                            return `<div style="cursor:pointer;text-decoration:underline" onclick="reviewShippment(${row.id})"><button class="btn btn-warning btn-sm" disabled>Review</button></div>`
                          } 
                    }
                
           ]   

        });


    });
    
    
}








function reviewShippment(id){
    // window.location="/procurement/dashboard/app#Shippment/review/id"
    _push(`/procurement/dashboard/app#Shippment/review/${id}`)

}



function Shippmentreview(id){
    return `
                <div class="shippmentDiv">
                    <div><< Back</div>
                   
                    <div class="row mt-4">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label>Date</label>
                                    <input type="hidden" id="approve_id" value=${id} />
                                    <input type="date" class="form-control" id="dateofupdate"/>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label>Review Status</label>
                                    <select class="form-control select" id="status_review">
                                        <option value="">Click to Select</option>
                                        <option value="dispatched">Dispatched</option>
                                        <option value="package received by agent">Package received by agent</option>
                                        <option value="shipped by agent">Shipped by agent</option>
                                        <option value="delivered">Delivered</option>

                                    </select>
                                </div>
                            </div>
                    </div>
                    <div class="row mt-4" id="supporting_docs">

                    </div>
                    <div class="row mt-4">
                        <div class="col-md-4">
                            <button class="btn btn-md btn-primary shippmentUpdate">Upload Docs</button>
                        </div>
                    </div>

                    
                </div>
                `

             
}



