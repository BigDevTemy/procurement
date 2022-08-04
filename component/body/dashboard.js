function dashboard(){
    let wrapper =  document.getElementById('component-body');
    

    OnLoadAddClass();
    let content = `
                    <div class="bodyClass">
                        <div class="titlebarBody">
                            <div class="textTitle">Analytical Overview</div>
                            <div class="search">
                                <input type="text" placeholder="Search for an order" class="form-control"/>
                            </div>
                        </div>

                        <div class="parentCard">
                            <div class="card">
                                <div class="graph">
                                    <img src="../assets/images/graph-down@3x.svg"/>
                                </div>
                                <div class="graph-info">
                                    <div class="topic">TOTAL ORDER</div>
                                    <div class="count">230</div>
                                    <div class="count-left">OUT OF 230</div>
                                </div>
                            </div>

                            <div class="card">
                                <div class="graph">
                                    <img src="../assets/images/approval.svg"/>
                                </div>
                                <div class="graph-info">
                                    <div class="topic">FOR APPROVAL</div>
                                    <div class="count">230</div>
                                    <div class="count-left">OUT OF 360</div>
                                </div>
                            </div>

                            <div class="card">
                                <div class="graph">
                                    <img src="../assets/images/shipping.svg"/>
                                </div>
                                <div class="graph-info">
                                    <div class="topic">FOR SHIPPING</div>
                                    <div class="count">30</div>
                                    <div class="count-left">OUT OF 360</div>
                                </div>
                            </div>

                            <div class="card">
                                <div class="graph">
                                    <img src="../assets/images/delivered.svg"/>
                                </div>
                                <div class="graph-info">
                                    <div class="topic">FOR DELIVERY</div>
                                    <div class="count">30</div>
                                    <div class="count-left">OUT OF 60</div>
                                </div>
                            </div>

                        </div>
                        <div class="graph-flow">
                            <div class="graph-1">
                                <div class="card-title-monthly">Revenue By Supplier</div>
                                <small>monthly order review</small>
                               
                            </div>
                            <div class="graph-2">
                                <div class="card-title-monthly"> Total Revenue</div>
                                <small></small>
                                <div>
                                    <img src="../assets/images/piechart.png" class="piechart"/>
                            
                                </div>
                            </div>
                        </div>

                        

                        <div class="best-seller">
                            <div>
                                <div class="card-title-monthly">Best Supplier</div>
                                <small>Base on approvals</small>
                            </div>
                            

                        </div>
                       
                    
                    </div>
                   
                `

    wrapper.innerHTML=content
}

function OnLoadAddClass(){
        let getFirstChild = document.querySelector('.aside-nav').children[0]
        getFirstChild.classList.add('active')
        getFirstChild.children[1].style.color="#000"
        let clickednav = 'Dashboard';
        let img = document.querySelector('.aside-nav').children[0].children[0].children[0]
        let getActiveIcon = logoActive(clickednav)
        img.src=getActiveIcon
}


function logoActive(logoNavname){
    switch(logoNavname){
        case 'Dashboard':
            return "../assets/images/sidebar-icons/dashboardActive.svg";
            break;
        case 'Supplier':
            return "../assets/images/sidebar-icons/supplierActive.svg";
            break
        case 'Item':
            return "../assets/images/sidebar-icons/itemActive.svg";
            break
        case 'Approval':
            return "../assets/images/sidebar-icons/approvalActive.svg";
            break
        case 'Report':
            return "../assets/images/sidebar-icons/reportActive.svg";
            break
    }
}