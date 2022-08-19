function poModal(supplierid,orderid){
   
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
                                    <tbody>

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
                                    <button class="btn btn-primary" onclick="approve(${orderid},${supplierid})">Approve</button>
                                    <button class="btn btn-danger" onclick="approve(${orderid},${supplierid})">Reject</button>
                                    <button class="btn btn-secondary" onclick="close()">Close</button>
                                </div>
                            </div>



                    </div>
    
    
        `

        document.querySelector('.modalClass').innerHTML=content
        supplier_quotationDetails(orderid,supplierid);
       
        close();
        
}


function close(){
    document.querySelector('.closeModal').addEventListener('click',function(e){
        document.querySelector('.modalClass').classList.remove('modalClassCustom');
        document.querySelector('.modalClass').innerHTML=""
    })
}

function supplier_quotationDetails(orderid,supplierid){
    
    
    fetch('/procurement/app/customroute/getsupplierquotation',{
        method:'POST',
        headers: { "Content-type": "application/x-www-form-urlencoded"},
        body:JSON.stringify({orderid:orderid,supplierid:supplierid})
    })
    .then(result=>result.json())
    .then(res=>{
        console.log(res)
        let supplier_name
        let address
        let phonenumber
        let dataset = ''
        let sum=0
        let currency
        let invoice
        
       if(res.status){
            res.data.forEach((d,index)=>{
                supplier_name = d.supplier_name
                address = d.address
                phonenumber = d.contact
                sum += parseFloat(d.total)
                currency = d.currency
                invoice = d.order_title
                
                dataset += `
                            <tr>
                                    <td>${index +1}</td>
                                    <td>${d.description}</td>
                                    <td><input type="text" class="form-control myformControl" value=${d.quantity} /></td>
                                    <td><input type="text"  class="form-control myformControl" value=${d.price} /> </td>
                                    <td>${d.total}</td>

                            </tr>
                
                        `

            })
            document.querySelector('tbody').innerHTML=dataset
            document.getElementById('addr').innerHTML = address
            document.getElementById('suppliername').innerHTML = supplier_name
            document.getElementById('phonenumber').innerHTML = phonenumber
            document.getElementById('grandtotal').innerHTML = sum + ` (${currency})` 
            document.getElementById('invoice').innerHTML='Quotation For '+ invoice
       }
    })
    .catch(err=>console.log(err))
    edit();
}

function edit(){
    document.querySelector('tbody').addEventListener('click',function(e){
        alert('xxx')
    })
}

function approve(id,supplierid){
    
    
        fetch('/procurement/app/customroute/approve',{
            method:'POST',
            headers: { "Content-type": "application/x-www-form-urlencoded"},
            body:JSON.stringify({id:id,supplierid:supplierid})
        })
        .then(result=>result.json())
        .then(res=>{
            
            if(res.status){
                Swal.fire(res.data,'','success');
                close()
                _push('/procurement/dashboard/app#Approval')
                window.location='/procurement/dashboard/app#Approval'
            }
        })
        .catch(err=>console.log(err))
    
}