function approvalModal(supplierid,orderid){
   
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
                                    <button class="btn btn-success" onclick="approve(${orderid},${supplierid})">Approve</button>
                                    
                                </div>
                            </div>



                    </div>
    
    
        `

        document.querySelector('.modalClass').innerHTML=content
        supplier_quotationDetailsApproval(orderid,supplierid);
       
        close();
}



// function modalContent(orderid,supperid){
//     switch(title){
//         case 'SupplierQuotationDetails':
//             return supplier_quotationDetails(order_id,supperid);
//             break;
     
//         default:

//     }
// }


function close(){
    document.querySelector('.closeModal').addEventListener('click',function(e){
        document.querySelector('.modalClass').classList.remove('modalClassCustom');
        document.querySelector('.modalClass').innerHTML=""
    })
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function supplier_quotationDetailsApproval(orderid,supplierid){
    
    
    fetch('/procurement/app/customroute/getsupplierquotation',{
        method:'POST',
        headers: { "Content-type": "application/x-www-form-urlencoded"},
        body:JSON.stringify({orderid:orderid,supplierid:supplierid})
    })
    .then(result=>result.json())
    .then(res=>{
        let supplier_name
        let address
        let phonenumber
        let dataset = ''
        let sum=0
        let currency
        let discount = 0;
        console.log(res.data)
       if(res.status){
            res.data.forEach((d,index)=>{
                supplier_name = d.supplier_name
                address = d.address
                phonenumber = d.contact
                sum += parseFloat(d.total)
                currency = d.currency
                discount = d.discount
                dataset += `
                            <tr>
                                    <td>${index +1}</td>
                                    <td>${d.description}</td>
                                    <td>${numberWithCommas(d.quantity)}</td>
                                    <td>${numberWithCommas(d.price)}</td>
                                    <td>${numberWithCommas(d.total)}</td>

                            </tr>
                
                        `

            })
            document.querySelector('tbody').innerHTML=dataset
            document.getElementById('addr').innerHTML = address
            document.getElementById('suppliername').innerHTML = supplier_name
            document.getElementById('phonenumber').innerHTML = phonenumber
            document.getElementById('discount').innerHTML = discount
            let dis = parseFloat(discount) /100;
            let count = dis * sum;
            document.getElementById('grandtotal').innerHTML = numberWithCommas(parseFloat(sum - count)) + ` (${currency})` 
       }
    })
    .catch(err=>console.log(err))

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