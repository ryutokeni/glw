
//显示代理名称
function GetGroupString(grouplength) {
    var strGroupLevleName = document.getElementById("HiddenGroupLevleName").value;
    var arrGroupLevleName = strGroupLevleName.split(';');
    var groupstring = "";
    var iLeve = grouplength / 3 - 2;
    if (iLeve >= 0) {
        groupstring = arrGroupLevleName[iLeve];
    }
    return groupstring;
}
/*
==================================================================

GetRouletteAreaName 获取轮盘游戏名称

==================================================================
*/
function GetRouletteAreaName(code) {
    var strRouletteAreaName = window.document.getElementById("HiddenRouletteAreaName").value;
    var arrRouletteAreaName = strRouletteAreaName.split('?');
    var result = arrRouletteAreaName[parseInt(code)];
    return result;
}
/*
=================================================================

GetDiceAreaName 获取骰子游戏名称

==================================================================
*/
function GeteDicAreaName(code) {
    var strDicAreaName = window.document.getElementById("HiddenDiceAreaName").value;
    var arrDicAreaName = strDicAreaName.split('?');
    return arrDicAreaName[parseInt(code)];
}
/*
=================================================================

GeteBaccaratAreaName 获取百家乐游戏名称

==================================================================
*/
function GeteBaccaratAreaName(code) {
    var strBaccaratAreaName = window.document.getElementById("HiddenBaccaratAreaName").value;
    var arrBaccaratAreaName = strBaccaratAreaName.split('?');
    return arrBaccaratAreaName[parseInt(code)];
}
/*
=================================================================

GeteBULLAreaName 获取牛牛游戏名称

==================================================================
*/
function GeteBULLAreaName(code) {
    var strBULLAreaName = window.document.getElementById("HiddenBULLAreaName").value;
    var arrBULLAreaName = strBULLAreaName.split('?');
    return arrBULLAreaName[parseInt(code)];
}

/*
==================================================================

queryPlayList 点击按钮查询

==================================================================
*/
function query() {
    var groupNameID = window.document.getElementById("txtGroupNameID").value;
    if (groupNameID == "") {
        alert("请填写代理账号！");
        return;
    }

    window.document.getElementById("HiddenNameID").value = groupNameID;
    var cbo = new CallBackObject();
    cbo.OnComplete = Cbo_Complete;
    //cbo.onError = Cbo_Error;
    cbo.DoCallBack("AjaxDb.aspx?PageName=BettingInfo&GroupNameID=" + groupNameID);

}
/*
==================================================================

queryPlayList 点击按钮查询

==================================================================
*/
function Cbo_Complete(responseText, responseXML) {
    //刷新时间
    var now = new Date();
    document.getElementById("timeRefresh").innerHTML = now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate() + " " + now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
    var ss = responseText.split('\f');
    var str = new StringBulider();
    str.append("<table width='650px'  border='0' cellpadding='0' cellspacing='1' bgcolor='#FFFFFF'>");
    str.append(showTableHead());
    if (responseText.length > 0) {
        var iAllBet = 0, iAllWin = 0, iBet = 0;
        for (var i = 0; i < ss.length; i++) {
            var iLine = i % 2;
            str.append(showPlayListDeatil(ss[i], iLine));
            var ssPlay = ss[i].split('\t');


            iAllWin += parseInt(ssPlay[3]);
            if (ssPlay[5] != "") {
                var arrBets = ssPlay[5].split(';');
                for (var j = 0; j < arrBets.length; j++) {
                    var arrBet = arrBets[j].split(',');
                    iBet += parseInt(arrBet[1]);
                }
            }
        }
    }
    str.append("<tr style='height:25px' bgcolor='#815F40' ");
    str.append("<td align='Center'></td>"); //游戏
    str.append("<td align='Center'></td>"); //
    str.append("<td align='Center'></td>"); //会员
    str.append("<td align='Center'></td>"); //
    str.append("<td align='Right'>" + ((iAllWin == undefined) ? 0 : iAllWin) + "&nbsp;</td>"); //总  赢
    str.append("<td align='Right'></td>"); //余额
    var loginGroupID = document.getElementById("HiddenLoginGroupID").value;
    if (loginGroupID.length <= 6) {
        str.append("<td align='Center'></td>"); //ip地址
    }
    str.append("<td align='Right'>" + (iBet == undefined ? 0 : iBet) + "&nbsp;</td>"); //投注
    str.append("</tr>");

    str.append("</table>");
    document.getElementById("divContent").innerHTML = str;
}
/*
==================================================================

showBettingInfo 显示即时咨询列表数据

==================================================================
*/
function showBettingInfo(dataString) {
    //刷新时间
    var now = new Date();
    document.getElementById("timeRefresh").innerHTML = now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate() + " " + now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
    var ss = dataString.split('\f');
    var str = new StringBulider();
    str.append("<table width='650px'  border='0' cellpadding='0' cellspacing='1' bgcolor='#FFFFFF'>");
    str.append(showTableHead());
    if (dataString.length > 0) {
        var iAllBet = 0, iAllWin = 0, iBet = 0;
        for (var i = 0; i < ss.length; i++) {
            var iLine = i % 2;
            str.append(showPlayListDeatil(ss[i], iLine));
            var ssPlay = ss[i].split('\t');

            var gameIndex = parseInt(ssPlay[0]);
            iAllWin += parseInt(ssPlay[3]);
            if (ssPlay[5] != "") {
                var arrBets = ssPlay[5].split(';');
                for (var j = 0; j < arrBets.length; j++) {
                    var arrBet = arrBets[j].split(',');
                    iBet += parseInt(arrBet[1]);
                }
            }
        }
    }
    str.append("<tr style='height:25px' bgcolor='#815F40' ");
    str.append("<td align='Center'></td>"); //游戏
    str.append("<td align='Center'></td>"); //
    str.append("<td align='Center'></td>"); //会员
    str.append("<td align='Center'></td>"); //
    str.append("<td align='Right'>" + ((iAllWin == undefined) ? 0 : iAllWin) + "&nbsp;</td>"); //总  赢
    str.append("<td align='Right'></td>"); //总  赢
    var loginGroupID = document.getElementById("HiddenLoginGroupID").value;
    if (loginGroupID.length <= 6) {
        str.append("<td align='Center'></td>"); //ip地址
    }
    str.append("<td align='Right'>" + (iBet == undefined ? 0 : iBet) + "&nbsp;</td>"); //投注

    str.append("</tr>");

    str.append("</table>");
    document.getElementById("divContent").innerHTML = str;
}
/*
==================================================================

showTableHead 显示数据表头

==================================================================
*/
function showTableHead() {
    var ssName = new Array(6);
    ssName[0] = "台  号";
    ssName[1] = "会员账号";
    ssName[2] = "余  额";
    ssName[3] = "总输赢";
    ssName[4] = "ip地址";
    ssName[5] = "闲/公牛/大/红/单";
    ssName[6] = "和";
    ssName[7] = "庄/斗牛士/小/黑/双";
    ssName[8] = "闲对子";
    ssName[9] = "庄对子";
    ssName[10] = "所属代理";
    ssName[11] = "投      注";
    var str = new StringBulider();
    str.append("<tr style='height:25px' >");
    str.append("<td  width='80px' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[0] + "</td>");
    str.append("<td width='60px' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[10] + "</td>");
    str.append("<td width='60px' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[1] + "</td>");
    str.append("<td width='90px' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[3] + "</td>");
    str.append("<td width='90px' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[2] + "</td>");
    var loginGroupID = document.getElementById("HiddenLoginGroupID").value;
    if (loginGroupID.length <= 6) {
        str.append("<td width='120px' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[4] + "</td>");
    }
    str.append("<td width='170px' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[11] + "</td>");
    //str.append("<td width='140px' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[7] + "</td>");
    //str.append("<td width='120px' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[5] + "</td>");
    //str.append("<td width='90px' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[6] + "</td>");
    //str.append("<td width='90px' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[8] + "</td>");
    //str.append("<td width='90px' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[9] + "</td>");

    str.append("</tr>");
    return str;
}
/*
==================================================================

显示数据详细

==================================================================
*/
function showPlayListDeatil(StrArray, iLine) {
    var groupNameID = window.document.getElementById("HiddenNameID").value;
    var ssAnswer = new Array("", "闲", "闲 闲对子", "闲 庄对子", "闲 闲对子 庄对子", "和", "和 闲对子", "和 庄对子", "和 闲对子 庄对子", "庄", "庄 闲对子", "庄 庄对子", "庄 闲对子 庄对子");
    var ss = StrArray.split('\t');
    var str = new StringBulider();
    if (iLine == 0) {
        str.append("<tr style='height:25px' bgcolor='#E9E7D0' onMouseOver='this.className=\"menu_title2\";' onMouseOut='this.className=\"menu_title_out1\";'>");
        str.append("<td align='Center'>" + getGameName(ss[0]) + "</td>"); //游戏
        str.append("<td align='Center'>" + ss[6] + "</td>"); //所属代理
        str.append("<td align='Center'>" + ss[1] + "</td>"); //会员
        str.append("<td align='Right'>" + ss[3] + "&nbsp;</td>"); //总  赢
        str.append("<td align='Right'>" + ss[2] + "&nbsp;</td>"); //剩余额度
        var loginGroupID = document.getElementById("HiddenLoginGroupID").value;
        if (loginGroupID.length <= 6) {
            str.append("<td align='Center'>" + ss[4] + "&nbsp;</td>"); //ip地址
        }
        var gameIndex = parseInt(ss[0]);
        if (ss[5] != "") {
            var arrBets = ss[5].split(';');
            if (0 < gameIndex && gameIndex < 10) {
                var strBet = "";
                for (var i = 0; i < arrBets.length; i++) {
                    var arrBet = arrBets[i].split(',');
                    strBet += GeteBaccaratAreaName(arrBet[0]) + " 押:" + arrBet[1] + "&nbsp;&nbsp;";
                }
                str.append("<td align='left'>" + strBet + "&nbsp;</td>");  //百家乐
            }
            else if (60 < gameIndex && gameIndex < 70) {
                var strBet = "";
                for (var i = 0; i < arrBets.length; i++) {
                    var arrBet = arrBets[i].split(',');
                    strBet += GeteBULLAreaName(arrBet[0]) + " 押:" + arrBet[1] + "&nbsp;&nbsp;";
                }
                str.append("<td align='left'>" + strBet + "&nbsp;</td>");  //牛

            }
            else if (50 < gameIndex && gameIndex < 60) {
                var strBet = "";
                for (var i = 0; i < arrBets.length; i++) {
                    var arrBet = arrBets[i].split(',');
                    strBet += GeteDicAreaName(arrBet[0]) + " 押:" + arrBet[1] + "&nbsp;&nbsp;";
                }
                str.append("<td align='left'>" + strBet + "&nbsp;</td>"); //骰子

            }
            else if (40 < gameIndex && gameIndex < 50) {
                var strBet = "";
                for (var i = 0; i < arrBets.length; i++) {
                    var arrBet = arrBets[i].split(',');
                    strBet += GetRouletteAreaName(arrBet[0]) + " 押:" + arrBet[1] + "&nbsp;&nbsp;";
                }
                str.append("<td align='left'>" + strBet + "&nbsp;</td>"); //盘轮
            }
        }
        else {
            str.append("<td align='center'></td>"); //空
        }
        str.append("</tr>");
    }
    if (iLine == 1) {
        str.append("<tr style='height:25px' bgcolor='#FFFFFF' onMouseOver='this.className=\"menu_title2\";' onMouseOut='this.className=\"menu_title_out2\";'>");
        str.append("<td align='Center'>" + getGameName(ss[0]) + "</td>"); //游戏
        str.append("<td align='Center'>" + ss[6] + "</td>"); //所属代理
        str.append("<td align='Center'>" + ss[1] + "</td>"); //会员
        str.append("<td align='Right'>" + ss[3] + "&nbsp;</td>"); //总  赢
        str.append("<td align='Right'>" + ss[2] + "&nbsp;</td>"); //剩余额度
        var loginGroupID = document.getElementById("HiddenLoginGroupID").value;
        var gameIndex = parseInt(ss[0]);
        if (ss[5] != "") {
            var arrBets = ss[5].split(';');
            if (0 < gameIndex && gameIndex < 10) {
                var strBet = "";
                for (var i = 0; i < arrBets.length; i++) {
                    var arrBet = arrBets[i].split(',');
                    strBet += GeteBaccaratAreaName(arrBet[0]) + " 押:" + arrBet[1] + "&nbsp;&nbsp;";
                }
                str.append("<td align='left'>" + strBet + "&nbsp;</td>");  //百家乐
            }
            else if (60 < gameIndex && gameIndex < 70) {
                var strBet = "";
                for (var i = 0; i < arrBets.length; i++) {
                    var arrBet = arrBets[i].split(',');
                    strBet += GeteBULLAreaName(arrBet[0]) + " 押:" + arrBet[1] + "&nbsp;&nbsp;";
                }
                str.append("<td align='left'>" + strBet + "&nbsp;</td>");  //牛

            }
            else if (50 < gameIndex && gameIndex < 60) {
                var strBet = "";
                for (var i = 0; i < arrBets.length; i++) {
                    var arrBet = arrBets[i].split(',');
                    strBet += GeteDicAreaName(arrBet[0]) + " 押:" + arrBet[1] + "&nbsp;&nbsp;";
                }
                str.append("<td align='left'>" + strBet + "&nbsp;</td>"); //骰子

            }
            else if (40 < gameIndex && gameIndex < 50) {
                var strBet = "";
                for (var i = 0; i < arrBets.length; i++) {
                    var arrBet = arrBets[i].split(',');
                    strBet += GetRouletteAreaName(arrBet[0]) + " 押:" + arrBet[1] + "&nbsp;&nbsp;";
                }
                str.append("<td align='left'>" + strBet + "&nbsp;</td>"); //盘轮
            }
        }
        else {
            str.append("<td align='center'></td>"); //空
        }
        str.append("</tr>");
    }
    return str;

}