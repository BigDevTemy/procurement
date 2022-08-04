<html>
    <head>
        <title>Procify | App</title>
        <link rel="stylesheet" href="style.css">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"/>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>  
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
        <script src="../assets/js/sweetalert2@11.js"></script>
    </head>
    
    <body>
        <div class="authlogin">
            <div class="loader">
                <div class="rounding"></div>

            </div>
                <div class="overlay">

                    <div class="createauth">
                            <div class="logo">
                                <img src="../assets/images/logo.png"/>
                            </div>
                            <div class="call_to_action">
                                
                                Create An Account
                            </div>
                            <small>Fill the form below to create a user account</small>
                            <div class="loginFailed"></div>
                            <div class="container">

                                <div>
                                    <input type="text" placeholder="First name" class="form-control" id="fname"/>
                                </div>

                                <div>
                                    <input type="text" placeholder="Last name" class="form-control" id="lname"/>
                                </div>
                                
                                <div>
                                    <input type="text" placeholder="Username" class="form-control" id="username"/>
                                </div>
                                <div>
                                    <input type="password" placeholder="Password" class="form-control" id="password"/>
                                </div>
                                <div>
                                    <select class="form-control" id="role">
                                        <option value="">Select Role</option>
                                        <option value="5">Inputter</option>
                                        <option value="3">Manager</option>
                                        <option value="2">PO</option>
                                        <option value="4">Shippment</option>
                                        <option value="1">SuperAdmin</option>

                                    <select>
                                </div>

                                <div class="create">
                                    <input type="button" class="form-control" value="Create User" id="create"/>
                                </div>
                            </div>
                           

                    </div> 

                </div>
        <div>
            <script>
                    let x = document.getElementById('create');

                    x.addEventListener('click',function(e){
                        e.preventDefault();
                        let fname = document.getElementById('fname').value;
                        let lname = document.getElementById('lname').value;
                        let role = document.getElementById('role').value;
                        let username = document.getElementById('username').value;
                        let password = document.getElementById('password').value;
                      
                        if(fname === ""){
                            
                            Swal.fire('First name is Required!','', 'error') 
                            return false 
                        }
                        if(lname === ""){
                            
                            Swal.fire('Last name is Required!','', 'error') 
                            return false 
                        }
                        if(username === ""){
                            
                            Swal.fire('Username is Required!','', 'error') 
                            return false 
                        }

                        if(password === ""){
                            Swal.fire('Password is Required!','', 'error')
                            return false;
                        }
                        if(role === ""){
                            
                            Swal.fire('Role is Required!','', 'error') 
                            return false 
                        }

                        if(fname !="" && lname !="" && role!="" && username != "" && password != ""){
                            
                            // Swal.fire('Saved!', '', 'error')  
                            // Swal.fire({  
                            // title: 'Do you want to save the changes?',  
                            // showDenyButton: true,  showCancelButton: true,  
                            // confirmButtonText: `Save`,  
                            // denyButtonText: `Don't save`,
                            // }).then((result) => {  
                            //     /* Read more about isConfirmed, isDenied below */  
                            //     if (result.isConfirmed) {    
                            //         Swal.fire('Saved!', '', 'success')  
                            //     } else if (result.isDenied) {    
                            //         Swal.fire('Changes are not saved', '', 'info')  
                            //     }
                            // });
                            document.querySelector('.loader').classList.add('overlayLoader');
                            document.querySelector('.rounding').classList.add('roundLoader');
                            fetch('/procurement/app/customroute/create',{
                                method:'POST',
                                body:JSON.stringify({
                                   username:username,
                                   password:password,
                                   fname:fname,
                                   lname:lname,
                                   role:role
                                }),
                                headers: { "Content-type": "application/x-www-form-urlencoded"},
                                                                    
                            })
                            .then(res=>res.json())
                            .then(data=>{
                                console.log(data)
                                if(data['status']){
                                    document.querySelector('.loader').classList.remove('overlayLoader');
                                    document.querySelector('.rounding').classList.remove('roundLoader');
                                    document.querySelector('.loginFailed').classList.add('myalert');
                                    document.querySelector('.loginFailed').classList.add('alert');
                                    document.querySelector('.loginFailed').classList.add('alert-success');
                                    Swal.fire(data['data'],'', 'success');
                                    window.location="/procurement/auth/login"

                                }else{
                                    document.querySelector('.loader').classList.remove('overlayLoader');
                                    document.querySelector('.rounding').classList.remove('roundLoader');
                                    document.querySelector('.loginFailed').classList.add('myalert');
                                    document.querySelector('.loginFailed').classList.add('alert');
                                    document.querySelector('.loginFailed').classList.add('alert-danger');
                                    document.querySelector('.loginFailed').innerHTML = data['data']

                                    
                                }
                              
                            })
                            .catch(err=> {
                                
                                console.log(err)
                                document.querySelector('.loader').classList.remove('overlayLoader');
                                document.querySelector('.rounding').classList.remove('roundLoader');
                                document.querySelector('.loginFailed').classList.add('myalert');
                                document.querySelector('.loginFailed').classList.add('alert');
                                document.querySelector('.loginFailed').classList.add('alert-danger');
                                document.querySelector('.loginFailed').innerHTML = err;
                            })



                           


                        }
                    })
            </script>
    </body>
<html>