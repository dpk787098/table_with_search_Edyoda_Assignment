var url = 'https://www.filltext.com/?rows=32&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D';
var tableData = [];

$(document).ready(function(){
    $("<table id='tabData'></table>").appendTo('#table-data');
    tBody = $('<tbody></tbody>').appendTo('#tabData');
    $('<h1>Details</h1>').appendTo('#info-wrapper');
    $('<p>Click on a table item to get detailed information</p>').appendTo('#info-wrapper');
    infoCont = $('<div id="info-content"></div>').appendTo('#info-wrapper');
    $('<div id="selUser"><b>User selected:</b> </div>').appendTo(infoCont);
    $('<div id="descWrap"><b>Description: </b></div>').appendTo(infoCont);
    $('<textarea id="descDetail" cols="50" rows="5" readOnly></textarea>').appendTo('#descWrap');
    addVar = $('<div><b>Address:</b> </div>').appendTo(infoCont);
    cityVar = $('<div><b>City:</b> </div>').appendTo(infoCont);
    stateVar = $('<div><b>State:</b> </div>').appendTo(infoCont);
    zipVar = $('<div><b>Zip:</b> </div>').appendTo(infoCont);
    



    function createRow(data,index){
        row = $('<tr class="data-row"></tr>');

        for(var i=1; i<=5; i++){
            idData = $('<td class="column'+i+'"></td>').appendTo(row)
            switch(i){
                case 1:
                    idData[0].innerText = data.id;
                    break;
                case 2:
                    idData[0].innerText = data.firstName;
                    break;
                case 3:
                    idData[0].innerText = data.lastName;
                    break;
                case 4:
                    idData[0].innerText = data.email;
                    break;
                case 5:
                    idData[0].innerText = data.phone;
                    break;
            }
        }
        row.click( function(){
            var temp1 = document.getElementsByClassName("data-row");
            $('#selUser')[0].innerHTML = "<b>User selected:</b> "+data.firstName+" "+data.lastName+"</div>";
            $('#descDetail')[0].innerText = data.description;
            addVar[0].innerHTML = "<b>Address:</b> "+data.address.streetAddress;
            cityVar[0].innerHTML = "<b>City:</b> "+data.address.city;
            stateVar[0].innerHTML = "<b>State:</b> "+data.address.state;
            zipVar[0].innerHTML = "<b>Zip:</b> "+data.address.zip;

            for(var i=0; i<temp1.length; i++){
                if(i === index){
                    temp1[i].classList.add("active");
                }
                else{
                    temp1[i].className = "data-row"
                }
            }
        })


        tBody.append(row);
    }


    function createTableRow(){
        for(var i=0; i<tableData.length; i++){
            createRow(tableData[i],i);
        }
        $('#selUser')[0].innerHTML = "<b>User selected:</b> "+tableData[0].firstName+" "+tableData[0].lastName+"</div>";
        $('#descDetail')[0].innerText = tableData[0].description;
        addVar[0].innerHTML = "<b>Address:</b> "+tableData[0].address.streetAddress;
        cityVar[0].innerHTML = "<b>City:</b> "+tableData[0].address.city;
        stateVar[0].innerHTML = "<b>State:</b> "+tableData[0].address.state;
        zipVar[0].innerHTML = "<b>Zip:</b> "+tableData[0].address.zip;
        var temp = document.getElementsByClassName("data-row");
        temp[0].classList.add("active");

    }


    $.get( url, function( data,status ) {
        if(status==="success"){
            $('#overlay').hide();
            tableData = data;
            createTableRow();
        }
    });


    $('#search-box').keyup(function(){
        var inputVal = $('#search-box')[0].value.toUpperCase();
        var tRow = $('tr');
        for (i = 1; i <tRow.length; i++) {
            td = tRow[i].getElementsByTagName("td")[1];
            if(td){
                var txtVal = td.innerText;
                if (txtVal.toUpperCase().indexOf(inputVal) > -1) {
                    tRow[i].style.display = "";
                } else {
                    tRow[i].style.display = "none";
                }
            }
        }
        
    })

})