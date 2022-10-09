const printdata=[]
function PO(search){

    let content = ` 
                <div class="supplierDiv">
                    
                    <div class="tabDiv">
                        <div class="tab-active">Pending PO Approval</div>
                        <div class="">PO Approved</div>
                    </div>
                    <div class="modalClass"></div>
                    <div id="toprint" style="display:none">
                      
                    
                    </div>
                    

                    <div class="render_body_content approval">
                       ${POHTML()}
                    </div>
                

                </div>

             `
    return content;
}

function POHTML(){

    POfetch();
    return `
            
    
            <table id="fetchpendingpo" class="table table-striped table-bordered" style="width:100%">
                <thead>
                    <tr>
                        <th>SN</th>
                        <th>ORDER TYPE</th>
                        <th>ORDER REF</th>
                        <th>SUPPLIER NAME</th>
                        <th>STATUS</th>
                        <th>DATE</th>
                        <th>REVIEW</th>
                        
                        
                    </tr>
                </thead>
            </table>`
}

function POPendingClicked(){

    
    let content =`
            
    
            <table id="fetchpendingpo" class="table table-striped table-bordered" style="width:100%">
                <thead>
                    <tr>
                        <th>SN</th>
                        <th>ORDER TYPE</th>
                        <th>ORDER REF</th>
                        <th>SUPPLIER NAME</th>
                        <th>STATUS</th>
                        <th>DATE</th>
                        <th>REVIEW</th>
                        
                        
                    </tr>
                </thead>
            </table>`

            document.querySelector('.render_body_content').innerHTML=content
            POfetch();
}


function POfetch(){
    $(document).ready(function () {

        fetch('/procurement/app/customroute/getPO',{
            method:'GET'
           
        })
        .then(result=>result.json())
        .then(res=>{

           let dataset="";
           if(res.status){
    
                let table = $('#fetchpendingpo').DataTable({
                    data:res.data,
                    destroy:true,
                    "columns":[
                
                        {data:"id"},
                        {data:"order_title"},
                        {data:"order_ref"},
                        {data:"supplier_name"},
                        {data:"level_1_approval"},
                        {data:"created_at"},
                        {
                            data:"",
                            render:function(data,type,row){
                               
                                
                                return `<div style="cursor:pointer;text-decoration:underline" onclick="poModal(${row.order_id},${row.assigned_supplier},${row.id})">Review</div>`
                              } 
                        }
                    
               ]   
           
                })
            }
            
 
            
        })
        .catch(err=>console.log(err))




    });
    
    
}

function reviewPO(orderid){
    document.querySelector('.POmodal').classList.add('overlayApproval')
    document.querySelector('.POcontentmodal').classList.add('Addapprovalmodalcard')
    
    fetch('/procurement/app/customroute/adjustPO',{
        method:"POST",
        headers: { "Content-type": "application/x-www-form-urlencoded"},
        body:JSON.stringify({
            orderid:orderid
            
        })
    })
    .then(result=>result.json())
    .then(res=>{

        console.log(res.data)
        let content;
        let suppliername,address,phonenumber,ordertitle
        res.data.forEach((d,index)=>{

            suppliername = d.supplier_name
            address = d.address
            phonenumber = d.contact
            ordertitle = d.order_title
            content += `
                        <tr>
                            <input type="hidden" id="assigned_supplier_id" value=${d.assigned_supplier} />
                            <td >${index+1}</td>
                            <td >${d.description}</td>
                            <td ><input type="${d.quantity}" value=${d.quantity} class="form-control" /></td>
                            <td ><input type="${d.price}" value=${d.price} class="form-control" /></td>
                            <td><input type="text" id="totalprice" value=${d.total} style="width:100px;text-align:center"  class="form-control"/></td>

                        </tr>
            
                            `
        })

        document.querySelector('tbody').innerHTML=content
        
    })
    .catch(err=>{
        console.log(err)
    })


}

function PendingPOApproval(){
   
    let content = `
            
    
            <table id="poclick" class="table table-striped table-bordered" style="width:100%">
                <thead>
                    <tr>
                        <th>SN</th>
                        <th>ORDER TYPE</th>
                        <th>SUPPLIER NAME</th>
                        <th>STATUS</th>
                        <th>DATE</th>
                        <th>REVIEW</th>
                        
                        
                    </tr>
                </thead>
            </table>`
            document.querySelector('.render_body_content').innerHTML=content
            POClickfetch();
}
function POClickfetch(){
    $(document).ready(function () {


        fetch('/procurement/app/customroute/getPO')
        .then(result=>result.json())
        .then(res=>{
           
           let dataset="";
           if(res.status){
    
                let table = $('#poclick').DataTable({
                    data:res.data,
                    destroy:true,
                    columns:[
                
                        {
                            
                            data:"",
                            render:function(){
                                return count = count+ 1;
                            }
                        
                        },
                        {data:"order_title"},
                        {data:"order_ref"},
                        {data:"supplier_name"},
                        {data:"level_1_approval"},
                        {data:"created_at"},
                        {
                            data:"",
                            render:function(data,type,row){
                                
                                return `<div style="cursor:pointer;text-decoration:underline" onclick="reviewPO(${row.order_id},${row.id})">Review</div>`
                              } 
                        }
                    
               ] 
    
                    
                })
            
           
                CloseButton();
               
           }
            
        })
        .catch(err=>console.log(err))
    

    });
    
    
}
function POApproved(){
    let content = `
                    <table id="poapproved" class="table table-striped table-bordered" style="width:100%">
                        <thead>
                            <tr>
                                <th>SN</th>
                                <th>ORDER TYPE</th>
                                <th>ORDER REF</th>
                                <th>SUPPLIER NAME</th>
                                <th>STATUS</th>
                                <th>PO APPROVAL STATUS</th>
                                <th>DATE</th>
                                <th>REVIEW</th>
                                <th>PRINT</th>
                                
                                
                            </tr>
                        </thead>
                    </table>`
    document.querySelector('.render_body_content').innerHTML=content
    POClickfetchapproved();
}

function POClickfetchapproved(){


    fetch('/procurement/app/customroute/getPOapproved',{
        method:'GET'
       
    })
    .then(result=>result.json())
    .then(res=>{
        console.log("res",res)
        let count = 0;
       let dataset="";
       if(res.status){

            let table = $('#poapproved').DataTable({
                data:res.data,
                destroy:true,
                dom: 'Blfrtip',
                buttons: [
                    {
                        "extend":'excel', "text":'Export  to Excel',"className":'btn  btn-secondary mb-4'
                    },
                    {
                        "extend":'print', "text":'Print Report',"className":'btn  btn-success mb-4'
                    }
                ],
                columns:[
             
                    {
                       
                       data:"",
                       render:function(){
                           return count = count+ 1;
                       }
                   
                   },
                    {data:"order_title"},
                    {data:'order_ref'},
                    {data:"supplier_name"},
                    {data:"level_1_approval"},
                    {data:"po_approval"},
                    {data:"created_at"},
                    {
                        data:"",
                        render:function(data,type,row){
                            
                            return `<div style="cursor:pointer;text-decoration:underline" onclick="deleteItem('po',${row.order_id},${row.supplier_id},${row.id})">Delete Approval</div>`
                          } 
                    },
                    {
                       data:"",
                       render:function(data,type,row){
                            printdata.push(row);
                           return  `
                                       <div style="cursor:pointer;width:100%">
                                               <button class="btn btn-sm btn-primary" onclick="PrintElem(${row.id})">Print</button>
                                       </div>
                                   `
                       }
                    }
       
                
                ]             
            })
        }
        

        
    })
    .catch(err=>console.log(err))
    
    
    


}


async function getprintdata(id){

    fetch('/procurement/app/customroute/printPO',{
        method:'POST',
        body:JSON.stringify({
            id    
        }),
        headers: { "Content-type": "application/x-www-form-urlencoded"},
                                            
    })
    .then(res=>res.json())
    .then(result=>{
        
       if(result.status){
        
        display(result.data)
       }
        
    })
    .catch(err=> {
        
        console.log(err)
        
       
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
        default:
            return ''
    }
}
function numberWithCommas(x) {
    console.log(x)
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function display(params){
    let supplier_name,order_type,supplier_email,created_at,currency,discount
    let dataset="";
    let moredataset = "";
    let sum = 0;
    let calculateddiscount=0

    params.forEach((d,index)=>{
        supplier_email = d.email;
        supplier_phonenumber = d.contact;
        order_type = d.order_type;
        supplier_name = d.supplier_name;
        order_ref = d.order_ref
        created_at = d.created_at
        currency = d.currency
        discount = d.discount
        sum += parseFloat(d.total)
        dataset +=`
                    <tr style="width:100%;">
                        <td style="text-align: center;">
                            ${index+1}
                        </td>
                        <td style="text-align: center;">
                            ${d.description}
                        </td>
                        <td style="text-align: center;">
                            098765
                        </td>
                        <td style="text-align: center;">
                            ${d.quantity}
                        </td>
                        <td style="text-align: center;">
                            ${d.price}
                        </td>
                        <td style="text-align: center;">
                        <b>${numberWithCommas(d.total)}</b> 
                        </td>
                    </tr>
        
                    `


    })

    calculateddiscount = parseFloat(discount)/100 * sum

    moredataset = `
                    <tr style="width:100%;">
                        <td style="text-align: center;font-weight: bold;" colspan="5">
                            
                            <div style="width:200px;text-align:left;margin-left:50%">Total  </div>
                        </td>
                        
                        <td style="text-align: center;">
                            ${numberWithCommas(sum)}
                        </td>
                    </tr>
                    <tr style="width:100%;">
                        <td style="text-align: center;font-weight: bold;" colspan="5">
                            <div style="width:200px;text-align:left;margin-left:50%">Discount ${discount}%  </div>
                        </td>
                        
                        <td style="text-align: center;">
                            ${numberWithCommas(calculateddiscount)}
                        </td>
                    </tr>
                    <tr style="width:100%;">
                        <td style="text-align: center;font-weight: bold;" colspan="5">
                            <div style="width:200px;text-align:left;margin-left:50%">Discount & Packaging</div>
                        </td>
                        
                        <td style="text-align: center;">
                            0
                        </td>
                    </tr>

                    <tr style="width:100%;">
                        <td style="text-align: center;font-weight: bold;" colspan="5">
                            
                            <div style="width:200px;text-align:left;margin-left:50%">Total Delivered – ${currency} (${currencySelect(currency)})</div>
                        </td>
                        
                        <td style="text-align: center;">
                            ${numberWithCommas(parseFloat(sum - calculateddiscount))}
                        </td>
                    </tr>
                    `

    
    let content = `
                    <div style="width:100%;display: flex;justify-content: center;">

                    <div style="display: flex;flex-direction: column; justify-content: center; width: 100%;">
                        <div style="display:flex;justify-content:space-between;align-items:center">
                            <div><img src='../assets/images/company.png' id="company_logo" style="width:100%" /></div>
                            <div style="font-weight:bold" id="supplier_name">${supplier_name.toUpperCase()}</div>
                        </div>

                        <div><hr style="border:1px solid #ff0000"/></div>

                        <div style="width:100%;display:flex; ">
                            <div style="flex:1 1 50%; display:flex;flex-direction: column;">
                                
                                <div style="display: flex;">
                                    <div style="width:50%;font-weight:bold;font-size:15px;margin-top: 10px;"><i>To:</i></div>
                                    <div style="width:50%;font-weight:bold;font-size:15px;margin-top: 10px;">${supplier_name}</div>
                                </div>
                                <div style="display: flex;">
                                    <div style="width:50%;font-weight:bold;font-size:15px;margin-top: 10px;"><i>Attention:</i></div>
                                    <div style="width:50%;font-weight:bold;font-size:15px;margin-top: 10px;">${supplier_name}</div>
                                </div>
                                <div style="display: flex;">
                                    <div style="width:50%;font-weight:bold;font-size:15px;margin-top: 10px;"><i>Email:</i></div>
                                    <div style="width:50%;font-weight:bold;font-size:15px;margin-top: 10px;">${supplier_email}</div>
                                </div>
                                <div style="display: flex;">
                                    <div style="width:50%;font-weight:bold;font-size:15px;margin-top: 10px;"><i>From:</i></div>
                                    <div style="width:50%;font-weight:bold;font-size:15px;margin-top: 10px;">Pocify Limited</div>
                                </div>
                            </div>
                            <div style="flex:1 1 50%;">
                                <div style="display: flex;">
                                    <div style="width:50%;font-weight:bold;font-size:15px;margin-top: 10px;"><i>Our Ref:</i></div>
                                    <div style="width:50%;font-weight:bold;font-size:15px;margin-top: 10px;">${order_ref}</div>
                                </div>
                                <div style="display: flex;">
                                    <div style="width:50%;font-weight:bold;font-size:15px;margin-top: 10px;"><i>Date:</i></div>
                                    <div style="width:50%;font-weight:bold;font-size:15px;;margin-top: 10px;">${created_at}</div>
                                </div>
                                <div style="display: flex;">
                                    <div style="width:50%;font-weight:bold;font-size:15px;margin-top: 10px;"><i>Total Pages:</i></div>
                                    <div style="width:50%;font-weight:bold;font-size:15px;;margin-top: 10px;">2</div>
                                </div>
                                <div style="display: flex;">
                                    <div style="width:50%;font-weight:bold;font-size:15px;margin-top: 10px;"><i>Email:</i></div>
                                    <div style="width:50%;font-weight:bold;font-size:15px;;margin-top: 10px;">contact@procify.com</div>
                                </div>
                            </div>

                        </div>
                        
                        <div style="margin-top:10px"><hr style="border:2px solid #858585"/></div>
                        <div style="width:100%;margin-top:20px">
                            <div style="font-weight: bold;font-size: 18px;" id="order_type"></div>
                            <div style="font-size:20px;margin-top: 10px;">We are pleased to confirm the order for the following items as per your offer ref. ${order_ref} dated ${created_at} copy attached.</div>
                            <div>
                                <table  border="1" style="width:100%;border-collapse: collapse;margin-top: 20px;">
                                    <tr>
                                        <th style="font-size:18px">Item</th>
                                        <th style="font-size:18px">Description</th>
                                        <th style="font-size:18px">Part No</th>
                                        <th style="font-size:18px">Qty</th>
                                        <th style="font-size:18px">U/Price</th>
                                        <th style="font-size:18px">Total</th>
                                    </tr>
                                    <tbody id="classTbody">
                                        
                                       
                                        
                                    </tbody>
                                </table>
                            </div>
                            <div style="margin-top: 10px;">
                                <div style="font-weight: bold;font-size:18px;">Price</div>
                                <div>The total Price delivered will be ${currencySelect(currency)}  ${numberWithCommas(parseFloat(sum - calculateddiscount))}</div>

                            </div>
                            <div style="margin-top:10px">
                                <div style="font-weight: bold;font-size:18px;">Delivery</div>
                                <div style="display:flex;margin-top:10px;width:50%;">
                                    <div>Delivery time is</div>
                                    <div style="margin-left:10px">5days</div>
                                </div>
                                <div style="display:flex;margin-top:10px">
                                    <div>Delivery Address:</div>
                                    <div style="margin-left:20px;width:50%;">
                                        Mothercat Limited
                                        C/o EV Cargo
                                        Unit 2, The Faraday Centre, Faraday Road
                                        Manor Royal, Crawley, West Sussex
                                        RH10 9PX
                                    
                                    </div>
                                </div>

                                <div style="display:flex;margin-top:10px">
                                    <div>Notes:</div>
                                    <div style="margin-left:20px;width:70%;">
                                        <li>Partial deliveries are not acceptable</li>
                                        <li>Please include delivery note on the outer packaging.</li>
                                        <li>Please mark outer carton with our order reference number.</li>
                                        <li>Please acknowledge receipt of order by email.</li>
                                    
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div style="margin-top:20px">Thanks and regards.</div>   
                        <div style="margin-top:40px"> <b>Abdelbaset Shehadeh</b></div>                       
                    </div>

                </div>
     
    
                `

                dataset += moredataset;
                

    document.getElementById('toprint').innerHTML = content
    
    document.getElementById('classTbody').innerHTML = dataset
    
    var mywindow = window.open('', 'PRINT PO');
    mywindow.document.write('<html><head><title></title>');
    mywindow.document.write('</head><body>');
    mywindow.document.write(document.getElementById('toprint').innerHTML);
    mywindow.document.write('</body></html>');

    mywindow.document.close(); // necessary for IE >= 10
    mywindow.focus(); // necessary for IE >= 10*/
    mywindow.print();
    mywindow.close();
   

    return true;
   

   
}

async function  PrintElem(id)
{
   await getprintdata(id);
   
    
}

function printpart () {
    var printwin = window.open("");
    printwin.document.write(document.getElementById("toprint").innerHTML);
    printwin.stop();
    printwin.print();
    printwin.close();
  }


function POreview(id){
    console.log(id)
}