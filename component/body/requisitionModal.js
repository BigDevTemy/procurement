const newQuotationEdit = [];
const loadEdit = [];
let Quotation = [];
let row=[];
let currencyFetch
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
                                        
                                        <select class="form-control" id="ordertitle">
                                        
                                        </select>
                                    </div>
                                    <div class="col-md-4">
                                        <label>Supplier Name</label>
                                        
                                        <select class="form-control" id="suppliername_2">
                                        </select>
                                    </div>
                                    <div class="col-md-4">
                                        <label> Currency</label>
                                        <select class="form-control" id="currency_modal">
                                            <option value="">SELECT CURRENCY</option>
                                            <option value="NGN">NGN</option>
                                            <option value="USD">USD</option>
                                            <option value="GBP">GBP</option>
                                            <option value="EURO">EURO</option>
                                            <option value="YEN">YEN</option>
                                        </select>
                                    </div>
                                </div>

                               <table class="table table-striped table-bordered">
                                    <thead>
                                        <tr>
                                            <td>SN</td>
                                            <td>Quotation ID</td>
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
                                    <div>Discount(%) :- </div> 
                                    <div id=""><input type="number" id="discount" min="0" class="form-control discountWidth" value="0%"/></div>
                                </div>
                                <div class="discountTotal">
                                    <div>Grand Total</div> 
                                    <div id="grandtotal">0</div>
                                </div>
                            </div>

                            <div class="modalFooter">
                                <div class="mybutton">
                                    <button class="btn btn-primary" id="saveButton" >Save</button>
                                    
                                    
                                </div>
                            </div>
                    </div>
        `

        document.querySelector('.modalClass').innerHTML=content
        close();
    
        
        getAllSupplierx();
        getAllorderx();
        fetchEditx(supplierid,orderid,rowid);
        modifyPrice();
        modifyDiscount()
        save(rowid);

        
        
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



function fetchEditx(supplierid,orderid,id){

    fetch('/procurement/app/customroute/getquotation',{
        method:'POST',
        headers: { "Content-type": "application/x-www-form-urlencoded"},
        body:JSON.stringify({supplierid,orderid,id})
    })
    .then(result=>result.json())
    .then(res=>{
        console.log(res) 
        let supplier_id
        let address
        let phonenumber
        let dataset = ''
        let sum=0
        let currency,mydate,dateofsending,projectname,orderid,fileRef,orderRef,supplier_name
        let discount = 0;
        let refNumber;
        
        if(res.status){
            res.data.forEach((d,index)=>{
                console.log("d",d)
                supplier_name = d.supplier_name
                supplier_id = d.supplierID;
                address = d.address;
                phonenumber = d.contact
                currency= d.currency
                mydate=d.dateofcreation
                dateofsending=d.dateofsending
                projectname = d.project_name
                orderid = d.orderID
                fileRef=d.file_ref
                orderRef=d.order_ref
                refNumber = d.ref_number
                discount= d.discount
                sum += parseFloat(d.total)
                dataset +=`
                            <tr>
                                <td><input type="text" class="form-control" value=${index + 1} disabled /></td>
                                <td><input type="text" class="form-control" disabled value=${d.id} /></td>
                                <td><input type="text" class="form-control" value=${d.description}  /></td>
                                <td><input type="number" min="0" value= ${d.quantity} class="form-control quantity"/></td>
                                <td><input type="number" min="0" value=${d.price} class="form-control price"  /></td>
                                <td><input type="number" disabled value= ${d.total} class="form-control " /></td>
                            </tr>
                            `
            })
            document.querySelector('tbody').innerHTML=dataset;
            document.getElementById('addr').innerHTML = address;
            document.getElementById('suppliername').innerHTML = supplier_name;
            // document.getElementById('suppliername_2').value = supplier_name;
            // document.getElementById("suppliername_2").selectedIndex = supplier_name;
            // document.querySelector('option[value=" + supplier_name +"]').selected = true
            console.log('idddd',fileRef)
            $(`#suppliername_2 option[value=${supplier_id}]`).prop("selected", "selected")
            $(`#ordertitle option[value=${orderid}]`).prop("selected", "selected")
            $(`#currency_modal option[value=${currency}]`).prop("selected", "selected")
            document.getElementById('discount').value = discount;
            document.getElementById('phonenumber').innerHTML = phonenumber;
            document.getElementById('projectname').value = projectname;
            // document.getElementById('currency').value = currency;
            // document.getElementById("currency").selectedIndex = currency;
            currencyFetch = currency;
            document.getElementById('date').value = mydate;
            document.getElementById('dateofsending').value = dateofsending;

            document.getElementById('ordertitle').value = orderid;
            document.getElementById('orderRef').value = orderRef;
            document.getElementById('fileRef').value = fileRef;
            document.getElementById('refNumber').value = refNumber;
            let dis = parseFloat(discount) /100;
            let count = dis * sum;
            let getcurrency = currencySelect(currency);
            
            document.getElementById('grandtotal').innerHTML = ` (${getcurrency}) ` + numberWithCommas(parseFloat(sum - count))  
            
        }
    })
    .catch(err=>console.log(err))
}

function modifyPrice(){
    document.querySelector('tbody').addEventListener('click',function(e){
       let grandtotal =  document.getElementById('grandtotal')
       let discount =  document.getElementById('discount').value
       
        if(e.target.classList.contains('quantity')){
            let price = e.target.parentElement.parentElement.children[4].children[0].value
            let totalDiv = e.target.parentElement.parentElement.children[5].children[0]
            e.target.addEventListener('change',function(e){
                let total = e.target.value * price;
                totalDiv.value = total
                sumTotal(grandtotal,discount)
                
                
            })
        }

        if(e.target.classList.contains('price')){
            let quantity = e.target.parentElement.parentElement.children[3].children[0].value
            let totalDiv = e.target.parentElement.parentElement.children[5].children[0]
            e.target.addEventListener('change',function(e){
                let total = e.target.value * quantity;
                totalDiv.value = total
                sumTotal(grandtotal,discount)
                
            })
        }
    })
}

function sumTotal(grandtotal,discount){
    let x = document.querySelector('tbody').children;
    let sum =0;
    for(let i=0;i<x.length;i++){
        console.log(x[i].children[5].children[0].value)
        sum += parseFloat(x[i].children[5].children[0].value)
    }
    console.log("sum",sum)
    let d = parseFloat(discount/100);
    
    
    let getcurrency = currencySelect(currencyFetch);
    grandtotal.innerHTML = ` (${getcurrency}) ` + numberWithCommas(sum - (d * sum)) 
            
}

function modifyDiscount(){
    
    let discount =  document.getElementById('discount')
    let grandtotal =  document.getElementById('grandtotal')
    discount.addEventListener('change',function(e){
        
        let x = document.querySelector('tbody').children;
        let sum = 0;
        for(let i=0;i<x.length;i++){
           
            sum += parseFloat(x[i].children[5].children[0].value)
        }
        let d = parseFloat(e.target.value/100);
        let getcurrency = currencySelect(currencyFetch);
        grandtotal.innerHTML = ` (${getcurrency}) ` + numberWithCommas(sum - (d * sum)) 
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

function save(rowid){
    document.getElementById('saveButton').addEventListener('click',function(){
        let date = document.getElementById('date').value;
        let dateofsending = document.getElementById('dateofsending').value;
        let projectname = document.getElementById('projectname').value;
        let ordertitle = document.getElementById('ordertitle').value;
        let supplier = document.getElementById('suppliername_2').value;
        let currency = document.getElementById('currency_modal').value;
        let refnumber= document.getElementById('refNumber').value;
        let orderref = document.getElementById('orderRef').value;
        let fileref = document.getElementById('fileRef').value;
        let discount = document.getElementById('discount').value

        let x = document.querySelector('tbody').children;
        let sum = 0;
        for(let i=0;i<x.length;i++){
            
            for(let j=0;j<x[i].children.length;j++){
                let xxy = x[i].children[j]
                
                row.push(xxy.children[0].value)
            }
            Quotation.push(row)
            row=[];
            console.log(Quotation)
        }

        fetch('/procurement/app/customroute/save_edit_requisition',{
            method:'POST',
            headers: { "Content-type": "application/x-www-form-urlencoded"},
            body:JSON.stringify({
                date,dateofsending,projectname,ordertitle,supplier,currency,refnumber,orderref,fileref,discount,Quotation,rowid
            })
        })
        .then(res=>res.json())
        .then(result=>{

            if(result.status){
                Swal.fire(result.data,'','success');
                
                document.querySelector('.modalClass').classList.remove('modalClassCustom');
                document.querySelector('.modalClass').innerHTML=""
                allrequisition();
            }

        })
           
        
            
        .catch(err=>console.log(err))
        
    })
}

function getAllSupplierx(){
    fetch('/procurement/app/customroute/getAllSupplier')
    .then(res=>res.json())
    .then(data=>{
        console.log(data)
        if(data['status']){
            let dataset = ""
            document.getElementById('suppliername_2').innerHTML=""
            data['data'].forEach((d,index)=>{
                dataset += `
                            <option value=${d.id}>${d.supplername}</option>
                            `
                })
                document.getElementById('suppliername_2').innerHTML = dataset;
        }
        
    })
    .catch(err=> {
        
        console.log(err)
       
    })
}

function getAllorderx(){
    fetch('/procurement/app/customroute/getOrders')
    .then(res=>res.json())
    .then(data=>{
        console.log("orderxxx",data)
        if(data['status']){
            let dataset = ""
            document.getElementById('ordertitle').innerHTML=""
            data['data'].forEach((d,index)=>{
                dataset += `
                            <option value=${d.id}>${d.order_title}</option>
                            `
                })
                document.getElementById('ordertitle').innerHTML = dataset;
        }
        
    })
    .catch(err=> {
        
        console.log(err)
       
    })
}

