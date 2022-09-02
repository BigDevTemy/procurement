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
                            <input type="text" id="project_name" disabled class="form-control selector"  placeholder="Project name" />
                        </div>
                        
                    </div>
                    <div class="div-2-element">
                        <div>
                            <label>Ref Number</label>
                            <input type="text" id="refnumber" class="form-control selector" placeholder="Ref Number"/>
                        </div>
                        <div>
                            <label>Date of Sending</label>
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

                        <div class=" d-flex align-items-center mt-4">
                            <input type="checkbox" id="received" style="margin-right:10px"/><span>Received</span>

                        </div>
                        
                    </div>

                </div>

                <div class="tab-body-more">
                    <div class="currencyDiv">
                        <button class="btn btn-md btn-danger">Delete</button>
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
                        <div> Item Description</div>
                        <div>Quantity</div>
                        <div>Unit Price</div>
                        <div>Total Price</div>
                        <div>Action</div>
                    </div>
                    <div class="contentParent">
                        <div class="content">
                            <div><input type="number" min="0" value=1 class="form-control" disabled /></div>
                            <div><input type="text" placeholder="description" class="form-control "/></div>
                            <div><input type="number" min="0" placeholder="quantity" value="0"  class="form-control"/></div>
                            <div><input type="number" min="0" placeholder="unit price" value="0"  class="form-control"/></div>
                            <div><input type="number" min="0" placeholder="total price" value="0" disabled  class="form-control"/></div>
                            <div class="closerAction"><img src='../assets/images/close.svg'  /></div>
                            
                        </div>
                    </div>
                    <div class="discount_content">
                        
                        <div class="discountDiv"><input type="number" min="0" placeholder="discount in %"  id="discount" class="form-control discountClass"/></div>
                    </div>
                    <div class="discount_content">
                            
                        <div class="discountDiv"><div>Total:</div><div id="myTotal">0</div></div>
                    </div>
                    <div class="addrow">
                         <button class="btn btn-secondary rowplus">+ Add row(s)</button>
                    </div>
                    
                    <div class="uploadattachment">Add/Upload Attachment</div>
                    <div class="fileuploadDiv"> 
                        <input type="file" id="fileInput" name="file" class="fileUploadInput" accept="application/pdf,image/jpeg" multiple />
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

                            <div class=" d-flex align-items-center mt-4">
                                <input type="checkbox" id="received" style="margin-right:10px"/><span>Received</span>

                            </div>
                            
                        </div>

                    </div>

                    <div class="tab-body-more">
                        <div class="currencyDiv">
                            <button class="btn btn-md btn-danger">Delete</button>
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
                            <div> Item Description</div>
                            <div>Quantity</div>
                            <div>Unit Price</div>
                            <div>Total Price</div>
                        </div>
                        <div class="contentParent">
                            <div class="content">
                                <div><input type="text" value=1 class="form-control" disabled /></div>
                                <div><input type="text" placeholder="description" class="form-control "/></div>
                                <div><input type="number" min="0" placeholder="quantity" value="0"  class="form-control"/></div>
                                <div><input type="number" min="0" placeholder="unit price" value="0"  class="form-control"/></div>
                                <div><input type="number" min="0" placeholder="total price" value="0" disabled  class="form-control"/></div>
                                <div class="closerAction"><img src='../assets/images/close.svg'  /></div>
                            </div>
                        </div>
                        <div class="discount_content">
                            
                            <div class="discountDiv"><input type="number" min="0" placeholder="discount in %" id="discount"  class="form-control discountClass"/></div>
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
                            <span class="number_files" id="number_files">No File Selected</span>
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
            saveRequisitionModule();
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
                 {data:"price"},
                 {data:"total"},
                 {data:"created_at"},
                 {
                     data:"",
                     render:function(data,type,row){
                   
                         return `<div>
                                    <button  class="btn btn-danger" onclick="deleteItem('requisition',${row.supplier_id},${row.order_id})">Delete</button>
                                    <button  class="btn btn-secondary ml-2" onclick="requisitionModal(${row.supplier_id},${row.order_id},${row.id})">Edit</button>
                                </div>`
                       } 
                 }
             
        ]   

         

     });
}


function saveRequisitionModule(){
    let dataOrderref = [];
    let dataProjectref = [];
    let count = true;
    if(count){
        count=false
        fetch('/procurement/app/customroute/getAllorder')
    .then(res=>res.json())
    .then(data=>{
        console.log("data",data)
        if(data['status']){
            let dataset ="<option>SELECT ORDER</option>"
            document.getElementById('ordertype').innerHTML=""
            data['data'].forEach((d,index)=>{
                dataset += 
                            `
                                <option value=${d.id}>${d.ordertype}</option>
                            `
                            let item ={
                                id:d.id,
                                value:d.order_ref
                            }
                            let xitem = {
                                id:d.id,
                                value:d.project_name
                            }
                dataOrderref.push(item);
                dataProjectref.push(xitem);
            })
            document.getElementById('ordertype').insertAdjacentHTML('beforeend',dataset);
           
        }
        
    })
    .catch(err=> {
        
        console.log(err)
       
    })

    }
    
    fetch('/procurement/app/customroute/getAllSupplier')
    .then(res=>res.json())
    .then(data=>{
        
        if(data['status']){
            let dataset ="<option>SELECT SUPPLIER</option>"
            document.getElementById('allsupplier').innerHTML=""
            data['data'].forEach((d,index)=>{
                dataset += `
                            <option value=${d.id}>${d.supplername}</option>
                            `
                })
                document.getElementById('allsupplier').insertAdjacentHTML('beforeend',dataset);
        }
        
    })
    .catch(err=> {
        
        console.log(err)
       
    })

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
    if(document.querySelector('.currencyDiv')){
        let x = document.querySelector('.contentParent').children
        if(x.length == 1){
            document.querySelector('.btn-danger').classList.add('hideDelete');
        }
    }


    document.querySelector('.contentParent').addEventListener('click',function(e){
        let frod = document.querySelector('.contentParent').children;
       
        // for(let i=0;i<frod.length;i++){
        //     sum += parseFloat(frod[i].children[4].children[0].value)
        // }
        
       
        let Grandparent = e.target.parentElement.parentElement;
        
        let unitx  = Grandparent.children[2].children[0];
        let quantityx  = Grandparent.children[3].children[0];
        let totalx  = Grandparent.children[4].children[0];
        let mytotal = document.getElementById('myTotal')
        let currency =  document.getElementById('currency').value
        quantityx.addEventListener('change',function(e){
            let sum = 0
            let x = e.target.value;
            let y = unitx.value
            let z = parseFloat(x) * parseFloat(y)
            totalx.value = z;
            for(let i=0;i<frod.length;i++){
                sum += parseFloat(frod[i].children[4].children[0].value)
            }
            //myDiscount();
           
            mytotal.innerHTML= currency +''+ numberWithCommas(sum)
            document.getElementById('discount').value=0
           
            // mytotal = "200"
            
        })
        unitx.addEventListener('change',function(e){
            let sum = 0
            let x = e.target.value;
            let y = quantityx.value;
            let z = parseFloat(x) * parseFloat(y);
            totalx.value = z;
            for(let i=0;i<frod.length;i++){
                sum += parseFloat(frod[i].children[4].children[0].value)
            }

            
            mytotal.innerHTML= currency +''+ numberWithCommas(sum)
            document.getElementById('discount').value=0
            //myDiscount();
            //mytotal = "200"
            
            
        })
        
        
    })
    myDiscountChange()
    // document.querySelector('.discount_content').addEventListener('click',function(e){
    //     console.log(e.target)
    //     if(e.target.classList.contains('discountClass')){
    //         let x = e.target.parentElement.parentElement
    //         let y = x.children[0].children[0];
    //         y.addEventListener('change',function(e){
    //             let total = document.getElementById('myTotal').innerHTML;
    //             console.log(total)
    //             let dis = parseFloat(e.target.value) / 100
    //             let discount = parseFloat(total) * parseFloat(dis);
    //             console.log(discount)
    //             total = discount;
    //         })
    //     }
    // })
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
            console.log('i am here')
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
                total.innerHTML = numberWithCommas(parseFloat(sum) - discountAmount); 

            }
             
        })
        

}
    

let handleInput  = document.querySelector('.fileUploadInput');


    document.querySelector('.btn-bg').addEventListener('click',function(e){
        handleInput.click();
            // const image_input = document.querySelector("#image-input");
            handleInput.addEventListener("change", function() {
                console.log(handleInput.files[0].name)
                let dataset = "";
                
                for(let i=0; i<handleInput.files.length; i++){
                  
                   
                    dataset += `
                                <div class="d-image">
                                     <div style="cursor:pointer" class="preview"><u>Preview</u></div>
                                    <div id=${handleInput.files[i].name}>${handleInput.files[i].name}</div>
                                    <span style="cursor:pointer" class="removeImageUpload">X</span>
                                </div>
                    
                                `
                    
                }
                document.querySelector('.selectedFiles').innerHTML=dataset

                document.querySelector('.number_files').innerHTML = handleInput.files.length  > 1 ? handleInput.files.length +' Files Selected' : handleInput.files.length +' File Selected';
            });
    })

    document.querySelector('.selectedFiles').addEventListener('click',function(e){
        if(e.target.classList.contains("preview")){

        }

        if(e.target.classList.contains("removeImageUpload")){
            
            let parent = e.target.parentElement
            parent.remove(e.target)
            let x = parent.children.length
           
            //document.querySelector('.number_files').innerHTML = x  > 1 ? x +' Files Selected' : x +' File Selected';
        }
    })
   

    document.querySelector('.rowplus').addEventListener('click',function(e){
        let index  = document.querySelector('.contentParent').children.length
        let parent  = document.querySelector('.contentParent')
        let incremeent = 1
       
        let row = `<div class="content additionalcontent">
                        <div class="sn"><input type="text" disabled value=${index + 1} class="form-control"/></div>
                        <div><input type="text"  placeholder="description" class="form-control"/></div>
                        <div><input type="number" min="0" placeholder="quantity" value="0" class="form-control"/></div>
                        
                        <div><input type="number" min="0" placeholder="unit price" value="0"  class="form-control"/></div>
                        <div><input type="number" min="0" placeholder="total price" value="0" disabled  class="form-control"/></div>
                        <div class="closerAction"><img src='../assets/images/close.svg'  /></div>
                    </div>`

                    parent.insertAdjacentHTML('beforeend',row)
        if(document.querySelector('.currencyDiv')){
            let x = document.querySelector('.contentParent').children
            if(x.length == 1){
                document.querySelector('.btn-danger').classList.add('hideDelete');
            }
            else if(x.length >0){
                document.querySelector('.btn-danger').classList.remove('hideDelete');
            }
        }
    })

    document.querySelector('.uploadRequisition').addEventListener('click',function(e){
        e.preventDefault();
       let Quotation=[];
       let row=[];
        let totalfiles = document.getElementById('fileInput').files.length;
        let allsupplier = document.getElementById('allsupplier').value;
        let order = document.getElementById('ordertype').value;
        let username = document.getElementById('username').value;

        let currency = document.getElementById('currency').value;
        let dateofcreation = document.getElementById('dateofcreation').value;
        let serial_number = document.getElementById('serial_number').value;
        let fileref = document.getElementById('file_ref').value;
        let projectname = document.getElementById('project_name').value;
        let refnumber = document.getElementById('refnumber').value;
        let dateofsending = document.getElementById('dateofsending').value;
        let note = document.getElementById('note').value;
        let discount = document.getElementById('discount').value;
        let description = document.querySelectorAll('.content');
        let received = document.querySelector('#received')
        
        
        for(let i=0;i<description.length;i++){
            let child = description[i].children;
            
            for(let x=0;x<child.length;x++){
               
                
                if(child[x].children[0].value !="" && child[x].children[0].value != 0 && child[x].children[0].value !="undefined" ){
                    row.push(child[x].children[0].value);
                }
                else{
                    row=[];
                    Swal.fire('All Quotation Fields are Required','','error')
                }
                
                 
            }

            Quotation.push(row)
            row=[];

     }

     
     

        if(totalfiles === 0){
            Swal.fire('Upload Supplier Quotation','','error')
        }
        if(allsupplier == "SELECT SUPPLIER"){
            Swal.fire('Select Supplier','','error')
        }
        if(order == "SELECT ORDER"){
            Swal.fire('Select Order','','error')
        }

        if(totalfiles >0 && allsupplier!="" && order!="" && dateofcreation !="" && serial_number !="" && currency != "" && fileref !="" &&  projectname != "" && dateofsending!="" && totalfiles!="" ){
            
            const formdata = new FormData();

            for (var i = 0; i < Quotation.length; i++) {
                formdata.append('quotation[]', Quotation[i]);
            }
           
            formdata.append("sample_image",document.getElementById('fileInput').files[0])
            formdata.append('ordertype',order);
            formdata.append('allsupplier',allsupplier);
            formdata.append('username',username);
            formdata.append('dateofcreation',dateofcreation);
            formdata.append('serial_number',serial_number);
            formdata.append('fileref',fileref);
            formdata.append('refnumber',refnumber);
            formdata.append('dateofsending',dateofsending);
            formdata.append('projectname',projectname);
            formdata.append('currency',currency);
            formdata.append('note',note);
            formdata.append('discount',discount);
            formdata.append('received',received.checked);

            fetch('/procurement/app/customroute/upoadrequisition',{
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
                    document.getElementById('myTotal').innerHTML = 0;
                    // document.getElementById("myform").reset();
                    var inputElements = document.getElementsByTagName('input');
                    var inputElementSelect = document.getElementsByTagName('select');

                    for (var i=0; i < inputElements.length; i++) {
                        if (inputElements[i].type == 'text' || inputElements[i].type == 'file'  ) {
                            inputElements[i].value = '';
                        }
                    }

                   document.getElementById('allsupplier').value="";
                   document.getElementById('ordertype').value="";
                   document.getElementById('number_files').innerHTML="";
                    
                }
                else{
                    
                }
            })
            .catch((err)=>{
                console.log(err)
            })
        }
        
        
    })

    document.querySelector('.contentParent').addEventListener('click',function(e){
        if(e.target.parentElement.classList.contains('close')){
            let x = e.target.parentElement;
            let y = x.parentElement;

           
            document.querySelector('.contentParent').removeChild(y)
            
        }
    })
    
}




