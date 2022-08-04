<?php
session_start();
   
    if(!$_SESSION['user']['username']){
        echo '<script>location="procurement/auth/login"</script>';
    }
?>


<html>
    <head>
        <title>Procify | App</title>
        <link rel="stylesheet" href="../assets/css/body.css"/>
        <link rel="stylesheet" href="../assets/css/othercomponent.css"/>
        <link rel="stylesheet" href="../assets/css/jquery.dataTables.min.css"/>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"/>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>  
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
        <script src="../assets/js/Chart.js"></script>
        <script src="../assets/js/sweetalert2@11.js"></script>
        <script src="../assets/js/jquery-3.5.1.js"></script>
        <script src="../assets/js/jquery.dataTables.min.js"></script>
        
        
        
    </head>
    
    <body>
      <div class="landing" id="wrapper">
        <div class="loader">
            <div class="rounding"></div>

        </div>

        <input type="hidden" value="<?php echo $_SESSION['user']['username'];  ?>" id="username"/>
            
        <div class="titlebar component-aside">
                <div class="sidebar-logo-parent">
                    <img src="../assets/images/logo.png" class="sidebar-logo"/>
                    <div class="app-name">
                        Procidy Procurement App
                        <div>
                
                </div>

                
                <div class="userProfile">
                    <img src="../assets/images/person-check.svg"/>
                    <?php echo '<div class="rolename">Welcome '.$_SESSION['user']['username'].'!<br/>
                    <small class="smaly">'.$_SESSION['user']['role'].'</small>
                    </div>';  ?></div>

                    </div>
                    <div class="aside-nav">
                        <div class="navNon">
                            
                            <div><img src="../assets/images/sidebar-icons/dashboard.svg" /></div>
                            <div>Dashboard</div>
                        </div>
                        <div class="navNon">
                          
                                <div><img src="../assets/images/sidebar-icons/supplier.svg" /></div>
                                <div>Supplier</div>
                            
                            
                        </div>
                        <div class="navNon">
                            <div><img src="../assets/images/sidebar-icons/item.svg" /></div>
                            <div>Order</div>
                        </div>
                        <div class="navNon">
                            <div><img src="../assets/images/sidebar-icons/requisition.svg" /></div>
                            <div>Requisition</div>
                        </div>
                        <div class="navNon">
                            <div><img src="../assets/images/sidebar-icons/approval.svg" /></div>
                            <div>Approval</div>
                        </div>

                        <div class="navNon">
                            <div><img src="../assets/images/sidebar-icons/report.svg" /></div>
                            <div>Report</div>
                        </div>
                    
                    </div>

                   
                </div>
        </div>
        <div class="component-body" id="component-body">
                
        </div>
    </div>
    
    
    </body>
    <script src="../component/body/approval.js"></script>
    
    <script src="../component/body/requisition.js"></script>
    <script src="../component/body/order.js"></script>
    <script src="../component/body/supplier.js"></script>
    <script src="../component/body/commit.js"></script>
    <script src="../component/body/tabcomponent.js"></script>
    <script src="../component/body/othercomponent.js"></script>
    
    <script src="../component/body/dashboard.js"></script>
    <script src="../component/sidebar/index.js"></script>
    <script src="../component/body/overall.js"></script>
    <script>
        var hash = location.hash.replace('#','');
        autopushActive(hash);
      
        
       
       
    </script>
</html>