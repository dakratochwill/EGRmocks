let xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        let data = JSON.parse(this.responseText).feed.entry;

        let i;
        for (i = 0; i < data.length; i++) {
            let title = data[i]["gsx$jobtitle"]["$t"];
            let employer = data[i]["gsx$employer"]["$t"];
            let postdate = data[i]["gsx$dateposted"]["$t"];
            let expires = data[i]["gsx$expires"]["$t"];
            let location = data[i]["gsx$location"]["$t"];
            let jobtype = data[i]["gsx$jobtype"]["$t"];
            let link;
            if (data[i]["gsx$link"]["$t"] == 0) {
                link = data[i]["gsx$jobtitle"]["$t"];
            } else {
                link = '<a target="blank" href="' + data[i]["gsx$link"]["$t"] + '">' + title + '</a>';
            }

            document.getElementById("demo").innerHTML +=
                "<tr>" + "<td>" + link + "</td>" + "<td>" + employer + "</td>" + "<td>" + postdate + "</td>" + "<td>" + expires + "</td>" + "<td>" + location + "</td>" + "<td>" + jobtype + "</td>" + "</tr>";
        }
    }
    window.addEventListener("load", function() {
            $('#hotjobs').dataTable();
        });
};


xmlhttp.open(
    "GET",
    "https://spreadsheets.google.com/feeds/list/1YxBDR6E2KalGFbSwSKtZB1phgzDrW0_N1IvjQtsyDOE/1/public/values?alt=json",
    true
);

xmlhttp.send();