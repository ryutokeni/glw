
/*
==================================================================

获取当今时间

==================================================================
*/
function getDate(year, month) {
    var today = new Date(year, month, 0);
    return today.getDate();
}



/*
==================================================================

查询

==================================================================
*/
function queryData() {
    var gameIndex = window.document.getElementById("GameIndex").value;
    var date = window.document.getElementById("Date").value;
    var gameRound = window.document.getElementById("gameRound").value;
    if (gameRound == "") {
        alert(Text(59));
        return;
    }
    if (IsInt(gameRound)) {
        var cbo = new CallBackObject();
        cbo.OnComplete = Cbo_Complete;
        //cbo.onError = Cbo_Error;
        cbo.DoCallBack("AjaxDb.aspx?PageName=GameAnswerList&GameIndex=" + gameIndex + "&Date=" + date + "&Round=" + gameRound);
    }
}

function Cbo_Complete(responseText) {
    showGameResult(responseText);
}
/*
==================================================================

显示数据

==================================================================
*/
function showGameResult(StrArray) {
    var ss = StrArray.split('$$');
    var str = new StringBulider();
    str.append("<table   border='0' cellpadding='0' cellspacing='1' bgcolor='#FFFFFF'>");
    str.append(showTableHead());
    if (StrArray.length > 0) {
        for (var i = 0; i < ss.length; i++) {
            var iLine = i % 2;
            str.append(showGameDeatil(ss[i], iLine));
        }
    }
    else {
        str.append("<tr><td>"+ Text(60) +"<td></tr>");
    }
    str.append("</table>");
    document.getElementById("divContent").innerHTML = str;
}
/*
==================================================================

显示数据表头

==================================================================
*/
function showTableHead() {
    var ssName = new Array(6);
    ssName[0] = Text(61);
    ssName[1] = Text(62);
    ssName[2] = Text(63);
    ssName[3] = Text(64);
    ssName[4] = Text(65); // dump text @65
    var str = new StringBulider();
    str.append("<tr height='25px' >");
    str.append("<td  width='110px' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[0] + "</td>");
    str.append("<td width='70px' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[1] + "</td>");
    str.append("<td width='70px' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[2] + "</td>");
    str.append("<td width='160px' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[3] + "</td>");
    str.append("<td width='300px' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[4] + "</td>");
    // str.append("<td width='80px' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[5] + "</td>");
    str.append("</tr>");
    return str;
}
/*
==================================================================

显示数据详细

==================================================================
*/
function showGameDeatil(StrArray, iLine) {
    var ss = StrArray.split('##');
    var aa;
    var bb = "";
    var str = new StringBulider();
    if (iLine == 0) {
        str.append("<tr height='25px' valign='middle' bgcolor='#FFE3C8' onMouseOver='this.className=\"menu_title2\";' onMouseOut='this.className=\"menu_title_out1\";'>");
        str.append("<td class='date' align='center' valign='middle' >" + ss[0] + "</td>"); //开牌时间
        str.append("<td width='70px' align='center' valign='middle' >" + gameType(ss[1]) + "</td>");  //台号
        str.append("<td width='70px' align='center' valign='middle' >" + ss[2] + "</td>"); //场-局次
        if (parseInt(ss[1]) < 100) {
            if (ss[4] > "") {
                aa = ss[4].split(',');
                if (parseInt(ss[1]) >= 31 && parseInt(ss[1]) < 41) {
                    bb = nnhigntype(aa[0]) + " " + nnlowtype(aa[1]);
                }
                else if (parseInt(ss[1]) >= 41 && parseInt(ss[1]) < 51) {
                    if (aa[0] == "-2147483648") {
                        bb = Text(66);
                    }
                    else {
                        bb = lpanswer(aa[0]);
                    }
                }
                else if (parseInt(ss[1]) >= 51 && parseInt(ss[1]) < 61) {
                    //bb = sbanswer(aa[0]);
                    bb = aa[0];
                    if (bb == "0") {
                        bb = Text(66);
                    }
                }
                else if (parseInt(ss[1]) >= 61 && parseInt(ss[1]) < 71) {
                    if (aa[0] == "-2147483648") {
                        bb = Text(66);
                    }
                    else {
                        bb = aa[0];
                    }
                }
                else {
                    for (var i = aa.length - 1; i >= 0; i--) {
                        if (aa[i] == "1") {
                            if (parseInt(ss[1]) < 21 || parseInt(ss[1]) == 71) {
                                bb += answer[i] + " ";
                            }
                            if (parseInt(ss[1]) >= 21 && parseInt(ss[1]) < 31) {
                                bb += answerlh[i] + " ";
                            }
                            if (parseInt(ss[1]) == 91) {
                                bb += answerbb[i] + " "; 
                            }
                        }
                    }
                }
                str.append("<td width='160px' align='left' valign='middle'>" + bb + "</td>"); //结果
            }
            else {
                str.append("<td width='160px' align='center' valign='middle'></td>"); //结果
            }
            if (ss[3] != "") {
                str.append("<td width='300px' align='left' valign='middle' >");
                if (parseInt(ss[1]) < 41 || parseInt(ss[1]) == 71 || parseInt(ss[1]) == 91) {
                    var ssBJLResult = ss[3].split(';');
                    if (parseInt(ss[1]) < 21 || parseInt(ss[1]) == 71 || parseInt(ss[1]) == 91) {
                        str.append("<table><tr><td width='150px'>&nbsp;"+ Text(67) +"" + "&nbsp;");
                    }
                    if (parseInt(ss[1]) >= 21 && parseInt(ss[1]) < 31) {
                        str.append("<table><tr><td width='150px'>&nbsp;"+ Text(68) +"" + "&nbsp;");
                    }
                    if (parseInt(ss[1]) >= 31 && parseInt(ss[1]) < 41) {
                        str.append("<table><tr><td width='150px'>&nbsp;"+ Text(69) +"" + "&nbsp;");
                    }
                    var xian = ssBJLResult[0].split(',');
                    for (var i = 0; i < (xian.length - 1); i++) {
                        if (xian[i] != "0") {
                            str.append("<img align='absmiddle'  border='0' src='../puke/" + xian[i] + ".png'/>" + "&nbsp;");
                        }
                    }
                    str.append("</td><td width='150px'>");
                    if (parseInt(ss[1]) < 21 || parseInt(ss[1]) == 71 || parseInt(ss[1]) == 91) {
                        str.append("&nbsp;"+ Text(70) +"" + "&nbsp;");
                    }
                    if (parseInt(ss[1]) >= 21 && parseInt(ss[1]) < 31) {
                        str.append("&nbsp;"+ Text(71) +"" + "&nbsp;");
                    }
                    if (parseInt(ss[1]) >= 31 && parseInt(ss[1]) < 41) {
                        str.append("&nbsp;"+ Text(72) +"" + "&nbsp;");
                    }
                    var zhuang = ssBJLResult[1].split(',');
                    for (var i = 0; i < zhuang.length; i++) {
                        if (zhuang[i] != "0") {
                            str.append("<img align='absmiddle' border='0' src='../puke/" + zhuang[i] + ".png'/>" + "&nbsp;");
                        }
                    }
                    str.append("</td></tr></table>");
                }
                else {
                    str.append("" + ss[3] + "");
                }
                str.append("</td>");
            }
            else {
                str.append("<td width='300px' align='left' valign='middle' ></td>");
            }
        }
        str.append("</tr>");
    }
    if (iLine == 1) {
        str.append("<tr style='height:25px' bgcolor='#E1E1E1' onMouseOver='this.className=\"menu_title2\";' onMouseOut='this.className=\"menu_title_out2\";'>");
        str.append("<td class='date' align='center' valign='middle' >" + ss[0] + "</td>"); //开牌时间
        str.append("<td width='70px' align='center' valign='middle' >" + gameType(ss[1]) + "</td>");  //台号
        str.append("<td width='70px' align='center' valign='middle' >" + ss[2] + "</td>"); //场-局次
        if (parseInt(ss[1]) < 100) {
            if (ss[4] > "") {
                aa = ss[4].split(',');
                if (parseInt(ss[1]) >= 31 && parseInt(ss[1]) < 41) {
                    bb = nnhigntype(aa[0]) + " " + nnlowtype(aa[1]);
                }
                else if (parseInt(ss[1]) >= 41 && parseInt(ss[1]) < 51) {
                   if(aa[0]=="-2147483648")
                {
                   bb=Text(66);
                }
                else
                {
                bb = lpanswer(aa[0]);
                }
                }
                else if (parseInt(ss[1]) >= 51 && parseInt(ss[1]) < 61) {
                    //bb = sbanswer(aa[0]);
                    bb = aa[0];
                    if(bb=="0")
                    {
                      bb=Text(66);
                    }
                }
                else if (parseInt(ss[1]) >= 61 && parseInt(ss[1]) <71) {
                    if (aa[0] == "-2147483648") {
                        bb = Text(66);
                    }
                    else {
                        bb = aa[0];
                    }
                }
                else {
                    for (var i = aa.length - 1; i >= 0; i--) {
                        if (aa[i] == "1") {
                            if (parseInt(ss[1]) < 21 || parseInt(ss[1]) == 71) {
                                bb += answer[i] + " ";
                            }
                            if (parseInt(ss[1]) >= 21 && parseInt(ss[1]) < 31) {
                                bb += answerlh[i] + " ";
                            }
                            if (parseInt(ss[1]) == 91) {
                                bb += answerbb[i] + " ";
                            }
                        }
                    }
                }
                str.append("<td width='160px' align='left' valign='middle'>" + bb + "</td>"); //结果
            }
            else {
                str.append("<td width='160px' align='left' valign='middle'></td>"); //结果
            }
            if (ss[3] != "") {
                str.append("<td width='300px' align='left' valign='middle' >");
                if (parseInt(ss[1]) < 41 || parseInt(ss[1]) == 71 || parseInt(ss[1]) == 91) {
                    var ssBJLResult = ss[3].split(';');
                    if (parseInt(ss[1]) < 21 || parseInt(ss[1]) == 71 || parseInt(ss[1]) == 91) {
                        str.append("<table><tr><td width='150px'>&nbsp;"+ Text(67) +"" + "&nbsp;");
                    }
                    if (parseInt(ss[1]) >= 21 && parseInt(ss[1]) < 31) {
                    	str.append("<table><tr><td width='150px'>&nbsp;"+ Text(68) +"" + "&nbsp;");
                    }
                    if (parseInt(ss[1]) >= 31 && parseInt(ss[1]) < 41) {
                        str.append("<table><tr><td width='150px'>&nbsp;"+ Text(69) +"" + "&nbsp;");
                    }
                    var xian = ssBJLResult[0].split(',');
                    for (var i = 0; i < (xian.length - 1); i++) {
                        if (xian[i] != "0") {
                            str.append("<img align='absmiddle' border='0' src='../puke/" + xian[i] + ".png'/>" + "&nbsp;");
                        }
                    }
                    str.append("</td><td width='150px'>");
                    if (parseInt(ss[1]) < 21 || parseInt(ss[1]) == 71 || parseInt(ss[1]) == 91) {
                        str.append("&nbsp;"+ Text(70) +"" + "&nbsp;");
                    }
                    if (parseInt(ss[1]) >= 21 && parseInt(ss[1]) < 31) {
                        str.append("&nbsp; "+ Text(71) +""+ "&nbsp;");
                    }
                    if (parseInt(ss[1]) >= 31 && parseInt(ss[1]) < 41) {
                        str.append("&nbsp;"+ Text(72) +"" + "&nbsp;");
                    }
                    var zhuang = ssBJLResult[1].split(',');
                    for (var i = 0; i < zhuang.length; i++) {
                        if (zhuang[i] != "0") {
                            str.append("<img align='absmiddle' border='0' src='../puke/" + zhuang[i] + ".png'/>" + "&nbsp;");
                        }
                    }
                    str.append("</td></tr></table>");
                }
                else {
                    str.append("" + ss[3] + "");
                }
                str.append("</td>");
            }
            else {
                str.append("<td width='300px' align='left' valign='middle' ></td>");
            }
        }
        str.append("</tr>");
    }
    return str;
}
/*
==================================================================

显示数据详细

==================================================================
*/
//function showGameResult(gameResult,num)
//{
//   var ss=gameResult.split(',');
//   var ssResult=ss[num].split('-');
//   var result="";
//   for(var i=0;i<ssResult.length;i++)
//   {
//     result+=ssResult[i].substr(0.1)+"-";
//   }
//   
//   return result.substr(0,result.length-1);
//}