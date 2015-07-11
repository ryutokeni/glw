
function queryPlay() {
    var DateSelect = window.document.getElementById("dateBegin").value;
    var dateToday = new Date();
    var dateString = dateToday.toLocaleTimeString();
    var DateSelect1 = window.document.getElementById("dateEnd").value;
    if (DateSelect == "") {
        alert(Text(73));
        return;
    }
    if (DateSelect1 == "") {
        alert(Text(73));
        return;
    }
    else {
        document.getElementById("Search").disabled=true;
        document.getElementById("divDetail").innerHTML="+ Text(74) +"。。。";
        var cbo = new CallBackObject();
        cbo.OnComplete = Cbo_Complete1;
        //cbo.onError = Cbo_Error;
        cbo.DoCallBack("AjaxDb.aspx?PageName=ListNotice&DateSelect=" + DateSelect + "&DateSelect1=" + DateSelect1);
    }
}
function preWeekSearch() {
    setDate(6);
    var DateSelect = window.document.getElementById("dateBegin").value;
    var DateSelect1 = window.document.getElementById("dateEnd").value;
    if (DateSelect == "") {
        alert(Text(73));
        return;
    }
    if (DateSelect1 == "") {
        alert(Text(73));
        return;
    }
    else {
        document.getElementById("preWeekSearch").disabled=true;
        document.getElementById("divDetail").innerHTML="+ Text(74) +"。。。";
        var cbo = new CallBackObject();
        cbo.OnComplete = Cbo_Complete1;
        //cbo.onError = Cbo_Error;
        cbo.DoCallBack("AjaxDb.aspx?PageName=ListNotice&DateSelect=" + DateSelect + "&DateSelect1=" + DateSelect1);
    }
}
function WeekSearch() {
    setDate(2);
    var DateSelect = window.document.getElementById("dateBegin").value;
    var dateToday = new Date();
    var dateString = dateToday.getFullYear().toString() + "-" + (dateToday.getMonth() + 1) + "-" + dateToday.getDate();
    window.document.getElementById("dateEnd").value = dateString;
    var DateSelect1 = dateString;
    if (DateSelect == "") {
        alert(Text(73));
        return;
    }
    if (DateSelect1 == "") {
        alert(Text(73));
        return;
    }
    else {
        document.getElementById("WeekSearch").disabled=true;
        document.getElementById("divDetail").innerHTML="+ Text(74) +"。。。";
        var cbo = new CallBackObject();
        cbo.OnComplete = Cbo_Complete1;
        //cbo.onError = Cbo_Error;
        cbo.DoCallBack("AjaxDb.aspx?PageName=ListNotice&DateSelect=" + DateSelect + "&DateSelect1=" + DateSelect1);
    }
 }
 function Cbo_Complete1(responseText) {
     document.getElementById("Search").disabled=false;
     document.getElementById("WeekSearch").disabled=false;
      document.getElementById("preWeekSearch").disabled=false;
     var ss = responseText.split('$$');
     var str = new StringBulider();
     str.append("<ul>");
     if (responseText > "") {

         for (var i = 0; i < ss.length; i++) {

             str.append(showDeatil(ss[i]));
         }

     }
     else {
         str.append("<li>"+ Text(79) +"</li>");
     }
     str.append("</ul>");
     document.getElementById("divDetail").innerHTML = str;
 }

function showDeatil(StrArray) {
    var ss = StrArray.split('##');
    var str = new StringBulider();
    str.append("<li><span class=\"time\">[" + ss[0] + "]</span><span class=\"txt\">" + ss[3] + "</span></li>");
    return str;
}


  
            