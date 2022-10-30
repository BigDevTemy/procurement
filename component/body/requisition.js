function Requisition(search){
    let content = ` 
                        <div class="supplierDiv">
                        <div class="modalClass"></div>
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
                            
                            <select  id="project_name" class="form-control selector">

                            </select>
                            </div>
                        
                    </div>
                    <div class="div-2-element">
                        <div>
                            <label>Index Number</label>
                            <input type="text" id="refnumber" class="form-control selector" placeholder="Ref Number"/>
                        </div>
                        <div>
                            <label>Date of Sending</label>
                            <input type="date" id="dateofsending" class="form-control selector"  />
                        </div>
                        
                    </div>
                    <div class="div-2-element">
                       
                        <div>
                            <label>Quotation Description</label>
                            <input type="text" id="ordertype" class="form-control selector" placeholder="Quotation Description"  />
                        </div>
                        <div>
                            <label>Number of Suppliers</label>
                            <input type="number" min="1" id="allsupplier" class="form-control selector" placeholder="Number of Suppliers"  />
                        </div>
                        

                       
                        
                    </div>

                </div>

                <div class="tab-body-more">
                   
                    <div class="uploadattachment">Add/Upload Attachment</div>
                    <div id="uploadDiv" >

                    </div>

                    
                    <div class="submitBtnParent">
                        <button class="btn btn-bg uploadRequisition">Save Requisition For Approval</button>
                    </div>
                </div>
            
    
            `
            loadCloser()
}

function loadCloser(){
    if(document.querySelector('.contentParent')){
        console.log(e.target)
    }
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
                                <input type="text" id="project_name" class="form-control selector" disabled  placeholder="Project name" />
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
                            
                            <select class="form-control" id="currency">
                                <option value="">SELECT CURRENCY</option>
                                <option value="NGN">NGN</option>
                                <option value="USD">USD</option>
                                <option value="GBP">GBP</option>
                                <option value="EURO">EURO</option>
                                <option value="YEN">YEN</option>
                            </select>
                        </div>
                        <div class="contentHeader">
                            <div>SN</div>
                            <div> Item Description/ Part No.</div>
                            <div>Quantity</div>
                            <div>Unit Price</div>
                            <div>Total Amount</div>
                        </div>
                        <div class="contentParent" id="contentParent">
                            <div class="content">
                                <div><input type="text" value=1 class="form-control" disabled /></div>
                                <div><input type="text" placeholder="description" class="form-control "/></div>
                                <div><input type="number" min="0" placeholder="quantity" value="0"  class="form-control"/></div>
                                <div><input type="number" min="0" placeholder="unit price" value="0"  class="form-control"/></div>
                                <div><input type="number" min="0" placeholder="total price" value="0" disabled  class="form-control"/></div>
                                <div class="closerAction"><img src='../assets/images/close.svg'  class="closeImg" /></div>
                            </div>
                        </div>
                        <div class="discount_content">
                            
                            <div class="discountDiv"><label>Discount</label><input type="number" min="0" placeholder="discount in %" id="discount"  class="form-control discountClass"/></div>
                        </div>
                        <div class="discount_content">
                            
                            <div class="discountDiv">Total:<div id="myTotal">0</div></div>
                        </div>
                        <div class="addrow">
                            <button class="btn btn-secondary rowplus">+ Add row(s)</button>
                        </div>
                        
                        <div class="uploadattachment">Add/Upload Attachment</div>
                        <div class="fileuploadDiv"> 
                            <input type="file" id="fileInput" name="file[]" class="fileUploadInput" accept="application/pdf" />
                            <button class="btn btn-bg">Choose File</button>
                            <div class="number_files" id="number_files">No File Selected</div>
                        </div>
                        <div class="selectedFiles">
                            
                            
                        </div>

                        <div class="mt-4">
                            <label for="note">Note:</label>

                            <textarea class="form-control" id="note" rows="4" cols="50">
                            
                            </textarea>
                        </div>

                        
                        <div class="submitBtnParent">
                            <button class="btn btn-bg uploadRequisition">Save Requisition For Approval</button>
                        </div>
                    </div>
                
    
            `
            document.querySelector('.render_body_content').innerHTML = content
            
            saveRequisitionModule();
}


   
function AllRequisition(){
      
        let content = `<table id="requisition" class="table table-striped table-bordered" style="width:100%">
                            <thead>
                                <tr>
                                    <th>FILE NO</th>
                                    <th>INDEX NO</th>
                                    <th>QUOTATION NO.</th>
                                    <th>QUOTATION NO. REF</th>
                                    <th>QUOTATION DATE</th>
                                    <th>DESCRIPTION</th>
                                    <th>SUPPLIER</th>
                                    <th>QUOTATION SENT</th>
                                    <th>RECEIVED</th>
                                    <th>ACTION</th>
                                </tr>
                            </thead>
                        </table>`

        document.querySelector('.render_body_content').innerHTML = content

        allrequisition();
        
}


function allrequisition(){


    fetch('/procurement/app/customroute/allrequisition',{
        method:'GET',
        
    })
    .then(result=>result.json())
    .then(res=>{

        $table = $('#requisition').DataTable({
            data:res.data,
            processing:true,
            destroy:true,
            dom: 'Blfrtip',
            buttons: [
                    {
                    "extend":'excel', "text":'Export  to Excel',"className":'btn  btn-secondary mb-4 mt-4'
                    },
                    {
                    "extend":'print', "text":'Print Report',"className":'btn  btn-success mb-4 mt-4'
                    }
            ],
            columns:[
                 
                     {data:"id"},
                     {data:"ref_number"},
                     {data:"project_name"},
                     {data:"file_ref"},
                     {data:"created_at"},
                     {data:"order_description"},
                     {data:"supplier_name"},
                     {
                        data:"",
                        render:function(data,type,row){
                           return `<a href="/procurement/quotation/${row.quotation_receipt}">quotation_receipt</a>`
                          } 
                        
                    },
                     {
                        data:"",
                        render:function(data,type,row){
                         
                            if(row.received == "1"){
                                return true;
                            }
                            else{
                                return false
                            }
                            
                          } 
                        
                    },
                    
                    
                     {
                         data:"",
                         render:function(data,type,row){
                       
                             return `<div>
                                        <button  class="btn btn-danger" onclick="deleteItem('requisition',${row.supplier_id},${row.id})">Delete</button>
                                        <button  class="btn btn-secondary ml-2" onclick="requisitionModal(${row.supplier_id},${row.id})">Edit</button>
                                    </div>`
                           } 
                     }
                 
            ]   
    
             
    
         });

    })
    .catch(err=>console.log(err))


    
  
}


function saveRequisitionModule(){
    let dataOrderref = [];
    let dataProjectref = [];
    let count = true;
    if(count){
        count=false
        fetch('/procurement/app/customroute/project_number')
        .then(res=>res.json())
        .then(data=>{
            console.log(data)
            document.getElementById('order_ref').value = data.data
  
    })
    .catch(err=> {
        
        console.log(err)
       
    })

    fetch('/procurement/app/customroute/fetchallproject')
    .then(res=>res.json())
    .then(data=>{
        console.log(data)
        let dataset ="<option>Select Project</option>";
        data.data.forEach((d)=>{
            dataset += `
                        <option value="${d.id}">${d.project_name}</option>
                    `
        })
        document.getElementById('project_name').innerHTML = dataset

})
.catch(err=> {
    
    console.log(err)
   
})

    }
    
   

    function fetchSuppliers(id){
        
        fetch('/procurement/app/customroute/getAllSupplier')
        .then(res=>res.json())
        .then(data=>{
            
            if(data['status']){
                let dataset ="<option>SELECT SUPPLIER</option>"
                
                data['data'].forEach((d,index)=>{
                    dataset += `
                                <option value=${d.id}>${d.supplername}</option>
                                `
                    })
                    document.getElementById(`selectSuppliers${id}`).innerHTML=dataset;
            }
            
        })
        .catch(err=> {
            
            console.log(err)
                   })
    }

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    

    document.getElementById('ordertype').addEventListener('change',function(e){

        let value = e.target.value;
        dataOrderref.forEach((d,index)=>{
           
            if(d.id === value){
                document.getElementById('order_ref').value=d.value;
            }
        });
        dataProjectref.forEach((d,index)=>{
            
            if(d.id === value){
                document.getElementById('project_name').value=d.value;
            }
        });
        
    })

    
    document.getElementById('allsupplier').addEventListener('change',function(e){

      if(e.target.value > 0){
            let dataset = "";
            for(let i=0;i<e.target.value;i++){
                dataset=`
                <div style="width:100%; display:flex;flex-direction:row;align-items:center;justify-content:space-ssssbetween">

                        <div style="display:flex; width:50%;padding:10px" id="selectId">
                            <select class="form-control selector"  id="selectSuppliers${i}" >

                            <select>
                        
                        </div>
                
                        <div class="fileuploadDiv" style="width:100%;padding:10px;"> 
                            <input type="file" id="fileInput${i}" name="file" class="fileUploadInput${i}" accept="application/pdf,image/jpeg" multiple />
                            <button class="btn btn-bg" id="btn${i}">Upload Supplier Quotation</button>
                            <div class="number_files" id="num_files${i}">No File Selected</div>
                            <div class="selectedFiles" id="selectedFiles${i}" style="margin-left:20px"></div>
                          </div>
                          <div style="width:50%;padding:10px">
                                <input type="checkbox" id="received${i}"/><span style="margin-left:5px">Received</span>
                               
                          </div>
                </div>
                        `
                        $('#uploadDiv').append(dataset);
                        fetchSuppliers(i);

        }
        // document.getElementById('uploadDiv').innerHTML = dataset
      }
      else{
        alert('Invalid Input')
      }
      
        
    })

    // document.getElementById('currency').addEventListener('change',function(e){
        
    //     let getcurrency = currencySelect(e.target.value);
    //     let grandtotal = document.getElementById('myTotal').innerHTML;
    //     let spliter = grandtotal.split(' ');
    //     if(spliter.length > 1){
    //         document.getElementById('myTotal').innerHTML = ""
    //         document.getElementById('myTotal').innerHTML = getcurrency +' '+ spliter[1];
    //     }
    //     else{
    //         document.getElementById('myTotal').innerHTML = ""
    //         document.getElementById('myTotal').innerHTML = getcurrency +' '+ grandtotal;
    //     }
      
        
        
        
    // })
    


    // document.querySelector('.contentParent').addEventListener('click',function(e){
    //     let frod = document.querySelector('.contentParent').children;
       
    //     // for(let i=0;i<frod.length;i++){
    //     //     sum += parseFloat(frod[i].children[4].children[0].value)
    //     // }
    //    if(e.target.classList.contains('closeImg')){
        
    //         let parent = e.target.parentElement;
    //         let grandParent = parent.parentElement
    //         let greatGrandparent = grandParent.parentElement
           
            
    //         if(greatGrandparent.children.length > 1){

    //             greatGrandparent.removeChild(grandParent)

    //             let sum = 0;

    //             for(let x=0;x<greatGrandparent.children.length;x++){
                   
    //                 sum += parseFloat(greatGrandparent.children[x].children[4].children[0].value)
    //             }
    //             let currency = document.getElementById('currency').value
    //             document.getElementById('discount').value = 0;
    //             document.getElementById('myTotal').innerHTML = currencySelect(currency)+' '+ numberWithCommas(sum);


    //         }
    //         else{
    //             alert('A quotation is required')
    //         }
    //             // grandParent.remove(grandParent);
    //    }
       
    //     let Grandparent = e.target.parentElement.parentElement;
        
    //     let unitx  = Grandparent.children[2].children[0];
    //     let quantityx  = Grandparent.children[3].children[0];
    //     let totalx  = Grandparent.children[4].children[0];
    //     let mytotal = document.getElementById('myTotal')
    //     let currency =  document.getElementById('currency').value
    //     quantityx.addEventListener('change',function(e){
    //         let sum = 0
    //         let x = e.target.value;
    //         let y = unitx.value
    //         let z = parseFloat(x) * parseFloat(y)
    //         totalx.value = z;
    //         for(let i=0;i<frod.length;i++){
    //             sum += parseFloat(frod[i].children[4].children[0].value)
    //         }
    //         //myDiscount();
           
    //         mytotal.innerHTML= currencySelect(currency) +' '+ numberWithCommas(sum)
    //         document.getElementById('discount').value=0
           
    //         // mytotal = "200"
            
    //     })
    //     unitx.addEventListener('change',function(e){
    //         let sum = 0
    //         let x = e.target.value;
    //         let y = quantityx.value;
    //         let z = parseFloat(x) * parseFloat(y);
    //         totalx.value = z;
    //         for(let i=0;i<frod.length;i++){
    //             sum += parseFloat(frod[i].children[4].children[0].value)
    //         }

            
    //         mytotal.innerHTML= currencySelect(currency) +' '+ numberWithCommas(sum)
    //         document.getElementById('discount').value=0
    //         //myDiscount();
    //         //mytotal = "200"
            
            
    //     })
        
        
    // })
    // myDiscountChange()
   
    function myDiscount(){
     
            if(parseFloat(document.getElementById('myTotal').innerHTML) > 0){
                let sum =0;
                let z =document.querySelector('.contentParent').children;
                for(let i=0;i<z.length;i++){
                    let xy = z[i].children[4];
                    console.log(xy.children[0].value)
                    sum += parseFloat(xy.children[0].value)
                }
               
                let value = document.querySelector('.discountClass').value;
                console.log('value',value)
                let total = document.getElementById('myTotal')
                
                let discount = parseFloat(value) / 100;
                console.log('discount',discount)
                let discountAmount = parseFloat(sum) * discount;

                console.log('discountAmount',discountAmount)
                let actual = parseFloat(sum) - parseFloat(discountAmount);  
                
                console.log('actual',actual)
                
              
                document.getElementById('myTotal').innerHTML=actual
                
            
            }
            
    
    }
    
    function myDiscountChange(){
        
        
        document.querySelector('.discountClass').addEventListener('change',function(e){
            let currency =  document.getElementById('currency').value
          
            let sum =0;
            let z =document.querySelector('.contentParent').children;
                for(let i=0;i<z.length;i++){
                    let xy = z[i].children[4];
                    console.log(xy.children[0].value)
                    sum += parseFloat(xy.children[0].value)
                }
             
            if(parseFloat(sum) > 0){
                
                let value = e.target.value;

                let total = document.getElementById('myTotal')
                let discount = parseFloat(value) /100;
                let discountAmount = parseFloat(sum) * discount;
                total.innerHTML = currencySelect(currency) +' '+ numberWithCommas(parseFloat(sum) - discountAmount); 

            }
             
        })
        

}
    

let handleInput  = document.querySelector('.fileUploadInput');


    document.querySelector('#uploadDiv').addEventListener('click',function(e){
        let parent = e.target.parentNode;
        
        let childInputId = parent.children[0].id;
        
        let childNumFiles = parent.children[2].id;
        let childSelectedFiles = parent.children[3].id;
        let handleInput  = document.querySelector(`#${childInputId}`);
        handleInput.click();
        
        handleInput.addEventListener("change", function() {
               
            let dataset = "";
            let src=""
            for(let i=0; i<handleInput.files.length; i++){
                src = URL.createObjectURL(handleInput.files[i])
                dataset += `
                            <div class="d-image">
                                    
                                 <div style="cursor:pointer" class="preview" style="font-weight:bold">Preview</div>
                                 <input type="hidden" value=${src} />
                                <div id=${handleInput.files[i].name} style="margin-left:10px">${handleInput.files[i].name}</div>
                                <span style="cursor:pointer" class="removeImageUpload" style="font-weight:bold;color:#ff0000;font-weight:bold">X</span>
                            </div>
                
                            `
                
            }
            document.querySelector(`#${childSelectedFiles}`).innerHTML=dataset

            document.querySelector(`#${childNumFiles}`).innerHTML = handleInput.files.length  > 1 ? handleInput.files.length +' Files Selected' : handleInput.files.length +' File Selected';
        });
       
    })

    document.querySelector('#uploadDiv').addEventListener('click',function(e){
        
        if(e.target.classList.contains("preview")){
            let fileURL =  e.target.parentElement.children[1].value
            document.querySelector('.modalClass').classList.add('modalClassCustom');
            let content = `
                           <div class="customModal modalApproval">
                            <div class="closeModal mb-4" >X</div>
                          <div class="container">
                            <iframe 
                            src=${fileURL}
                            frameborder="0" allowfullscreen  
                            scrolling="auto" class="video">
                            </iframe>
                          </div>
                                

                            </div>
                            
                
                         `
                         document.querySelector('.modalClass').innerHTML=content
                         forceClosePreview();
                         window.scroll(0,0)
        }

        if(e.target.classList.contains("removeImageUpload")){
            
            let parent = e.target.parentElement
            parent.remove(e.target)
            let x = parent.children.length
           
            //document.querySelector('.number_files').innerHTML = x  > 1 ? x +' Files Selected' : x +' File Selected';
        }
    })

    function forceClosePreview(){
        document.querySelector('.closeModal').addEventListener('click',function(e){
            document.querySelector('.modalClass').classList.remove('modalClassCustom');
            document.querySelector('.modalClass').innerHTML=""
        })
        
    }

    var date = new Date();  
    var currentDate = date.toISOString().substring(0,10);
    
    document.getElementById('dateofcreation').value = currentDate
    document.getElementById('dateofsending').value = currentDate
   

    // document.querySelector('.rowplus').addEventListener('click',function(e){
    //     let index  = document.querySelector('.contentParent').children.length
    //     let parent  = document.querySelector('.contentParent')
    //     let x = document.getElementById('contentParent')
    //     let incremeent = 1
       
    //     let row = `<div class="content additionalcontent">
    //                     <div class="sn"><input type="text" disabled value=${index + 1} class="form-control"/></div>
    //                     <div><input type="text"  placeholder="description" class="form-control"/></div>
    //                     <div><input type="number" min="0" placeholder="quantity" value="0" class="form-control"/></div>
                        
    //                     <div><input type="number" min="0" placeholder="unit price" value="0"  class="form-control"/></div>
    //                     <div><input type="number" min="0" placeholder="total price" value="0" disabled  class="form-control"/></div>
    //                     <div class="closerAction"><img src='../assets/images/close.svg' class="closeImg"  /></div>
    //                 </div>`

    //                 parent.insertAdjacentHTML('beforeend',row)
                    
    // })

    function currencySelect (currency){
        switch(currency){
            case 'NGN':
                return '&#8358;'
            case 'USD':
                return '&#36;' 
            case 'EURO':
                return '&#x20AC;'
            case 'GBP':
                return '&#163;'
            case 'YEN':
            return '&#165;'
            default:
                return ''
        }
    }

    function checkReceived(id){
        if(document.getElementById(id).checked){
            return true;
        }
        else{
            return false;
        }
        
    }

    document.querySelector('.uploadRequisition').addEventListener('click',function(e){
        e.preventDefault();

        
       
       let Quotation=[];
       let row=[];
        //let totalfiles = document.getElementById('fileInput').files.length;
        let allsupplier = document.getElementById('allsupplier').value;
        let order = document.getElementById('ordertype').value;
        let username = document.getElementById('username').value;

        // let currency = document.getElementById('currency').value;
        let dateofcreation = document.getElementById('dateofcreation').value;
        let serial_number = document.getElementById('serial_number').value;
        let fileref = document.getElementById('file_ref').value;
        let projectname = "MCN-DHN-N-004"
        let refnumber = document.getElementById('refnumber').value;
        let dateofsending = document.getElementById('dateofsending').value;
       // let note = document.getElementById('note').value;
       // let discount = document.getElementById('discount').value;
        // let description = document.querySelectorAll('.content');
        // let received = document.querySelector('#received')
        
        
    //     for(let i=0;i<description.length;i++){
    //         let child = description[i].children;
            
    //         for(let x=0;x<child.length;x++){
               
                
    //             if(child[x].children[0].value !="" && child[x].children[0].value != 0 && child[x].children[0].value !="undefined" ){
    //                 row.push(child[x].children[0].value);
    //             }
    //             else{
    //                 row=[];
    //                 Swal.fire('All Quotation Fields are Required','','error')
    //             }
                
                 
    //         }

    //         Quotation.push(row)
    //         row=[];

    //  }

     
     

        // if(totalfiles === 0){
        //     Swal.fire('Upload Supplier Quotation','','error')
        //     return false;
        // }
        if(allsupplier == ""){
            Swal.fire('Input Number of Suppliers','','error')
            return false;
        }
        if(order == ""){
            Swal.fire('Select Quotation Description','','error')
            return false;
        }

        // if(currency == "SELECT CURRENCY"){
        //     Swal.fire('Select Currency','','error')
        //     return false;
        // }
        if(serial_number == ""){
            Swal.fire('Serial Number is Required','','error')
            return false;
        }
        if(fileref == ""){
            Swal.fire('File Ref is Required','','error')
            return false;
        }
        if(refnumber == ""){
            Swal.fire('Index Number is Required','','error')
            return false;
        }


       


        if(allsupplier!="" && order!="" && dateofcreation !="" && serial_number !="" && fileref !="" &&  projectname != "" && dateofsending!="" && refnumber!="" ){
            
            const formdata = new FormData();

            // for (var i = 0; i < Quotation.length; i++) {
            //     formdata.append('quotation[]', Quotation[i]);
            // }
            

            let uploadFiles = document.querySelector('#uploadDiv');
            let x = uploadFiles.children
           const Quote = [];
    
            for(let i=0 ;i<x.length;i++){
           
               if(x[i].children[0].children[0].value == "SELECT SUPPLIER"){
                    Swal.fire('Select Supplier','','error')
                    return false;
               }

               if(x[i].children[1].children[0].files[0] == undefined){
                    Swal.fire('Select Quotation file To Upload','','error')
                    return false;
               }
            
                let receivedChecker = checkReceived(x[i].children[2].children[0].id);
    
                const item ={
                    "supplier":x[i].children[0].children[0].value,
                    "received":receivedChecker
                }
                   
                
                Quotation.push(item);
               
                formdata.append('filequotation[]',x[i].children[1].children[0].files[0]);
            }
            formdata.append('quotation',JSON.stringify(Quotation))
            
    
            
    
            // if(uploadFiles.children.length > 0){
            //     for(let i=0;i<uploadFiles.children.length;i++){
            //         console.log(uploadFiles.children[i].children[0].files[0])
            //         if(uploadFiles.children[i].children[0].files[0] != undefined){
            //             formdata.append('quotation[]',uploadFiles.children[i].children[0].files[0])
            //         }
            //         else{
            //             Swal.fire('All Quotation Uploads are Required','','error') 
            //         }
            //     }
            // }
            // console.log(uploadFiles)
           
            //formdata.append("sample_image",document.getElementById('fileInput').files[0])
            formdata.append('ordertype',order);
            formdata.append('allsupplier',allsupplier);
            formdata.append('username',username);
            formdata.append('dateofcreation',dateofcreation);
            formdata.append('serial_number',serial_number);
            formdata.append('fileref',fileref);
            formdata.append('refnumber',refnumber);
            formdata.append('dateofsending',dateofsending);
            formdata.append('projectname',projectname);
            
           
           
            

            fetch('/procurement/app/customroute/upoadquotation_new',{
                method:'POST',
                // headers: { "Content-type": "application/x-www-form-urlencoded"},
                body:formdata
            })
            .then(response=>response.json())
            .then(res=>{
                
                if(res.status){
                    Swal.fire(res.data,'','success');
                    Quotation=[];
                    row=[];
                    // document.getElementById('project').value="";
                    document.getElementById('refnumber').value="";
                    document.getElementById('file_ref').value="";
                    document.getElementById('allsupplier').value="";
                    document.getElementById('ordertype').value="";
                    document.getElementById('serial_number').value=""
                    document.querySelector('#uploadDiv').innerHTML=""
                   
                     
                }
                else{
                    
                }
            })
            .catch((err)=>{
                console.log(err)
            })
        }
        
        
    })

    // document.querySelector('.contentParent').addEventListener('click',function(e){
    //     if(e.target.parentElement.classList.contains('close')){
    //         let x = e.target.parentElement;
    //         let y = x.parentElement;

           
    //         document.querySelector('.contentParent').removeChild(y)
            
    //     }
    // })
    
}




