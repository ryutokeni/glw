
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
    if (DateSelect == "") {
        alert(Text(76));
        return;
    }
    if (DateSelect1 == "") {
        alert(Text(76));
        return;
    }
    if (CardID == "") {
        alert(Text(78));
        return;
    }
    else {
        document.getElementById("Search").disabled=true;
        document.getElementById("divDetail").innerHTML="数据加载中。。。";
        var cbo = new CallBackObject();
        cbo.OnComplete = Cbo_Complete1;
        //cbo.onError = Cbo_Error;
        cbo.DoCallBack("AjaxDb.aspx?PageName=GamePlay&DateSelect=" + DateSelect + "&DateSelect1=" + DateSelect1 + "&CardID=" + CardID);
    }
}
function preWeekSearch() {
    setDate(6);
    var DateSelect = window.document.getElementById("dateBegin").value;
    var DateSelect1 = window.document.getElementById("dateEnd").value;
    var CardID = window.document.getElementById("cardID").value;
    if (DateSelect == "") {
        alert(Text(76));
        return;
    }
    if (DateSelect1 == "") {
        alert(Text(76));
        return;
    }
    if (CardID == "") {
        alert(Text(78));
        return;
    }
    else {
        document.getElementById("preWeekSearch").disabled=true;
        document.getElementById("divDetail").innerHTML="数据加载中。。。";
        var cbo = new CallBackObject();
        cbo.OnComplete = Cbo_Complete1;
        //cbo.onError = Cbo_Error;
        cbo.DoCallBack("AjaxDb.aspx?PageName=GamePlay&DateSelect=" + DateSelect + "&DateSelect1=" + DateSelect1 + "&CardID=" + CardID);
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
    if (DateSelect == "") {
        alert(Text(76));
        return;
    }
    if (DateSelect1 == "") {
        alert(Text(76));
        return;
    }
    if (CardID == "") {
        alert(Text(78));
        return;
    }
    else {
        document.getElementById("WeekSearch").disabled=true;
        document.getElementById("divDetail").innerHTML="数据加载中。。。";
        var cbo = new CallBackObject();
        cbo.OnComplete = Cbo_Complete1;
        //cbo.onError = Cbo_Error;
        cbo.DoCallBack("AjaxDb.aspx?PageName=GamePlay&DateSelect=" + DateSelect + "&DateSelect1=" + DateSelect1 + "&CardID=" + CardID);
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

         for (var i = 0; i < ss.length; i++) {
             var iLine = i % 2;
             str.append(showDeatil(ss[i], iLine));
         }

     }
     else {
         str.append("<tr><td>"+ Text(79) +"<td></tr>");
     }
     str.append("</table>");
     document.getElementById("divDetail").innerHTML = str;
     document.getElementById("divContent").style.display = "none";
     document.getElementById("divDetail").style.display = "block";
 }
function showTableHead1() {
    var ssName = new Array(20);
    ssName[0] = Text(80);
    //ssName[1] = "所属代理";
    ssName[2] = Text(81);
    ssName[3] = Text(82);
    ssName[4] = Text(83);
    ssName[5] = Text(84);
    ssName[6] = Text(85);
    ssName[7] = Text(86);
    ssName[8] = Text(87);
    ssName[9] = Text(88);
    ssName[10] = Text(89);
    var str = new StringBulider();
    str.append("<tr height='25px' >");
    str.append("<td  width='160px' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[0] + "</td>");
    //str.append("<td width='60px' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[1] + "</td>");
    str.append("<td width='60px' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[2] + "</td>");
    str.append("<td width='80px' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[3] + "</td>");
    str.append("<td width='80px' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[4] + "</td>");
    str.append("<td width='80px' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[5] + "</td>");
    str.append("<td width='50px' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[6] + "</td>");
    str.append("<td width='50px' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[7] + "</td>");
    str.append("<td width='80px' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[8] + "</td>");
    str.append("<td width='80px' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[9] + "</td>");
    str.append("<td width='100px' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[10] + "</td>");
    //str.append("<td width='80px' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[11] + "</td>");
    str.append("</tr>");
    return str;
}
function showDeatil(StrArray, iLine) {
    var ss = StrArray.split('##');
   // var datestr = ss[0].replace(" 00:00:00", "")
    var Array2 = new Array(Text(90), Text(91));
    var str = new StringBulider();
    if (iLine == 0) {
        str.append("<tr bgcolor='#FFE3C8' onMouseOver='this.className=\"menu_title2\";' onMouseOut='this.className=\"menu_title_out1\";'>");
        str.append("<td  align='center' valign='middle' >" + ss[0] + "</td>"); //日期
        //str.append("<td class='text' align='center' valign='middle' >" + ss[1] + "</td>");  //所属代理
        str.append("<td class='text' align='center' valign='middle' >" + ss[2] + "</td>"); //会员
        str.append("<td class='number' align='right' valign='middle' >" + parseInt(ss[3]) + "&nbsp;</td>"); //投注金额
        str.append("<td class='number' align='right' valign='middle' >" + parseFloat(ss[4]).toFixed(2) + "&nbsp;</td>"); //输赢金额
        str.append("<td class='number' align='right' valign='middle' >" + parseFloat(ss[5]).toFixed(2) + "&nbsp;</td>"); //洗码量
        str.append("<td class='per' align='center' valign='middle' >" + Array2[ss[6]] + "</td>"); //洗码类别
        str.append("<td class='per' align='center' valign='middle' >" + FormatNumber(ss[7], 2) + "%" + "</td>"); //洗码比
        str.append("<td class='number' align='right' valign='middle' >" + parseFloat(ss[8]).toFixed(2) + "&nbsp;</td>"); //洗码佣金
        str.append("<td class='number' align='right' valign='middle' >" + parseFloat(ss[9]).toFixed(2) + "&nbsp;</td>"); //总赢
        str.append("<td  align='center' valign='middle' ><input  style='with:14px;height:21px;font-size:9pt;' type='button' name='imageField2' src='../images/menu_cx2.jpg' value='Text(92)' onclick='queryPlayList(\"" + ss[2] + "\",\"" + ss[0] + "\")' /></td>"); //交公司金额
        //str.append("<td class='per' align='center' valign='middle' >"+ss[12]*100 + "%"+"</td>"); //获利比
        str.append("</tr>");
    }
    if (iLine == 1) {
        str.append("<tr bgcolor='#E1E1E1' onMouseOver='this.className=\"menu_title2\";' onMouseOut='this.className=\"menu_title_out2\";'>");
        str.append("<td  align='center' valign='middle' >" + ss[0] + "</td>"); //日期
        //str.append("<td class='text' align='center' valign='middle' >" + ss[1] + "</td>");  //所属代理
        str.append("<td class='text' align='center' valign='middle' >" + ss[2] + "</td>"); //会员
        str.append("<td class='number' align='right' valign='middle' >" + parseInt(ss[3]) + "&nbsp;</td>"); //投注金额
        str.append("<td class='number' align='right' valign='middle' >" + parseFloat(ss[4]).toFixed(2) + "&nbsp;</td>"); //输赢金额
        str.append("<td class='number' align='right' valign='middle' >" + parseFloat(ss[5]).toFixed(2) + "&nbsp;</td>"); //洗码量
        str.append("<td class='per' align='center' valign='middle' >" + Array2[ss[6]] + "</td>"); //洗码类别
        str.append("<td class='per' align='center' valign='middle' >" + FormatNumber(ss[7], 2) + "%" + "</td>"); //洗码比
        str.append("<td class='number' align='right' valign='middle' >" + parseFloat(ss[8]).toFixed(2) + "&nbsp;</td>"); //洗码佣金
        str.append("<td class='number' align='right' valign='middle' >" + parseFloat(ss[9]).toFixed(2) + "&nbsp;</td>"); //总赢
        str.append("<td  align='center' valign='middle' ><input  style='with:14px;height:21px;font-size:9pt;' type='button' name='imageField2' src='../images/menu_cx2.jpg' value='Text(92)' onclick='queryPlayList(\"" + ss[2] + "\",\"" + ss[0] + "\")' /></td>"); //交公司金额
        //str.append("<td class='per' align='center' valign='middle' >"+ss[12]*100 + "%"+"</td>"); //获利比
        str.append("</tr>");
    }
    return str;
}
function queryPlayList(cardID, datatime) {
    document.getElementById("divContent").innerHTML="数据加载中。。。";
    var DateSelect = datatime;
    var DateSelect1 = datatime;
    var CardID = cardID;
    var cbo = new CallBackObject();
    cbo.OnComplete = Cbo_Complete;
    //cbo.onError = Cbo_Error;
    cbo.DoCallBack("AjaxDb.aspx?PageName=GamePlayList&DateSelect=" + DateSelect + "&DateSelect1=" + DateSelect1 + "&CardID=" + CardID);

}
/*
==================================================================

queryPlayList 点击按钮查询

==================================================================
*/
function Cbo_Complete(responseText) {
    var Egame=responseText.split('@@')[1];
    var ss = responseText.split('@@')[0].split('$$');
    var str = new StringBulider();
    str.append("<table width='99%' border='0' cellspacing='0' cellpadding='0'>");
    str.append("<tr><td height='32' align='left' valign='middle' class='font5'>"+ Text(93) +"</td><td><input type='button' class='but1' value='Text(94)' onclick='back()'></td></tr>");
    str.append("</table>");
    str.append("<table width='1100px'  border='0' cellpadding='0' cellspacing='1' bgcolor='#FFFFFF'>");
    str.append(showTableHead());
    var iAllBet = 0, iAllWin = 0;
    if (responseText.length > 0) {

        for (var i = 0; i < ss.length-1; i++) {
            var iLine = i % 2;
            str.append(showPlayListDeatil(ss[i], iLine));
            ssPlay = ss[i].split('##');
            iAllBet += parseInt(ssPlay[5]);
            iAllWin += parseFloat(ssPlay[6]);

        }
    }
    str.append("<tr style='height:25px' bgcolor='#815F40' ");
    str.append("<td align='Center'></td>");
    str.append("<td align='Center'>"+ Text(95) +"：</td>");
    str.append("<td align='Center'></td>");
   
    str.append("<td align='Center'></td>"); //局 次
    str.append("<td align='Center'></td>"); //开答
    str.append("<td align='Center'></td>");
    str.append("<td></td>"); //时间
    str.append("<td align='Right'></td>"); //剩余额度
    str.append("<td align='Right'>" + parseInt(iAllBet) + "&nbsp;</td>"); //投注金额
    str.append("<td style='text-align: right'>" + parseFloat(iAllWin).toFixed(2) + "&nbsp;</td>"); //输赢
    str.append("<td align='Right'></td>"); //闲
    str.append("<td align='Right'></td>"); //和
    // str.append( "<td align='Right'></td>");//庄
    // str.append( "<td align='Right'></td>");//闲对子
    // str.append("<td align='Right'></td>");//庄对子
    str.append("</tr>");
    str.append("</table>");
    ss=Egame.split('$$');
    str.append("<table width='99%' border='0' cellspacing='0' cellpadding='0'>");
    str.append("<tr><td height='32' align='left' valign='middle' class='font5'>"+ Text(96) +"</td><td></td></tr>");
    str.append("</table>");
    str.append("<table width='1100px'  border='0' cellpadding='0' cellspacing='1' bgcolor='#FFFFFF'>");
    str.append(showTableHeadEgame());
    var iAllBet = 0, iAllWin = 0;
    if (responseText.length > 0) {

        for (var i = 0; i < ss.length-1; i++) {
            var iLine = i % 2;
            str.append(showPlayListDeatilEgame(ss[i], iLine));
            ssPlay = ss[i].split('##');
            iAllBet += parseInt(ssPlay[5]);
            iAllWin += parseFloat(ssPlay[6]);

        }
    }
    str.append("<tr style='height:25px' bgcolor='#815F40' ");
    str.append("<td align='Center'></td>");
    str.append("<td align='Center'>"+ Text(95) +"：</td>");
    str.append("<td align='Center'></td>");
   
    str.append("<td align='Center'></td>"); //局 次
    str.append("<td align='Center'></td>"); //开答
    str.append("<td align='Center'></td>");
    str.append("<td></td>"); //时间
   
    str.append("<td align='Right'>" + parseInt(iAllBet) + "&nbsp;</td>"); //投注金额
    str.append("<td style='text-align: right'>" + parseFloat(iAllWin).toFixed(2) + "&nbsp;</td>"); //输赢
    str.append("<td align='Right'></td>"); //闲
    str.append("<td align='Right'></td>"); //和
    // str.append( "<td align='Right'></td>");//庄
    // str.append( "<td align='Right'></td>");//闲对子
    // str.append("<td align='Right'></td>");//庄对子
    str.append("</tr>");
    str.append("</table>");
    document.getElementById("divDetail").style.display ="none";
    document.getElementById("divContent").innerHTML = str;
    document.getElementById("divContent").style.display = "block";
}
function back() {
    document.getElementById("divContent").style.display = "none";
    document.getElementById("divDetail").style.display = "block";
    
}
/*
==================================================================

showTableHead 显示数据表头

==================================================================
*/

  
            