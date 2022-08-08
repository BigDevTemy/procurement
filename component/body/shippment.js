

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
                            
                            return `<div style="cursor:pointer;text-decoration:underline" onclick="reviewShippment(${row.id})"><button class="btn btn-warning btn-sm">Review</button></div>`
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
                            
                            return `<div style="cursor:pointer;text-decoration:underline" onclick="reviewShippment(${row.id})"><button class="btn btn-warning btn-sm">Review</button></div>`
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

function reviewShippment(id){
    // window.location="/procurement/dashboard/app#Shippment/review/id"
    _push(`/procurement/dashboard/app#Shippment/review/${id}`)

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

function Shippmentreview(id){
    return `
                <div class="shippmentDiv">
                    <div><< Back</div>
                   
                    <div class="bordeCurve">
                        <div class="divSegment-4">
                            <div class="form-group">
                                <input type="text" id="shippment_ref" placeholder="Shippment Ref Number" class="form-control"/>
                            </div>
                            <div class="form-group">
                                <input type="date" id="dateofshippment" placeholder="Date of Quotation" class="form-control"/>
                            </div>
                            <div class="form-group">
                                <input type="text" id="order_item" placeholder="Order Ref Number" class="form-control"/>
                            </div>
                            <div class="form-group">
                                <input type="text" id="order_item"  placeholder="Project Name" class="form-control"/>
                            </div>
                        </div>

                        <div class="divSegment-4">
                            <div class="form-group">
                                <input type="text" id="shippment_ref" placeholder="Supplier Name" class="form-control"/>
                            </div>
                            <div class="form-group">
                                <input type="text" id="dateofshippment" placeholder="Supplier Quotation Ref" class="form-control"/>
                            </div>
                            <div class="form-group">
                                <input type="text"  placeholder="Description of Item" id="order_item" class="form-control"/>
                            </div>
                            <div class="form-group">
                                <input type="text" id="order_item" placeholder="Part Number" class="form-control"/>
                            </div>

                        </div>


                        
                        <div class="divSegment-4">
                            <div class="form-group">
                                <input type="text" id="shippment_ref" placeholder="Quantity" class="form-control"/>
                            </div>
                            <div class="form-group">
                                <input type="text" id="dateofshippment" placeholder="Note" class="form-control"/>
                            </div>
                            <div class="form-group">
                                <input type="text" id="order_item" class="form-control" placeholder="Payment Mode"/>
                            </div>
                            <div class="form-group">
                                <input type="text" id="order_item" class="form-control" placeholder="Date of Delivery"/>
                            </div>

                        </div>
                        
                        <div class="divSegment-4">
                            <div class="form-group">
                                <input type="text" id="shippment_ref" placeholder="Delivery address" class="form-control"/>
                            </div>
                        
                            <div class="form-group">
                                <input type="text" id="order_item" class="form-control"  placeholder="Mode of Shippment" />
                            </div>
                            <div class="form-group">
                                <input type="text" id="order_item" class="form-control"  placeholder="Received By Forwarder(Abroad)" />
                            </div>

                        </div>
                    </div>

                   
                    <h4>Shipmment Document Sent</h4>
                    <div class="divSegment-4 borderCurve">
                        <div class="form-group">
                            <input type="text" id="shippment_ref" placeholder="Name" class="form-control"/>
                        </div>
                       
                        <div class="form-group">
                            <input type="text" id="order_item" class="form-control"  placeholder="Address" />
                        </div>

                    </div>
                    <h4> Upload Attaching Document</h4>
                </div>
                `

             
}



