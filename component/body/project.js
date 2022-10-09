function Project(search){
    
    let content = ` 
                    <div class="supplierDiv">
                        <div class="modalClass"></div>
                        <div class="tabDiv">
                            <div class="tab-active">Add Project</div>
                            <div>All Project</div>
                        </div>
                        <div class="tab-body render_body_content supplier">
                            ${loadProject()}  
                        </div>
                    </div>
                `
    return content;
    

   
}

function loadProject(){
    return     `
                <div class="col-md-6">
                    <label>Project Name</label>
                    <input type="text" class="form-control selector" placeholder="Provide Project Name" id="project_name"/>
                </div>
                <div class="col-md-6">
                    <input type="submit" class="form-control selectorSave" value="Save" id="saveProject"/>
                </div>
                `
              
        //document.querySelector('.render_body_content').innerHTML = content
}
function AddProject(){
    let content =`
                    <div class="col-md-6">
                        <label>Project Name</label>
                        <input type="text" class="form-control selector" placeholder="Provide Project Name" id="project_name"/>
                    </div>
                    <div class="col-md-6">
                        <input type="submit" class="form-control selectorSave" value="Save" id="saveProject"/>
                    </div>

                `
        document.querySelector('.render_body_content').innerHTML = content
        saveProjectModule();
}

function AllProject(){
   
 
    let content = `<table id="project" class="table table-striped table-bordered" style="width:100%">
                <thead>
                    <tr class="shippmentTR ">
                        <th>SN</th>
                        <th>PROJECT NAME</th>
                        <th>DATE</th>
                        <th>ACTION</th>
                    </tr>
                </thead>
            </table>`

            document.querySelector('.render_body_content').innerHTML = content
    
            getAllProject();
}

function getAllProject(){

    let count=0;

    fetch('/procurement/app/customroute/getAllProject',{
        method:'GET',
        
    })
    .then(result=>result.json())
    .then(res=>{
        
        let count = 0;
       
       let dataset="";
      

        let table = $('#project').DataTable({
            data:res.data,
            destroy:true,
            dom: 'Blfrtip',
            buttons: [
                 {
                    "extend":'excel', "text":'Export  to Excel',"className":'btn  btn-secondary mb-4'
                 },
                 {
                    "extend":'print', "text":'Print Report',"className":'btn  btn-success mb-4'
                 }
            ],
            columns:[
                    {
                    data:"",
                    render:function(){
                        return count = count+ 1;
                    }
                },
                {data:"project_name"},
                {data:"created_at"},
                {data:'',
                        render:function(data,type,row){
                         
                             return `<div>
                                            <button class="btn btn-secondary" onclick="modal('modalProject',${row.id},'Edit Projectname')">Edit</button>
                                                    
                                        </div>`
                                       }
                }
                
            ]
        })
        
       
          
           
       
        
    })
    .catch(err=>console.log(err))

      
}


function saveProjectModule(){
    document.getElementById('saveProject').addEventListener('click',function(e){
        e.preventDefault();
       
        let project_name = document.getElementById('project_name').value
        let author = document.getElementById('username').value
                    
        if(project_name === ""){
            
            Swal.fire('Project Name is Required!','', 'error') 
            return false 
        }
       


        

        if(project_name){
            
            document.querySelector('.loader').classList.add('overlayLoader');
            document.querySelector('.rounding').classList.add('roundLoader');
            fetch('/procurement/app/customroute/addproject',{
                method:'POST',
                body:JSON.stringify({
                    project_name,author
                    
                    
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
                    document.getElementById('project_name').value=""
                   

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



