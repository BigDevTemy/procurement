<?php
session_start();
   
    if(!$_SESSION['user']['username']){
        echo '<script>location="/procurement/auth/login"</script>';
    }
?>


<html>
    <head>
        <title>Procify | App</title>
        <link rel="stylesheet" href="../assets/css/body.css"/>
        <link rel="stylesheet" href="../assets/css/othercomponent.css"/>
        <link rel="stylesheet" href="../assets/css/bootstrap.min.css" />
        
        <link rel="stylesheet" href="../assets/css/jquery.dataTables.min.css"/>
      
        <script src="../assets/js/bootstrap.min.js"></script>
        <script src="../assets/js/Chart.js"></script>
        <script src="../assets/js/sweetalert2@11.js"></script>
        <script src="../assets/js/jquery-3.5.1.js"></script>
        <script src="../assets/js/jquery.dataTables.min.js"></script>
        
        <style>
      * {
        margin: 0;
        padding: 0;
        font-family: sans-serif;
      }
      .chartMenu {
        width: 100%;
        height: 40px;
        background: #1A1A1A;
        color: rgba(255, 26, 104, 1);
      }
      .chartMenu p {
        padding: 10px;
        font-size: 20px;
      }
      .chartCard {
        width: 100%;
        height: 100%;
        background-color:transparent;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .chartBox {
        width: 100%;
        padding: 20px;
        border-radius: 20px;
        border: solid 3px rgba(255, 26, 104, 1);
        background-color:transparent;
      }
    </style>
        
    </head>
    
    
    <body>
      <div class="landing" id="wrapper">
        <div class="loader">
            <div class="rounding"></div>

        </div>

        <div class="mymodal"></div>

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
                            <div><img src="../assets/images/sidebar-icons/approval.svg" /></div>
                            <div>PO</div>
                        </div>
                        <div class="navNon">
                            <div><img src="../assets/images/sidebar-icons/shippment.svg" /></div>
                            <div>Shippment</div>
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
    <script src="../component/body/delete.js"></script>
    <script src="../component/body/report.js"></script>
    <script src="../component/body/approvalModal.js"></script>
    <script src="../component/body/poModal.js"></script>
    <script src="../component/body/modal.js"></script>
    <script src="../component/body/shippment.js"></script>
    <script src="../component/body/po.js"></script>
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
    <script >
            const data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        datasets: [{
            label: 'Orders',
            data: [18, 12, 6, 9, 12, 3, 9],
            backgroundColor: [
            'rgba(255, 26, 104, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(0, 0, 0, 0.2)'
            ],
            borderColor: [
            'rgba(255, 26, 104, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(0, 0, 0, 1)'
            ],
            tension: 0.4
        }]
        };

        // config 
        const config = {
        type: 'line',
        data,
        options: {
            scales: {
            y: {
                beginAtZero: true
            }
            }
        }
        };
        const configII = {
        type: 'bar',
        data,
        options: {
            scales: {
            y: {
                beginAtZero: true
            }
            }
        }
        };

        // render init block
        const myChart = new Chart(
        document.getElementById('myChart'),
        config
        );

        const myChartII = new Chart(
        document.getElementById('myChartII'),
        configII
        );

      </script>
</html>