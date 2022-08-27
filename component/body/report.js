function Report(search){
    let content = ` 
            <div class="supplierDiv">
                <div class="modalClass"></div>
                <div class="tabDiv">
                    <div class="tab-active">Approval Report</div>
                    <div>PO Report</div>
                    <div>Shippment Report</div>
                </div>

                <div class="render_body_content approval mt-4">
                        <button class="btn btn-secondary btn-md mb-4" onClick="filterApproval()" style="width:10%">Filter</button>
                        <div class="reportDiv">
                            ${ApprovedReport()}
                        </div>
                       
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
                    <tr>
                        <th>SN</th>
                        <th>Order Type</th>
                        <th>Supplier Assigned</th>
                        <th>Status</th>
                        <th>Date</th>
                        <th>Action</th>
                    </tr>
                </thead>
            </table>
            `

            
}




function ApprovedFetch(){
    var date = new Date(); 
    var currentDate = date.toISOString().substring(0,10);
    
    $(document).ready(function () {

       let table = $('#approvedReport').DataTable({
        
           "processing":true,
        "destroy":true,
           "serverSide":true,
           "bFilter": true,
           dom: "Bfrtip",
           "ajax":{
                url:'/procurement/app/customroute/filterApproval',
                type:"POST",  
                data:JSON.stringify({
                    "to_date":currentDate,
                    "from_date":currentDate
                })   
           },
           "columns":[
                
                    {data:"id"},
                    {data:"order_title"},
                    {data:"supplier_name"},
                    {data:"level_1_approval"},
                    {data:"created_at"},
                    {
                        data:'',
                        render:function(data,type,row){
                            
                            return `<div style="text-color:#000080;font-weight:bold;text-decoration:underline;cursor:pointer" >Print</div>`
                          } 
                    }
                   
                
           ]   

        });


    });
    
    
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


