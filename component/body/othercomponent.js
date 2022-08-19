let count =true;
function otherComponent(name){
    let wrapper =  document.getElementById('component-body');
    var search = location.hash.replace('#','');
    var splitSplash = search.split('/');

    console.log(splitSplash)
    if(splitSplash.length > 1){
    //    console.log(splitSplash[0]+''+ splitSplash[1])
        let getContent = Switcher(splitSplash[0]+''+ splitSplash[1],splitSplash[splitSplash.length - 1]);
        wrapper.innerHTML=getContent
        if(splitSplash[0] === "Approval"){
            makeloader(splitSplash[splitSplash.length - 1]);
        }
        else if(splitSplash[0] === "PO"){
            if(newQuotation.length >0){
                makeloader(splitSplash[splitSplash.length - 1]);
                fileloader();
            } 
            else{
                _push(`#PO`)
                loadUrl('#PO');
            }  
            
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
        case 'Requisition':
            return Requisition(search);
            break;
        case 'Report':
            return Report(search);
            break;
        case 'Approvaldetails':
            return ApprovalDetails(additional)
        case 'PO':
            return PO(search);
        case 'Shippment':
            return Shippment(search)
        case 'Shippmentreview':
            return Shippmentreview(additional)
        case 'POshippment':
            return ShippmentDetails(additional)
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
       
        case 'Requisition':
            return saveRequisitionModule();
            break;
        case 'Report':
            return saveReportModule();
            break;
       

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

function ShippmentDetails(additional){
    let content = ` 
                    <div class="supplierDiv">
                        <div> << Back</div> 
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
                                   <input type="text" class="form-control" placeholder="Receive by Abroad Forwarder" id="abroadforwarder" />
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
                                    <span class="number_files_I">No File Selected</span>
                                </div>
                                <div class="selectedFilesI"></div>
                            </div>
                            <div class="col-md-4">
                                <label>SONCAP for PAAR obtained</label>
                                <div class="fileuploadDiv"> 
                                    <input type="file" id="soncap" name="file[]" class="fileUploadInputII" accept="application/pdf" multiple/>
                                    <button class="btn btn-bg soncap">Choose File</button>
                                    <span class="number_files_II">No File Selected</span>
                                </div>
                                <div class="selectedFilesII">
                                    
                                    
                                </div>
                            </div>
                            <div class="col-md-4">
                                <label>PAAR Issued</label>
                                <div class="fileuploadDiv"> 
                                    <input type="file" id="paar" name="file[]" class="fileUploadInputIII" accept="application/pdf" multiple/>
                                    <button class="btn btn-bg paar">Choose File</button>
                                    <span class="number_files_III">No File Selected</span>
                                </div>
                                <div class="selectedFilesIII"></div>
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




function Report(search){
    let content = ` 
            <div class="supplierDiv">
                <div class="tabDiv">
                    <div>Add Report</div>
                    <div>All Report</div>
                </div>

                <div class="report">
                    NO DATA
                </div>
            

            </div>

             `
    return content;
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
        console.log(soncap.files)
        console.log(paar.files)
        console.log(shipdocs.files)
        for (var i = 0; i < shipdocs.files.length; i++) {
            formdata.append('shipdocs[]', shipdocs.files[i]);
        }
        for (var i = 0; i < soncap.files.length; i++) {
            formdata.append('soncap[]', soncap.files[i]);
        }
        for (var i = 0; i < paar.files.length; i++) {
            formdata.append('paar[]', paar.files[i]);
        }
        if(mode_of_shippment !="" && paymentmode!="" && abroadforwarder!="" && abroadforwarder_addr!="" && cleared !="" && agentname!="" && agentname_date!="" ){
            formdata.append('date',date);
            formdata.append('mode_of_shippment',mode_of_shippment);
            formdata.append('paymentmode',paymentmode);
            formdata.append('abroadforwarder',abroadforwarder);
            formdata.append('abroadforwarder_addr',abroadforwarder_addr);
            formdata.append('cleared',cleared);
            formdata.append('agentname',agentname);
            formdata.append('agentname_date',agentname_date)
            formdata.append('newQuotation[]',newQuotation)

            fetch('/procurement/app/customroute/uploadShippment',{
                method:'POST',
                // headers: { "Content-type": "application/x-www-form-urlencoded"},
                body:formdata
            })
            .then(response=>response.json())
            .then(res=>{
               console.log(res) 
               
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



