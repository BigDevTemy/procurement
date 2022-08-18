function modal(supplierid,orderid,suppliername){

    document.querySelector('.modalClass').classList.add('modalClassCustom');
    let content =  ` 
                    <div class="customModal">
                            <div class="modalTitle">
                                <div> 
                                    <h4>${suppliername}</h4>
                                </div> 
                                <div class="closeModal">X</div>
                            </div>

                            <div class="modalBody">
                               
                            </div>

                            <div class="modalFooter">
                            
                            </div>



                    </div>
    
    
        `

        document.querySelector('.modalClass').innerHTML=content
        // modalContent(title,Id);
        // close();
}


function modalContent(title,Id){
    switch(title){
        case 'Edit Supplier':
            return editSupplier(Id);
            break;
        case 'Edit Order Title':
            return editOrder(Id);
        default:

    }
}


function close(){
    document.querySelector('.closeModal').addEventListener('click',function(e){
        document.querySelector('.modalClass').classList.remove('modalClassCustom');
        document.querySelector('.modalClass').innerHTML=""
    })
}