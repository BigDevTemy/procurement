function Report(search){
    let content = ` 
            <div class="supplierDiv">
                <div class="tabDiv">
                    
                    <div>All Report</div>
                </div>

                <div class="render_body_content approval">
                       ${AllreportHTML()}
                </div>
            

            </div>

             `
    return content;
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
                           let dataset="";
                           split.forEach((d)=>{
                            if(d != ""){
                                dataset += `<div style="margin:6px"><a href="/procurement/shippment/${d}">${d}</a></div>`
                            }
                            
                            
                           })
                           

                           return dataset;
                           
                           

                        }
                    },
                    {
                        
                        data:"",
                        render:function(data,type,row){
                            
                           let split = row.soncap.split("_");
                           let dataset="";
                           split.forEach((d)=>{
                            if(d != ""){
                                dataset += `<div style="margin:6px"><a href="/procurement/shippment/${d}">${d}</a></div>`
                            }
                            
                            
                           })
                           

                           return dataset;
                           
                           

                        }
                    
                    },
                    {
                        data:"",
                        render:function(data,type,row){
                            
                           let split = row.paar.split("_");
                           let dataset="";
                           split.forEach((d)=>{
                            if(d != ""){
                                dataset += `<div style="margin:6px"><a href="/procurement/shippment/${d}">${d}</a></div>`
                            }
                            
                            
                           })
                           

                           return dataset;
                           
                           

                        }
                    },
                    {data:"status"},
                    {
                        data:"",
                        render:function(data,type,row){
                            
                           let split = row.dispatched_docs.split("_");
                           let dataset="";
                           split.forEach((d)=>{
                            if(d != ""){
                                dataset += `<div style="margin:6px"><a href="/procurement/shippment/${d}">${d}</a></div>`
                            }
                            
                            
                           })
                           

                           return dataset;
                           
                           

                          } 
                    },
                    {
                        
                        data:"",
                        render:function(data,type,row){
                            
                           let split = row.package_docs.split("_");
                           let dataset="";
                           split.forEach((d)=>{
                            if(d != ""){
                                dataset += `<div style="margin:6px"><a href="/procurement/shippment/${d}">${d}</a></div>`
                            }
                            
                            
                           })
                           

                           return dataset;
                           
                           

                          } 
                    },
                    {
                        
                        data:"",
                        render:function(data,type,row){
                            
                           let split = row.shipped_docs.split("_");
                           let dataset="";
                           split.forEach((d)=>{
                            if(d != ""){
                                dataset += `<div style="margin:6px"><a href="/procurement/shippment/${d}">${d}</a></div>`
                            }
                            
                            
                           })
                           

                           return dataset;
                           
                           

                          }
                    },
                    {
                        data:"delivery_docs",
                        
                        render:function(data,type,row){
                            
                           let split = row.delivery_docs.split("_");
                           let dataset="";
                           split.forEach((d)=>{
                            if(d != ""){
                                dataset += `<div style="margin:6px"><a href="/procurement/shippment/${d}">${d}</a></div>`
                            }
                            
                            
                           })
                           

                           return dataset;
                           
                           

                          }
                
                    },
                    {data:"created_at"}
                 
                
           ]   

        });


    });
    
    
}


