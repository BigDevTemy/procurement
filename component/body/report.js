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


function Allreportfetch(){
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


