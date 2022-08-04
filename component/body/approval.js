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
    approvalfetch();
        return `<table id="example" class="table table-striped table-bordered" style="width:100%">
                    <thead>
                        <tr>
                            <th>SN</th>
                            <th>ORDER TYPE</th>
                            <th>STATUS</th>
                            <th>DATE</th>   
                        </tr>
                    </thead>
                </table>`
}

function approvalfetch(){
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
                        
                        return `<a href=#Approval/details/${row.id}>${data}</a>`
                      }  
                        
                    },
                    {data:"level_1_approval"},
                    {data:"created_at"},
                
           ]   

        });


    });
}


function makeloader(id){
    document.querySelector('.roundingx').classList.add('roundLoader');
    
    fetch('/procurement/app/customroute/fetchapprovaldetails',{
        method:'POST',
        headers: { "Content-type": "application/x-www-form-urlencoded"},
        body:JSON.stringify({id:id})
    }).then(response=>response.json())
        .then(res=>{

            console.log(res.data)
            let title ;
            let dataset;
            if(res.status){
                document.querySelector('.roundingx').classList.remove('roundLoader');
                
                res.data.forEach((d,index)=>{
                    title = d.order_title;
                    dataset =`
                                <tr>
                                    <input type="hidden" value=${d.supplier_id} />
                                    <td>${index + 1}</td>
                                    <td>${d.supplier_name}</td>
                                    <td>${d.quantity}</td>
                                    <td>${d.unit}</td>
                                    <td>${d.total_price}</td>
                                    <td>${d.created_at}</td>
                                    <td><span class="view-more">View More</span></td>

                                </tr>
                            
                            `
                    document.querySelector('.approvaltbody').insertAdjacentHTML('beforeend',dataset);
                });
                
                document.querySelector('.title').innerHTML=`<h4>${title.toUpperCase()}</h4>`

                
  
            }
        })
        .catch(err=>console.log(err))
        
        viewMore(id);

}

function viewMore(id){
    document.querySelector('.approvaltbody').addEventListener('click',function(e){
        
        if(e.target.classList.contains('view-more')){
           let x = e.target.parentElement;
           let y = x.parentElement;
         
           let supplierid = y.children[0].value;
           let suppliername = y.children[2].textContent;
           let quantity = y.children[3].textContent;
           let unit = y.children[4].textContent;
           let total = y.children[5].textContent;
           
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

           action(id,supplierid);
        }
    })
   
}

function action(id,supplierid){
    console.log(id,supplierid)
    document.querySelector('.approvalmodalcard').addEventListener('click',function(e){
        if(e.target.classList.contains('btn-secondary')){
            document.querySelector('.approvalmodal').classList.remove('overlayApproval');
           document.querySelector('.approvalmodalcard').classList.remove('Addapprovalmodalcard');
           document.querySelector('.approvalmodalcard').innerHTML=""
        }
        if(e.target.classList.contains('btn-success')){
        

        console.log(id,supplierid);
            fetch('/procurement/app/customroute/approve',{
                method:'POST',
                headers: { "Content-type": "application/x-www-form-urlencoded"},
                body:JSON.stringify({id:id,supplierid:supplierid})
            })
            .then(result=>result.json())
            .then(res=>{
                
                if(res.status){
                    Swal.fire(res.data,'','success');
                    document.querySelector('.approvalmodal').classList.remove('overlayApproval');
                    document.querySelector('.approvalmodalcard').classList.remove('Addapprovalmodalcard');
                    document.querySelector('.approvalmodalcard').innerHTML=""
                    _push('/procurement/dashboard/app#Approval')
                    window.location='/procurement/dashboard/app#Approval'
                }
            })
            .error(err=>console.log(err))
        }
    })
       
}
