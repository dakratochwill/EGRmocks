let xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        let data = JSON.parse(this.responseText).feed.entry;

        let i;
        for (i = 0; i < data.length; i++) {
            let notice = data[i]["gsx$noticenumber"]["$t"];
            let title = data[i]["gsx$policyorproceduretitle"]["$t"];
            let date = data[i]["gsx$createddate"]["$t"];
            let impact = data[i]["gsx$whoisimpacted"]["$t"];
            let link;
            if (data[i]["gsx$urltopolicydocument"]["$t"] == 0) {
                link = data[i]["gsx$title"]["$t"];
            } else {
                link = '<a href="' + data[i]["gsx$urltopolicydocument"]["$t"] + '">' + title + '</a>';
            }

            document.getElementById("demo").innerHTML +=
                "<tr>" +
                "<td>" +
                notice +
                "</td>" +
                "<td>" +
                link +
                "</td>" +
                "<td>" +
                date +
                "</td>" +
                "<td>" +
                impact +
                "</td>" +
                "</tr>";
        }
    }
    window.addEventListener("load", function() {
            $('#example').dataTable();
        });
};


xmlhttp.open(
    "GET",
    "https://spreadsheets.google.com/feeds/list/1C5PvhdUB7uicVroB1QyViBcsxUT-LCYbIAfvy4Z21RA/od6/public/values?alt=json",
    true
);

xmlhttp.send();