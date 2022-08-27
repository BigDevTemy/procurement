
function filterApproval(){
   
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
    console.log('current',currentDate)
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
        console.log("data",data)
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
       console.log(res)
        
    })
    .catch(err=>console.log(err))


}


