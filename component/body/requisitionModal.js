const newQuotationEdit = [];
const loadEdit = [];
function requisitionModal(supplierid,orderid,rowid){
   
    document.querySelector('.modalClass').classList.add('modalClassCustom');
    let content =  ` 
                    <div class="customModal modalApproval">
                            <div class="modalTitle">
                                <div> 
                            
                                </div> 
                                <div class="closeModal">X</div>
                            </div>
                            

                            <div class="modalBody">
                               <div id="suppliername"></div>
                               <div id="addr"></div>
                               <div id="phonenumber"></div>
                               <div id="invoice"></div>
                                <div class="row">

                                    <div class="col-md-4">
                                        <label> Order Ref</label>
                                        <input type="text" class="form-control" id="orderRef" disabled  />
                                    </div>
                                    <div class="col-md-4">
                                        <label> File Ref</label>
                                        <input type="text" class="form-control" id="fileRef" disabled />
                                    </div>
                                    <div class="col-md-4">
                                        <label> Ref Number</label>
                                        <input type="text" class="form-control" id="refNumber" />
                                    </div>
                                </div>

                                <div class="row mt-4">

                                    <div class="col-md-4">
                                        <label>Date</label>
                                        <input type="date" class="form-control" id="date"  />
                                    </div>
                                    <div class="col-md-4">
                                        <label> Date of Sending</label>
                                        <input type="date" class="form-control" id="dateofsending" />
                                    </div>
                                    <div class="col-md-4">
                                        <label> Project Name</label>
                                        <input type="text" class="form-control" id="projectname" />
                                    </div>
                                </div>
                                <div class="row mt-4 mb-4">

                                    <div class="col-md-4">
                                        <label>Order Title</label>
                                        <input type="text" class="form-control" id="ordertitle" />
                                    </div>
                                    <div class="col-md-4">
                                        <label>Supplier Name</label>
                                        <input type="text" class="form-control" id="suppliername_2" />
                                    </div>
                                    <div class="col-md-4">
                                        <label> Currency</label>
                                        <input type="text" class="form-control" id="currency" />
                                    </div>
                                </div>

                               <table class="table table-striped table-bordered">
                                    <thead>
                                        <tr>
                                            <td>SN</td>
                                            <td>Description</td>
                                            <td>Quantity</td>
                                            <td>Price</td>
                                            <td>Total</td>
                                        </tr>
                                    </thead>
                                    <tbody id="tbody">

                                    </tbody>

                               </table>
                               <div class="discountTotal">
                                    <div>Discount(%)</div> 
                                    <div id="discount">0%</div>
                                </div>
                                <div class="discountTotal">
                                    <div>Grand Total</div> 
                                    <div id="grandtotal">0</div>
                                </div>
                            </div>

                            <div class="modalFooter">
                                <div class="mybutton">
                                    <button class="btn btn-primary" >Save</button>
                                    
                                    
                                </div>
                            </div>
                    </div>
        `

        document.querySelector('.modalClass').innerHTML=content
        close();
        fetchEdit(supplierid,orderid,rowid);
        
        
}

function close(){
    document.querySelector('.closeModal').addEventListener('click',function(e){
        document.querySelector('.modalClass').classList.remove('modalClassCustom');
        document.querySelector('.modalClass').innerHTML=""
    })
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function fetchEdit(supplierid,orderid,id){

    fetch('/procurement/app/customroute/getquotation',{
        method:'POST',
        headers: { "Content-type": "application/x-www-form-urlencoded"},
        body:JSON.stringify({supplierid,orderid,id})
    })
    .then(result=>result.json())
    .then(res=>{
        console.log(res) 
        let supplier_name
        let address
        let phonenumber
        let dataset = ''
        let sum=0
        let currency,mydate,dateofsending,projectname,orderTitle,fileRef,orderRef
        let discount = 0;
        
        if(res.status){
            res.data.forEach((d,index)=>{
                supplier_name = d.supplier_name;
                address = d.address;
                phonenumber = d.contact
                currency= d.currency
                mydate=d.dateofcreation
                dateofsending=d.dateofsending
                projectname = d.project_name
                orderTitle = d.order_title
                fileRef=d.file_ref
                orderRef=d.order_ref
                discount= d.discount
                sum += parseFloat(d.total)
                dataset +=`
                            <tr>
                                <td>${index + 1}</td>
                                <td>${d.description}</td>
                                <td><input type="number" min="0" value= ${d.quantity} class="form-control"/></td>
                                <td><input type="number" min="0" value=${d.price} class="form-control" /></td>
                                <td><input type="number" disabled value= ${d.total} class="form-control" /></td>
                            </tr>
                            `
            })
            document.querySelector('tbody').innerHTML=dataset
            document.getElementById('addr').innerHTML = address
            document.getElementById('suppliername').innerHTML = supplier_name
            document.getElementById('suppliername_2').value = supplier_name
            document.getElementById('discount').innerHTML = discount
            document.getElementById('phonenumber').innerHTML = phonenumber
            document.getElementById('projectname').value = projectname
            document.getElementById('currency').value = currency
            document.getElementById('date').value = mydate
            document.getElementById('dateofsending').value = dateofsending
            document.getElementById('ordertitle').value = orderTitle
            document.getElementById('orderRef').value = orderRef
            document.getElementById('fileRef').value = fileRef
            let dis = parseFloat(discount) /100;
            let count = dis * sum;
            document.getElementById('grandtotal').innerHTML = ` (${currency}) ` + numberWithCommas(parseFloat(sum - count))  
            
        }
    })
    .catch(err=>console.log(err))
}


