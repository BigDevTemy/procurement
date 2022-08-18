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
                            <label>Date</label>
                            <input type="date" class="form-control selector" id="dateofcreation" />
                        </div>
                        <div>
                            <label>Serial Quotation Number</label>
                            <input type="text" id="serial_number" class="form-control selector"  placeholder="Serial Quotation Number" />
                        </div>
                        
                    </div>
                    <div class="div-2-element">
                        <div>
                            <label>File Ref</label>
                            <input type="text" id="file_ref" class="form-control selector" placeholder="File Ref"/>
                        </div>
                        <div>
                            <label>Project Name</label>
                            <input type="text" id="project_name" class="form-control selector"  placeholder="Project name" />
                        </div>
                        
                    </div>
                    <div class="div-2-element">
                        <div>
                            <label>Ref Number</label>
                            <input type="text" id="refnumber" class="form-control selector" placeholder="Ref Number"/>
                        </div>
                        <div>
                            <label>Date of Sending Name</label>
                            <input type="date" id="dateofsending" class="form-control selector"  />
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
                    <div class="currencyDiv">
                        <button class="btn btn-md btn-danger">Delete</button>
                        <select class="form-control">
                            <option value="">SELECT CURRENCY</option>
                            <option value="USD">USD</option>
                            <option value="GBP">GBP</option>
                            <option value="EURO">EURO</option>
                            <option value="YEN">YEN</option>
                        </select>
                    </div>
                    <div class="contentHeader">
                        <div>SN</div>
                        <div>Description</div>
                        <div>Quantity</div>
                        <div>Unit Price</div>
                        <div>Total Price</div>
                    </div>
                    <div class="contentParent">
                        <div class="content">
                            <div><input type="text" value=1 class="form-control" disabled /></div>
                            <div><input type="text" placeholder="description" class="form-control "/></div>
                            <div><input type="text" placeholder="quantity" value="0"  class="form-control"/></div>
                            <div><input type="text" placeholder="unit price" value="0"  class="form-control"/></div>
                            <div><input type="text" placeholder="total price" value="0" disabled  class="form-control"/></div>
                            
                        </div>
                    </div>
                    <div class="discount_content">
                        
                        <div class="discountDiv"><input type="text" placeholder="discount in %"  class="form-control"/></div>
                    </div>
                    <div class="discount_content">
                        
                    <div class="discountDiv">Total:0</div>
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

                    <div class="mt-4">
                        <label for="note">Note:</label>

                        <textarea class="form-control" id="note" rows="4" cols="50">
                        
                        </textarea>
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
                                <label>Date</label>
                                <input type="date" class="form-control selector" id="dateofcreation" />
                            </div>
                            <div>
                                <label>Serial Quotation Number</label>
                                <input type="text" id="serial_number" class="form-control selector"  placeholder="Serial Quotation Number" />
                            </div>
                            
                        </div>
                        <div class="div-2-element">
                            <div>
                                <label>File Ref</label>
                                <input type="text" id="file_ref" class="form-control selector" placeholder="File Ref"/>
                            </div>
                            <div>
                                <label>Project Name</label>
                                <input type="text" id="project_name" class="form-control selector"  placeholder="Project name" />
                            </div>
                            
                        </div>
                        <div class="div-2-element">
                            <div>
                                <label>Ref Number</label>
                                <input type="text" id="refnumber" class="form-control selector" placeholder="Ref Number"/>
                            </div>
                            <div>
                                <label>Date of Sending Name</label>
                                <input type="date" id="dateofsending" class="form-control selector"  />
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
                        <div class="currencyDiv">
                            <button class="btn btn-md btn-danger">Delete</button>
                            <select class="form-control">
                                <option value="">SELECT CURRENCY</option>
                                <option value="USD">USD</option>
                                <option value="GBP">GBP</option>
                                <option value="EURO">EURO</option>
                                <option value="YEN">YEN</option>
                            </select>
                        </div>
                        <div class="contentHeader">
                            <div>SN</div>
                            <div>Description</div>
                            <div>Quantity</div>
                            <div>Unit Price</div>
                            <div>Total Price</div>
                        </div>
                        <div class="contentParent">
                            <div class="content">
                                <div><input type="text" value=1 class="form-control" disabled /></div>
                                <div><input type="text" placeholder="description" class="form-control "/></div>
                                <div><input type="text" placeholder="quantity" value="0"  class="form-control"/></div>
                                <div><input type="text" placeholder="unit price" value="0"  class="form-control"/></div>
                                <div><input type="text" placeholder="total price" value="0" disabled  class="form-control"/></div>
                                
                            </div>
                        </div>
                        <div class="discount_content">
                            
                            <div class="discountDiv"><input type="text" placeholder="discount in %"  class="form-control"/></div>
                        </div>
                        <div class="discount_content">
                            
                        <div class="discountDiv">Total:0</div>
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

                        <div class="mt-4">
                            <label for="note">Note:</label>

                            <textarea class="form-control" id="note" rows="4" cols="50">
                            
                            </textarea>
                        </div>

                        
                        <div class="submitBtnParent">
                            <button class="btn btn-bg uploadRequisition">Upload Requisition For Approval</button>
                        </div>
                    </div>

    
            `
            document.querySelector('.render_body_content').innerHTML = content
            if(document.querySelector('.currencyDiv')){
                let x = document.querySelector('.contentParent').children
                if(x.length == 1){
                    document.querySelector('.btn-danger').classList.add('hideDelete');
                }
            }
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



