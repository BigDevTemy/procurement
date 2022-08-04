function Order(search){
    let content = ` 
                    <div class="supplierDiv">
                        <div class="tabDiv">
                            <div class="tab-active">Add Order</div>
                            <div>All Order</div>
                        </div>
                        <div class="tab-body render_body_content">
                            ${loadOrderDefault()}
                           
                        </div>
                    </div>
    
                `
    return content;
   
}



function loadOrderDefault(){
    return `
                <div>
                    <label>Order name</label>
                    <input type="text" class="form-control selector" placeholder="Create Order" id="order_title"/>
                </div>

                <div>
                    <input type="submit" class="form-control selectorSave" value="Save" id="saveOrder"/>
                </div>

                `
        //document.querySelector('.render_body_content').innerHTML = content
}
function AddOrder(){
    let content =
                `
                    <div>
                        <label>Order name</label>
                        <input type="text" class="form-control selector" placeholder="Create Order" id="order_title"/>
                    </div>

                    <div>
                        <input type="submit" class="form-control selectorSave" value="Save" id="saveOrder"/>
                    </div>

                `
        document.querySelector('.render_body_content').innerHTML = content
}

function AllOrder(){
    let content =`
                    <h1>Welcome To All Orders</h1>
                `
        document.querySelector('.render_body_content').innerHTML = content
}


