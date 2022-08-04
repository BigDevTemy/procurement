let aside = document.getElementById('aside-nav')

document.querySelector('.aside-nav').addEventListener('click',function(e){
    
    let parent = e.target.parentElement;

    if(parent.classList.contains('navNon')){
        let grandparent = parent.parentElement

        for(let i=0; i< grandparent.children.length; i++){
            if(grandparent.children[i].classList.contains('active')){
                grandparent.children[i].classList.remove('active')
                
            }
            let navName = grandparent.children[i].children[1].textContent
            grandparent.children[i].children[1].style.color="#fff"
            let imgIcon = grandparent.children[i].children[0].children[0]
            let nonActiveIcon = logoNonActive(navName)
            imgIcon.src=nonActiveIcon
        }

        parent.classList.add('active')
        parent.children[1].style.color="#000"
        let clickednav = parent.children[1].textContent;

        let img = parent.children[0].children[0]
        let getActiveIcon = logoActive(clickednav)
        img.src=getActiveIcon
        if(clickednav === "Dashboard"){
            _push(window.location.href.split('#')[0])
           
        }
        else{
            // window.location=`#${clickednav}`
            let x = window.location.href.split('#')[0] 
            _push(window.location.href.split('#')[0]+`#${clickednav}`)
             
        }
        
        
    }
    
   
    
    
})

function autopushActive(hash){

    let x  = document.querySelectorAll('.navNon');
    for(let i=0;i<x.length;i++){
        let y = x[i].children[1].textContent
        
        if(y == hash){
            x[i].children[1].parentElement.classList.add('active')
            x[i].children[1].style.color="#000"
            
            let getActiveimage = logoActive(hash)
            x[i].children[1].src= getActiveimage;
            
           
            // y.parentElement.classList.add('active')
        }
    }
}


function logoNonActive(logoNavname){
    switch(logoNavname){
        case 'Dashboard':
            return "../assets/images/sidebar-icons/dashboard.svg";
            break;
        case 'Supplier':
            return "../assets/images/sidebar-icons/supplier.svg";
            break
        case 'Order':
            return "../assets/images/sidebar-icons/item.svg";
            break
        case 'Requisition':
            return "../assets/images/sidebar-icons/requisition.svg";
            break
        case 'Approval':
            return "../assets/images/sidebar-icons/approval.svg";
            break
        case 'Report':
            return "../assets/images/sidebar-icons/report.svg";
            break
    }
}

function logoActive(logoNavname){
    switch(logoNavname){
        case 'Dashboard':
            return "../assets/images/sidebar-icons/dashboardActive.svg";
            break;
        case 'Supplier':
            return "../assets/images/sidebar-icons/supplierActive.svg";
            break
        case 'Order':
            return "../assets/images/sidebar-icons/itemActive.svg";
            break
        case 'Requisition':
            return "../assets/images/sidebar-icons/requisitionActive.svg";
            break
        case 'Approval':
            return "../assets/images/sidebar-icons/approvalActive.svg";
            break
        case 'Report':
            return "../assets/images/sidebar-icons/reportActive.svg";
            break
    }
}
