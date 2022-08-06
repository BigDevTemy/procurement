

function Shippment(search){
    let content = ` 
                <div class="supplierDiv">

                    <div class="tabDiv">
                        <div class="tab-active">Awaiting Shippment</div>
                        <div class="">Processing</div>
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



