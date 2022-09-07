function Report(search){
    let content = ` 
            <div class="supplierDiv">
                <div class="modalClass"></div>
                <div class="tabDiv">
                    <div class="tab-active">Approval Report</div>
                    <div>PO Report</div>
                    <div>Shippment Report</div>
                    <div>Requisition Report</div>
                </div>
                <div>
                    <button class="btn btn-secondary btn-md mt-4" onClick="filterApproval()" style="width:10%">Filter</button>
                </div>
                
                <div class="render_body_content approval mt-4">
                    ${ApprovedReport()}  
                </div>
            

            </div>

             `
    return content;
}
function ApprovedReport(){
    
    ApprovedFetch();
    
    return ` 
            <table id="approvedReport" class="table table-striped table-bordered " style="width:100%">
                <thead>
                    <tr class="shippmentTR">
                        <th>SN</th>
                        <th>Order Type</th>
                        <th>Order Ref</th>
                        <th>Supplier Assigned</th>
                        <th>Status</th>
                        <th>Date</th>
                        
                    </tr>
                </thead>
                <tbody id="reportApprovaltbody">

                </tbody>
            </table>
            `

            
}

function ApprovedReportClick(){
    
    ApprovedFetch();
    
    let content =  ` 
            <table id="approvedReport" class="table table-striped table-bordered " style="width:100%">
                <thead>
                    <tr class="shippmentTR">
                        <th>SN</th>
                        <th>Order Type</th>
                        <th>Order Ref</th>
                        <th>Supplier Assigned</th>
                        <th>Status</th>
                        <th>Date</th>
                        
                    </tr>
                </thead>
                <tbody id="reportApprovaltbody">

                </tbody>
            </table>
            `
    
        document.querySelector('.render_body_content').innerHTML = content

            
}




function ApprovedFetch(){
    var date = new Date(); 
    var currentDate = date.toISOString().substring(0,10);

    fetch('/procurement/app/customroute/filterApproval',{
        method:'POST',
        headers: { "Content-type": "application/x-www-form-urlencoded"},
        body:JSON.stringify({to_date:currentDate,from_date:currentDate,orderid:'',supplierid:'',status:''})
    })
    .then(result=>result.json())
    .then(res=>{
       
       let dataset="";
       if(res.status){
        
        let count = 0;
        let table = $('#approvedReport').DataTable({
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
                {data:"created_at"}
                
            ]
        })
        
       
            CloseButton();
           
       }
        
    })
    .catch(err=>console.log(err))

       
}


function POReportClick(){
    
    POFetch();
    
    let content =  ` 
            <table id="POReport" class="table table-striped table-bordered " style="width:100%">
                <thead>
                    <tr class="shippmentTR">
                        <th>SN</th>
                        <th>Order Type</th>
                        <th>Order Ref</th>
                        <th>Supplier Assigned</th>
                        <th>PO Approval Status</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Total</th>
                        <th>Date</th>
                        
                    </tr>
                </thead>
                <tbody id="reportApprovaltbody">

                </tbody>
            </table>
            `
    
        document.querySelector('.render_body_content').innerHTML = content

            
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function POFetch(){
    let count=0
    var date = new Date(); 
    var currentDate = date.toISOString().substring(0,10);

    fetch('/procurement/app/customroute/filterPO',{
        method:'POST',
        headers: { "Content-type": "application/x-www-form-urlencoded"},
        body:JSON.stringify({to_date:currentDate,from_date:currentDate,orderid:'',supplierid:'',status:''})
    })
    .then(result=>result.json())
    .then(res=>{
    //    console.log(res);
       let dataset="";
       if(res.status){

        let table = $('#POReport').DataTable({
            data:res.data,
            destroy:true,

            columns:[
                {
                    render:function(){
                        return count = count + 1;
                    }
                },
                {data:"order_title"},
                {data:"order_ref"},
                {data:"supplier_name"},
                {data:"po_approval"},
                {
 
                    data:"",
                    render:function(data,type,row,){
                        console.log("trtyrtyr",row.quantity)
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


function ShippmentReportClick(){
    
    ShippmentFetch();
    
    let content =  ` 
            <table id="ShippmentReport" class="table table-striped table-bordered " style="width:100%">
                <thead>
                    <tr class="shippmentTR">
                        <th>SN</th>
                        <th>Order Type</th>
                        <th>Order Ref</th>
                        <th>Supplier Name</th>
                        <th>Mode of Shippment</th>
                        <th>Payment Mode</th>
                        <th>Abroad Forwarder</th>
                        <th>Clearing Amount</th>
                        <th>Status</th>
                        <th>Shippment Docs</th>
                        <th>Soncap Docs</th>
                        <th>Paar Docs</th>
                        <th>Additional Docs</th>
                        <th>Created_at</th>
                        
                    </tr>
                </thead>
                <tbody id="reportApprovaltbody">

                </tbody>
            </table>
            `
    
        document.querySelector('.render_body_content').innerHTML = content

            
}


function ShippmentFetch(){
    var date = new Date(); 
    var currentDate = date.toISOString().substring(0,10);

    fetch('/procurement/app/customroute/filterShippment',{
        method:'POST',
        headers: { "Content-type": "application/x-www-form-urlencoded"},
        body:JSON.stringify({to_date:currentDate,from_date:currentDate,orderid:'',supplierid:'',status:'',mode:''})
    })
    .then(result=>result.json())
    .then(res=>{
    //    console.log(res);
       let dataset="";
       if(res.status){

        let table = $('#ShippmentReport').DataTable({
            data:res.data,
            destroy:true,

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
                            else if(row.status === "package"){
                                let split = row.package_docs.split("_");
                                let dataset="";
                                split.forEach((d)=>{
                                    if(d != ""){
                                        dataset += `<div style="margin:6px"><a href="/procurement/shippment/${d}">${d}</a></div>`
                                    }
                                    
                                    
                                })
                                
                                return dataset;
                            }
                            else if(row.status === "dispatched"){
                                let split = row.dispatched_docs.split("_");
                                let dataset="";
                                split.forEach((d)=>{
                                    if(d != ""){
                                        dataset += `<div style="margin:6px"><a href="/procurement/shippment/${d}">${d}</a></div>`
                                    }
                                    
                                    
                                })
                                
                                return dataset;
                            }
                            else if(row.status === "delivery_docs"){
                                let split = row.delivery_docs.split("_");
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
                
                {data:"created_at"}
                
            ]
        })
        
       
            CloseButton();
           
       }
        
    })
    .catch(err=>console.log(err))

       
}


function RequisitionReportClick(){
    
    // ShippmentFetch();
    RequisitionFetch();
    
    let content =  ` 
            <table id="RequisitionReport" class="table table-striped table-bordered " style="width:100%">
                <thead>
                    <tr class="shippmentTR">
                        <th>SN</th>
                        <th>Order Type</th>
                        <th>Order Ref</th>
                        <th>Supplier Name</th>
                        <th>Description</th>
                        <th>Quality</th>
                        <th>Price</th>
                        <th>Discount</th>
                        <th>Total</th>
                        <th>Quotation Receipt</th>
                        <th>Project name</th>
                        <th>Currency</th>
                        <th>Date of Sending</th>
                        <th>Date of creation</th>
                        
                    </tr>
                </thead>
                <tbody id="reportApprovaltbody">

                </tbody>
            </table>
            `
    
        document.querySelector('.render_body_content').innerHTML = content

            
}


function RequisitionFetch(){
    var date = new Date(); 
    var currentDate = date.toISOString().substring(0,10);
console.log(currentDate)
    fetch('/procurement/app/customroute/filterRequisition',{
        method:'POST',
        headers: { "Content-type": "application/x-www-form-urlencoded"},
        body:JSON.stringify({to_date:currentDate,from_date:currentDate,orderid:'',supplierid:'',status:'',project_name:'',description:'',ref_no:'',serial_number:''})
    })
    .then(result=>result.json())
    .then(res=>{
    //    console.log(res);
       let dataset="";
       if(res.status){
        

        let table = $('#RequisitionReport').DataTable({
            data:res.data,
            destroy:true,

            columns:[
                {data:"id"},
                {data:"order_title"},
                {data:"order_ref"},
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





function AllreportHTML(){

    Allreportfetch();
    return `
            
    
            <table id="example" class="table table-striped table-bordered" style="width:100%">
                <thead>
                    <tr>
                        <th>sn</th>
                        <th>Order Type</th>
                        <th>Supplier Name</th>
                        <th>Contact</th>
                        <th>Mode Of Shippment</th>
                        <th>Payment Mode</th>
                        <th>Abroad Forwarder</th>
                        <th>Address Abroad Forwarder</th>
                        <th>Cleared Amount</th>
                        <th>Agent Name</th>
                        <th>Date Agent</th>
                        <th>Shipping Docs</th>
                        <th>Soncap</th>
                        <th>Paar</th>
                        <th>Status</th>
                        <th>Dispatched_docs</th>
                        <th>Package_Docs</th>
                        <th>Shipped_Docw</th>
                        <th>Delivery_docs</th>
                        <th>Created_at</th>
                        
                        
                    </tr>
                </thead>
            </table>`
}



function Allreportfetch(){
    $(document).ready(function () {

       let table = $('#example').DataTable({
        
           "processing":true,
            "destroy":true,
           "serverSide":true,
           "bFilter": true,
           dom: "Bfrtip",
           "ajax":{
                url:'/procurement/app/customroute/reportShippment',
                type:"GET",
                
               
           },
           "columns":[
                
                    {data:"id"},
                    {data:"order_title"},
                    {data:"supplier_name"},
                    {data:"contact"},
                    {data:"mode_shippment"},
                    {data:"payment_mode"},
                    {data:"abroad_forwarder"},
                    {data:"address_abroad_forwarder"},
                    {data:"cleared"},
                    {data:"agent_name_ngn"},
                    {data:"date_agent_ngn"},
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
                    {data:"status"},
                    {
                        data:"",
                        render:function(data,type,row){
                            if(row.dispatched_docs){

                                let split = row.dispatched_docs.split("_");
                                let dataset="";
                                split.forEach((d)=>{
                                    if(d != ""){
                                        dataset += `<div style="margin:6px"><a href="/procurement/shippment/${d}">${d}</a></div>`
                                    }
                                    
                                    
                                })
                                
                                return dataset;
                            }
                            else{
                               return  `<div style="margin:6px">NULL</div>`
                            }
                           
                          } 
                    },
                    {
                        
                        data:"",
                        render:function(data,type,row){
                            if(row.package_docs){
                                let split = row.package_docs.split("_");
                                let dataset="";
                                split.forEach((d)=>{
                                if(d != ""){
                                    dataset += `<div style="margin:6px"><a href="/procurement/shippment/${d}">${d}</a></div>`
                                }
                                
                                
                                })
                                
    
                                return dataset;
                                
                            }
                            else{
                                return  `<div style="margin:6px">NULL</div>`
                            }
                          
                           
                           
                           

                          } 
                    },
                    {
                        
                        data:"",
                        render:function(data,type,row){
                            

                            if(row.shipped_docs){
                                let split = row.shipped_docs.split("_");
                           
                           
                                let dataset="";
                                split.forEach((d)=>{
                                if(d != ""){
                                    dataset += `<div style="margin:6px"><a href="/procurement/shippment/${d}">${d}</a></div>`
                                }
                                
                                
                                })
                                
    
                                return dataset;
                            }
                            else{
                                return  `<div style="margin:6px">NULL</div>`
                            }
                           

                          }
                    },
                    {
                        data:"delivery_docs",
                        
                        render:function(data,type,row){
                            
                           if(row.delivery_docs){
                                let split = row.delivery_docs.split("_");
                           
                           
                                let dataset="";
                                split.forEach((d)=>{
                                if(d != ""){
                                    dataset += `<div style="margin:6px"><a href="/procurement/shippment/${d}">${d}</a></div>`
                                }
                                
                                
                                })
                                
    
                                return dataset;
                           }
                           else{
                            return  `<div style="margin:6px">NULL</div>`
                           }
                           
                          }
                
                    },
                    {data:"created_at"}
                 
                
           ]   

        });


    });
    
    
}



function modalFilter(){

    alert('We are ready')
}


