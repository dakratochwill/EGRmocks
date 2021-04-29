let xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        let data = JSON.parse(this.responseText).feed.entry;

        let i;
        for (i = 0; i < data.length; i++) {
            let notice = data[i]["gsx$noticenumber"]["$t"];
            let title = data[i]["gsx$policyorproceduretitle"]["$t"];
            let shepherd = data[i]["gsx$policyshepherd"]["$t"];
            let date = data[i]["gsx$createddate"]["$t"];
            let impact = data[i]["gsx$whoisimpacted"]["$t"];
            let link;
            if (data[i]["gsx$urltodraftdocument"]["$t"] == 0) {
                link = data[i]["gsx$policyorproceduretitle"]["$t"];
            } else {
                link = '<a target="blank" href="' + data[i]["gsx$urltodraftdocument"]["$t"] + '">' + title + '</a>';
            }

            document.getElementById("demo").innerHTML +=
                "<tr>" + "<td>" + notice + "</td>" + "<td>" + link + "</td>" + "<td>" + shepherd + "</td>" + "<td>" + date + "</td>" + "<td>" + impact + "</td>" + "</tr>";
        }
    }
    window.addEventListener("load", function() {
            $('#example').dataTable();
        });
};


xmlhttp.open(
    "GET",
    "https://spreadsheets.google.com/feeds/list/1wDXTnnJK7LSMiw0tPEJRBMrt3P5MJO1wq6P6CuUL5gQ/2/public/values?alt=json",
    true
);

xmlhttp.send();