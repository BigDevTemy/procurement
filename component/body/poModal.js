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
                                    <button class="btn btn-primary" onclick="POshippment()">Approve</button>
                                    <button class="btn btn-danger" onclick="POreject(${orderid},${supplierid})">Reject</button>
                                    <button class="btn btn-secondary" onclick="close()">Close</button>
                                </div>
                            </div>
                    </div>
        `

        document.querySelector('.modalClass').innerHTML=content
        supplier_quotationDetails(orderid,supplierid);
        close();
        document.querySelector('#tbody').addEventListener('click',function(e){
            let y = e.target.parentElement.parentElement.parentElement
            let x = e.target.parentElement.parentElement;
            let sum = 0;
            let quantity = x.children[2].children[0];
            let price =  x.children[3].children[0];
            let Sumtotal =  x.children[4].children[0];
            let grandtotal = document.getElementById('grandtotal')
            quantity.addEventListener('change',function(e){
                let pricex = price.value 
                let quantityx = e.target.value
                let total = parseFloat(pricex * quantityx);
                Sumtotal.value = total
                for(let i=0;i<y.children.length;i++){
                    let x = y.children[i].children[4].children[0].value;
                    sum += parseFloat(x)
                
                }
                grandtotal.innerHTML=sum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                
            })
            price.addEventListener('change',function(e){
                let quantityx= quantity.value 
                let  pricex= e.target.value
                let total = parseFloat(pricex * quantityx);
                Sumtotal.value = total

                for(let i=0;i<y.children.length;i++){
                    let x = y.children[i].children[4].children[0].value;
                    sum += parseFloat(x)
                
                }
                grandtotal.innerHTML=sum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            })

            

        


        })
        
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
                                    <td><input type="number" min="0" class="form-control myformControl" value=${d.quantity} /></td>
                                    <td><input type="number" min="0"  class="form-control myformControl" value=${d.price} /> </td>
                                    <td><input type="text" class="form-control myformcontrol" value=${d.total} disabled/></td>

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
    
}

function POreject(orderid,assigned_supplier_id){
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
            fetch('/procurement/app/customroute/delete_approval_po',{
                method:'POST',
                headers: { "Content-type": "application/x-www-form-urlencoded"},
                body:JSON.stringify({
                    orderid:orderid,
                    assigned_supplier_id:assigned_supplier_id
                    
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
                       
                        document.querySelector('.modalClass').classList.remove('modalClassCustom');
                        document.querySelector('.modalClass').innerHTML=""
                        POfetch();
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

function POshippment(){
   
    _push(`#PO/shippment/1`)
    loadUrl('#PO/shippment/1');
}



// document.querySelector('.POcontentmodal').addEventListener('click',function(e){
//     let totalprice = document.getElementById('totalprice').value;

//     let assigned_supplier_id = document.getElementById('assigned_supplier_id').value
    
//     if(e.target.classList.contains('btn-success')){
        
       
//     }
//     if(e.target.classList.contains('btn-danger')){
    
//     }
//     if(e.target.classList.contains('btn-secondary')){
//     document.querySelector('.POmodal').classList.remove('overlayApproval')
//     document.querySelector('.POcontentmodal').classList.remove('Addapprovalmodalcard')
//     document.querySelector('.POcontentmodal').innerHTML=""
//     }
// })

