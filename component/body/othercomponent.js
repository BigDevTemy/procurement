function otherComponent(name){
    let wrapper =  document.getElementById('component-body');
    var search = location.hash.replace('#','');
    
    let getContent = Switcher(search);
    
    wrapper.innerHTML=getContent

    document.querySelector('.tabDiv').children[0].classList.add('tab-body-active');
    let getContentIDCall = SwitcherContent(search);
}


function Switcher(search){

    switch(search){
        case 'Supplier':
            return Supplier(search)
            break;
        case 'Order':
            return Item(search)
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
        case 'Approval':
            return saveApprovalModule();
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

function Supplier(search){
    let content = ` 
                    <div class="supplierDiv">
                        <div class="tabDiv">
                            <div>Add Supplier</div>
                            <div>All Supplier</div>
                        </div>
                        <div class="tab-body">
                            
                            <div>
                                <label>Company Name</label>
                                <input type="text" class="form-control selector" placeholder="Provide Supplier Name" id="supplier_name"/>
                            </div>

                            <div>
                                <label>Company Address</label>
                                <input type="text" class="form-control selector" placeholder="Provide Company Address (optional)"/>
                            </div>
                            <div>
                                <label>Company Contact</label>
                                <input type="text" class="form-control selector" placeholder="Provide Company Contact Number (optional)"/>
                            </div>
                            <div>
                                <input type="submit" class="form-control selectorSave" value="Save" id="saveSupplier"/>
                            </div>

                        </div>
                    

                    </div>
    
                `
    return content;
   
}

function Item(search){
    let content = ` 
                <div class="supplierDiv">
                    <div class="tabDiv">
                        <div>Add Order</div>
                        <div>All Order</div>
                    </div>

                    <div class="tab-body-more">
                            
                            <div>
                                <label>Order name</label>
                                <input type="text" class="form-control selector" placeholder="Create Order" id="order_title"/>
                            </div>

                            <div>
                                <input type="submit" class="form-control selectorSave" value="Save" id="saveOrder"/>
                            </div>

                    </div>
                

                </div>

             `
    return content;
}

function Approval(search){
    let content = ` 
                <div class="supplierDiv">
                    <div class="tabDiv">
                        <div>Pending Approval</div>
                        <div>Treated Approval</div>
                    </div>

                    <div class="approval">
                        NO PENDING APPROVAL
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

function Requisition(search){
    let username = document.getElementById('username').value
    let content = ` 
            <div class="supplierDiv">
                <div class="tabDiv">
                    <div>Add Requisition</div>
                    <div>All Requisition</div>
                    
                </div>
                <div class="tab-body-order-2">
                    <div>
                        <label>User</label>
                        <input type="text" class="form-control selector" value=${username} disabled placeholder="Create Order"/>
                    </div>
                    <div class="div-2-element">
                        <div>
                            <label>Select Order</label>
                            <select class="form-control ordertype" id="ordertype">
                                <option value="">SELECT ORDER TYPE</option>
                                
                               
                            </select>
                        </div>
                        <div>
                            <label>Select Supplier</label>
                            <select class="form-control allsupplier" id="allsupplier">
                                <option value="">SELECT SUPPLIER</option>
                                
                            </select>
                        </div>
                        
                    </div>

                </div>

                <div class="tab-body-more">
                    <div class="contentHeader">
                        <div>SN</div>
                        <div>Description</div>
                        <div>Quantity</div>
                        <div>ABC Price</div>
                        <div>ABC Total</div>
                        <div>Unit Price</div>
                        <div>Total Price</div>
                    </div>
                    <div class="contentParent">
                        <div class="content">
                            <div class="sn">1</div>
                            <div><input type="text" placeholder="description" class="form-control"/></div>
                            <div><input type="text" placeholder="quantity"  class="form-control"/></div>
                            <div><input type="text" placeholder="abc price"  class="form-control"/></div>
                            <div><input type="text" placeholder="abc total"  class="form-control"/></div>
                            <div><input type="text" placeholder="unit price"  class="form-control"/></div>
                            <div><input type="text" placeholder="total price"  class="form-control"/></div>
                            
                        </div>
                    </div>
                    <div class="addrow">
                    <button class="btn btn-secondary rowplus">+ Add row(s)</button>
                    </div>
                    
                    <div class="uploadattachment">Add/Upload Attachment</div>
                    <div class="fileuploadDiv"> 
                        <input type="file" id="fileInput" name="file[]" class="fileUploadInput" accept="application/pdf" multiple />
                        <button class="btn btn-bg">Choose File</button>
                        <span class="number_files">No File Selected</span>
                    </div>
                    <div class="selectedFiles">
                        
                        
                    </div>

                    
                    <div class="submitBtnParent">
                        <button class="btn btn-bg uploadRequisition">Upload Requisition For Approval</button>
                    </div>
                </div>
                
            

            </div>

             `
    return content;
}

