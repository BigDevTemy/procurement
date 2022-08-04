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

                    <div class="loginauth">
                            <div class="logo">
                                <img src="../assets/images/logo.png"/>
                            </div>
                            <div class="call_to_action">
                                Provide your login details. 
                                
                            </div>
                            <div class="loginFailed"></div>
                            <div class="container">
                                
                                <div>
                                    <input type="text" placeholder="Username" class="form-control" id="username"/>
                                </div>
                                <div>
                                    <input type="password" placeholder="Password" class="form-control" id="password"/>
                                </div>

                                <div>
                                    <input type="button" class="form-control" value="Login" id="login"/>
                                </div>
                            </div>
                           

                    </div> 

                </div>
        <div>
            <script>
                    let x = document.getElementById('login');

                    x.addEventListener('click',function(e){
                        e.preventDefault();
                        let username = document.getElementById('username').value;
                        let password = document.getElementById('password').value;
                      
                        
                        if(username === ""){
                            
                            Swal.fire('Username is Required!','', 'error') 
                            return false 
                        }

                        if(password === ""){
                            Swal.fire('Password is Required!','', 'error')
                            return false;
                        }

                        if(username != "" && password != ""){
                            
                            document.querySelector('.loader').classList.add('overlayLoader');
                            document.querySelector('.rounding').classList.add('roundLoader');
                            fetch('/procurement/app/customroute/login',{
                                method:'POST',
                                body:JSON.stringify({
                                   username:username,
                                   password:password
                                }),
                                headers: { "Content-type": "application/x-www-form-urlencoded"},
                                                                    
                            })
                            .then(res=>res.json())
                            .then(data=>{
                                console.log("data",data)
                                if(data['status']){
                                    document.querySelector('.loader').classList.remove('overlayLoader');
                                    document.querySelector('.rounding').classList.remove('roundLoader');
                                    // document.querySelector('.loginFailed').classList.add('myalert');
                                    // document.querySelector('.loginFailed').classList.add('alert');
                                    // document.querySelector('.loginFailed').classList.add('alert-success');
                                    window.location="/procurement/dashboard/app"

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
            </script>
    </body>
<html>