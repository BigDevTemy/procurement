function Approval(search){
    let content = ` 
                    <div class="supplierDiv">
                        <div class="tabDiv">
                            <div class="tab-active">Pending Approval</div>
                            <div>Treated Approval</div>
                        </div>
                        <div class="tab-body render_body_content">
                            ${loadApprovalDefault()}
                           
                        </div>
                    </div>
    
                `
    return content;
   
}



function loadApprovalDefault(){
    approvalfetchx();
        return `<table id="example" class="table table-striped table-bordered" style="width:100%;">
                    <thead>
                        <tr>
                            <th>SN</th>
                            <th>ORDER TYPE</th>
                            <th>QUOTATION</th>
                            <th>STATUS</th>
                            <th>DATE</th>   
                        </tr>
                    </thead>
                </table>`
}


function PendingApproval(){
    
    
        let content = `<table id="example" class="table table-striped table-bordered" style="width:100%;">
                    <thead>
                        <tr>
                            <th>SN</th>
                            <th>ORDER TYPE</th>
                            <th>QUOTATION</th>
                            <th>STATUS</th>
                            <th>DATE</th>   
                        </tr>
                    </thead>
                </table>`
        document.querySelector('.render_body_content').innerHTML = content
        approvalfetchx();
}


function approvalfetchx(){
    $(document).ready(function () {

       let table = $('#example').DataTable({
        
           "processing":true,
           "destroy":true,
           "serverSide":true,
           "bFilter": true,
           'dom': "Bfrtip",
           "ajax":{
                url:'/procurement/app/customroute/getpendingApproval',
                type:"GET"
           },
           "columns":[
                
                    {data:"id"},
                    {
                      data:"order_title",
                      render:function(data,type,row){
                        //
                        return `<div style="text-color:#000080;font-weight:bold;text-decoration:underline;cursor:pointer" onclick="openDetails(${row.order_id})">${data}</div>`
                      }  
                        
                    },
                    {
                        data:'quotation_receipt',
                        render:function(data,type,row){
                            
                            return `<a href="/procurement/quotation/${row.quotation_receipt}" target="_blank">Quotation</a>`
                          },
                    },
                    {data:"level_1_approval"},
                    {data:"created_at"},
                
           ]   

        });


    });
}


function TreatedApproval(){
    
       
 
        let content = `<table id="treated" class="table table-striped table-bordered" style="width:100%">
                    <thead>
                        <tr>
                            <th>SN</th>
                            <th>ORDER TYPE</th>
                            <th>SUPPLIER ASSIGNED</th>
                            <th>STATUS</th>
                            <th>DATE</th>
                            <th>ACTION</th>
                        </tr>
                    </thead>
                </table>`
        document.querySelector('.render_body_content').innerHTML = content
        allapprovedx()
}



function allapprovedx(){
    
    let table = $('#treated').DataTable({
     
        "processing":true,
        "destroy":true,
        "serverSide":true,
        "bFilter": true,
        'dom': "Bfrtip",
        "ajax":{
             url:'/procurement/app/customroute/allapproved',
             type:"GET"
             
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
                     
                         return `<div style="text-decoration:underline;color:#ff0000;font-weight:bold;cursor:pointer" onclick="deleteApprove(${row.id},${row.order_id})">Delete</div>`
                       } 
                 }
             
        ]   

         

     });
}

function openDetails(url){
    
    console.log(url)
    _push(`#Approval/details/${url}`)
    // window.location=`#Approval/details/${url}`
}

function deleteApprove(id,order_id){

 Swal.fire({
     title: 'Are you sure?',
     text: "You won't be able to revert this!",
     icon: 'warning',
     showCancelButton: true,
     confirmButtonColor: '#3085d6',
     cancelButtonColor: '#d33',
     confirmButtonText: 'Yes, delete it!'
   }).then((result) => {
     if (result.isConfirmed) {
         fetch('/procurement/app/customroute/delete_approval',{
             method:'POST',
             headers: { "Content-type": "application/x-www-form-urlencoded"},
             body:JSON.stringify({
                 order_id:order_id,
                 id:id
                 
             })
         })
             
             .then(result=>result.json())
             .then(res=>{
                 if(res.status){
                     Swal.fire(
                         'Deleted!',
                         'Your Approval has been deleted.',
                         'success'
                       )
                       allapprovedx();
                 }
                 else{
                     Swal.fire(
                         'Internal Server Error',
                         '',
                         'error'
                       )
                 }
             })
         
     }
   })
 
}




function makeloader(id){
    document.querySelector('.roundingx').classList.add('roundLoader');
    
    fetch('/procurement/app/customroute/fetchapprovaldetails',{
        method:'POST',
        headers: { "Content-type": "application/x-www-form-urlencoded"},
        body:JSON.stringify({id:id})
    }).then(response=>response.json())
        .then(res=>{
            let title ;
            let dataset;
            if(res.status){
                document.querySelector('.roundingx').classList.remove('roundLoader');
                console.log(res.data)
                res.data.forEach((d,index)=>{
                    title = d.order_title;
                    dataset +=`
                                <tr>
                                    <input type="hidden" value=${d.supplier_id} />
                                    <input type="hidden" value=${d.order_id} />
                                    <td>${index + 1}</td>
                                    <td>${d.supplier_name}</td>
                                    <td>${d.created_at}</td>
                                    <td><div onclick="approvalModal(${d.supplier_id},${d.order_id})"class="view-more">View More</div></td>

                                </tr>
                            
                            `
                   
                });
                document.querySelector('.approvaltbody').innerHTML=dataset
                
                document.querySelector('.title').innerHTML=`<h4>${title.toUpperCase()}</h4>`

                
  
            }
        })
        .catch(err=>console.log(err))
        
       

}



function viewMore(id){
    document.querySelector('.approvaltbody').addEventListener('click',function(e){
        
        if(e.target.classList.contains('view-more')){
           let x = e.target.parentElement;
           let y = x.parentElement;
         
           let supplierid = y.children[0].value;
           let orderid = y.children[1].value;
           let suppliername = y.children[3].textContent;
           let quantity = y.children[4].textContent;
           let unit = y.children[5].textContent;
           let total = y.children[6].textContent;
           
           document.querySelector('.approvalmodal').classList.add('overlayApproval');
           document.querySelector('.approvalmodalcard').classList.add('Addapprovalmodalcard');
           let content = `
                            <div class="monitorCard">
                                <div><h3>${suppliername}</h3></div>
                                <small>No 11,iyanuEgbada lane,Lagos</small>
                                <small>Telphone:08033376688</small>

                                <div class="mytable">

                                    <table class="table table-stripe">
                                        <thead>

                                            <tr>
                                                <td class="trenches">SN</td>
                                                <td class="trenches">Quantity</td>
                                                <td class="trenches">Unit</td>
                                                <td class="trenches">Total</td>

                                            </tr>
                                        
                                        </thead>

                                        <tbody>
                                            <tr>
                                                <td class="trench">1</td>
                                                <td class="trench">${quantity}</td>
                                                <td class="trench">${unit}</td>
                                                <td class="trench">${total.toString().toLocaleString("en-US")}</td>
                                            </tr>


                                        </tbody>




                                    </table>



                                </div>

                                <div class="mybutton">
                                    <button class="btn btn-success">Approve</button>
                                    <button class="btn btn-secondary">Close</button>
                                </div>
                            </div>
           
                          `
           document.querySelector('.approvalmodalcard').innerHTML=content

           action(orderid,supplierid);
        }
    })
   
}

function action(id,supplierid){
    
    document.querySelector('.approvalmodalcard').addEventListener('click',function(e){
        if(e.target.classList.contains('btn-secondary')){
            document.querySelector('.approvalmodal').classList.remove('overlayApproval');
           document.querySelector('.approvalmodalcard').classList.remove('Addapprovalmodalcard');
           document.querySelector('.approvalmodalcard').innerHTML=""
        }
        
    })
       
}


