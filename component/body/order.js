function Order(search){
    let content = ` 
                    <div class="supplierDiv">
                    <div class="modalClass"></div>
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
    getProject();
    return `
                <div class="col-md-6">
                    <label>Order name</label>
                    <input type="text" class="form-control selector " placeholder="Create Order" id="order_title"/>
                </div>
                <div class="col-md-6">
                    <label>Project name</label>
                    <select class="form-control" id="selectProject">
                        <option>Select Project</option>

                    </select>
                </div>

                <div>
                    <input type="submit" class="form-control selectorSave" value="Save" id="saveOrder"/>
                </div>

                `
        //document.querySelector('.render_body_content').innerHTML = content
}

function getProject(){
    fetch('/procurement/app/customroute/fetchallproject')
    .then(res=>res.json())
    .then(result=>{
        let dataset = "<option>Select Project Name</option>";
        console.log(result.data)
        if(result.status){
            

            result.data.forEach((d)=>{
                dataset += `
                            <option value=${d.id}>${d.project_name}</option>
                            `
            })
            console.log(dataset)

            document.getElementById('selectProject').innerHTML = dataset;


             
        }
           
        
    })
    .catch(err=> {
        
        console.log(err)
        
       
    })
    
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
        
        let content = `<table id="processedOrder" class="table table-striped table-bordered" style="width:100%">
        <thead>
            <tr>
                <th>SN</th>
                <th>ORDER TITLE</th>
                <th>ORDER REF</th>
                <th>USER</th>
                <th>DATE</th>
                <th>ACTION</th>
            </tr>
        </thead>
    </table>`

    document.querySelector('.render_body_content').innerHTML = content

    allprocessedorders();
}

function allprocessedorders(){
    let count = 0;
    let table = $('#processedOrder').DataTable({
         
        "processing":true,
        "destroy":true,
        "serverSide":true,
        
        'dom': "Bfrtip",
        "ajax":{
             url:'/procurement/app/customroute/alldataorder',
             type:"GET"
             
        },
        "columns":[
             
                 {
                    
                    data:"",
                    render:function(){
                        return count = count+ 1;
                    }
                },
                 {data:"order_title"},
                 {data:"order_ref"},
                 {data:"author"},
                 {data:"created_at"},
                 {
                     data:"",
                     render:function(data,type,row){
                     
                         return `<div>
                                    <button class="btn btn-secondary" onclick="modal('modalSupplier',${row.id},'Edit Order Title')">Edit</button>
                                   
                                </div>`
                       } 
                 }
             
        ]   

         

     });
}


function saveOrderModule(){
    document.getElementById('saveOrder').addEventListener('click',function(e){
        let order_title = document.getElementById('order_title').value
        let author = document.getElementById('username').value
        let project = document.getElementById('selectProject').value
        
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
                    author:author,
                    project_name:project
                    
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



