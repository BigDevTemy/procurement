const newQuotation = [];
const load = [];
let currency;
function poModal(orderid,supplierid,rowid){
   
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
                                    <div>Discount(%):-</div> 
                                    <input type="number" class="form-control" min="0" value=0 id="discount" />
                                </div>
                                <div class="discountTotal">
                                    <div>Grand Total</div> 
                                    <div id="grandtotal">0</div>
                                </div>
                            </div>

                            <div class="modalFooter">
                                <div class="mybutton">
                                    <button class="btn btn-primary" onclick="POshippment(${supplierid},${orderid},${rowid})">Approve</button>
                                    <button class="btn btn-danger" onclick="POreject(${orderid},${supplierid})">Reject</button>
                                    
                                </div>
                            </div>
                    </div>
        `

        document.querySelector('.modalClass').innerHTML=content
        supplier_quotationDetails(orderid,supplierid);
        myDiscountChange();
        close();
        document.querySelector('#tbody').addEventListener('click',function(e){
            let y = e.target.parentElement.parentElement.parentElement
            let x = e.target.parentElement.parentElement;
            let sum = 0;
            let quantity = x.children[2].children[0];
            let price =  x.children[3].children[0];
            let Sumtotal =  x.children[4].children[0];
            let grandtotal = document.getElementById('grandtotal')
            let discount = document.getElementById('discount').value;
           
            quantity.addEventListener('change',function(e){
                let pricex = price.value 
                let quantityx = e.target.value
                let total = parseFloat(pricex * quantityx);
                Sumtotal.value = total
                sumTotal(grandtotal,discount);
                
                
            })
            price.addEventListener('change',function(e){
                let quantityx= quantity.value 
                let  pricex= e.target.value
                let total = parseFloat(pricex * quantityx);
                Sumtotal.value = total
                sumTotal(grandtotal,discount);

                
            })

            

        


        })
        
}

function myDiscountChange(){
        
        
    document.getElementById('discount').addEventListener('change',function(e){
        
      
        let sum =0;
        let z =document.querySelector('tbody').children;
            for(let i=0;i<z.length;i++){
                let xy = z[i].children[4];
                console.log(xy.children[0].value)
                sum += parseFloat(xy.children[0].value)
            }
         
        if(parseFloat(sum) > 0){
            
            let value = e.target.value;

            let total = document.getElementById('grandtotal')
            let discount = parseFloat(value) /100;
            let discountAmount = parseFloat(sum) * discount;
            total.innerHTML = currencySelect(currency) +' '+ numberWithCommas(parseFloat(sum) - discountAmount); 

        }
         
    })
    

}


function sumTotal(grandtotal,discount){
    let y = grandtotal.innerHTML;
    let splitter = y.split(' ');

    
    let x = document.querySelector('tbody').children;
    let sum =0;
    for(let i=0;i<x.length;i++){
        console.log(x[i].children[4].children[0].value)
        sum += parseFloat(x[i].children[4].children[0].value)
    }
    console.log("sum",sum)

    let d = parseFloat(discount/100);
    
    
    let getcurrency = currencySelect(currency);
    grandtotal.innerHTML = ` (${getcurrency}) ` + numberWithCommas(sum - (d * sum)) 
            
}



function close(){
    document.querySelector('.closeModal').addEventListener('click',function(e){
        document.querySelector('.modalClass').classList.remove('modalClassCustom');
        document.querySelector('.modalClass').innerHTML=""
    })
}



function currencySelect (currency){
    switch(currency){
        case 'NGN':
            return '&#8358;'
        case 'USD':
            return '&#36;' 
        case 'EURO':
            return '&#x20AC;'
        case 'GBP':
            return '&#163;'
        case 'YEN':
        return '&#165;'
    }
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


function supplier_quotationDetails(orderid,supplierid){
    console.log(orderid,supplierid)
   
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
        
        let invoice
        let discount=0;
        
       if(res.status){
            
            res.data.forEach((d,index)=>{
                supplier_name = d.supplier_name
                address = d.address
                phonenumber = d.contact
                sum += parseFloat(d.total)
                currency = d.currency
                invoice = d.order_title
                discount = d.discount
                dataset += `
                            <tr>
                                    <td>${index +1}</td>
                                    <td>${d.description} </td>
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
            document.getElementById('discount').value = discount
            let dis = parseFloat(discount) /100;
            let count = dis * sum;
            document.getElementById('grandtotal').innerHTML = currencySelect(currency) +' '+ numberWithCommas(parseFloat(sum - count))
         
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

function POshippment(supperid,orderid,rowid){
    
    let row = []
    let x = document.querySelector('#tbody').children
    for(let i=0;i<x.length;i++){
        y = x[i].children
        for(let z=0;z<y.length;z++){
            
            if(z > 0){
                // console.log(y[z].children[0].value)
                if(z === 1){
                    row.push(y[z].textContent)
                }
                else{
                    row.push(y[z].children[0].value)
                }
                
            }
        }
        newQuotation.push(row)
        row=[];
    }
   load.push(orderid);
   load.push(supperid)
   load.push(rowid)
  
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

