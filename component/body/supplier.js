function Supplier(search){
    let content = ` 
                    <div class="supplierDiv">
                        <div class="tabDiv">
                            <div class="tab-active">Add Supplier</div>
                            <div>All Supplier</div>
                        </div>
                        <div class="tab-body render_body_content">
                            ${loadSupplierDefault()}
                           
                        </div>
                    </div>
    
                `
    return content;
   
}



function loadSupplierDefault(){
    return `
                <div>
                    <label>Company Name</label>
                    <input type="text" class="form-control selector" placeholder="Provide Supplier Name" id="supplier_name"/>
                </div>

                <div>
                    <label>Company Address</label>
                    <input type="text" class="form-control selector" id="supplieraddress" placeholder="Provide Company Address (optional)"/>
                </div>
                <div>
                    <label>Company Contact</label>
                    <input type="text" class="form-control selector" id="suppliercontact" placeholder="Provide Company Contact Number (optional)"/>
                </div>
                <div>
                    <input type="submit" class="form-control selectorSave" value="Save" id="saveSupplier"/>
                </div>

                `
        //document.querySelector('.render_body_content').innerHTML = content
}
function AddSupplier(){
    let content =`
                    <div>
                    <label>Company Name</label>
                    <input type="text" class="form-control selector" placeholder="Provide Supplier Name" id="supplier_name"/>
                    </div>

                <div>
                    <label>Company Address</label>
                    <input type="text" class="form-control selector" placeholder="Provide Supplier Address" id="supplieraddress"/>
                </div>
                <div>
                    <label>Company Contact</label>
                    <input type="text" id="suppliercontact" class="form-control selector" placeholder="Provide Company Contact Number (optional)"/>
                </div>
                <div>
                    <input type="submit" class="form-control selectorSave" value="Save" id="saveSupplier"/>
                </div>

                `
        document.querySelector('.render_body_content').innerHTML = content
}

function AllSupplier(){
    let content =`
                    <h1>Welcome To All Supplier</h1>
                `
        document.querySelector('.render_body_content').innerHTML = content
}


