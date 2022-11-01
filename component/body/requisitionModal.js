const newQuotationEdit = [];
const loadEdit = [];
let Quotation = [];
let row=[];
let currencyFetch
function requisitionModal(supplierid,rowid){
   
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
                                        <input type="text" class="form-control" id="orderRef"   />
                                    </div>
                                    <div class="col-md-4">
                                        <label> File Ref</label>
                                        <input type="text" class="form-control" id="fileRef"  />
                                    </div>
                                    <div class="col-md-4">
                                        <label> Ref Number</label>
                                        <input type="text" class="form-control" id="refNumber" />
                                    </div>
                                </div>

                                <div class="row mt-4">

                                    <div class="col-md-6">
                                        <label>Date</label>
                                        <input type="date" class="form-control" id="date"  />
                                    </div>
                                    
                                    <div class="col-md-6">
                                        <label> Project Name</label>
                                        <input type="text" class="form-control" id="projectname"  disabled/>
                                    </div>
                                </div>
                                <div class="row mt-4 mb-4">

                                    <div class="col-md-6">
                                        <label>Quotation Description</label>
                                        
                                        <input type="text" id="ordertitle" class="form-control"/>
                                    </div>
                                    <div class="col-md-6">
                                        <label>Supplier Name</label>
                                        
                                        <select class="form-control" id="suppliername_2">
                                        </select>
                                    </div>
                                   
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
        fetchEditx(supplierid,rowid);
        // modifyPrice();
        // modifyDiscount();
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



function fetchEditx(supplierid,id){
    allrequisition();
    fetch('/procurement/app/customroute/getquotation',{
        method:'POST',
        headers: { "Content-type": "application/x-www-form-urlencoded"},
        body:JSON.stringify({supplierid,id})
    })
    .then(result=>result.json())
    .then(res=>{
         console.log(res)
        let supplier_id
        let address
        let phonenumber
        let dataset = ''
        let sum=0
        let currency,mydate,dateofsending,projectname,orderid,fileRef,orderRef,supplier_name,ordertitle
        let discount = 0;
        let refNumber;
        
        if(res.status){
            res.data.forEach((d,index)=>{
                
                supplier_name = d.supplier_name
                supplier_id = d.supplierID;
                ordertitle = d.order_description
                phonenumber = d.contact
                currency= d.currency
                address=d.address
                document.getElementById('date').value = d.created_at
                dateofsending=d.created_at
                projectname = d.project_name
                orderid = d.orderID
                fileRef=d.file_ref
                orderRef=d.order_ref
                refNumber = d.ref_number
                discount= d.discount
                sum += parseFloat(d.total)
                
            })
            document.querySelector('tbody').innerHTML=dataset;
            document.getElementById('addr').innerHTML = address;
            document.getElementById('phonenumber').innerHTML = phonenumber;
            document.getElementById('suppliername').innerHTML = supplier_name;
            document.getElementById('ordertitle').value = ordertitle;
           
            $(`#suppliername_2 option[value=${supplier_id}]`).prop("selected", "selected")
            document.getElementById('projectname').value = projectname;
            document.getElementById('orderRef').value = orderRef;
            document.getElementById('fileRef').value = fileRef;
            document.getElementById('refNumber').value = refNumber;
           
            
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
    
        let projectname = document.getElementById('projectname').value;
        let ordertitle = document.getElementById('ordertitle').value;
        let supplier = document.getElementById('suppliername_2').value;
       
        let refnumber= document.getElementById('refNumber').value;
        let orderref = document.getElementById('orderRef').value;
        let fileref = document.getElementById('fileRef').value;
    

        fetch('/procurement/app/customroute/save_edit_requisition',{
            method:'POST',
            headers: { "Content-type": "application/x-www-form-urlencoded"},
            body:JSON.stringify({
                date,projectname,ordertitle,supplier,refnumber,orderref,fileref,rowid
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

