var url = 'https://www.filltext.com/?rows=32&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D';
var tableData = [];

$(document).ready(function(){
    var tabData = document.getElementById("table-data");
    var table = document.createElement("table");
    tabData.appendChild(table);
    var tBody = document.createElement("tbody");
    table.appendChild(tBody);

    var infoWrap = document.getElementById("info-wrapper");
    var h1Title = document.createElement("h1");
    h1Title.innerText = "Details";
    infoWrap.appendChild(h1Title);
    var paraText = document.createElement("p");
    paraText.innerText = "Click on a table item to get detailed information";
    infoWrap.appendChild(paraText);
    var infoCont = document.createElement("div");
    infoCont.id = "info-content";
    infoWrap.appendChild(infoCont);
    var userSel = document.createElement("div");
    userSel.innerHTML = "<b>User selected:</b> ";
    infoCont.appendChild(userSel);
    var descWrap = document.createElement("div");
    infoCont.appendChild(descWrap);
    var descTitle = document.createElement("b");
    descTitle.innerText = "Description: "
    descWrap.appendChild(descTitle);
    var textDetail = document.createElement("textarea");
    textDetail.cols = "50";
    textDetail.rows = "5";
    textDetail.readOnly = true;
    descWrap.appendChild(textDetail);
    var addVar = document.createElement("div");
    addVar.innerHTML = "<b>Address:</b> ";
    infoCont.appendChild(addVar);
    var cityVar = document.createElement("div");
    cityVar.innerHTML = "<b>City:</b> ";
    infoCont.appendChild(cityVar);
    var stateVar = document.createElement("div");
    stateVar.innerHTML = "<b>State:</b> ";
    infoCont.appendChild(stateVar);
    var zipVar = document.createElement("div");
    zipVar.innerHTML = "<b>Zip:</b> ";
    infoCont.appendChild(zipVar);



    function createRow(data,index){
        var row = document.createElement("tr");
        row.className = "data-row";

        for(var i=1; i<=5; i++){
            var idData = document.createElement('td');
            idData.className = "column"+i;
            switch(i){
                case 1:
                    idData.innerText = data.id;
                    break;
                case 2:
                    idData.innerText = data.firstName;
                    break;
                case 3:
                    idData.innerText = data.lastName;
                    break;
                case 4:
                    idData.innerText = data.email;
                    break;
                case 5:
                    idData.innerText = data.phone;
                    break;
            }
            row.appendChild(idData);
        }
        row.addEventListener('click', function(){
            var temp1 = document.getElementsByClassName("data-row");
            userSel.innerHTML = "<b>User selected:</b> "+data.firstName+" "+data.lastName+"</div>";
            textDetail.innerText = data.description;
            addVar.innerHTML = "<b>Address:</b> "+data.address.streetAddress;
            cityVar.innerHTML = "<b>City:</b> "+data.address.city;
            stateVar.innerHTML = "<b>State:</b> "+data.address.state;
            zipVar.innerHTML = "<b>Zip:</b> "+data.address.zip;

            for(var i=0; i<temp1.length; i++){
                if(i === index){
                    temp1[i].classList.add("active");
                }
                else{
                    temp1[i].className = "data-row"
                }
            }
        })


        tBody.appendChild(row);
    }


    function createTableRow(){
        for(var i=0; i<tableData.length; i++){
            createRow(tableData[i],i);
        }

        userSel.innerHTML = "<b>User selected:</b> "+tableData[0].firstName+" "+tableData[0].lastName+"</div>";
        textDetail.innerText = tableData[0].description;
        addVar.innerHTML = "<b>Address:</b> "+tableData[0].address.streetAddress;
        cityVar.innerHTML = "<b>City:</b> "+tableData[0].address.city;
        stateVar.innerHTML = "<b>State:</b> "+tableData[0].address.state;
        zipVar.innerHTML = "<b>Zip:</b> "+tableData[0].address.zip;
        var temp = document.getElementsByClassName("data-row");
        temp[0].classList.add("active");

    }


    $.get( url, function( data,status ) {
        if(status==="success"){
            tableData = data;
            createTableRow();
        }
    });



    // var httpReq = new XMLHttpRequest();
    // httpReq.open('GET', url, true);
    // httpReq.setRequestHeader('Accept','application/json');
    // httpReq.setRequestHeader('Content-type','application/json');
    // httpReq.onreadystatechange = function(){
    //     if(this.readyState === 4){
    //         tableData = JSON.parse(this.responseText);
    //         createTableRow();
    //     }
    // }
    // httpReq.send();

    var searchFun = document.getElementById("search-box");
    searchFun.onkeyup = function(e){
        var inputVal = searchFun.value.toUpperCase();
        trow = document.getElementsByTagName("tr");
        for (i = 1; i <trow.length; i++) {
            td = trow[i].getElementsByTagName("td")[1];
            if (td) {
                var txtVal = td.innerText;
                if (txtVal.toUpperCase().indexOf(inputVal) > -1) {
                    trow[i].style.display = "";
                } else {
                    trow[i].style.display = "none";
                }
            }
        }
    }

})