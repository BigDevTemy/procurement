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
                    <div class="div-2-element">
                        <div>
                            <label>User</label>
                            <input type="text" class="form-control selector" value=${username} disabled placeholder="Create Order"/>
                        </div>
                        <div>
                            <label>Order Ref</label>
                            <input type="text" id="order_ref" class="form-control selector" disabled placeholder="Order ref" disabled/>
                        </div>
                        
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
                        <input type="file" id="fileInput" name="file[]" class="fileUploadInput" accept="application/pdf" />
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
    
    let content =  `
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
                            <div ><input type="text" disabled value=1 class="form-control"/></div>
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
            document.querySelector('.render_body_content').innerHTML = content
}


   
function AllRequisition(){
      
        let content = `<table id="requisition" class="table table-striped table-bordered" style="width:100%">
                            <thead>
                                <tr>
                                    <th>SN</th>
                                    <th>ORDER TITLE</th>
                                    <th>ORDER REF</th>
                                    <th>SUPPLIER NAME</th>
                                    <th>QUOTATION RECEIPT</th>
                                    <th>QUANTITY</th>
                                    <th>UNIT PRICE</th>
                                    <th>TOTAL PRICE</th>
                                    <th>DATE</th>
                                    <th>ACTION</th>
                                </tr>
                            </thead>
                        </table>`

        document.querySelector('.render_body_content').innerHTML = content

        allrequisition();
        
}


function allrequisition(){
    
    let table = $('#requisition').DataTable({
         
        "processing":true,
        "destroy":true,
        "serverSide":true,
        
        'dom': "Bfrtip",
        "ajax":{
             url:'/procurement/app/customroute/allrequisition',
             type:"GET"
             
        },
        "columns":[
             
                 {data:"id"},
                 {data:"order_title"},
                 {data:"order_ref"},
                 {data:"supplier_name"},

                 {
                    data:"",
                    render:function(data,type,row){
                     
                        return `<a href="/procurement/quotation/${row.quotation_receipt}">quotation_receipt</a>`
                      } 
                    
                },
                 {data:"quantity"},
                 {data:"unit"},
                 {data:"total_price"},
                 {data:"created_at"},
                 {
                     data:"",
                     render:function(data,type,row){
                   
                         return `<div>
                                    <button  class="btn btn-danger" onclick="deleteItem('requisition',${row.supplier_id},${row.order_id})">Delete</button>
                                </div>`
                       } 
                 }
             
        ]   

         

     });
}



