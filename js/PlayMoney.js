
/*
==================================================================

queryPlayList 点击按钮查询

==================================================================
*/
function queryPlay() {
    var DateSelect = window.document.getElementById("dateBegin").value;
    var dateToday = new Date();
    var dateString = dateToday.toLocaleTimeString();
    var DateSelect1 = window.document.getElementById("dateEnd").value + " " + dateString;
    var CardID = window.document.getElementById("cardID").value;
    var userType = window.document.getElementById("userType").value;
    if (DateSelect == "") {
        alert(Text(97));
        return;
    }
    if (DateSelect1 == "") {
        alert(Text(97));
        return;
    }
    if (CardID == "") {
        alert(Text(99));
        return;
    }
    else {
        document.getElementById("Search").disabled=true;
        document.getElementById("divDetail").innerHTML="数据加载中。。。";
        var cbo = new CallBackObject();
        cbo.OnComplete = Cbo_Complete1;
        //cbo.onError = Cbo_Error;
        cbo.DoCallBack("AjaxDb.aspx?PageName=GamePlayMoney&DateSelect=" + DateSelect + "&DateSelect1=" + DateSelect1 + "&CardID=" + CardID + "&userType=" + userType);
    }
}
function preWeekSearch() {
    setDate(6);
    var DateSelect = window.document.getElementById("dateBegin").value;
    var DateSelect1 = window.document.getElementById("dateEnd").value;
    var CardID = window.document.getElementById("cardID").value;
    var userType = window.document.getElementById("userType").value;
    if (DateSelect == "") {
        alert(Text(97));
        return;
    }
    if (DateSelect1 == "") {
        alert(Text(97));
        return;
    }
    if (CardID == "") {
        alert(Text(99));
        return;
    }
    else {
        document.getElementById("preWeekSearch").disabled=true;
        document.getElementById("divDetail").innerHTML="数据加载中。。。";
        var cbo = new CallBackObject();
        cbo.OnComplete = Cbo_Complete1;
        //cbo.onError = Cbo_Error;
        cbo.DoCallBack("AjaxDb.aspx?PageName=GamePlayMoney&DateSelect=" + DateSelect + "&DateSelect1=" + DateSelect1 + "&CardID=" + CardID + "&userType=" + userType);
    }
}
function WeekSearch() {
    setDate(2);
    var DateSelect = window.document.getElementById("dateBegin").value;
    var dateToday = new Date();
    var dateString = dateToday.getFullYear().toString() + "-" + (dateToday.getMonth() + 1) + "-" + dateToday.getDate();
    window.document.getElementById("dateEnd").value = dateString;
    var DateSelect1 = dateString+" "+dateToday.toLocaleTimeString();
    var CardID = window.document.getElementById("cardID").value;
    var userType = window.document.getElementById("userType").value;
    if (DateSelect == "") {
        alert(Text(97));
        return;
    }
    if (DateSelect1 == "") {
        alert(Text(97));
        return;
    }
    if (CardID == "") {
        alert(Text(99));
        return;
    }
    else {
        document.getElementById("WeekSearch").disabled=true;
        document.getElementById("divDetail").innerHTML="数据加载中。。。";
        var cbo = new CallBackObject();
        cbo.OnComplete = Cbo_Complete1;
        //cbo.onError = Cbo_Error;
        cbo.DoCallBack("AjaxDb.aspx?PageName=GamePlayMoney&DateSelect=" + DateSelect + "&DateSelect1=" + DateSelect1 + "&CardID=" + CardID+"&userType="+userType);
    }
 }
 function Cbo_Complete1(responseText) {
     document.getElementById("Search").disabled=false;
     document.getElementById("WeekSearch").disabled=false;
      document.getElementById("preWeekSearch").disabled=false;
     var ss = responseText.split('$$');
     var str = new StringBulider();
     str.append("<table   border='0' cellpadding='0' cellspacing='1' bgcolor='#FFFFFF'>");
     str.append(showTableHead1());
     if (responseText > "") {

         for (var i = 0; i < ss.length-1; i++) {
             var iLine = i % 2;
             str.append(showDeatil(ss[i], iLine));
         }

     }
     else {
         str.append("<tr><td>"+ Text(100) +"<td></tr>");
     }
     str.append("</table>");
     document.getElementById("divDetail").innerHTML = str;
     document.getElementById("divContent").style.display = "none";
     document.getElementById("divDetail").style.display = "block";
 }
function showTableHead1() {
    var ssName = new Array(7);
    ssName[0] = Text(101);
    ssName[1] = Text(102);
    ssName[2] = Text(103);
    ssName[3] = "交易金额";
    ssName[4] = Text(105);
    ssName[5] = "支付账户";
    ssName[6] = Text(107);
    var str = new StringBulider();
    str.append("<tr height='25px' >");
    str.append("<td  width='160px' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[0] + "</td>");  
    if (window.document.getElementById("userType").value == "1") {
        str.append("<td width='60px' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[1] + "</td>");
    }
    else {
        str.append("<td width='80px' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[6] + "</td>");
    }
    str.append("<td width='80px' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[2] + "</td>");
    str.append("<td width='80px' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[3] + "</td>");
    str.append("<td width='80px' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[4] + "</td>");
    str.append("<td width='50px' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[5] + "</td>");
    str.append("</tr>");
    return str;
}
function showDeatil(StrArray, iLine) {
    var ss = StrArray.split('##');
    var str = new StringBulider();
    if (iLine == 0) {
        str.append("<tr bgcolor='#FFE3C8' onMouseOver='this.className=\"menu_title2\";' onMouseOut='this.className=\"menu_title_out1\";'>");
        str.append("<td  align='center' valign='middle' >" + ss[0] + "</td>"); //日期
        if (window.document.getElementById("userType").value == "1") {
            str.append("<td class='text' align='center' valign='middle' >" + ss[1] + "</td>"); //会员
        }
        else {
            str.append("<td class='text' align='center' valign='middle' >" + ss[5] + "</td>"); //会员
        }
       
            str.append("<td class='number' align='right' valign='middle' >" + playType(ss[2]) + "&nbsp;</td>"); //交易类型
        
        
        str.append("<td class='number' align='right' valign='middle' >" + parseFloat(ss[3]).toFixed(2) + "&nbsp;</td>"); //输赢金额
        str.append("<td class='number' align='right' valign='middle' >" + parseFloat(ss[4]).toFixed(2) + "&nbsp;</td>"); //剩余金额
        if (window.document.getElementById("userType").value == "1") {
            str.append("<td class='text' align='center' valign='middle' >" + ss[5] + "</td>");  //所属代理
        }
        else {
            str.append("<td class='text' align='center' valign='middle' >" + ss[6] + "</td>");  //所属代理
        }
        str.append("</tr>");
    }
    if (iLine == 1) {
        str.append("<tr bgcolor='#E1E1E1' onMouseOver='this.className=\"menu_title2\";' onMouseOut='this.className=\"menu_title_out2\";'>");
        str.append("<td  align='center' valign='middle' >" + ss[0] + "</td>"); //日期
        if (window.document.getElementById("userType").value == "1") {
            str.append("<td class='text' align='center' valign='middle' >" + ss[1] + "</td>"); //会员
        }
        else {
            str.append("<td class='text' align='center' valign='middle' >" + ss[5] + "</td>"); //会员
        }
        str.append("<td class='number' align='right' valign='middle' >" + playType(ss[2]) + "&nbsp;</td>"); //交易类型
        str.append("<td class='number' align='right' valign='middle' >" + parseFloat(ss[3]).toFixed(2) + "&nbsp;</td>"); //输赢金额
        str.append("<td class='number' align='right' valign='middle' >" + parseFloat(ss[4]).toFixed(2) + "&nbsp;</td>"); //剩余金额
        if (window.document.getElementById("userType").value == "1") {
            str.append("<td class='text' align='center' valign='middle' >" + ss[5] + "</td>");  //所属代理
        }
        else {
            str.append("<td class='text' align='center' valign='middle' >" + ss[6] + "</td>");  //所属代理
        }
        str.append("</tr>");
    }
    return str;
}

  
            