    



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
    




   
 
   