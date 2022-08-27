
function filterApproval(){
   
    document.querySelector('.modalClass').classList.add('modalClassCustom');
    let content =  ` 
                    <div class="customModal modalFilter">
                            <div class="modalTitle mb-4">
                                <div> 
                            
                                </div> 
                                <div class="closeModal">X</div>
                            </div>
                            

                            <div class="modalBody">
                            
                            <div class="row">
                                <div class="col-md-4">
                                    <select id="select_order" class="form-control">
                                        <option>Order Type</option>
                                    </select>
                                </div>
                                <div class="col-md-4">
                                    <select class="form-control">
                                        <option>All Suppliers</option>
                                    </select>
                                </div>
                                <div class="col-md-4">
                                    <select class="form-control">
                                        <option>Status</option>
                                        <option value="pending">Pending</option>
                                        <option value="approved">Approved</option>
                                        <option value="rejected">Rejected</option>
                                    </select>
                                </div>

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

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function fetchEdit(supplierid,orderid,id){

    
}


