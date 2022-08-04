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



