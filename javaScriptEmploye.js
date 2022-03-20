displayEmployees();
displayFilters();
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
        let elem = document.getElementById("deptmt");
        let html = `<li><a href="#" class="${dept}" onclick="FilterBy('${dept}',1)">${dept} (1)</a></li>`;
        elem.insertAdjacentHTML('beforeend',html);
        let elem1 = document.getElementById("ofcs");
        let html1 = `<li><a href="#" onclick="FilterBy('${office}',2)">${office} (1)</a></li>`;
        elem1.insertAdjacentHTML('beforeend',html1);
        let elem2 =document.getElementById("job-titles");
        let html2 = `<li><a href="#" onclick="FilterBy('${job_title}',3)">${job_title} (1)</a></li>`;
        elem2.insertAdjacentHTML('beforeend',html2);
    }else{
        let flag1=true,flag2=true,flag3=true;
        for(var i=0;i<emp.length;i++){
            if(emp[i].department == dept){
                flag1=false;
            }
            if(emp[i].office == office){
                flag2=false;
            }
            if(emp[i].job_title == job_title){
                flag3=false;
            }
        }
        if(flag1){
            let elem = document.getElementById("deptmt");
            let html = `<li><a href="#" class="${dept}" onclick="FilterBy('${dept}',1)">${dept} (1)</a></li>`;
            elem.insertAdjacentHTML('beforeend',html);
        }
        if(flag2){
            let elem1 = document.getElementById("ofcs");
            let html1 = `<li><a href="#" onclick="FilterBy('${office}',2)">${office} (1)</a></li>`;
            elem1.insertAdjacentHTML('beforeend',html1);
        }
        if(flag3){
            let elem2 =document.getElementById("job-titles");
            let html2 = `<li><a href="#" onclick="FilterBy('${job_title}',3)">${job_title} (1)</a></li>`;
            elem2.insertAdjacentHTML('beforeend',html2);
        }
        emp.push(employee);
        localStorage.setItem('employee_details',JSON.stringify(emp));
    }
}

function displayFilters(){
    let employee = JSON.parse(localStorage.getItem('employee_details'));
    if(employee){
        let elem = document.getElementById("deptmt");
        let elem1 = document.getElementById("ofcs");
        let elem2 = document.getElementById("job-titles");
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
            let html = `<li><a href="#" onclick="FilterBy('${dup1[i]}',1)">${dup1[i]} (${cnt})</a></li>`;
            elem.insertAdjacentHTML('beforeend',html);
        }
        for(var i=0;i<dup2.length;i++){
            let cnt=0;
            for(var j=0;j<employee.length;j++){
                if(dup2[i]==employee[j].office){
                    cnt++;
                }
            }
            let html1 = `<li><a href="#" onclick="FilterBy('${dup2[i]}',2)">${dup2[i]} (${cnt})</a></li>`;
            elem1.insertAdjacentHTML('beforeend',html1);
        }
        for(var i=0;i<dup3.length;i++){
            let cnt=0;
            for(var j=0;j<employee.length;j++){
                if(dup3[i]==employee[j].job_title){
                    cnt++;
                }
            }
            let html2 = `<li><a href="#" onclick="FilterBy('${dup3[i]}',3)">${dup3[i]} (${cnt})</a></li>`;
            elem2.insertAdjacentHTML('beforeend',html2);
        }
    }
}

function displayEmployees(){
    let ele = document.getElementById('info');
    let employee = JSON.parse(localStorage.getItem('employee_details'));
    if(employee){
        for(var i=0;i<employee.length;i++){
            let name = employee[i].first_name+" "+employee[i].last_name
            let html = `<div class="col-md-3 my-4 card-1" onclick="editEmployeeDetails(${i})">
                            <div class="card">
                                <div class="row no-gutters">
                                    <div class="col-4" >
                                        <img src="${employee[i].image}" class="img-fluid" alt="">
                                    </div>
                                    <div class="col-8">
                                        <div class="card-block px-2" >
                                            <ul>
                                                <li class="card-text"><span>${name}</span></li>
                                                <li class="card-text">${employee[i].job_title}</li>
                                                <li class="card-text">${employee[i].department}</li>
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
            ele.insertAdjacentHTML('beforeend',html);
        }
    }
}
const form = document.querySelector(".signup form");
form.onsubmit = (e)=>{
    e.preventDefault(); 
}
document.getElementById("open").addEventListener("click",function(){
    document.querySelector(".popup").style.display="flex";
});
document.querySelector(".close").addEventListener("click",function(){
    document.querySelector(".popup").style.display="none";
});

let submitBtn = document.getElementById('btn1');
submitBtn.onclick=()=>{
    flag=true;
    var reader = new FileReader();
    let fname = document.getElementById("fn").value;
    let lname = document.getElementById("ln").value;
    let email = document.getElementById("em").value;
    let job_title = document.getElementById("jt").value;
    let office = document.getElementById("of").value;
    let dept = document.getElementById("dp").value;
    let phone = document.getElementById("ph").value;
    let skype = document.getElementById("si").value;
    let image = document.getElementById("im").files[0];
    
    if(fname == "" || lname == "" || job_title == "" || dept == "" || office == "" || email == "" || phone.length != 10 || skype == ""){
        flag=false;
    }
    if(flag){
        updateLocalStorageData(fname,lname,job_title,dept,email,office,phone,skype,image);
        reader.addEventListener("load",function(){
            let emp = JSON.parse(localStorage.getItem('employee_details'));
            let len = emp.length;
            emp[len-1].image = reader.result;
            localStorage.setItem('employee_details',JSON.stringify(emp));
            let n = len-1;
            let ele = document.getElementById('info');
            let html =    `<div class="col-md-3 my-4 card-1" onclick="editEmployeeDetails(${n})">
                                <div class="card">
                                    <div class="row no-gutters">
                                        <div class="col-4" >
                                            <img src="${reader.result}" class="img-fluid" alt="">
                                        </div>
                                        <div class="col-8">
                                            <div class="card-block px-2" >
                                                <ul>
                                                    <li class="card-text"><span>${fname} ${lname}</span></li>
                                                    <li class="card-text">${job_title}</li>
                                                    <li class="card-text">${dept}</li>
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
            ele.insertAdjacentHTML('beforeend',html);
        });
        if(image){
            reader.readAsDataURL(image);
        }
        document.querySelector(".popup").style.display="none";
        clearAddEmployeeForm();
    }
}


const preferredSearch = ()=>{
    var user = document.getElementById("slctdd").value;
    document.getElementById("myInput").setAttribute('name',user);
}
const searchBar=()=>{
    var s = document.getElementById("myInput").name.toUpperCase();
    let filter = document.getElementById("myInput").value.toUpperCase();
    let employee = JSON.parse(localStorage.getItem('employee_details'));
    let ele = document.querySelectorAll(".card-1");
    if(s == 'DEPARTMENT'){
        for(var i=0;i<ele.length;i++){
            let name = employee[i].department;
            name=name.toUpperCase();
            if(name){
                if(name.indexOf(filter) > -1){
                    ele[i].style.display="";
                }else{
                    ele[i].style.display="none";
                }
            }
        }
    }else if(s == 'JOB TITLE'){
        for(var i=0;i<ele.length;i++){
            let name = employee[i].job_title;
            name = name.toUpperCase();
            if(name){
                if(name.indexOf(filter) > -1){
                    ele[i].style.display="";
                }else{
                    ele[i].style.display="none";
                }
            }
        }
    }else{
        for(var i=0;i<ele.length;i++){
            let name = employee[i].first_name+" "+employee[i].last_name;
            name = name.toUpperCase();
            if(name){
                if(name.indexOf(filter) > -1){
                    ele[i].style.display="";
                }else{
                    ele[i].style.display="none";
                }
            }
        }
    }
}


const searchByAlphabet=(s)=>{
    let ele = document.querySelectorAll(".card-1");
    let employee = JSON.parse(localStorage.getItem("employee_details"));
    for(var i=0;i<employee.length;i++){
        if(s == ""){
            ele[i].style.display="";
        }else{
            let name = employee[i].first_name+" "+employee[i].last_name;
            if(name.toUpperCase()[0]==s[0]){
                ele[i].style.display="";
            }else{
                ele[i].style.display="none";
            }
        }
    }

}

const FilterBy=(s,n)=>{
    let employee = JSON.parse(localStorage.getItem('employee_details'));
    s=s.toUpperCase();
    let ele = document.querySelectorAll(".card-1");
    if(n==1){
        for(var i=0;i<employee.length;i++){
            if(employee[i].department.toUpperCase() == s){
                ele[i].style.display="";
            }else{
                ele[i].style.display="none";
            }
        }
    }else if(n==2){
        for(var i=0;i<employee.length;i++){
            if(employee[i].office.toUpperCase() == s){
                ele[i].style.display="";
            }else{
                ele[i].style.display="none";
            }
        }
    }else if(n==3){
        for(var i=0;i<employee.length;i++){
            if(employee[i].job_title.toUpperCase() == s){
                ele[i].style.display="";
            }else{
                ele[i].style.display="none";
            }
        }
    }
}

const clearSearch=()=>{
    let ip = document.querySelector("#myInput");
    ip.value='';
    searchBar('');
}

const editEmployeeDetails=(i)=>{
    document.getElementsByClassName("popup_wrap1")[0].style.display="flex";
    let employee = JSON.parse(localStorage.getItem('employee_details'));
    clearForm();
    // document.getElementById("fn1").setAttribute('value',employee[i].first_name);
    // document.getElementById("ln1").setAttribute('value',employee[i].last_name);
    // document.getElementById("em1").setAttribute('value',employee[i].email);
    // document.getElementById("jt1").setAttribute('value',employee[i].job_title);
    document.getElementById("fn1").value = employee[i].first_name;
    document.getElementById("ln1").value =employee[i].last_name;
    document.getElementById("em1").value =employee[i].email;
    document.getElementById("jt1").value =employee[i].job_title;
    document.getElementById("of1").value = employee[i].office;
    document.getElementById("dp1").value = employee[i].department;
    document.getElementById("ph1").value = employee[i].phone_number;
    document.getElementById("si1").value = employee[i].skype;
    document.getElementById("myIMAGE").src=employee[i].image;
    document.getElementById("btn4").setAttribute('name',i); 
}

let subBtn = document.getElementById('btn4');
subBtn.addEventListener("click",editDetails);

function editDetails(){
    flag=true;
    let x = document.getElementById("btn4").name;
    let idx = parseInt(x);
    var reader = new FileReader();
    let fname = document.getElementById("fn1").value;
    let lname = document.getElementById("ln1").value;
    let email = document.getElementById("em1").value;
    let job_title = document.getElementById("jt1").value;
    let office = document.getElementById("of1").value;
    let dept = document.getElementById("dp1").value;
    let phone = document.getElementById("ph1").value;
    let skype = document.getElementById("si1").value;
    let image = document.getElementById("im1").files[0];
    if(fname == "" || lname == "" || job_title == "" || dept == "" || office == "" || email == "" || phone.length != 10 || skype == ""){
        flag=false;
    }
    if(flag){
        let employee = JSON.parse(localStorage.getItem('employee_details'));
        employee[idx].first_name = fname;
        employee[idx].last_name = lname;
        employee[idx].email = email;
        employee[idx].job_title = job_title;
        employee[idx].office = office;
        employee[idx].department = dept;
        employee[idx].phone_number = phone;
        employee[idx].skype = skype;
        reader.addEventListener("load",function(){
            employee[idx].image = reader.result;
            localStorage.setItem('employee_details',JSON.stringify(employee));
            let cd = document.getElementsByClassName("card-1")[idx];
            cd.getElementsByClassName("img-fluid")[0].src=reader.result;
            let cd1 = cd.getElementsByClassName("card-block")[0].getElementsByTagName('ul')[0];
            cd1.getElementsByTagName('li')[0].getElementsByTagName('span')[0].innerHTML=fname+" "+lname;
            cd1.getElementsByTagName('li')[1].innerHTML=job_title;
            cd1.getElementsByTagName('li')[2].innerHTML=dept;
        });
        if(image){
            reader.readAsDataURL(image);
        }else{
            localStorage.setItem('employee_details',JSON.stringify(employee));
            let cd = document.getElementsByClassName("card-1")[idx];
            let cd1 = cd.getElementsByClassName("card-block")[0].getElementsByTagName('ul')[0];
            cd1.getElementsByTagName('li')[0].getElementsByTagName('span')[0].innerHTML=fname+" "+lname;
            cd1.getElementsByTagName('li')[1].innerHTML=job_title;
            cd1.getElementsByTagName('li')[2].innerHTML=dept;
        }
    }else{
        alert('enter valid details');
    }
    document.getElementsByClassName("popup_wrap1")[0].style.display="none";
}

const closeEmployeeDetails=()=>{
    document.getElementsByClassName("popup_wrap")[0].style.display="none";
    document.getElementsByClassName("popup_wrap1")[0].style.display="none";
}


function clearForm()
{
    document.getElementById("fn1").value = "";
    document.getElementById("ln1").value="";
    document.getElementById("em1").value="";
    document.getElementById("jt1").value="";
    document.getElementById("of1").value = "";
    document.getElementById("dp1").value = "";
    document.getElementById("ph1").value = "";
    document.getElementById("si1").value = "";
    document.getElementById("im1").value= "";
}

function clearAddEmployeeForm(){
    document.getElementById("fn").value = "";
    document.getElementById("ln").value="";
    document.getElementById("em").value="";
    document.getElementById("jt").value="";
    document.getElementById("of").value = "";
    document.getElementById("dp").value = "";
    document.getElementById("ph").value = "";
    document.getElementById("si").value = "";
    document.getElementById("im").value = "";
}

/*let subBtn = document.getElementById('btn4');
subBtn.onclick = ()=>{
    document.getElementsByClassName("popup_wrap1")[0].style.display="none";
    flag=true;
    let x = document.getElementById("btn4").name;
    let idx = parseInt(x);
    var reader = new FileReader();
    let fname = document.getElementById("fn1").value;
    let lname = document.getElementById("ln1").value;
    let email = document.getElementById("em1").value;
    let job_title = document.getElementById("jt1").value;
    let office = document.getElementById("of1").value;
    let dept = document.getElementById("dp1").value;
    let phone = document.getElementById("ph1").value;
    let skype = document.getElementById("si1").value;
    let image = document.getElementById("im1").files[0];
    if(fname == "" || lname == "" || job_title == "" || dept == "" || office == "" || email == "" || phone.length != 10 || skype == ""){
        flag=false;
    }
    if(flag){
        let employee = JSON.parse(localStorage.getItem('employee_details'));
        employee[idx].first_name = fname;
        employee[idx].last_name = lname;
        employee[idx].email = email;
        employee[idx].job_title = job_title;
        employee[idx].office = office;
        employee[idx].department = dept;
        employee[idx].phone_number = phone;
        employee[idx].skype = skype;
        reader.addEventListener("load",function(){
            employee[idx].image = reader.result;
            localStorage.setItem('employee_details',JSON.stringify(employee));
            let cd = document.getElementsByClassName("card-1")[idx];
            cd.getElementsByClassName("img-fluid")[0].src=reader.result;
            let cd1 = cd.getElementsByClassName("card-block")[0].getElementsByTagName('ul')[0];
            cd1.getElementsByTagName('li')[0].getElementsByTagName('span')[0].innerHTML=fname+" "+lname;
            cd1.getElementsByTagName('li')[1].innerHTML=job_title;
            cd1.getElementsByTagName('li')[2].innerHTML=dept;
        });
        if(image){
            reader.readAsDataURL(image);
        }else{
            localStorage.setItem('employee_details',JSON.stringify(employee));
            let cd = document.getElementsByClassName("card-1")[idx];
            //cd.getElementsByClassName("img-fluid")[0].src=reader.result;
            let cd1 = cd.getElementsByClassName("card-block")[0].getElementsByTagName('ul')[0];
            cd1.getElementsByTagName('li')[0].getElementsByTagName('span')[0].innerHTML=fname+" "+lname;
            cd1.getElementsByTagName('li')[1].innerHTML=job_title;
            cd1.getElementsByTagName('li')[2].innerHTML=dept;
        }
    }
}*/

/*function editDetails(){
    document.getElementsByClassName("popup_wrap1")[0].style.display="none";
    flag=true;
    let x = document.getElementById("btn4").name;
    x=parseInt(x);
    var reader = new FileReader();
    let fname = document.getElementById("fn1").value;
    let lname = document.getElementById("ln1").value;
    let email = document.getElementById("em1").value;
    let job_title = document.getElementById("jt1").value;
    let office = document.getElementById("of1").value;
    let dept = document.getElementById("dp1").value;
    let phone = document.getElementById("ph1").value;
    let skype = document.getElementById("si1").value;
    let image = document.getElementById("im1").files[0];
    if(fname == "" || lname == "" || job_title == "" || dept == "" || office == "" || email == "" || phone.length != 10 || skype == ""){
        flag=false;
    }
    if(flag==true){
        let arr = JSON.parse(localStorage.getItem('id'));
        let arr1 = JSON.parse(localStorage.getItem('crud1'));
        let arr2 = JSON.parse(localStorage.getItem('crud2'));
        let arr3 = JSON.parse(localStorage.getItem('crud3'));
        let arr4 = JSON.parse(localStorage.getItem('crud4'));
        let idx=x-1;
        let j=idx*4;
        let s=fname+" "+lname;
        arr1[idx]=s;
        arr2[idx]=job_title;
        arr3[idx]=dept;
        arr4[j]=email;
        arr4[j+1]=office;
        arr4[j+2]=phone;
        arr4[j+3]=skype;
        reader.addEventListener("load",function(){
            let recentImageDataUrl = JSON.parse(localStorage.getItem('images'));
            recentImageDataUrl[idx]=reader.result;
            localStorage.setItem('images',JSON.stringify(recentImageDataUrl));
            document.getElementById("myIMAGE").src=reader.result;
            localStorage.setItem('id',JSON.stringify(arr));
            localStorage.setItem('crud1',JSON.stringify(arr1));
            localStorage.setItem('crud2',JSON.stringify(arr2));
            localStorage.setItem('crud3',JSON.stringify(arr3));
            localStorage.setItem('crud4',JSON.stringify(arr4));
            let cd = document.getElementsByClassName("card-1")[idx];
            cd.getElementsByClassName("img-fluid")[0].src=reader.result;
            let cd1 = cd.getElementsByClassName("card-block")[0].getElementsByTagName('ul')[0];
            cd1.getElementsByTagName('li')[0].getElementsByTagName('span')[0].innerHTML=s;
            cd1.getElementsByTagName('li')[1].innerHTML=job_title;
            cd1.getElementsByTagName('li')[2].innerHTML=department;
            //alert("image updates");
        });
        if(image){
            reader.readAsDataURL(image);
        }
    }else{
        alert('enter valid details');
    }
}*/


/*function deleteDetails(i){
    let idx=i-1;
    let j=idx*4;
    document.getElementsByClassName("popup_wrap")[0].style.display="flex";
    let arr = JSON.parse(localStorage.getItem('id'));
    let arr1 = JSON.parse(localStorage.getItem('crud1'));
    let arr2 = JSON.parse(localStorage.getItem('crud2'));
    let arr3 = JSON.parse(localStorage.getItem('crud3'));
    let arr4 = JSON.parse(localStorage.getItem('crud4'));
    let recentImageDataUrl = JSON.parse(localStorage.getItem('images'));
    arr.splice(idx,1);
    arr1.splice(idx,1);
    arr2.splice(idx,1);
    arr3.splice(idx,1);
    for(var k=j;k<j+4;k++){
        arr4.splice(k,1);
    }
    recentImageDataUrl.splice(idx,1);
    localStorage.setItem('id',JSON.stringify(arr));
    localStorage.setItem('crud1',JSON.stringify(arr1));
    localStorage.setItem('crud2',JSON.stringify(arr2));
    localStorage.setItem('crud3',JSON.stringify(arr3));
    localStorage.setItem('crud4',JSON.stringify(arr4));
    localStorage.setItem('images',JSON.stringify(recentImageDataUrl));
    document.getElementsByClassName("popup_wrap")[0].style.display="none";
    alert("data for id: "+i+" has deleted");
}*/
/*submitBtn.addEventListener('click',displayDetails);

function displayDetails(){
    flag=true;
    var reader = new FileReader();
    let fname = document.getElementById("fn").value;
    let lname = document.getElementById("ln").value;
    let email = document.getElementById("em").value;
    let job_title = document.getElementById("jt").value;
    let office = document.getElementById("of").value;
    let dept = document.getElementById("dp").value;
    let phone = document.getElementById("ph").value;
    let skype = document.getElementById("si").value;
    let image = document.getElementById("im").files[0];
    
    if(fname == "" || lname == "" || job_title == "" || dept == "" || office == "" || email == "" || phone.length != 10 || skype == ""){
        flag=false;
    }
    if(flag){
        var id = updateLSData(fname,lname,job_title,dept,email,office,phone,skype,image);
        reader.addEventListener("load",function(){
            let imag = JSON.parse(localStorage.getItem("images"));
            if(imag == null){
                let ar = [reader.result];
                localStorage.setItem('images',JSON.stringify(ar));
            }else{
                imag.push(reader.result);
                localStorage.setItem('images',JSON.stringify(imag));
            }
            let ele = document.getElementById('info');
            let html =    `<div class="col-md-3 my-4 card-1">
                                <div class="card">
                                    <div class="row no-gutters">
                                        <div class="col-4" >
                                            <img src="${reader.result}" class="img-fluid" alt="" onclick="fnc(${id})">
                                        </div>
                                        <div class="col-8">
                                            <div class="card-block px-2" >
                                                <ul>
                                                    <li class="card-text"><span>${fname} ${lname}</span></li>
                                                    <li class="card-text">${job_title}</li>
                                                    <li class="card-text">${dept}</li>
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
            ele.insertAdjacentHTML('beforeend',html);
        });
        if(image){
            reader.readAsDataURL(image);
        }
    }else{
        alert("please enter all the details");
    }
    let inputs = document.querySelectorAll('input');
    document.querySelector(".popup").style.display="none";
    inputs.forEach(input => input.value='');
}*/