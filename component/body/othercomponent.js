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
            makeloader(splitSplash[splitSplash.length - 1]);
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
                        <div> Back</div> 
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
                                    <select class="form-control select">
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
                                    <input type="text" class="form-control" placeholder="Payment Mode"/>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label>Receive by Abroad Forwarder</label>
                                   <input type="text" class="form-control" placeholder="Receive by Abroad Forwarder"/>
                                </div>
                            </div>
                        </div>
                        <div class="row mt-4">
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label>Delivery address/abroad forwarder details</label>
                                    <textarea  class="form-control" placeholder="Delivery address"></textarea>
                                </div>
                            </div>
                            
                        </div>
                        <div class="row mt-4">
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label>Cleared Amount</label>
                                    <input type="text" placeholder="Cleared" class="form-control"/>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label>Shippment Docs. To Nigeria Agent/Name</label>
                                    <input type="text" placeholder="Agent Name" class="form-control"/>
                                </div>
                            </div>
                            <div class="col-md-4">
                            <div class="form-group">
                                <label>Shippment Docs. To Nigeria Agent/Date</label>
                                <input type="date"  class="form-control"/>
                            </div>
                        </div>
                            
                        </div>

                        <div class="row mt-4">
                            <div class="col-md-4">
                                <label>Shippment Document Received</label>
                                <div class="fileuploadDiv"> 
                                    
                                    <input type="file" id="shippmentDocs" name="file[]" class="fileUploadInput" accept="application/pdf" />
                                    <button class="btn btn-bg">Choose File</button>
                                    <span class="number_files">No File Selected</span>
                                </div>
                                <div class="selectedFiles">
                                    
                                    
                                </div>
                            </div>
                            <div class="col-md-4">
                                <label>SONCAP for PAAR obtained</label>
                                <div class="fileuploadDiv"> 
                                    <input type="file" id="soncap" name="file[]" class="fileUploadInput" accept="application/pdf" />
                                    <button class="btn btn-bg">Choose File</button>
                                    <span class="number_files">No File Selected</span>
                                </div>
                                <div class="selectedFiles">
                                    
                                    
                                </div>
                            </div>
                            <div class="col-md-4">
                            <label>PAAR Issued</label>
                            <div class="fileuploadDiv"> 
                                <input type="file" id="paarIssued" name="file[]" class="fileUploadInput" accept="application/pdf" />
                                <button class="btn btn-bg">Choose File</button>
                                <span class="number_files">No File Selected</span>
                            </div>
                            <div class="selectedFiles"></div>
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



