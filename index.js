function init(){
    displayEmployees();
    displayFilters();   
}

const updateLocalStorageData=(fname,lname,job_title,dept,email,office,phone,skype)=>{
    let emp = JSON.parse(localStorage.getItem('employee_details'));
    const employee = new Object();
    employee.first_name=fname;
    employee.last_name=lname;
    employee.job_title=job_title;
    employee.department=dept;
    employee.email=email;
    employee.office=office;
    employee.phone_number=phone;
    employee.skype=skype;
    if(emp==null){
        ar = [];
        ar.push(employee);
        localStorage.setItem('employee_details',JSON.stringify(ar));
        let html = `<li><a href="#" class="${dept}" onclick="filterByCategory('${dept}','DEPARTMENT')">${dept} (1)</a></li>`;
        $("#deptmt").append(html);
        let html1 = `<li><a href="#" onclick="filterByCategory('${office}','OFFICE')">${office} (1)</a></li>`;
        $("#ofcs").append(html1);
        let html2 = `<li><a href="#" onclick="filterByCategory('${job_title}','JOB_TITLE')">${job_title} (1)</a></li>`;
        $("#job-titles").append(html2);
    }else{
        let isDepartment=true,isOffice=true,isJobTitle=true;
        for(var i=0;i<emp.length;i++){
            if(emp[i].department == dept){
                isDepartment=false;
            }
            if(emp[i].office == office){
                isOffice=false;
            }
            if(emp[i].job_title == job_title){
                isJobTitle=false;
            }
        }
        if(isDepartment){
            let html = `<li><a href="#" class="${dept}" onclick="filterByCategory('${dept}','DEPARTMENT')">${dept} (1)</a></li>`;
            $("#deptmt").append(html);
        }
        if(isOffice){
            let html1 = `<li><a href="#" onclick="filterByCategory('${office}','OFFICE')">${office} (1)</a></li>`;
            $("#ofcs").append(html1);
        }
        if(isJobTitle){
            let html2 = `<li><a href="#" onclick="filterByCategory('${job_title}','JOB_TITLE')">${job_title} (1)</a></li>`;
            $("#job-titles").append(html2);
        }
        emp.push(employee);
        localStorage.setItem('employee_details',JSON.stringify(emp));
    }
}

function displayFilters(){
    let employee = JSON.parse(localStorage.getItem('employee_details'));
    if(employee){
        let dup1 = [],
            dup2 = [],
            dup3 = [];
        for(var i=0;i<employee.length;i++){
            if(dup1.includes(employee[i].department)==false){
                dup1.push(employee[i].department);
            }
            if(dup2.includes(employee[i].office)==false){
                dup2.push(employee[i].office);
            }
            if(dup3.includes(employee[i].job_title)==false){
                dup3.push(employee[i].job_title);
            }
        }
        for(var i=0;i<dup1.length;i++){
            let cnt=0;
            for(var j=0;j<employee.length;j++){
                if(dup1[i]==employee[j].department){
                    cnt++;
                }
            }
            let html = `<li><a href="#" onclick="filterByCategory('${dup1[i]}','DEPARTMENT')">${dup1[i]} (${cnt})</a></li>`;
            $("#deptmt").append(html);
        }
        for(var i=0;i<dup2.length;i++){
            let cnt=0;
            for(var j=0;j<employee.length;j++){
                if(dup2[i]==employee[j].office){
                    cnt++;
                }
            }
            let html1 = `<li><a href="#" onclick="filterByCategory('${dup2[i]}','OFFICE')">${dup2[i]} (${cnt})</a></li>`;
            $("#ofcs").append(html1);
        }
        for(var i=0;i<dup3.length;i++){
            let cnt=0;
            for(var j=0;j<employee.length;j++){
                if(dup3[i]==employee[j].job_title){
                    cnt++;
                }
            }
            let html2 = `<li><a href="#" onclick="filterByCategory('${dup3[i]}','JOB_TITLE')">${dup3[i]} (${cnt})</a></li>`;
            $("#job-titles").append(html2);
        }
    }
}

function displayEmployees(){
    let employee = JSON.parse(localStorage.getItem('employee_details'));
    if(employee){
        for(var i=0;i<employee.length;i++){
            let name = employee[i].first_name+" "+employee[i].last_name
            let html = `<div class="col-xl-3 col-lg-4 col-sm-6 my-4 card-1" onclick="editEmployeeDetails(${i})">
                            <div class="card">
                                <div class="row no-gutters">
                                    <div class="col-4" >
                                        <img src="${employee[i].image}" class="img-fluid" alt="">
                                    </div>
                                    <div class="col-8">
                                        <div class="card-block px-2" >
                                            <ul>
                                                <li class="card-text"><span class="fullname">${name}</span></li>
                                                <li class="card-text" class="job">${employee[i].job_title}</li>
                                                <li class="card-text" class="dpt">${employee[i].department}</li>
                                                <a href="#"}"><i class="fa-solid fa-square-phone"></i></a>
                                                <a href="#"><i class="fa-solid fa-envelope"></i></a>
                                                <a><i class="fa-solid fa-comment"></i></a>
                                                <a><i class="fa-solid fa-star"></i></a>
                                                <a><i class="fa-solid fa-heart"></i></a>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>`;
            $("#info").append(html);
        }
    }
}

$(".signup form").submit(function(event){
    event.preventDefault();
});
$("#open").on("click",function(){
    $(".popup").css("display","flex");
});
$(".close").on("click",function(){
    $(".popup").css("display","none");
});

$("#btn1").on("click",function(){
    let isValid=true;
    var reader = new FileReader();
    let fname = $("#fn").val();
    let lname = $("#ln").val();
    let email = $("#em").val();
    let job_title = $("#jt").val();
    let office = $("#of").val();
    let dept = $("#dp").val();
    let phone = $("#ph").val();
    let skype = $("#si").val();
    let image = $("#im").get(0).files[0];
    
    if(fname == "" || lname == "" || job_title == "" || dept == "" || office == "" || email == "" || phone.length != 10 || skype == ""){
        isValid=false;
    }
    if(isValid){
        updateLocalStorageData(fname,lname,job_title,dept,email,office,phone,skype,image);
        $(reader).on("load",function(){
            let emp = JSON.parse(localStorage.getItem('employee_details'));
            let len = emp.length;
            emp[len-1].image = reader.result;
            localStorage.setItem('employee_details',JSON.stringify(emp));
            let n = len-1;
            let html =    `<div class="col-lg-3 my-4 card-1" onclick="editEmployeeDetails(${n})">
                                <div class="card">
                                    <div class="row no-gutters">
                                        <div class="col-4" >
                                            <img src="${reader.result}" class="img-fluid" alt="">
                                        </div>
                                        <div class="col-8">
                                            <div class="card-block px-2" >
                                                <ul>
                                                    <li class="card-text"><span class="fullname">${fname} ${lname}</span></li>
                                                    <li class="card-text" class="job">${job_title}</li>
                                                    <li class="card-text" class="dpt">${dept}</li>
                                                    <a href="#"><i class="fa-solid fa-square-phone"></i></a>
                                                    <a href="#"><i class="fa-solid fa-envelope"></i></a>
                                                    <a><i class="fa-solid fa-comment"></i></a>
                                                    <a><i class="fa-solid fa-star"></i></a>
                                                    <a><i class="fa-solid fa-heart"></i></a>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>`;
            $("#info").append(html);
        });
        if(image){
            reader.readAsDataURL(image);
        }
        $(".popup").css("display","none");
        clearAddEmployeeForm();
    }
})


const preferredSearch = ()=>{
    var user = $("#slctdd").val();
    alert(user);
    $("#myInput").attr("name",user);
}

const searchBar=()=>{
    let employee = JSON.parse(localStorage.getItem('employee_details'));
    let selectedFilter = $("#myInput").attr("name");
    switch(selectedFilter){
        case "Department" : for(var i=0;i<$(".card-1").length;i++){
                                let name = employee[i].department;
                                name=name.toUpperCase();
                                if(name){
                                    if(name.indexOf($("#myInput").val().toUpperCase()) > -1){
                                        $(".card-1").eq(i).css("display","");
                                    }else{
                                        $(".card-1").eq(i).css("display","none");
                                    }
                                }
                            }
                            break;
        case "Job Title" : for(var i=0;i<$(".card-1").length;i++){
                                let name = employee[i].job_title;
                                name = name.toUpperCase();
                                if(name){
                                    if(name.indexOf($("#myInput").val().toUpperCase()) > -1){
                                        $(".card-1").eq(i).css("display","");
                                    }else{
                                        $(".card-1").eq(i).css("display","none");
                                    }
                                }
                            }
                            break;
        default : for(var i=0;i<$(".card-1").length;i++){
                    let name = employee[i].first_name+" "+employee[i].last_name;
                    name = name.toUpperCase();
                    if(name){
                        if(name.indexOf($("#myInput").val().toUpperCase()) > -1){
                            $(".card-1").eq(i).css("display","");
                        }else{
                            $(".card-1").eq(i).css("display","none");
                        }
                    }
                }
    }
}


const searchByAlphabet=(s)=>{
    let employee = JSON.parse(localStorage.getItem("employee_details"));
    for(var i=0;i<employee.length;i++){
        if(s == ""){
            $(".card-1").eq(i).css("display","");
        }else{
            let name = employee[i].first_name+" "+employee[i].last_name;
            if(name.toUpperCase()[0]==s[0]){
                $(".card-1").eq(i).css("display","");
            }else{
                $(".card-1").eq(i).css("display","none");
            }
        }
    }

}

const filterByCategory=(s,category)=>{
    let employee = JSON.parse(localStorage.getItem('employee_details'));
    switch(category){
        case "DEPARTMENT" : for(var i=0;i<employee.length;i++){
                                if(employee[i].department.toUpperCase() == s.toUpperCase()){
                                    $(".card-1").eq(i).css("display","");
                                }else{
                                    $(".card-1").eq(i).css("display","none");
                                }
                            }
                            break;
        case "OFFICE"   :     for(var i=0;i<employee.length;i++){
                                if(employee[i].office.toUpperCase() == s.toUpperCase()){
                                    $(".card-1").eq(i).css("display","");
                                }else{
                                    $(".card-1").eq(i).css("display","none");
                                }
                            }
                            break;
        case "JOB_TITLE" : for(var i=0;i<employee.length;i++){
                                if(employee[i].job_title.toUpperCase() == s.toUpperCase()){
                                    $(".card-1").eq(i).css("display","");
                                }else{
                                    $(".card-1").eq(i).css("display","none");
                                }
                            }
                            break;
    }
}

const clearSearch=()=>{
    $("#myInput").val("");
    searchBar('');
}

const editEmployeeDetails=(i)=>{
    $(".popup_wrap1").css("display","flex");
    let employee = JSON.parse(localStorage.getItem('employee_details'));
    clearForm();
    $("#fn1").val(employee[i].first_name);
    $("#ln1").val(employee[i].last_name);
    $("#em1").val(employee[i].email);
    $("#jt1").val(employee[i].job_title);
    $("#of1").val(employee[i].office);
    $("#dp1").val(employee[i].department);
    $("#ph1").val(employee[i].phone_number);
    $("#si1").val(employee[i].skype);
    $("#myIMAGE").attr("src",employee[i].image);
    $("#btn4").attr("name",i);
}


$("#btn4").on("click",function(){
    flag=true;
    let idx = parseInt($("#btn4").attr("name"));
    var reader = new FileReader();
    let fname = $("#fn1").val();
    let lname = $("#ln1").val();
    let email = $("#em1").val();
    let job_title = $("#jt1").val();
    let office = $("#of1").val();
    let dept = $("#dp1").val();
    let phone = $("#ph1").val();
    let skype = $("#si1").val();
    let image = $("#im1").get(0).files[0];
    if(fname == "" || lname == "" || job_title == "" || dept == "" || office == "" || email == "" || phone.length != 10 || skype == ""){
        flag=false;
    }
    if(flag){
        let emp = JSON.parse(localStorage.getItem('employee_details'));
        $(reader).on("load",function(){
            emp[idx]={
                first_name:fname,last_name:lname,email:email,job_title:job_title,office:office,department:dept,phone_number:phone,
                skype:skype,image:reader.result
            }
            localStorage.setItem('employee_details',JSON.stringify(emp));
            $(".card-1").eq(idx).find(".img-fluid").eq(0).attr("src",reader.result);
            $(".card-1").eq(idx).find(".fullname").text(fname+" "+lname);
            $(".card-1").eq(idx).find("li").eq(1).text(job_title);
            $(".card-1").eq(idx).find("li").eq(2).text(dept);
        });
        if(image){
            reader.readAsDataURL(image);
        }else{
            emp[idx]={
                first_name:fname,last_name:lname,email:email,job_title:job_title,office:office,department:dept,phone_number:phone,
                skype:skype,image:emp[idx].image
            }
            localStorage.setItem('employee_details',JSON.stringify(emp));
            $(".card-1").eq(idx).find(".fullname").text(fname+" "+lname);
            $(".card-1").eq(idx).find("li").eq(1).text(job_title);
            $(".card-1").eq(idx).find("li").eq(2).text(dept);
        }
    }else{
        alert('enter valid details');
    }
    $(".popup_wrap1").css("display","none");
});

const closeEmployeeDetails=()=>{
    $(".popup_wrap1").css("display","none");
}

function clearForm()
{
    $("#fn1, #ln1, #em1, #jt1, #of1, #dp1, #ph1, #si1, #im1").each(function(){
        $(this).val("");
    });
}

function clearAddEmployeeForm(){
    $("#fn, #ln, #pn, #em, #jt, #of, #dp, #ph, #si, #im").each(function(){
        $(this).val("");
    });
}
init();