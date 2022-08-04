function Requisition(search){
    let content = ` 
                        <div class="supplierDiv">
                            <div class="tabDiv">
                                <div class="tab-active">Add Requisition</div>
                                <div>All Requisition</div>
                                
                            </div>
                            <div class="render_body_content">
                                ${loadRequisitionDefault()}
                            </div>
                            
                        

                        </div>

                    `
                    return content;
   
}



function loadRequisitionDefault(){
    let username = document.getElementById('username').value
    
    return `
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
                            <div ><input type="text" value=1 class="form-control" /></div>
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
    
            `
}

function AddRequisition(){
    let username = document.getElementById('username').value
    
    return `
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
                            <div ><input type="text" value=1 class="form-control" /></div>
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
    
            `
}


   
function AllRequisition(){
    let content =`
                    <h1>Welcome To All Requisition</h1>
                `
        document.querySelector('.render_body_content').innerHTML = content
}


