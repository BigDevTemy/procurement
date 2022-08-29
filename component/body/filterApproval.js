
function filterApproval(){
    let getActiveLink;
    let tab = document.querySelector('.tabDiv').children;
    for(let i=0;i<tab.length;i++){
        if(tab[i].classList.contains('tab-active')){
            getActiveLink = tab[i].innerHTML;
        }
    }
    

    switch(getActiveLink){
        case 'Approval Report':
            ApprovalReportReside();
            break;
        case 'PO Report':
            POReportReside();
            break;
        case 'Shippment Report':
            ShippmentReportReside();
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
        fetch('/procurement/app/customroute/getAllorder')
    .then(res=>res.json())
    .then(data=>{
       
        if(data['status']){
            let dataset ="<option>All Orders</option>"
            document.getElementById('select_order').innerHTML=""
            data['data'].forEach((d,index)=>{
                dataset += 
                            `
                                <option value=${d.id}>${d.ordertype}</option>
                            `
                            let item ={
                                id:d.id,
                                value:d.order_ref
                            }
                dataOrderref.push(item);
            })
            document.getElementById('select_order').insertAdjacentHTML('beforeend',dataset);
           
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
       console.log(res);
       let dataset="";
       if(res.status){

        let table = $('#approvedReport').DataTable({
            data:res.data,
            destroy:true,

            columns:[
                {data:"id"},
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
                                        <option value="pending">Pending</option>
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
    // console.log(from_date);
    // console.log(to_date);

    fetch('/procurement/app/customroute/filterShippment',{
        method:'POST',
        headers: { "Content-type": "application/x-www-form-urlencoded"},
        body:JSON.stringify({orderid,supplierid,status,from_date,to_date})
    })
    .then(result=>result.json())
    .then(res=>{
        console.log(res)
       let dataset="";
       if(res.status){

            let table = $('#ShippmentReport').DataTable({
                data:res.data,
                destroy:true,

                columns:[
                    {data:"id"},
                    {data:"order_title"},
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
                            console.log('xxxwwewew',row.status)
                            if(row.status === "dispatched"){
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


