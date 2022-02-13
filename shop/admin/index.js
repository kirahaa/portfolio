// GET JSON
function getMember(){
    let mem_data = new XMLHttpRequest();
    let qa_data = new XMLHttpRequest();
    let plus = Math.floor(Math.random()*99999);
    mem_data.open("GET","../shop_members.json?v="+plus,true);
    qa_data.open("GET","./admin_faq.json?v="+plus,true);
    mem_data.onload = function(){
        print_member_table(mem_data.response);
    }
    qa_data.onload = function(){
        print_qa_table(qa_data.response);
    }
    mem_data.send();
    qa_data.send();
}
getMember();

let get_day = new Date();
let indate = get_day.getDate();

function print_member_table(mem){
    let data = JSON.parse(mem);
    let latest_data = data.slice(0,5);
    let memtable = "";
    let data_ea = data.length;
    let newmem_ea = 0;

    document.getElementById("total_member").innerText = data_ea;
    if(!data){
        document.querySelector("none").style.display = "block";
        document.querySelector("trcss2").style.display = "none";
    }
    else{
        for(var i in latest_data){
            if(data[i]["user_indate"].substr(8,2)==indate){
                newmem_ea+=1;
                document.getElementById("new_member").innerText = newmem_ea;
            }
            else {
                document.getElementById("new_member").innerText = newmem_ea;
            }
            memtable = "<tr class='trcss2'><td>"+(data_ea-i)+"</td><td>"+latest_data[i]["user_id"]+"</td><td>"+latest_data[i]["user_name"]+"</td><td>"+latest_data[i]["user_nick"]+"</td><td>"+latest_data[i]["user_level"]+"</td><td>"+latest_data[i]["user_point"]+"</td><td>"+latest_data[i]["user_group"]+"</td></tr>";
            document.getElementById("memlist").innerHTML += memtable;
        }
    }
    
}

document.getElementById("go_memlist").addEventListener("click",function(){
    location.href = "./admin_member.html";
})


print_qa_table = (qa) => {
    let data = JSON.parse(qa);
    let latest_data = data.slice(0,5);
    let qatable = "";
    let data_ea = data.length;
    let new_qa = 0;

    if(!data){
        document.querySelector("none").style.display = "block";
        document.querySelector("qatr2").style.display = "none";
    }
    else {
        for(var i in latest_data){
            // console.log(latest_data[i]["findate"].substr(8,2));
            if(latest_data[i]["findate"].substr(8,2)==indate){
                new_qa+=1;
                document.getElementById("new_faq").innerText = new_qa;
            }
            else{
                document.getElementById("new_faq").innerText = new_qa;
            }
            if(latest_data[i]["category"]==5){
                latest_data[i]["category"]="안전거래";
            }
            else if(latest_data[i]["category"]==4){
                latest_data[i]["category"]="회원서비스";
            }
            qatable = "<tr class='qatr2'><td>"+(data_ea-i)+"</td><td>"+latest_data[i]["category"]+"</td><td>"+latest_data[i]["fqtext"]+"</td><td>"+latest_data[i]["fwriter"]+"</td><td>"+(latest_data[i]["findate"]).substr(0,10)+"</td></tr>";
            document.getElementById("qalist").innerHTML += qatable;
        }
    }
    // console.log(data);
}
document.getElementById("go_qalist").addEventListener("click",function(){
    location.href = "./admin_faq.html";
})