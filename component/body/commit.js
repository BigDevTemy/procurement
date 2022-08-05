function saveSupplierModule(){
    document.getElementById('saveSupplier').addEventListener('click',function(e){
        e.preventDefault();

        let supplier_name = document.getElementById('supplier_name').value
        let supplier_address =document.getElementById('supplieraddress').value;
        let supplier_contact = document.getElementById('suppliercontact').value
        let author = document.getElementById('username').value
                    
        if(supplier_name === ""){
            
            Swal.fire('Supplier Name is Required!','', 'error') 
            return false 
        }
        if(supplier_contact === ""){
            
            Swal.fire('Supplier Contact is Required!','', 'error') 
            return false 
        }

        if(supplier_name === ""){
            
            Swal.fire('Supplier Name is Required!','', 'error') 
            return false 
        }


        

        if(supplier_name){
            
            document.querySelector('.loader').classList.add('overlayLoader');
            document.querySelector('.rounding').classList.add('roundLoader');
            fetch('/procurement/app/customroute/addsupplier',{
                method:'POST',
                body:JSON.stringify({
                    supplier_name:supplier_name,
                    author:author,
                    supplier_address:supplier_address,
                    supplier_contact:supplier_contact
                    
                }),
                headers: { "Content-type": "application/x-www-form-urlencoded"},
                                                    
            })
            .then(res=>res.json())
            .then(data=>{
                console.log("data",data)
                if(data['status']){
                    document.querySelector('.loader').classList.remove('overlayLoader');
                    document.querySelector('.rounding').classList.remove('roundLoader');
                    Swal.fire(data['data'],'', 'success') 
                    document.getElementById('supplier_name').value=""
                    document.getElementById('supplieraddress').value=""
                    document.getElementById('suppliercontact').value=""

                }else{
                    document.querySelector('.loader').classList.remove('overlayLoader');
                    document.querySelector('.rounding').classList.remove('roundLoader');
                    Swal.fire(data['data'],'', 'error') 
                }
                
            })
            .catch(err=> {
                
                console.log(err)
                document.querySelector('.loader').classList.remove('overlayLoader');
                document.querySelector('.rounding').classList.remove('roundLoader');
                Swal.fire(data['data'],'', 'error') 
               
            })



            


        }
                        

    })
}
    



function saveOrderModule(){
    document.getElementById('saveOrder').addEventListener('click',function(e){
        let order_title = document.getElementById('order_title').value
        let author = document.getElementById('username').value
        
        e.preventDefault();
                        
        if(order_title === ""){
            
            Swal.fire('Order title is Required!','', 'error') 
            return false 
        }

        if(order_title){
            
            document.querySelector('.loader').classList.add('overlayLoader');
            document.querySelector('.rounding').classList.add('roundLoader');
            fetch('/procurement/app/customroute/createorder',{
                method:'POST',
                body:JSON.stringify({
                    order_title:order_title,
                    author:author
                    
                }),
                headers: { "Content-type": "application/x-www-form-urlencoded"},
                                                    
            })
            .then(res=>res.json())
            .then(data=>{
                
                if(data['status']){
                    document.querySelector('.loader').classList.remove('overlayLoader');
                    document.querySelector('.rounding').classList.remove('roundLoader');
                    Swal.fire(data['data'],'', 'success') 
                    document.getElementById('order_title').value=""
                    
                }else{
                    document.querySelector('.loader').classList.remove('overlayLoader');
                    document.querySelector('.rounding').classList.remove('roundLoader');
                    Swal.fire(data['data'],'', 'error') 
                }
                
            })
            .catch(err=> {
                
                console.log(err)
                document.querySelector('.loader').classList.remove('overlayLoader');
                document.querySelector('.rounding').classList.remove('roundLoader');
                Swal.fire(data['data'],'', 'error') 
            })

        }
                        

    })
}
    

function saveRequisitionModule(){
    let dataOrderref = [];
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
                dataOrderref.push(d.order_ref);
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

    

    document.getElementById('ordertype').addEventListener('change',function(e){
        let value = parseInt(e.target.value) - 1;
    
        let ref = dataOrderref[value];
        document.getElementById('order_ref').value=ref;
    })


let handleInput  = document.querySelector('.fileUploadInput');

    document.querySelector('.btn-bg').addEventListener('click',function(e){
        handleInput.click();
            // const image_input = document.querySelector("#image-input");
            handleInput.addEventListener("change", function() {
                console.log(handleInput.files[0].name)
                
                for(let i=0; i<handleInput.files.length; i++){
                  
                   let dataset = "";
                    dataset += `
                                <div class="d-image">
                                     <div> <img src="../assets/images/file-pdf.svg"/></div>
                                    <div id=${handleInput.files[i].name}>${handleInput.files[i].name}</div>
                                    <span>X</span>
                                </div>
                    
                                `
                    document.querySelector('.selectedFiles').insertAdjacentHTML('beforeend',dataset)
                }

                document.querySelector('.number_files').innerHTML = handleInput.files.length  > 1 ? handleInput.files.length +' Files Selected' : handleInput.files.length +' File Selected';

                
                
                // handleInput.files.map((d)=>{
                //     let dataset = "";

                //     dataset += `
                //                 <div class="d-image">
                //                     <div id=${d.name}>${d.name}</div>
                //                     <span>X</span>
                //                 </div>
                    
                //                 `
                //     document.querySelector('.selectedFiles').insertAdjacentHTML('beforeend',dataset)
                // })
                // const reader = new FileReader();

                // reader.addEventListener("load", () => {
                //     const uploaded_image = reader.result;
                //     // console.log(reader.result);
                //     // document.querySelector("#display-image").style.backgroundImage = `url(${uploaded_image})`;
                // });
                // reader.readAsDataURL(this.files[0]);
                

        });
    })

    document.querySelector('.rowplus').addEventListener('click',function(e){
        let index  = document.querySelector('.contentParent').children.length
        let parent  = document.querySelector('.contentParent')
        let incremeent = 1
       
        let row = `<div class="content additionalcontent">
                        <div class="sn"><input type="text" disabled value=${index + 1} class="form-control"/></div>
                        <div><input type="text" placeholder="description" class="form-control"/></div>
                        <div><input type="text" placeholder="quantity"  class="form-control"/></div>
                        <div><input type="text" placeholder="abc price"  class="form-control"/></div>
                        <div><input type="text" placeholder="abc total"  class="form-control"/></div>
                        <div><input type="text" placeholder="unit price"  class="form-control"/></div>
                        <div><input type="text" placeholder="total price"  class="form-control"/></div>
                        
                    </div>`

                    parent.insertAdjacentHTML('beforeend',row)
    })

    document.querySelector('.uploadRequisition').addEventListener('click',function(e){
       let Quotation=[];
       let row=[];
        let totalfiles = document.getElementById('fileInput').files.length;
        let allsupplier = document.getElementById('allsupplier').value;
        let order = document.getElementById('ordertype').value;
        let username = document.getElementById('username').value;
        let description = document.querySelectorAll('.content');
        console.log(description.length)
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

     
     console.log(Quotation)

        if(totalfiles === 0){
            Swal.fire('Upload Supplier Quotation','','error')
        }
        if(allsupplier == "SELECT SUPPLIER"){
            Swal.fire('Select Supplier','','error')
        }
        if(order == "SELECT ORDER"){
            Swal.fire('Select Order','','error')
        }

        if(totalfiles >0 && allsupplier!="" && order!=""){
            const formdata = new FormData();

            for (var i = 0; i < Quotation.length; i++) {
                formdata.append('quotation[]', Quotation[i]);
              }
            console.log(document.getElementById('fileInput').files)
            formdata.append("sample_image",document.getElementById('fileInput').files[0])
            formdata.append('ordertype',order);
            formdata.append('allsupplier',allsupplier);
            formdata.append('username',username);
           

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
                    document.getElementById('fileInput').value="";
                    document.getElementById('allsupplier').value="";
                    document.getElementById('ordertype').value="";
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


   
 
   