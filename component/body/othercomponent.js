let count =true;
function otherComponent(name){
    let wrapper =  document.getElementById('component-body');
    var search = location.hash.replace('#','');
    var splitSplash = search.split('/');


    if(splitSplash.length > 1){
       
        
           
        let getContent = Switcher(splitSplash[0]+''+ splitSplash[1],splitSplash[splitSplash.length - 1]);
        wrapper.innerHTML=getContent
        makeloader(splitSplash[splitSplash.length - 1]);
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



// function Item(search){
//     let content = ` 
//                 <div class="supplierDiv">
//                     <div class="tabDiv">
//                         <div>Add Order</div>
//                         <div>All Order</div>
//                     </div>

//                     <div class="tab-body-more">
                            
                            

//                     </div>
                

//                 </div>

//              `
//     return content;
// }

// function Approval(search){
//     let content = ` 
//                 <div class="supplierDiv">
//                     <div class="tabDiv">
//                         <div class="tab-active">Pending Approval</div>
//                         <div>Treated Approval</div>
//                     </div>

//                     <div class="render_body_content approval">
//                        ${ApprovalHTML()}
//                     </div>
                

//                 </div>

//              `
//     return content;
// }

function ApprovalDetails(xcontent){
    let content = ` 
            <div class="supplierDiv">
                <div class="loaderx">
                    <div class="roundingx"></div>

                </div>
                <div class="approvalmodal">
                    <div class="approvalmodalcard">

                    </div>
                </div>
                <div class="title"></div>

                <div class="contentList">
                    <table class="table table-stripe table-bordered">
                        <thead>   
                                <tr>
                                    <th>SN</th>
                                    <th>SUPPLIER NAME</th>
                                    <th>QUANTITY</th>
                                    <th>UNIT PRICE</th>
                                    <th>TOTAL PRICE</th>
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

function PO(search){
    let content = ` 
                <div class="supplierDiv">

                    <div class="tabDiv">
                        <div class="tab-active">Pending PO Approval</div>
                        <div class="">All Approved</div>
                    </div>
                    <div class="POmodal">
                        <div class="POcontentmodal"></div>
                    </div>

                    <div class="render_body_content approval">
                       ${POHTML()}
                    </div>
                

                </div>

             `
    return content;
}


function Shippment(search){
    let content = ` 
                <div class="supplierDiv">

                    <div class="tabDiv">
                        <div class="tab-active">Awaiting Shippment</div>
                        <div class="">Processing</div>
                        <div class="">Delivered</div>
                    </div>
                    <div class="POmodal">
                        <div class="POcontentmodal"></div>
                    </div>

                    <div class="render_body_content approval">
                       ${ShippmentHTML()}
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



