/**
 * @author SOSELab@NTOU <albert@ntou.edu.tw>
 */
$(function() {
    let jsonUrl = "TW-pharmacy.json";
    intialize();
    getPharmcyData(jsonUrl);
    setFilterDataBtn();
    setShowAllDataBtn();
});

function intialize() {
    $("#search").attr("disabled", true);
    $("#myInput").val("");
}

function getPharmcyData(jsonUrl) {
    $.getJSON(jsonUrl, function(data) {
        for (let item in data) {

            if (data[item].closingDate != "") continue;

            let addr = data[item].address ? data[item].address : "住址無資料";
            let tel = data[item].tel ? data[item].tel : "電話無資料";
            let mapURL = data[item].address ? "https://www.google.com/maps?q=" + data[item].name + "+" + data[item].address : "https://www.google.com/maps?q=" + data[item].name;

            //Add new card body
            let content = ["<div class='card-body'>",
                "<h5 class='card-title' >", data[item].id, ": ", data[item].name + "</h5>",
                "<h6 class='card-subtitle mb-2 text-muted'>", addr, "<br>", tel, "</h6>",
                "<a href = '", mapURL, "' target='_blank' class='card-link'>地圖連結</a>",
                "<a href = 'http://www.nhi.gov.tw/QueryN/Query3_Detail.aspx?HospID=", data[item].id, "' target='_blank' class='card-link'>中央健保署連結</a>",
                "</div>"
            ].join("");
            $("#list").append(content);
            $("#loading").hide();
            $("#msg").hide();
            $("#search").attr("disabled", false);
        }
    });
}

function setFilterDataBtn() {
    //Filter data based on the user input
    $("#search").on("click", function() {
        let value = $("#myInput").val();
        $("#list div").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
        });
    });
}

function setShowAllDataBtn() {
    $("#all").on("click", function() {
        $("#msg").show();
        $("#myInput").val("");
        $("#search").attr("disabled", true);
        $("#list").hide();
        $("#loading").show("fast", function() {
            $("#list div").filter(function() {
                $(this).toggle(true);
                $("#loading").hide();
                $("#list").show();
                $("#msg").hide();
                $("#search").attr("disabled", false);
            });
        });
    });
}