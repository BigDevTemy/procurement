let count =true;
function otherComponent(name){
    let wrapper =  document.getElementById('component-body');
    var search = location.hash.replace('#','');
    console.log('Search',search)
    var splitSplash = search.split('/');
    console.log('splitSplash',splitSplash)
    
    if(splitSplash.length > 1){
      
        let getContent = Switcher(splitSplash[0]+''+ splitSplash[1],splitSplash[splitSplash.length - 1]);
        wrapper.innerHTML=getContent
        if(splitSplash[0] === "Approval"){
            
            makeloader(splitSplash[splitSplash.length - 1]);
        }
        else if(splitSplash[0] === "PO" ){
           
            makeloader(splitSplash[splitSplash.length - 1]);
            
            // if(newQuotation.length > 0){
            //     makeloader(splitSplash[splitSplash.length - 1]);
            //     fileloader();
            // } 
            // else{
            //     _push(`#PO`)
            //     loadUrl('#PO');
            // }  
            
        }
        else if(splitSplash[0] === "Shippment"){
            // console.log(splitSplash[2])
            reviewStatus(splitSplash[2]);
        }
        
        
        
        count=false

        
        
    }
    else{

        let getContent = Switcher(search);
        wrapper.innerHTML=getContent
    
        // document.querySelector('.tabDiv').children[0].classList.add('tab-body-active');
        let getContentIDCall = SwitcherContent(search);
        getBodyContent(search);
    }
    
    

}

function Switcher(search,additional){
    
    switch(search){
        case 'Supplier':
            return Supplier(search)
            break;
        case 'Order':
            return Order(search)
            break;
        case 'Approval':
            return Approval(search);
            break;
        case 'Quotation':
            return Requisition(search);
            break;
        case 'Report':
            return Report(search);
            break;
        case 'Approvaldetails':
            return ApprovalDetails(additional)
        case 'PO':
            return PO(search);
        case 'POdetails':
            return PODetails(additional);
        case 'Shippment':
            return Shippment(search)
        case 'Shippmentreview':
            return Shippmentreview(additional)
        case 'POshippment':
            return ShippmentDetails(additional)
        case 'Project':
            return Project(additional)
        default:

    }
}


function SwitcherContent(search){
    
    switch(search){
        case 'Supplier':
            return saveSupplierModule();
            break;
        case 'Order':
            return saveOrderModule();
            break;
       
        case 'Quotation':
            return saveRequisitionModule();
            break;
        case 'Project':
            return saveProjectModule();
        
       

        default:

    }
}


function ApprovalDetails(xcontent){
    let content = ` 
            <div class="supplierDiv">
                <div class="loaderx">
                    <div class="roundingx"></div>

                </div>
                <div class="modalClass"></div>
                <div class="title">
                    
                </div>

                <div class="contentList">
                    <table class="table table-stripe table-bordered">
                        <thead>   
                                <tr>
                                    <th>SN</th>
                                    <th>SUPPLIER NAME</th>
                                    <th>DATE</th>
                                    <th>ACTION</th>
                                </tr>
                        </thead>
                        <tbody class="approvaltbody">
                            
                        </tbody>

                    </table>
                </div>

            </div>

             `
    return content;
}

function PODetails(xcontent){
   
let content 
 if(xcontent == "template"){
    console.log('AllItems',AllItems)
    let datax = tableDescriptionContent(AllItems);
    let totalBalx = totalBal(AllItems)
  
    content =    `
                    <div class="supplierDiv">
                       
                  
                    <div style="width:100%;display: flex;justify-content: center;">

                    <div style="display: flex;flex-direction: column; justify-content: center; width: 100%;">
                        <div style="display:flex;justify-content:space-between;align-items:center">
                            <div><img src='../assets/images/company.png' id="company_logo" style="width:100%" /></div>
                            <div style="font-weight:bold" id="supplier_name">${AllItems[0].supplier_name}</div>
                        </div>
                        <input type="hidden" id="supplier_id" value=${AllItems[0].supplier_id} />
                        <input type="hidden" id="discount" value=${AllItems[0].discount} />
                        <input type="hidden" id="currency" value=${AllItems[0].currency} />
                        <div id="toprint" style="display:none"></div>
                        <div><hr style="border:1px solid #ff0000"/></div>

                        <div style="width:100%;display:flex; ">
                            <div style="flex:1 1 50%; display:flex;flex-direction: column;">
                                
                                <div style="display: flex;">
                                    <div style="width:50%;font-weight:bold;font-size:15px;margin-top: 10px;"><i>To:</i></div>
                                    <div style="width:50%;font-size:15px;margin-top: 10px;"><input type="text" disabled value=${AllItems[0].supplier_name} id="supplier" /></div>
                                </div>
                                <div style="display: flex;">
                                    <div style="width:50%;font-weight:bold;font-size:15px;margin-top: 10px;"><i>Attention:</i></div>
                                    <div style="width:50%;font-size:15px;margin-top: 10px;"><input type="text"  value=${AllItems[0].contact} id="contact" /></div>
                                </div>
                                <div style="display: flex;">
                                    <div style="width:50%;font-weight:bold;font-size:15px;margin-top: 10px;"><i>Email:</i></div>
                                    <div style="width:50%;font-size:15px;margin-top: 10px;"><input type="text"  id="email" value=${AllItems[0].email} /></div>
                                </div>
                                <div style="display: flex;">
                                    <div style="width:50%;font-weight:bold;font-size:15px;margin-top: 10px;"><i>From:</i></div>
                                    <div style="width:50%;font-size:15px;margin-top: 10px;">Pocify Limited</div>
                                </div>
                            </div>
                            <div style="flex:1 1 50%;">
                                <div style="display: flex;">
                                    <div style="width:50%;font-weight:bold;font-size:15px;margin-top: 10px;"><i>Our Ref:</i></div>
                                    <div style="width:50%;font-size:15px;margin-top: 10px;"><input type="text" disabled value=${AllItems[0].order_ref} id="ref" /></div>
                                </div>
                                <div style="display: flex;">
                                    <div style="width:50%;font-weight:bold;font-size:15px;margin-top: 10px;"><i>Date:</i></div>
                                    <div style="width:50%;font-size:15px;;margin-top: 10px;"><input type="text" disabled value=${AllItems[0].datecreated} id="date" /></div>
                                </div>
                                <div style="display: flex;">
                                    <div style="width:50%;font-weight:bold;font-size:15px;margin-top: 10px;"><i>Total Pages:</i></div>
                                    <div style="width:50%;font-weight:bold;font-size:15px;margin-top: 10px;">1</div>
                                </div>
                                <div style="display: flex;">
                                    <div style="width:50%;font-weight:bold;font-size:15px;margin-top: 10px;"><i>Email:</i></div>
                                    <div style="width:50%font-size:15px;;margin-top: 10px;">contact@procify.com</div>
                                </div>
                            </div>

                        </div>
                        
                        <div style="margin-top:10px"><hr style="border:2px solid #858585"/></div>
                        <div style="width:100%;margin-top:20px">
                            <div style="font-weight: bold;font-size: 18px;" id="order_type"></div>
                            <div style="font-size:20px;margin-top: 10px;">
                                <textarea class="form-control" style="padding: 0px !important; margin: 0px !important;text-align: left;" id="body">We are pleased to confirm the order for the following items as per your offer ref.${AllItems[0].order_ref}  dated ${AllItems[0].datecreated}  copy attached.</textarea>
                                </div>
                            <div>
                                <table class="table-striped" style="width:100%;border-collapse: collapse;margin-top: 20px;">
                                    <tr>
                                        <th style="font-size:18px">Item</th>
                                        <th style="font-size:18px">Description</th>
                                        <th style="font-size:18px">Part No</th>
                                        <th style="font-size:18px">Qty</th>
                                        <th style="font-size:18px">U/Price</th>
                                        <th style="font-size:18px">Total</th>
                                    </tr>
                                    <tbody id="classTbody" style="width:100%">
                                        ${datax}
                                       
                                        
                                    </tbody>
                                </table>
                            </div>
                            <div style="margin-top: 10px;">
                                <div style="font-weight: bold;font-size:18px;">Price</div>
                                <div>The total Price delivered will be ${AllItems[0].currency} ${totalBalx.toLocaleString('en-US')} </div>

                            </div>
                            <div style="margin-top:10px">
                                <div style="font-weight: bold;font-size:18px;">Delivery</div>
                                <div style="display:flex;margin-top:10px;width:50%;">
                                    <div>Delivery time is</div>
                                    <div style="margin-left:10px"><input  type="text" id="days"  value="5" style="width:30px"/> days</div>
                                </div>
                                <div style="display:flex;margin-top:10px">
                                    <div>Delivery Address:</div>
                                    <div style="margin-left:20px;width:50%;">
                                        <textarea class="form-control" style="text-align:left" row="5" id="address" col="25">Mothercat Limited C/o EV Cargo Unit 2, The Faraday Centre, Faraday Road Manor Royal, Crawley, West Sussex RH10 9PX</textarea>
                                    
                                    </div>
                                </div>
                                <div style="padding-top:10px;padding-bottom:10px;width:25%">

                                    <select class="form-control" id="shippment_type">
                                        
                                        <option value="">Select Shippment Type</option>
                                        <option value="Land Freight">Land Freight</option>
                                        <option value="Sea Freight">Sea Freight</option>
                                        <option value="Air Freight">Air Freight</option>
                                    </select>
                                </div>

                                <div style="display:flex;margin-top:10px">
                                    
                                    <div style="display:flex;flex-direction:row width:100%">
                                        <div style="margin-right:30px">Notes:</div> 
                                        <button class="btn btn-primary" id="addconditions" style="font-size:12px;height:50px">Add More Conditions</button>
                                    </div>
                                    <div style="margin-left:20px;width:70%;" id="conditions">
                                        <li>Partial deliveries are not acceptable</li>
                                        <li>Please include delivery note on the outer packaging.</li>
                                        <li>Please mark outer carton with our order reference number.</li>
                                        <li>Please acknowledge receipt of order by email.</li>
                                      
                                    
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div style="margin-top:20px">Thanks and regards.</div>   
                        <div style="margin-top:40px"> <input type="text" id="signamture" value="Abdelbaset Shehadeh" /></div>                       
                    </div>

                </div>
     
    
                
                <div style="width:100%;display:flex;flex-direction:row;justify-content:end;padding:20px">
                        <div class="btn btn-success" onclick="save_n_print()">Save & Print</div>
                
                </div>                

                </div>
                    
                 `
                 
 }
 else{
    
    content = ` 
            <div class="supplierDiv">
                <div class="loaderx">
                    <div class="roundingx"></div>

                </div>
                <div class="modalClass"></div>
                <div class="title">
                    ORDER REF :${xcontent}
                </div>

                <div class="contentList">
                    <table class="table table-stripe table-bordered">
                        <thead>   
                                <tr>
                                    <th>SN</th>
                                    <th>SUPPLIER NAME</th>
                                    <th>RECEIVED STATUS</th>
                                    <th>QUOTATION RECEIPT</th>
                                    <th>DATE</th>
                                    <th>ACTION</th>
                                </tr>
                        </thead>
                        <tbody class="potbody">
                           
                        </tbody>

                    </table>
                </div>

            </div>

             `
    
 }
 return content;
}

function save_n_print(){
    
    let supplier_name = document.getElementById('supplier_name').innerHTML
    let contact = document.getElementById('contact').value
    let email = document.getElementById('email').value
    let body = document.getElementById('body').value
    let days = document.getElementById('days').value
    let address = document.getElementById('address').value
    let order_ref = document.getElementById('ref').value
    let supplier_id = document.getElementById('supplier_id').value
    let discount= document.getElementById('discount').value  
    let currency = document.getElementById('currency').value
    let shippment_type = document.getElementById('shippment_type').value 
    let signature = document.getElementById('signature').value   

    fetch('/procurement/app/customroute/savenewpo',{
        method:'POST',
        body:JSON.stringify({
            AllItems,body,days,address,supplier_name,contact,email,order_ref,supplier_id,discount,currency,shippment_type,signature
        }),
        headers: { "Content-type": "application/x-www-form-urlencoded"},
                                            
    })
    .then(res=>res.json())
    .then(result=>{
        console.log(result)
       if(result.status){
        
        PrintElem(result.data)
       
       }
        
    })
    .catch(err=> {
        
        console.log(err)
        
       
    })
   
    
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
        console.log('print',result)
       if(result.status){
        
        display(result.data)
       }
        
    })
    .catch(err=> {
        
        console.log(err)
        
       
    })

}




async function  PrintElem(id)
{
   await getprintdata(id);

   setTimeout(()=>{
    _push("/procurement/dashboard/app#PO");

   },2000)
   
  
   
}

function printpart () {
    var printwin = window.open("");
    printwin.document.write(document.getElementById("toprint").innerHTML);
    printwin.stop();
    printwin.print();
    printwin.close();
   
    
  }


function totalBal(arrayDescription){
    let sum = 0;
    console.log('here',arrayDescription)
    arrayDescription.forEach((d,index)=>{
        sum += parseFloat(d.subtotal)

    })

    return sum;

}


function tableDescriptionContent(arrayDescription){
    // console.log('array',arrayDescription)
    let dataset="";
    let sum = 0;
    arrayDescription.forEach((d,index)=>{
        sum += parseFloat(d.total)
        dataset +=`
                    <tr style="width:100%;">
                        <td style="text-align: left;font-size:18px;height:50px" >
                            ${index + 1}
                        </td>
                        <td style="text-align: left;font-size:18px;height:50px" >
                            ${d.description}
                        </td>
                        <td style="text-align: left;font-size:18px;height:50px" >
                        ${d.partnumber}
                        </td>
                        <td style="text-align: left;font-size:18px;height:50px" >
                            ${d.quantity}
                        </td>
                        <td style="text-align: left;font-size:18px;height:50px" >
                            ${d.price}
                        </td>
                        <td style="text-align: left;font-size:18px;height:50px" >
                        <b>${d.quantity * d.price}</b> 
                        </td>
                    </tr>
        
                    `
    })

    return dataset;
}

function numberWithCommas(x) {
    console.log(x)
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


function back(){
    _push('#Shippment');
    loadUrl('#Shippment')
}

function ShippmentDetails(additional){
    getaboardagent();
    let content = ` 
                    <div class="supplierDiv">
                        <div onclick="back()" style="cursor:pointer"> << Back</div> 
                        <div class="row mt-4">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label>Date</label>
                                    
                                    <input type="date" class="form-control" id="date"/>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label>Mode Of Shippment</label>
                                    <select class="form-control select" id="mode_of_shippment">
                                        <option value="">Click to Select</option>
                                        <option value="Air">Air</option>
                                        <option value="Ship">Ship</option>
                                        <option value="Land">Land</option>

                                    </select>
                                </div>
                            </div>
                        </div>

                        <div class="row mt-4">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label>Payment Mode</label>
                                    <input type="text" class="form-control" placeholder="Payment Mode" id="paymentmode"/>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label>Receive by Abroad Forwarder</label>
                                    <select class="form-control" id="abroadforwarder">

                                    </select>
                                  
                                </div>
                            </div>
                        </div>
                        <div class="row mt-4">
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label>Delivery address/abroad forwarder details</label>
                                    <textarea  class="form-control" placeholder="Delivery address" id="abroadforwarder_addr"></textarea>
                                </div>
                            </div>
                            
                        </div>
                        <div class="row mt-4">
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label>Cleared Amount</label>
                                    <input type="text" placeholder="Cleared" class="form-control" id="cleared"/>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label>Shippment Docs. To Nigeria Agent/Name</label>
                                    <input type="text" placeholder="Agent Name" class="form-control"id="agentname"/>
                                </div>
                            </div>
                            <div class="col-md-4">
                            <div class="form-group">
                                <label>Shippment Docs. To Nigeria Agent/Date</label>
                                <input type="date"  class="form-control" id="agentdate"/>
                            </div>
                        </div>
                            
                        </div>

                        <div class="row mt-4" id="fileChecks">
                            <div class="col-md-4">
                                <label>Shippment Document Received</label>
                                <div class="fileuploadDiv"> 
                                    
                                    <input type="file" id="shippmentDocs" name="file[]" class="fileUploadInputI" accept="application/pdf" multiple />
                                    <button class="btn btn-bg shippmentDocs">Choose File</button>
                                    <span class="number_files_I" id="number_files_I">No File Selected</span>
                                </div>
                                <div class="selectedFilesI" id="selectedFilesI"></div>
                            </div>
                            <div class="col-md-4">
                                <label>SONCAP for PAAR obtained</label>
                                <div class="fileuploadDiv"> 
                                    <input type="file" id="soncap" name="file[]" class="fileUploadInputII" accept="application/pdf" multiple/>
                                    <button class="btn btn-bg soncap">Choose File</button>
                                    <span class="number_files_II" id="number_files_II">No File Selected</span>
                                </div>
                                <div class="selectedFilesII" id="selectedFilesII">
                                    
                                    
                                </div>
                            </div>
                            <div class="col-md-4">
                                <label>PAAR Issued</label>
                                <div class="fileuploadDiv"> 
                                    <input type="file" id="paar" name="file[]" class="fileUploadInputIII" accept="application/pdf" multiple/>
                                    <button class="btn btn-bg paar">Choose File</button>
                                    <span class="number_files_III" id="number_files_III">No File Selected</span>
                                </div>
                                <div class="selectedFilesIII" id="selectedFilesIII"></div>
                            </div>
                        </div>

                        <div class="row mt-4">
                            <div class="col-md-4">
                                <button class="btn btn-primary btn-lg" id="saveShipmmentdetails">Save</button>
                            </div>
                        </div>


                        
                     

                    </div>

                 `
        return content;
}

function getaboardagent(){
   
    fetch('/procurement/app/customroute/getAgent')
    .then(res=>res.json())
    .then(result=>{
        let dataset="";
        if(result.status){

            result.data.forEach((d,index)=>{
                dataset +=  `
                            <option id=${d.id}>${d.agent_name}</option>
                            `
            })

            document.getElementById('abroadforwarder').innerHTML = dataset
            
        }

    })
    .catch(err=>console.log(err))
}






function fileloader(){
    let shipdocs  = document.querySelector('.fileUploadInputI');
    let soncap  = document.querySelector('.fileUploadInputII');
    let paar  = document.querySelector('.fileUploadInputIII');
   
    document.querySelector('.shippmentDocs').addEventListener('click',function(e){
        shipdocs.click();
        shipdocs.addEventListener("change", function() {
           
            let dataset = "";
            for(let i=0; i<shipdocs.files.length; i++){
              
               
                dataset += `
                            <div class="d-image">
                                 <div> <img src="../assets/images/file-pdf.svg"/></div>
                                <div id=${shipdocs.files[i].name}>${shipdocs.files[i].name}</div>
                                <span class="removeImage"></span>
                            </div>
                
                            `
                
            }
            document.querySelector('.selectedFilesI').innerHTML= dataset

            document.querySelector('.number_files_I').innerHTML = shipdocs.files.length  > 1 ? shipdocs.files.length +' Files Selected' : shipdocs.files.length +' File Selected';
        });
    })
    document.querySelector('.soncap').addEventListener('click',function(e){
        soncap.click();

        soncap.addEventListener("change", function() {
           
            let dataset = "";
            for(let i=0; i<soncap.files.length; i++){
              
             
                dataset += `
                            <div class="d-image">
                                 <div> <img src="../assets/images/file-pdf.svg"/></div>
                                <div id=${soncap.files[i].name}>${soncap.files[i].name}</div>
                                <span class="removeImage"></span>
                            </div>
                
                            `
                
            }
            document.querySelector('.selectedFilesII').innerHTML=dataset

            document.querySelector('.number_files_II').innerHTML = soncap.files.length  > 1 ? soncap.files.length +' Files Selected' : soncap.files.length +' File Selected';
        });
    })
    document.querySelector('.paar').addEventListener('click',function(e){
        paar.click();
        paar.addEventListener("change", function() {
           
            let dataset = "";
            for(let i=0; i<paar.files.length; i++){
              
               
                dataset += `
                            <div class="d-image">
                                 <div> <img src="../assets/images/file-pdf.svg"/></div>
                                <div id=${paar.files[i].name}>${paar.files[i].name}</div>
                                <span class="removeImage"></span>
                            </div>
                
                            `
                
            }
            
            document.querySelector('.selectedFilesIII').innerHTML=dataset

            document.querySelector('.number_files_III').innerHTML = paar.files.length  > 1 ? paar.files.length +' Files Selected' : paar.files.length +' File Selected';
        });
    })

    document.getElementById('fileChecks').addEventListener('click',function(e){
        
        if(e.target.classList.contains('removeImage')){
            
            x = e.target.parentElement
            y = x.parentElement
            // console.log(x)
            // console.log(y)
            for(let i =0; i< y.children.length;i++){
               y.children[i].remove(x)
            }
            // console.log(y.children)
        }
      
    })

    document.getElementById('saveShipmmentdetails').addEventListener('click',function(e){
        
        let date = document.getElementById('date').value;
        let mode_of_shippment = document.getElementById('mode_of_shippment').value;
        let paymentmode = document.getElementById('paymentmode').value;
        let abroadforwarder = document.getElementById('abroadforwarder').value;
        let abroadforwarder_addr = document.getElementById('abroadforwarder_addr').value;
        let cleared = document.getElementById('cleared').value;
        let agentname = document.getElementById('agentname').value;
        let agentname_date = document.getElementById('agentdate').value;

        let shipdocs  = document.getElementById('shippmentDocs');
        let soncap  = document.getElementById('soncap');
        let paar  = document.getElementById('paar');
        const formdata = new FormData();
       
        for (var i = 0; i < shipdocs.files.length; i++) {
            formdata.append('shipdocs[]', shipdocs.files[i]);
        }
        for (var i = 0; i < soncap.files.length; i++) {
            formdata.append('soncap[]', soncap.files[i]);
        }
        for (var i = 0; i < paar.files.length; i++) {
            formdata.append('paar[]', paar.files[i]);
        }

        for (var i = 0; i < newQuotation.length; i++) {
            formdata.append('xquotation[]', newQuotation[i]);
        }
        for (var i = 0; i < load.length; i++) {
            formdata.append('loadinfor[]',load[i])
            // formdata.append('xquotation[]', newQuotation[i]);
        }
        if(mode_of_shippment !="" && paymentmode!="" && abroadforwarder!="" && abroadforwarder_addr!="" && cleared !="" && agentname!="" && agentname_date!="" ){
            formdata.append('date',date);
            formdata.append('approve_id',1);
            formdata.append('mode_of_shippment',mode_of_shippment);
            formdata.append('paymentmode',paymentmode);
            formdata.append('abroadforwarder',abroadforwarder);
            formdata.append('abroadforwarder_addr',abroadforwarder_addr);
            formdata.append('cleared',cleared);
            formdata.append('agentname',agentname);
            formdata.append('agentname_date',agentname_date)
           

            fetch('/procurement/app/customroute/uploadShippment',{
                method:'POST',
                // headers: { "Content-type": "application/x-www-form-urlencoded"},
                body:formdata
            })
            .then(response=>response.json())
            .then(res=>{
               console.log(res) 
                
               if(res.status){
                    Swal.fire(res.data,'','success');
                    _push(`#PO`)
                    loadUrl('#PO');
                    newQuotation=[];
                    loadinfor=[];
                    
                    // document.getElementById("myform").reset();
                    var inputElements = document.getElementsByTagName('input');
                    var inputElementSelect = document.getElementsByTagName('select');

                    for (var i=0; i < inputElements.length; i++) {
                        if (inputElements[i].type == 'text' || inputElements[i].type == 'file'  ) {
                            inputElements[i].value = '';
                        }
                    }

                    document.getElementById('mode_of_shippment').value = ""
                    document.getElementById('selectedFilesI').innerHTML=""
                    document.getElementById('selectedFilesII').innerHTML=""
                    document.getElementById('selectedFilesIII').innerHTML=""
                    document.getElementById('number_files_I').innerHTML="No File Selected"
                    document.getElementById('number_files_II').innerHTML="No File Selected"
                    document.getElementById('number_files_III').innerHTML="No File Selected"
                    _push(`#PO`)
                    loadUrl('#PO');
               }
               else{

               }
            })
            .catch((err)=>{
                console.log(err)
            })

        }
    })
   
}


function getBodyContent(){
    document.querySelector('.tabDiv').addEventListener('click',function(e){
        
        let x = document.querySelector('.tabDiv').children;
        
        for(let i=0;i<x.length;i++){
            if(x[i].classList.contains('tab-active')){
                x[i].classList.remove('tab-active');
            }
        }
        e.target.classList.add('tab-active')
        document.querySelector('.render_body_content').innerHTML=""
        switchComponentBodyRender(e.target.textContent)
        
    })
   
}

function reviewStatus(id){
    document.querySelector('#status_review').addEventListener('change',function(e){
        if(e.target.value === "dispatched"){
            let buttonDiv =`
                        <div class="fileuploadDiv"> 
                                                    
                            <input type="file" id="dispatched" name="file[]" class="dispatched" accept="application/pdf" multiple />
                            <button class="btn btn-bg dispatchedDocs">Choose Dispatched File</button>
                            <span class="dispatched_file" id="dispatched_file">No File Selected</span>
                        </div>
                        <div class="dispatched_select" id="dispatched_select"></div>
                        `
                        document.getElementById('supporting_docs').innerHTML = buttonDiv
                        uploadSupportDocs(id);
        }
        else if(e.target.value === "package received by agent"){
            let buttonDiv =`
                        <div class="fileuploadDiv"> 
                                                    
                            <input type="file" id="package" name="file[]" class="package" accept="application/pdf" multiple />
                            <button class="btn btn-bg packageDocs">Choose Package Received By Agent File</button>
                            <span class="package_file" id="package_file">No File Selected</span>
                        </div>
                        <div class="package_select" id="package_select"></div>
                        `
                        document.getElementById('supporting_docs').innerHTML = buttonDiv
                        uploadSupportDocs(id);
        }
        else if(e.target.value === "shipped by agent"){
            let buttonDiv =`
                        <div class="fileuploadDiv"> 
                                                    
                            <input type="file" id="package" name="file[]" class="shipped" accept="application/pdf" multiple />
                            <button class="btn btn-bg shippedDocs">Choose Shipped By Agent File</button>
                            <span class="shipped_file" id="shipped_file">No File Selected</span>
                        </div>
                        <div class="shipped_select" id="shipped_select"></div>
                        `
                    document.getElementById('supporting_docs').innerHTML = buttonDiv
                    uploadSupportDocs(id);
        }
        else if(e.target.value === "delivered"){
            let buttonDiv =`
                        <div class="fileuploadDiv"> 
                                                    
                            <input type="file" id="package" name="file[]" class="delivered" accept="application/pdf" multiple />
                            <button class="btn btn-bg deliveredDocs">Choose  Delivery File</button>
                            <span class="delivered_file" id="delivered_file">No File Selected</span>
                        </div>
                        <div class="delivered_select" id="delivered_select"></div>
                        `
                        document.getElementById('supporting_docs').innerHTML = buttonDiv
                        uploadSupportDocs(id);
        }
    })
   
}

function uploadSupportDocs(id){
    let dispatched  = document.querySelector('.dispatched');
    let package  = document.querySelector('.package');
    let shipped  = document.querySelector('.shipped');
    let delivered  = document.querySelector('.delivered');

    if(document.querySelector('.dispatchedDocs')){
        
        document.querySelector('.dispatchedDocs').addEventListener('click',function(e){
            dispatched.click();
            dispatched.addEventListener("change", function() {
           
                let dataset = "";
                for(let i=0; i<dispatched.files.length; i++){
                  
                   
                    dataset += `
                                <div class="d-image">
                                     <div> <img src="../assets/images/file-pdf.svg"/></div>
                                    <div id=${dispatched.files[i].name}>${dispatched.files[i].name}</div>
                                    <span class="removeImage"></span>
                                </div>
                    
                                `
                    
                }
                
                document.querySelector('.dispatched_select').innerHTML=dataset
    
                document.querySelector('.dispatched_file').innerHTML = dispatched.files.length  > 1 ? dispatched.files.length +' Files Selected' : dispatched.files.length +' File Selected';
            });

        })
    }
    
    if(document.querySelector('.packageDocs')){
        document.querySelector('.packageDocs').addEventListener('click',function(e){
            package.click();
            package.addEventListener("change", function() {
           
                let dataset = "";
                for(let i=0; i<package.files.length; i++){
                  
                   
                    dataset += `
                                <div class="d-image">
                                     <div> <img src="../assets/images/file-pdf.svg"/></div>
                                    <div id=${package.files[i].name}>${package.files[i].name}</div>
                                    <span class="removeImage"></span>
                                </div>
                    
                                `
                    
                }
                
                document.querySelector('.package_select').innerHTML=dataset
    
                document.querySelector('.package_file').innerHTML = package.files.length  > 1 ? package.files.length +' Files Selected' : package.files.length +' File Selected';
            });
        })
    }
    if(document.querySelector('.shippedDocs')){
        document.querySelector('.shippedDocs').addEventListener('click',function(e){
            shipped.click();
            shipped.addEventListener("change", function() {
           
                let dataset = "";
                for(let i=0; i<shipped.files.length; i++){
                  
                   
                    dataset += `
                                <div class="d-image">
                                     <div> <img src="../assets/images/file-pdf.svg"/></div>
                                    <div id=${shipped.files[i].name}>${shipped.files[i].name}</div>
                                    <span class="removeImage"></span>
                                </div>
                    
                                `
                    
                }
                
                document.querySelector('.shipped_select').innerHTML=dataset
    
                document.querySelector('.shipped_file').innerHTML = shipped.files.length  > 1 ? shipped.files.length +' Files Selected' : shipped.files.length +' File Selected';
            });
        })
    }
   if(document.querySelector('.deliveredDocs')){
        document.querySelector('.deliveredDocs').addEventListener('click',function(e){
            delivered.click();
            delivered.addEventListener("change", function() {
           
                let dataset = "";
                for(let i=0; i<delivered.files.length; i++){
                  
                   
                    dataset += `
                                <div class="d-image">
                                     <div> <img src="../assets/images/file-pdf.svg"/></div>
                                    <div id=${delivered.files[i].name}>${delivered.files[i].name}</div>
                                    <span class="removeImage"></span>
                                </div>
                    
                                `
                    
                }
                
                document.querySelector('.delivered_select').innerHTML=dataset
    
                document.querySelector('.delivered_file').innerHTML = delivered.files.length  > 1 ? delivered.files.length +' Files Selected' : delivered.files.length +' File Selected';
            });
        })
   }

   uploadSupportDocsToDB(id);
   
}

function uploadSupportDocsToDB(id){
    document.querySelector('.shippmentUpdate').addEventListener('click',function(e){
        e.preventDefault();
        let status = document.getElementById('status_review').value;
        let dateOfUpdate = document.getElementById('dateofupdate').value
        let approve_id = document.getElementById('approve_id').value
      
        let dispatched  = document.querySelector('.dispatched');
        let package  = document.querySelector('.package');
        let shipped  = document.querySelector('.shipped');
        let delivered  = document.querySelector('.delivered');
        const formdata = new FormData();
        
        
       if(status === "dispatched"){
        console.log(dispatched.files)
            for (var i = 0; i < dispatched.files.length; i++) {
                formdata.append('dispatched[]', dispatched.files[i]);
            }
       }
       else if(status === "package received by agent"){
        console.log(package.files)
            for (var i = 0; i < package.files.length; i++) {
                formdata.append('package[]', package.files[i]);
            }
       }
       else if(status === "shipped by agent"){
        console.log(shipped.files)
            for (var i = 0; i < shipped.files.length; i++) {
                formdata.append('shipped[]', shipped.files[i]);
            }
       }
       else if(status === "delivered"){
        console.log(delivered.files)
            for (var i = 0; i < delivered.files.length; i++) {
                formdata.append('delivered[]', delivered.files[i]);
            }
        }

        

        formdata.append('dateupdate',dateOfUpdate);
        formdata.append('status',status);
        formdata.append('approve_id',id);

        fetch('/procurement/app/customroute/uploadShippmentUpdate',{
            method:'POST',
            // headers: { "Content-type": "application/x-www-form-urlencoded"},
            body:formdata
        })
        .then(response=>response.json())
        .then(res=>{
           console.log(res) 
           if(res.status){
            Swal.fire(res.data,'','success');
                _push(`#Shippment`)
                loadUrl('#Shippment');
           }
           else{
                Swal.fire(res.data,'','error');
           }
            
          
           
        })
        .catch((err)=>{
            console.log(err)
        })

        
    })
}

