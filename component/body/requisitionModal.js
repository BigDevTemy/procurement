const newQuotationEdit = [];
const loadEdit = [];
function requisitionModal(rowid){
   
    document.querySelector('.modalClass').classList.add('modalClassCustom');
    let content =  ` 
                    <div class="customModal modalApproval">
                            <div class="modalTitle">
                                <div> 
                            
                                </div> 
                                <div class="closeModal">X</div>
                            </div>
                            

                            <div class="modalBody">
                               <div id="suppliername">${rowid}</div>
                               <div id="addr"></div>
                               <div id="phonenumber"></div>
                               <div id="invoice"></div>
                                

                               <table class="table table-striped table-bordered">
                                    <thead>
                                        <tr>
                                            <td>SN</td>
                                            <td>Description</td>
                                            <td>Quantity</td>
                                            <td>Price</td>
                                            <td>Total</td>
                                        </tr>
                                    </thead>
                                    <tbody id="tbody">

                                    </tbody>

                               </table>
                               <div class="discountTotal">
                                    <div>Discount(%)</div> 
                                    <div id="discount">0%</div>
                                </div>
                                <div class="discountTotal">
                                    <div>Grand Total</div> 
                                    <div id="grandtotal">0</div>
                                </div>
                            </div>

                            <div class="modalFooter">
                                <div class="mybutton">
                                    <button class="btn btn-primary" >Save</button>
                                    
                                    
                                </div>
                            </div>
                    </div>
        `

        document.querySelector('.modalClass').innerHTML=content
        close();
        
        
}

function close(){
    document.querySelector('.closeModal').addEventListener('click',function(e){
        document.querySelector('.modalClass').classList.remove('modalClassCustom');
        document.querySelector('.modalClass').innerHTML=""
    })
}


