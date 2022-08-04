let count =true;
function otherComponent(name){
    let wrapper =  document.getElementById('component-body');
    var search = location.hash.replace('#','');
    var splitSplash = search.split('/');


    if(splitSplash.length > 1){
     
        if(count){
            let getContent = Switcher(splitSplash[0]+''+ splitSplash[1],splitSplash[splitSplash.length - 1]);
            wrapper.innerHTML=getContent
             makeloader(splitSplash[splitSplash.length - 1]);
             count=false

        }
        
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
                        <div class="tab-active">Pending Approval</div>
                        <div>Treated Approval</div>
                    </div>

                    <div class="render_body_content approval">
                       ${ApprovalHTML()}
                    </div>
                

                </div>

             `
    return content;
}

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

function Requisition(search){
    
    let content = ` 
            <div class="supplierDiv">
                <div class="tabDiv">
                    <div class="tab-active">Add Requisition</div>
                    <div>All Requisition</div>
                    
                </div>
                <div class="render_body_content">
                    ${AddRequisitionDefault()}
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

function makeloader(id){
    document.querySelector('.roundingx').classList.add('roundLoader');
    
    fetch('/procurement/app/customroute/fetchapprovaldetails',{
        method:'POST',
        headers: { "Content-type": "application/x-www-form-urlencoded"},
        body:JSON.stringify({id:id})
    }).then(response=>response.json())
        .then(res=>{

            console.log(res.data)
            let title ;
            let dataset;
            if(res.status){
                document.querySelector('.roundingx').classList.remove('roundLoader');
                
                res.data.forEach((d,index)=>{
                    title = d.order_title;
                    dataset =`
                                <tr>
                                    <input type="hidden" value=${d.supplier_id} />
                                    <td>${index + 1}</td>
                                    <td>${d.supplier_name}</td>
                                    <td>${d.quantity}</td>
                                    <td>${d.unit}</td>
                                    <td>${d.total_price}</td>
                                    <td>${d.created_at}</td>
                                    <td><span class="view-more">View More</span></td>

                                </tr>
                            
                            `
                    document.querySelector('.approvaltbody').insertAdjacentHTML('beforeend',dataset);
                });
                
                document.querySelector('.title').innerHTML=`<h4>${title.toUpperCase()}</h4>`

                
  
            }
        })
        .catch(err=>console.log(err))
        
        viewMore(id);

}

function viewMore(id){
    document.querySelector('.approvaltbody').addEventListener('click',function(e){
        
        if(e.target.classList.contains('view-more')){
           let x = e.target.parentElement;
           let y = x.parentElement;
         
           let supplierid = y.children[0].value;
           let suppliername = y.children[2].textContent;
           let quantity = y.children[3].textContent;
           let unit = y.children[4].textContent;
           let total = y.children[5].textContent;
           
           document.querySelector('.approvalmodal').classList.add('overlayApproval');
           document.querySelector('.approvalmodalcard').classList.add('Addapprovalmodalcard');
           let content = `
                            <div class="monitorCard">
                                <div><h3>${suppliername}</h3></div>
                                <small>No 11,iyanuEgbada lane,Lagos</small>
                                <small>Telphone:08033376688</small>

                                <div class="mytable">

                                    <table class="table table-stripe">
                                        <thead>

                                            <tr>
                                                <td class="trenches">SN</td>
                                                <td class="trenches">Quantity</td>
                                                <td class="trenches">Unit</td>
                                                <td class="trenches">Total</td>

                                            </tr>
                                        
                                        </thead>

                                        <tbody>
                                            <tr>
                                                <td class="trench">1</td>
                                                <td class="trench">${quantity}</td>
                                                <td class="trench">${unit}</td>
                                                <td class="trench">${total.toString().toLocaleString("en-US")}</td>
                                            </tr>


                                        </tbody>




                                    </table>



                                </div>

                                <div class="mybutton">
                                    <button class="btn btn-success">Approve</button>
                                    <button class="btn btn-secondary">Close</button>
                                </div>
                            </div>
           
                          `
           document.querySelector('.approvalmodalcard').innerHTML=content

           action(id,supplierid);
        }
    })
   
}

function action(id,supplierid){
    console.log(id,supplierid)
    document.querySelector('.approvalmodalcard').addEventListener('click',function(e){
        if(e.target.classList.contains('btn-secondary')){
            document.querySelector('.approvalmodal').classList.remove('overlayApproval');
           document.querySelector('.approvalmodalcard').classList.remove('Addapprovalmodalcard');
           document.querySelector('.approvalmodalcard').innerHTML=""
        }
        if(e.target.classList.contains('btn-success')){
        

        console.log(id,supplierid);
            fetch('/procurement/app/customroute/approve',{
                method:'POST',
                headers: { "Content-type": "application/x-www-form-urlencoded"},
                body:JSON.stringify({id:id,supplierid:supplierid})
            })
            .then(result=>result.json())
            .then(res=>{
                
                if(res.status){
                    Swal.fire(res.data,'','success');
                    document.querySelector('.approvalmodal').classList.remove('overlayApproval');
                    document.querySelector('.approvalmodalcard').classList.remove('Addapprovalmodalcard');
                    document.querySelector('.approvalmodalcard').innerHTML=""
                    _push('/procurement/dashboard/app#Approval')
                    window.location='/procurement/dashboard/app#Approval'
                }
            })
            .error(err=>console.log(err))
        }
    })
       
}



