
function filterApproval(){
    let getActiveLink;
    let tab = document.querySelector('.tabDiv').children;
    for(let i=0;i<tab.length;i++){
        if(tab[i].classList.contains('tab-active')){
            getActiveLink = tab[i].innerHTML;
        }
    }
    
    console.log('activeLink',getActiveLink)

    switch(getActiveLink){
        case 'Approval Report':
            ApprovalReportReside();
            break;
        case 'All Requisition':
            quotationReside();
            break;
        case 'PO Report':
            POReportReside();
            break;
        case 'Shippment Report':
            ShippmentReportReside();
            break;
        case 'Requisition Report':
            RequisitionReportReside();
            break;
    }

   
         
}

function ApprovalReportReside(){
    document.querySelector('.modalClass').classList.add('modalClassCustom');
    let content =  ` 
                    <div class="customModal modalFilter">
                            <div class="modalTitle mb-4">
                                <div> 
                            
                                </div> 
                                <div class="closeModal">X</div>
                            </div>
                            

                            <div class="modalBody">
                            
                            <div class="row">
                                <div class="col-md-4">
                                    <select id="select_order" class="form-control">
                                        <option>Order Type</option>
                                    </select>
                                </div>
                                <div class="col-md-4">
                                    <select class="form-control" id="select_supplier">
                                        <option>All Suppliers</option>
                                    </select>
                                </div>
                                <div class="col-md-4">
                                    <select class="form-control" id="select_status">
                                        <option>Status</option>
                                        <option value="pending">Pending</option>
                                        <option value="approved">Approved</option>
                                        <option value="rejected">Rejected</option>
                                    </select>
                                </div>

                            </div>

                            <div class="row mt-4">
                                <div class="col-md-6">
                                    <input type="date" class="form-control" id="from_date" /> 
                                </div>
                                <div class="col-md-6">
                                    <input type="date" class="form-control" id="to_date" /> 
                                </div>
                            </div>

                            <div class="d-flex mt-4 justify-content-end">
                                <button class="btn btn-secondary" onClick="Search()">Search</button>
                                <button class="btn btn-outline" style="margin-left:10px" onClick="CloseButton()">Close</button>
                            </div>

                            </div>
                    </div>
        `

        document.querySelector('.modalClass').innerHTML=content
        close();
        callSelect2()

        
}



function quotationReside(){
    document.querySelector('.modalClass').classList.add('modalClassCustom');
    let content =  ` 
                    <div class="customModal modalFilter">
                            <div class="modalTitle mb-4">
                                <div style="font-weight:bold"> 
                                    Quotation Filter
                                </div> 
                                <div class="closeModal">X</div>
                            </div>
                            

                            <div class="modalBody">
                            
                            <div class="row mt-4">
                                <div class="col-md-3">
                                    <input type="date" class="form-control" id="from_date" /> 
                                </div>
                                <div class="col-md-3">
                                    <input type="date" class="form-control" id="to_date" /> 
                                </div>
                                <div class="col-md-3">
                                    <select class="form-control" id="select_received">
                                        <option value="">Sort By Received /Non-Received</option>
                                        <option value="1">Received</option>
                                        <option value="-1">Not Received</option>
                                        
                                    </select>
                                </div>

                                <div class="col-md-3">
                                    <select class="form-control" id="project_name">
                                        <option value="">Select Project</option>
                                        
                                    </select>
                                </div>
                            </div>

                            <div class="row mt-4">
                                <div class="col-md-4">
                                    <input type="text" class="form-control" id="quotation_number" placeholder="Quotation number" /> 
                                </div>
                                <div class="col-md-4">
                                    <input type="text" class="form-control" id="quotation_description" placeholder="Quotation description" /> 
                                </div>
                                <div class="col-md-4">
                                <input type="text" class="form-control" id="quotation_reference" placeholder="Quotation reference" /> 
                                </div>

                               
                            </div>

                            <div class="d-flex mt-4 justify-content-end">
                                <button class="btn btn-secondary" onClick="searchQuotation()">Search</button>
                                <button class="btn btn-outline" style="margin-left:10px" onClick="CloseButton()">Close</button>
                            </div>

                            </div>
                    </div>
        `

        document.querySelector('.modalClass').innerHTML=content
        close();
        callSelect2()

        
}

function POReportReside(){
    document.querySelector('.modalClass').classList.add('modalClassCustom');
    let content =  ` 
                    <div class="customModal modalFilter">
                            <div class="modalTitle mb-4">
                                <div> 
                            
                                </div> 
                                <div class="closeModal">X</div>
                            </div>
                            

                            <div class="modalBody">
                            
                            <div class="row">
                                <div class="col-md-4">
                                    <select id="select_order" class="form-control">
                                        <option>Order Type</option>
                                    </select>
                                </div>
                                <div class="col-md-4">
                                    <select class="form-control" id="select_supplier">
                                        <option>All Suppliers</option>
                                    </select>
                                </div>
                                <div class="col-md-4">
                                    <select class="form-control" id="select_status">
                                        <option>Status</option>
                                        <option value="pending">Pending</option>
                                        <option value="approved">Approved</option>
                                        
                                    </select>
                                </div>

                            </div>

                            <div class="row mt-4">
                                <div class="col-md-6">
                                    <input type="date" class="form-control" id="from_date" /> 
                                </div>
                                <div class="col-md-6">
                                    <input type="date" class="form-control" id="to_date" /> 
                                </div>
                            </div>

                            <div class="d-flex mt-4 justify-content-end">
                                <button class="btn btn-secondary" onClick="SearchPO()">Search</button>
                                <button class="btn btn-outline" style="margin-left:10px" onClick="CloseButton()">Close</button>
                            </div>

                            </div>
                    </div>
        `

        document.querySelector('.modalClass').innerHTML=content
        close();
        callSelect2()

        
}

function close(){
    document.querySelector('.closeModal').addEventListener('click',function(e){
        document.querySelector('.modalClass').classList.remove('modalClassCustom');
        document.querySelector('.modalClass').innerHTML=""
    })
}

function CloseButton(){
    
    document.querySelector('.modalClass').classList.remove('modalClassCustom');
    document.querySelector('.modalClass').innerHTML=""
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function fetchEdit(supplierid,orderid,id){

    
}

function callSelect2(){
    $('#select_order').select2();
    $('#select_supplier').select2();
    $('#select_status').select2();
    fetchRequired();
    var date = new Date();  
    var currentDate = date.toISOString().substring(0,10);
    
    document.getElementById('from_date').value = currentDate
    document.getElementById('to_date').value = currentDate
}

function fetchRequired(){
    let dataOrderref = [];
    let count = true;
    if(count){
        count=false
        fetch('/procurement/app/customroute/getAllProject')
    .then(res=>res.json())
    .then(data=>{
       
        if(data['status']){
            let dataset ="<option  value=''>Select Project</option>"
            document.getElementById('project_name').innerHTML=""
            data['data'].forEach((d,index)=>{
                dataset += 
                            `
                                <option value=${d.id}>${d.project_name}</option>
                            `
                           
               
            })
            document.getElementById('project_name').insertAdjacentHTML('beforeend',dataset);
           
        }
        
    })
    .catch(err=> {
        
        console.log(err)
       
    })

    }
    
    fetch('/procurement/app/customroute/getAllSupplier')
    .then(res=>res.json())
    .then(data=>{
        
        if(data['status']){
            let dataset ="<option>All Suppliers</option>"
            document.getElementById('select_supplier').innerHTML=""
            data['data'].forEach((d,index)=>{
                dataset += `
                            <option value=${d.id}>${d.supplername}</option>
                            `
                })
                document.getElementById('select_supplier').insertAdjacentHTML('beforeend',dataset);
        }
        
    })
    .catch(err=> {
        
        console.log(err)
       
    })

}

function Search(){
    let orderid = document.getElementById('select_order').value;
    let supplierid = document.getElementById('select_supplier').value;
    let status = document.getElementById('select_status').value;
    let from_date = document.getElementById('from_date').value;
    let to_date = document.getElementById('to_date').value;

    // console.log(orderid);
    // console.log(supplerid);
    // console.log(status);
    // console.log(from_date);
    // console.log(to_date);

    fetch('/procurement/app/customroute/filterApproval',{
        method:'POST',
        headers: { "Content-type": "application/x-www-form-urlencoded"},
        body:JSON.stringify({orderid,supplierid,status,from_date,to_date})
    })
    .then(result=>result.json())
    .then(res=>{
        let count = 0;
       console.log(res);
       let dataset="";
       if(res.status){

        let table = $('#approvedReport').DataTable({
            data:res.data,
            destroy:true,
            dom: 'Blfrtip',
            buttons: [
                 {
                    "extend":'excel', "text":'Export  to Excel',"className":'btn  btn-secondary mb-4'
                 },
                 {
                    "extend":'print', "text":'Print Report',"className":'btn  btn-success mb-4'
                 }
            ],
            columns:[
                {
                    data:"",
                    render:function(){
                        return count = count+ 1;
                    }
                },
                {data:"order_title"},
                {data:"supplier_name"},
                {data:"level_1_approval"},
                {data:"created_at"}
            ]
        })
        
       
            CloseButton();
           
       }
        
    })
    .catch(err=>console.log(err))


}

function SearchPO(){
    let orderid = document.getElementById('select_order').value;
    let supplierid = document.getElementById('select_supplier').value;
    let status = document.getElementById('select_status').value;
    let from_date = document.getElementById('from_date').value;
    let to_date = document.getElementById('to_date').value;

    // console.log(orderid);
    // console.log(supplerid);
    // console.log(status);
    // console.log(from_date);
    // console.log(to_date);

    fetch('/procurement/app/customroute/filterPO',{
        method:'POST',
        headers: { "Content-type": "application/x-www-form-urlencoded"},
        body:JSON.stringify({orderid,supplierid,status,from_date,to_date})
    })
    .then(result=>result.json())
    .then(res=>{
     
       let dataset="";
       if(res.status){

        let table = $('#POReport').DataTable({
            data:res.data,
            destroy:true,
            dom: 'Blfrtip',
            buttons: [
                 {
                    "extend":'excel', "text":'Export  to Excel',"className":'btn  btn-secondary mb-4'
                 },
                 {
                    "extend":'print', "text":'Print Report',"className":'btn  btn-success mb-4'
                 }
            ],
            columns:[
                {data:"id"},
                {data:"order_title"},
                {data:"supplier_name"},
                {data:"po_approval"},
                {
 
                    data:"",
                    render:function(data,type,row,){
                       
                        return numberWithCommas(row.quantity)
                    }
 
                },
                {
                    data:"",
                    render:function(data,type,row,){
                        return numberWithCommas(row.price)
                    }
                
                },
                {
                    data:"",
                    render:function(data,type,row,){
                        return numberWithCommas(row.total)
                    }
                
                },
                {data:"created_at"}
                
            ]
        })
        
       
            CloseButton();
           
       }
        
    })
    .catch(err=>console.log(err))


}


function searchQuotation(){
   
    let received = document.getElementById('select_received').value;
    let from_date = document.getElementById('from_date').value;
    let to_date = document.getElementById('to_date').value;

   

    fetch('/procurement/app/customroute/filterQuotation',{
        method:'POST',
        headers: { "Content-type": "application/x-www-form-urlencoded"},
        body:JSON.stringify({received,from_date,to_date})
    })
    .then(result=>result.json())
    .then(res=>{
     
       let dataset="";
       
       if(res.status){
        $table = $('#requisition').DataTable({
            data:res.data,
            processing:true,
            destroy:true,
            dom: 'Blfrtip',
            buttons: [
                    {
                    "extend":'excel', "text":'Export  to Excel',"className":'btn  btn-secondary mb-4 mt-4'
                    },
                    {
                    "extend":'print', "text":'Print Report',"className":'btn  btn-success mb-4 mt-4'
                    }
            ],
            columns:[
                 
                     {data:"id"},
                     {data:"ref_number"},
                     {data:"order_ref"},
                     {data:"file_ref"},
                     {data:"project_name"},
                     {data:"created_at"},
                     {data:"order_description"},
                     {data:"supplier_name"},
                     {
                        data:"",
                        render:function(data,type,row){
                           return `<a href="/procurement/quotation/${row.quotation_receipt}">quotation_receipt</a>`
                          } 
                        
                    },
                     {
                        data:"",
                        render:function(data,type,row){
                         
                            if(row.received == "1"){
                                return 'Received';
                            }
                            else if(row.received == "-1"){
                                return 'Not Received'
                            }
                            
                          } 
                        
                    },
                    
                    
                     {
                         data:"",
                         render:function(data,type,row){
                       
                             return `<div>
                                        <button  class="btn btn-danger" onclick="deleteItem('requisition',${row.supplier_id},${row.id})">Delete</button>
                                        <button  class="btn btn-secondary ml-2" onclick="requisitionModal(${row.supplier_id},${row.id})">Edit</button>
                                    </div>`
                           } 
                     }
                 
            ]   
    
             
    
         });

            CloseButton();
           
       }
        
    })
    .catch(err=>console.log(err))


}

function ShippmentReportReside(){

    document.querySelector('.modalClass').classList.add('modalClassCustom');
    let content =  ` 
                    <div class="customModal modalFilter">
                            <div class="modalTitle mb-4">
                                <div> 
                            
                                </div> 
                                <div class="closeModal">X</div>
                            </div>
                            

                            <div class="modalBody">
                            
                            <div class="row">
                                <div class="col-md-4">
                                    <select id="select_order" class="form-control">
                                        <option>Order Type</option>
                                    </select>
                                </div>
                                <div class="col-md-4">
                                    <select class="form-control" id="select_supplier">
                                        <option>All Suppliers</option>
                                    </select>
                                </div>
                                <div class="col-md-4">
                                    <select class="form-control" id="select_status">
                                        <option>Status</option>
                                        <option value="pending with supplier">Pending</option>
                                        <option value="dispatched">Dispatched</option>
                                        <option value="package received by agent">Package received by agent</option>
                                        <option value="shipped by agent">Shipped by agent</option>
                                        <option value="delivered">Delivered</option>
                                    </select>
                                </div>

                            </div>

                            <div class="row mt-4">
                                <div class="col-md-4">
                                    <select class="form-control" id="select_mode">
                                        <option>Mode of Shippment</option>
                                        <option value="Air">Air</option>
                                        <option value="Land">Land</option>
                                        <option value="Ship">Ship</option>
                                    </select>
                                </div>
                                <div class="col-md-4">
                                    <input type="date" class="form-control" id="from_date" /> 
                                </div>
                                <div class="col-md-4">
                                    <input type="date" class="form-control" id="to_date" /> 
                                </div>
                            </div>

                            <div class="d-flex mt-4 justify-content-end">
                                <button class="btn btn-secondary" onClick="SearchShippment()">Search</button>
                                <button class="btn btn-outline" style="margin-left:10px" onClick="CloseButton()">Close</button>
                            </div>

                            </div>
                    </div>
        `

        document.querySelector('.modalClass').innerHTML=content
        close();
        callSelect2_shippment()

        
}


function callSelect2_shippment(){
    $('#select_order').select2();
    $('#select_supplier').select2();
    $('#select_status').select2();
    $('#select_mode').select2()
    fetchRequired();
    var date = new Date();  
    var currentDate = date.toISOString().substring(0,10);
    
    document.getElementById('from_date').value = currentDate
    document.getElementById('to_date').value = currentDate
}

function SearchShippment(){
    
    let orderid = document.getElementById('select_order').value;
    let supplierid = document.getElementById('select_supplier').value;
    let status = document.getElementById('select_status').value;
    let from_date = document.getElementById('from_date').value;
    let to_date = document.getElementById('to_date').value;
    let mode = document.getElementById('select_mode').value

    // console.log(orderid);
    // console.log(supplerid);
    // console.log(status);
    console.log(from_date);
    console.log(to_date);

    fetch('/procurement/app/customroute/filterShippment',{
        method:'POST',
        headers: { "Content-type": "application/x-www-form-urlencoded"},
        body:JSON.stringify({orderid,supplierid,status,from_date,to_date,mode})
    })
    .then(result=>result.json())
    .then(res=>{
       
       if(res.status){

            let table = $('#ShippmentReport').DataTable({
                data:res.data,
                destroy:true,
                dom: 'Blfrtip',
                buttons: [
                     {
                        "extend":'excel', "text":'Export  to Excel',"className":'btn  btn-secondary mb-4'
                     },
                     {
                        "extend":'print', "text":'Print Report',"className":'btn  btn-success mb-4'
                     }
                ],

                columns:[
                    {data:"id"},
                    {data:"order_title"},
                    {data:"order_ref"},
                    {data:"supplier_name"},
                    {data:"mode_shippment"},
                    {data:"payment_mode"},
                    {data:"abroad_forwarder"},
                    {data:"cleared"},
                    {data:"status"},
                    {
                            
                        data:"",
                        render:function(data,type,row){
                            
                        let split = row.shippment_docs.split("_");
                        if(split){

                                let dataset="";
                                split.forEach((d)=>{
                                if(d != ""){
                                    dataset += `<div style="margin:6px"><a href="/procurement/shippment/${d}">${d}</a></div>`
                                }
                                
                                
                                })
                                

                                return dataset;
                        }
                        
                        
                        

                        }
                    },
                    {
                        
                        data:"",
                        render:function(data,type,row){
                            
                        let split = row.soncap.split("_");
                        if(split){
                                let dataset="";
                                split.forEach((d)=>{
                                if(d != ""){
                                    dataset += `<div style="margin:6px"><a href="/procurement/shippment/${d}">${d}</a></div>`
                                }
                                
                                
                                })
                                

                                return dataset;
                            }

                        }
                    
                    },
                    {
                        data:"",
                        render:function(data,type,row){
                            
                        let split = row.paar.split("_");
                        if(split){
                            let dataset="";
                            split.forEach((d)=>{
                                if(d != ""){
                                    dataset += `<div style="margin:6px"><a href="/procurement/shippment/${d}">${d}</a></div>`
                                }
                                
                                
                            })
                            return dataset;
                        }
                        
                        

                        }
                    },
                    {
                        data:'',
                        render:function(data,type,row){
                            if(row.status === "pending with the supplier"){

                                return 'null';
                            }

                           
                            else if(row.status === "dispatched"){
                                let split = row.dispatched_docs.split("_");
                                if(split){
                                    let dataset="";
                                    split.forEach((d)=>{
                                        if(d != ""){
                                            dataset += `<div style="margin:6px"><a href="/procurement/shippment/${d}">${d}</a></div>`
                                        }
                                        
                                        
                                    })
                                    return dataset;
                                }

                            }
                            else if(row.status === "package received by agent"){
                                let split = row.package_docs.split("_");
                                if(split){
                                    let dataset="";
                                    split.forEach((d)=>{
                                        if(d != ""){
                                            dataset += `<div style="margin:6px"><a href="/procurement/shippment/${d}">${d}</a></div>`
                                        }
                                        
                                        
                                    })
                                    return dataset;
                                }

                            }
                            else if(row.status === "shipped by agent"){
                                let split = row.shipped_docs.split("_");
                                if(split){
                                    let dataset="";
                                    split.forEach((d)=>{
                                        if(d != ""){
                                            dataset += `<div style="margin:6px"><a href="/procurement/shippment/${d}">${d}</a></div>`
                                        }
                                        
                                        
                                    })
                                    return dataset;
                                }

                            }
                            else if(row.status === "delivered"){
                                let split = row.delivery_docs.split("_");
                                if(split){
                                    let dataset="";
                                    split.forEach((d)=>{
                                        if(d != ""){
                                            dataset += `<div style="margin:6px"><a href="/procurement/shippment/${d}">${d}</a></div>`
                                        }
                                        
                                        
                                    })
                                    return dataset;
                                }

                            }

                            
                        }

                    },
                    
                    {data:"created_at"}
                    
                ]
            })
        
       
            CloseButton();
           
       }
        
    })
    .catch(err=>console.log(err))


}




function RequisitionReportReside(){
    document.querySelector('.modalClass').classList.add('modalClassCustom');
    let content =  ` 
                    <div class="customModal modalFilter">
                            <div class="modalTitle mb-4">
                                <div> 
                            
                                </div> 
                                <div class="closeModal">X</div>
                            </div>
                            

                            <div class="modalBody">
                            
                            <div class="row">
                                <div class="col-md-4">
                                    <select id="select_order" class="form-control">
                                        <option>Order Type</option>
                                    </select>
                                </div>
                                <div class="col-md-4">
                                    <select class="form-control" id="select_supplier">
                                        <option>All Suppliers</option>
                                    </select>
                                </div>
                                <div class="col-md-4">
                                    <input type="text" class="form-control" id="ref_number" placeholder="Reference No" />
                                </div>

                            </div>

                            <div class="row mt-4">
                                <div class="col-md-4">
                                    <input type="text" class="form-control"  id="description" placeholder="Description" />
                                </div>
                                <div class="col-md-4">
                                    <input type="text" class="form-control" id="project_name" placeholder="Project name" />
                                </div>
                                <div class="col-md-4">
                                    <input type="text" class="form-control" id="serial_number" placeholder="Serial Number" /> 
                                </div>
                                
                            </div>

                            <div class="row mt-4">
                                <div class="col-md-6">
                                    <input type="date" class="form-control" id="from_date" /> 
                                </div>
                                <div class="col-md-6">
                                    <input type="date" class="form-control" id="to_date" /> 
                                </div>
                                
                                
                            </div>

                            

                            <div class="d-flex mt-4 justify-content-end">
                                <button class="btn btn-secondary" onClick="SearchRequisition()">Search</button>
                                <button class="btn btn-outline" style="margin-left:10px" onClick="CloseButton()">Close</button>
                            </div>

                            </div>
                    </div>
                `

        document.querySelector('.modalClass').innerHTML=content
        close();
        callSelect3_shippment()

        
}


function callSelect3_shippment(){
    $('#select_order').select2();
    $('#select_supplier').select2();
    $('#select_status').select2();
    $('#select_mode').select2()
    fetchRequired();
    var date = new Date();  
    var currentDate = date.toISOString().substring(0,10);
    
    document.getElementById('from_date').value = currentDate
    document.getElementById('to_date').value = currentDate
}

function SearchRequisition(){
    
    
    let orderid = document.getElementById('select_order').value;
    let supplierid = document.getElementById('select_supplier').value;
   
    let from_date = document.getElementById('from_date').value;
    let to_date = document.getElementById('to_date').value;
    // let deliveryaddress = document.getElementById('delivery_address').value;
    let description = document.getElementById('description').value;
    let serial_number = document.getElementById('serial_number').value;
    let project_name = document.getElementById('project_name').value;
    let ref_no = document.getElementById('ref_number').value;
    // console.log(orderid);
    // console.log(supplerid);
    // console.log(status);
    // console.log(from_date);
    // console.log(to_date);

    fetch('/procurement/app/customroute/filterRequisition',{
        method:'POST',
        headers: { "Content-type": "application/x-www-form-urlencoded"},
        body:JSON.stringify({orderid,supplierid,project_name,description,serial_number,ref_no,from_date,to_date})
    })
    .then(result=>result.json())
    .then(res=>{
        console.log(res)
       let dataset="";
       if(res.status){

            let table = $('#RequisitionReport').DataTable({
                data:res.data,
                destroy:true,
                dom: 'Blfrtip',
                buttons: [
                     {
                        "extend":'excel', "text":'Export  to Excel',"className":'btn  btn-secondary mb-4'
                     },
                     {
                        "extend":'print', "text":'Print Report',"className":'btn  btn-success mb-4'
                     }
                ],
                columns:[
                    {data:"id"},
                    {data:"order_title"},
                    {data:"supplier_name"},
                    {data:"description"},
                    {data:"quantity"},
                    {data:"price"},
                    {data:"discount"},
                    {data:"total"},
                    { 
                        data:"",
                        
                        render:function(data,type,row){
                            return `<div>Quotation</div>`
                        } 
                           
                        
                    },
    
                    {data:"project_name"},
                    {data:"currency"},
                    {data:"dateofcreation"},
                    {data:"dateofsending"},
                    
                ]
            })
        
       
            CloseButton();
           
       }
        
    })
    .catch(err=>console.log(err))


}

