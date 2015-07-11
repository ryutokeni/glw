
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
//獲得幣種
function getbz(id) {
    var str = "";
    var bztype = document.getElementById("bz").value.split(';');
    str = bztype[id - 1];
    return str;
}
/*
==================================================================

全局变量

==================================================================
*/
var GroupID; //当前群编号
var NameID; //当前群帐号
var arrLeve = new Array(); //存储级别信息
var currLeave//当前级别
var currLoginGroupLength;
var isgd; //是否是股东以上
var dd = 0;
var timetype;
/*
==================================================================

listQuery 列表中点击查询

==================================================================
*/

function listQuery(groupID, groupNameID) {

    dateBegin = document.getElementById("dateBegin").value;
    dateEnd = document.getElementById("dateEnd").value;
    var dateToday = new Date();
    var dateString = showYesterDay();
    currLoginGroupLength = groupID.length;
    //处理导航 
    if (GroupID != groupID) {
        document.getElementById("HiddenGroupID").value = groupID;
        document.getElementById("HiddenNameID").value = groupNameID;
        GroupID = groupID;
        NameID = groupNameID;
        isgd = groupID.length;
        currLeave = groupID.length / 3 - arrLeve[0][0].length / 3;
        if (currLeave == arrLeve.length) {
            var arrCurrentGroup = new Array(GroupID, NameID);
            arrLeve.push(arrCurrentGroup);
        }
        var iLeve = arrLeve.length - 1;
        for (var n = currLeave; n < iLeve; n++) {
            arrLeve.pop();
        }
        var str = new StringBulider();
        str.append("<table><tr><td>");
        for (var i = 0; i < arrLeve.length; i++) {
            str.append("<a style='font-size:12pt;color:blue;' href='#' onclick='listQuery(\"" + arrLeve[i][0] + "\",\"" + arrLeve[i][1] + "\")'>");
            str.append(arrLeve[i][1]);
            str.append("</a>");
            str.append(">>");
        }
        str.del(2);
        str.append("</td></tr><table>");
        document.getElementById("divMenu").innerHTML = str;
    }
    else {
        return;
    }

    if (dateBegin == "" && dateEnd == "")//查询今日
    {
        queryToday();
    }
    else if (dateBegin == dateString && dateEnd == "") {
        queryToday();
    }
    else if (dateBegin == dateString && dateBegin < dateEnd) {
        queryToday();
    }
    else {

        querySummary();
    }
}
/*
==================================================================

querySummary 点击查询

==================================================================
*/
function querySummary() {
    var GroupID = document.getElementById("HiddenGroupID").value;
    dateBegin = document.getElementById("dateBegin").value;
    dateEnd = document.getElementById("dateEnd").value;
    var dateToday = new Date();
    var dateString = showYesterDay();
    if (dateBegin == "") {
        alert(Text(1));
        return;
    }
    if (dateEnd == "") {
        alert(Text(2));
        return;
    }
    if (dateBegin >= dateEnd) {
        alert(Text(3));
        return;
    }
    document.getElementById("query").disabled = true;
    if (dateBegin == dateString && dateBegin < dateEnd) {
        queryToday();
    }
    else {
        var querytype = document.getElementById("Radio1").checked;
        if (querytype != true) {
            timetype = 2;
        }
        else {
            timetype = 0;
        }

        document.getElementById("loading").style.display = "block";
        var arys = new Array();
        var str = dateEnd;
        arys = str.split('-');
        var myDate = new Date(arys[0], parseInt(arys[1] - 1), arys[2]);
        myDate = dateAdd(myDate, "d", -1);

        var cbo = new CallBackObject();
        cbo.OnComplete = queryDates;
        cbo.DoCallBack("AjaxDb.aspx?PageName=Dates&GroupID=" + GroupID + "&BeginDate=" + dateBegin + "&EndDate=" + format(myDate, "yyyy-MM-DD") + "&type=" + timetype);
    }
}

function queryToday1() {
    document.getElementById("todayquerty").disabled = true;
    queryToday();
}
//上星期查询
function queryPreWeek() {
    var querytype = document.getElementById("Radio1").checked;
    if (querytype != true) {
        timetype = 2;
    }
    else {
        timetype = 0;
    }
    document.getElementById("prequery").disabled = true;
    document.getElementById("loading").style.display = "block";
    dd = 0;
    var GroupID = document.getElementById("HiddenGroupID").value;
    setDate(6);
    dateBegin = document.getElementById("dateBegin").value;
    dateEnd = document.getElementById("dateEnd").value;
    var arys = new Array();
    var str = dateEnd;
    arys = str.split('-');
    var myDate = new Date(arys[0], parseInt(arys[1] - 1), arys[2]);
    myDate = dateAdd(myDate, "d", -1);

    var cbo = new CallBackObject();
    cbo.OnComplete = queryDates;
    cbo.DoCallBack("AjaxDb.aspx?PageName=Dates&GroupID=" + GroupID + "&BeginDate=" + dateBegin + "&EndDate=" + format(myDate, "yyyy-MM-DD") + "&type=" + timetype);
}
//本星期查询
function PreWeek() {
    var querytype = document.getElementById("Radio1").checked;
    if (querytype != true) {
        timetype = 2;
    }
    else {
        timetype = 0;
    }
    document.getElementById("thisweek").disabled = true;
    document.getElementById("loading").style.display = "block";
    dd = 0;
    var GroupID = document.getElementById("HiddenGroupID").value;
    var dateToday = new Date();
    var dateString = showToDay();
    setDate(2);
    dateBegin = document.getElementById("dateBegin").value;
    document.getElementById("dateEnd").value = dateString;
    dateEnd = dateString;
    var arys = new Array();
    var str = dateEnd;
    arys = str.split('-');
    var myDate = new Date(arys[0], parseInt(arys[1] - 1), arys[2]);
    myDate = dateAdd(myDate, "d", -1);

    var cbo = new CallBackObject();
    cbo.OnComplete = queryDates;
    cbo.DoCallBack("AjaxDb.aspx?PageName=Dates&GroupID=" + GroupID + "&BeginDate=" + dateBegin + "&EndDate=" + format(myDate, "yyyy-MM-DD") + "&type=" + timetype);
}
//上个月查询
function queryPreMonth() {
    var querytype = document.getElementById("Radio1").checked;
    if (querytype != true) {
        timetype = 2;
    }
    else {
        timetype = 0;
    }
    document.getElementById("Premonth").disabled = true;
    document.getElementById("loading").style.display = "block";
    dd = 0;
    var GroupID = document.getElementById("HiddenGroupID").value;
    setDate(4);
    dateBegin = document.getElementById("dateBegin").value;
    dateEnd = document.getElementById("dateEnd").value;
    var arys = new Array();
    var str = dateEnd;
    arys = str.split('-');
    var myDate = new Date(arys[0], parseInt(arys[1] - 1), arys[2]);
    myDate = dateAdd(myDate, "d", -1);

    var cbo = new CallBackObject();
    cbo.OnComplete = queryDates;
    cbo.DoCallBack("AjaxDb.aspx?PageName=Dates&GroupID=" + GroupID + "&BeginDate=" + dateBegin + "&EndDate=" + format(myDate, "yyyy-MM-DD") + "&type=" + timetype);
}
//本月查询
function queryMonth() {
    var querytype = document.getElementById("Radio1").checked;
    if (querytype != true) {
        timetype = 2;
    }
    else {
        timetype = 0;
    }
    document.getElementById("Month").disabled = true;
    document.getElementById("loading").style.display = "block";
    dd = 0;
    var GroupID = document.getElementById("HiddenGroupID").value;
    var dateToday = new Date();
    var dateString = showToDay();
    setDate(1);
    dateBegin = document.getElementById("dateBegin").value;
    document.getElementById("dateEnd").value = dateString;
    dateEnd = dateString;
    var arys = new Array();
    var str = dateEnd;
    arys = str.split('-');
    var myDate = new Date(arys[0], parseInt(arys[1] - 1), arys[2]);
    myDate = dateAdd(myDate, "d", -1);

    var cbo = new CallBackObject();
    cbo.OnComplete = queryDates;
    cbo.DoCallBack("AjaxDb.aspx?PageName=Dates&GroupID=" + GroupID + "&BeginDate=" + dateBegin + "&EndDate=" + format(myDate, "yyyy-MM-DD") + "&type=" + timetype);
}


//---------------------------------------------page loading-----------------------------------
// Get info about current group of user and query today data.
// *Note: Look like the loop alway run one time. Check if we can remove that loop
//--------------------------------------------------------------------------------------------
function loadPage() {
    var dateToday = new Date();

    // Get info about current group
    GroupID = document.getElementById("HiddenGroupID").value;
    NameID = document.getElementById("HiddenNameID").value;

    if (GroupID.length > 9) {
        document.getElementById("qtype").style.display = "none";
    }

    currLoginGroupLength = GroupID.length;

    var arrCurrentGroup = new Array(GroupID, NameID);

    arrLeve.push(arrCurrentGroup);

    // Add more comment
    // Start push data to screen
    var str = new StringBulider();
    str.append("<table><tr><td>");
    for (var i = 0; i < arrLeve.length; i++) {
        str.append("<a style='font-size:12pt;color:blue;' href='#' onclick='listQuery(\"" + arrLeve[i][0] + "\",\"" + arrLeve[i][1] + "\")'>");
        str.append(arrLeve[i][1]);
        str.append("</a>");
    }
    str.append("</td></tr><table>");

    //    for (var i = 0; i < arrLeve.length; i++) {
    //        str.append("<a style='font-size:12pt;color:blue;' href='#' onclick='listquery(\"" + arrLeve[i][0] + "\",\"" + arrLeve[i][1] + "\")'>");
    //        str.append(arrLeve[i][1]);
    //        str.append("</a>");
    //    }

    document.getElementById("divMenu").innerHTML = str;
    document.getElementById("divMenu").style.display = "none";

    // Get data of today
    queryToday();
}

//-----------------------------------------Query Today--------------------------------------------------
// Get data 
//
//------------------------------------------------------------------------------------------------------
function queryToday() {

    // Get type of display data
    var querytype = document.getElementById("Radio1").checked;

    if (querytype != true) {
        timetype = 3;
    }
    else {
        timetype = 1;
    }
    document.getElementById("loading").style.display = "block";
    var dateToday = new Date();
    document.getElementById("dateBegin").value = "";
    document.getElementById("dateEnd").value = "";
    document.getElementById("dateBegin").value = showYesterDay();
    document.getElementById("dateEnd").value = showToDay();
    dateBegin = document.getElementById("dateBegin").value;
    dateEnd = document.getElementById("dateEnd").value;
    GroupID = document.getElementById("HiddenGroupID").value;

    // 
    var cbo = new CallBackObject();

    // Notify that we already got data
    cbo.OnComplete = queryTodaySucc;

    // Do server query
    cbo.DoCallBack("AjaxDb.aspx?PageName=Today&GroupID=" + GroupID + "&type=" + timetype);
}

///
/// Push data to WinLoss menu
///
function queryTodaySucc(result) {
    document.getElementById("loading").style.display = "none";
    document.getElementById("query").disabled = false;
    document.getElementById("todayquerty").disabled = false;

    result = result.split('@@');

    var ss = result[0];
    var ss1 = "";

    if (result[1] > "") {
        ss1 = result[1].split('$$');
    }

    var str = new StringBulider();
    var groupNameID = document.getElementById("HiddenNameID").value;
    var groupID = document.getElementById("HiddenGroupID").value;
    isgd = groupID.length;

    str.append("<table width='99%' border='0' cellspacing='0' cellpadding='0'>"); // Create table to contain general account query 
    str.append("<tr><td height='32' align='left' valign='middle' class='font5'>" + Text(4) + "（" + GetGroupString(groupID.length) + groupNameID + "）</td></tr>");
    str.append("</table>");

    //    var text = "<p height= '32px' align='left' valign='middle' class='font5'>" + Text(4) + "（" + GetGroupString(groupID.length) + groupNameID + ")</p>";
    //    str.append(text);

    // ngdlong
    // Generate table to display data
    // Modify this table to display with width = 99% of parent table size for dynamic localization
    str.append("<table width='99%' height='26' border='0' cellpadding='0' cellspacing='1' bgcolor='#FFFFFF'>");

    str.append(showTodayGroupTableHead());

    if (result[0] > "") {

        ss = ss.split('$$');

        var iAllBet = 0, iAllWin = 0, iWaterBet = 0, iWaterMoney = 0, iGroupWin = 0, iCompanyMonye = 0, iforcomBet = 0, iforcomWaterBet = 0, sxhlb = 0;

        for (var i = 0; i < ss.length; i++) {
            var iLine = i % 2;

            // Show data
            str.append(showTodayGroupDeatil(ss[i], iLine));

            var ssGroup = ss[i].split('##');

            iAllBet += parseInt(ssGroup[3]);
            iAllWin += parseFloat(ssGroup[4]);
            iWaterBet += parseFloat(ssGroup[5]);
            iWaterMoney += parseFloat(ssGroup[7]);
            iGroupWin += parseFloat(ssGroup[8]);
            iCompanyMonye += parseFloat(ssGroup[10]);
            iforcomBet += parseFloat(ssGroup[11]); //交公司投注金额
            iforcomWaterBet += parseFloat(ssGroup[12]); //交公司洗码量
            //sxhlb += FormatNumber(ssGroup[13],2);
        }
        //汇总

        // Show summary data of first table
        str.append("<tr bgcolor='#815F40' >");
        str.append("<td  align='center' valign='middle' >" + Text(5) + "：</td>");
        str.append("<td  align='center' valign='middle' ></td>"); //级别
        str.append("<td width='60px' align='center' valign='middle' ></td>");  //用户名
        str.append("<td width='60px' align='center' valign='middle' ></td>");  //用户名
        str.append("<td class='number' align='right' valign='middle' >" + iAllBet + "&nbsp;</td>"); //投注金额
        str.append("<td class='number' align='right' valign='middle' >" + parseFloat(iAllWin).toFixed(2) + "&nbsp;</td>"); //输赢金额
        str.append("<td class='number' align='right' valign='middle' >" + parseFloat(iWaterBet).toFixed(2) + "&nbsp;</td>"); //洗码量
        if (isgd > 6) {
            str.append("<td class='per' ></td>"); //洗码类型
            str.append("<td class='per' align='center' valign='middle' ></td>"); //洗码比
        }
        str.append("<td class='number' align='right' valign='middle' >" + parseFloat(iWaterMoney).toFixed(2) + "&nbsp;</td>"); //洗码佣金
        str.append("<td class='number' align='right' valign='middle' >" + parseFloat(iGroupWin).toFixed(2) + "&nbsp;</td>"); //股东总赢
        if (isgd > 6) {
            str.append("<td class='per'  valign='middle' ></td>");  //占成
        }
        str.append("<td class='number' align='right' valign='middle' >" + parseFloat(iCompanyMonye).toFixed(2) + "&nbsp;</td>"); //交公司金额
        str.append("<td class='number' align='right' valign='middle' >" + parseFloat(iforcomBet).toFixed(2) + "</td>");  //交公司投注金额
        str.append("<td class='number' align='right' valign='middle' >" + parseFloat(iforcomWaterBet).toFixed(2) + "</td>");  //交公司洗码量
        str.append("<td class='number' align='right' valign='middle' ></td>"); //公司获利比

        //明细列表
        str.append("</tr>");

    }
    if (result[1] > "") {
        isgd = isgd + 3;
        showTodaySubGroupSummary(result[1]);
    }
    else {
        document.getElementById("divSubAccount").innerHTML = "";
    }
    if (result[2] > "") {
        showTodayCardSummary(result[2]);
    }
    else {
        document.getElementById("divMyCard").innerHTML = ""; //无数据清空
    }
    str.append("</table>");

    document.getElementById("divMyAccount").innerHTML = str; //当前群组输赢报表
    document.getElementById("divMenu").style.display = "block";
}


/*
==================================================================

Show first table of WinLoss menu

==================================================================
*/
function showTodayGroupTableHead() {
    var groupID = document.getElementById("HiddenGroupID").value;
    var ssName = new Array(20);
    ssName[0] = Text(6);
    ssName[1] = Text(7);
    ssName[2] = Text(8);
    ssName[3] = Text(9);
    ssName[4] = Text(10);
    ssName[5] = Text(145);
    ssName[6] = Text(11);
    ssName[7] = Text(12);
    ssName[8] = GetGroupString(groupID.length) + " " + Text(13);
    ssName[9] = Text(14);
    ssName[10] = Text(15);
    ssName[11] = Text(16);
    ssName[12] = Text(41);
    ssName[13] = Text(17);
    ssName[14] = Text(18);
    ssName[15] = Text(19);
    ssName[16] = Text(20); // done
    var str = new StringBulider();
    str.append("<tr >");
    str.append("<td  width='60px'  height='25' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[16] + "</td>");
    str.append("<td  width='60px'  height='25' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[0] + "</td>");
    str.append("<td width='60px' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[1] + "</td>");
    str.append("<td width='60px' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[13] + "</td>");
    str.append("<td width='80px' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[2] + "</td>");
    str.append("<td width='60px' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[3] + "</td>");
    str.append("<td width='80px' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[4] + "</td>");
    if (isgd > 6) {
        str.append("<td width='60px' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[5] + "</td>");
        str.append("<td width='50px' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[6] + "</td>");
    }
    str.append("<td width='80px' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[7] + "</td>");
    str.append("<td width='100px' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[8] + "</td>");
    if (isgd > 6) {
        str.append("<td width='50px' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[12] + "</td>");
    }
    str.append("<td width='80px' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[9] + "</td>");
    str.append("<td width='80px' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[14] + "</td>");
    str.append("<td width='100px' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[15] + "</td>");
    str.append("<td width='80px' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[10] + "</td>");


    //str.append("<td width='150px' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[11] + "</td>");
    //str.append("<td width='70px' align='center' valign='middle' background='../images/tabbg.jpg'></td>");
    str.append("</tr>");
    return str;
}
/*
==================================================================

Show second table of WinLoss menu

==================================================================
*/
function showTodaySubGroupTableHead() {
    var groupID = document.getElementById("HiddenGroupID").value;
    var ssName = new Array(20);
    ssName[0] = Text(6);
    ssName[1] = Text(7);
    ssName[2] = Text(8);
    ssName[3] = Text(9);
    ssName[4] = Text(10);
    ssName[5] = Text(145);
    ssName[6] = Text(11);
    ssName[7] = Text(12);
    ssName[8] = Text(13);
    ssName[9] = Text(14);
    ssName[10] = Text(15);
    ssName[11] = Text(21);
    ssName[12] = Text(41);
    ssName[13] = Text(17);
    ssName[14] = Text(18);
    ssName[15] = Text(19);
    ssName[16] = Text(22);
    var str = new StringBulider();
    str.append("<tr >");
    str.append("<td  width='60px' height='25' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[0] + "</td>");
    str.append("<td width='60px' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[1] + "</td>");
    str.append("<td width='80px' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[13] + "</td>");
    str.append("<td width='50px' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[16] + "</td>");
    str.append("<td width='60px' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[2] + "</td>");
    str.append("<td width='80px' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[3] + "</td>");
    str.append("<td width='80px' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[4] + "</td>");
    if (isgd > 6) {
        str.append("<td width='50px' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[5] + "</td>");
        str.append("<td width='70px' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[6] + "</td>");
    }
    str.append("<td width='90px' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[7] + "</td>");
    str.append("<td width='80px' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[8] + "</td>");
    if (isgd > 6) {
        str.append("<td width='40px' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[12] + "</td>");
    }
    str.append("<td width='80px' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[9] + "</td>");

    str.append("<td width='95px' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[14] + "</td>");
    str.append("<td width='130px' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[15] + "</td>");
    str.append("<td width='110px' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[10] + "</td>");

    str.append("<td width='70px' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[11] + "</td>");
    str.append("</tr>");
    return str;
}
/*
==================================================================

Show details data in first table

==================================================================
*/
function showTodayGroupDeatil(StrArray, iLine) {
    var Array2 = new Array(Text(23), Text(24));
    var ss = StrArray.split('##');
    var str = new StringBulider();

    if (iLine == 0) {
        str.append("<tr bgcolor='#FFE3C8'onMouseOver='this.className=\"menu_title2\";' onMouseOut='this.className=\"menu_title_out1\";' >");
    }
    if (iLine == 1) {
        str.append("<tr bgcolor='#E1E1E1'onMouseOver='this.className=\"menu_title2\";' onMouseOut='this.className=\"menu_title_out2\";' >");
    }

    str.append("<td width='60px' align='center' valign='middle' >" + game(ss[15]) + "</td>");
    str.append("<td width='60px' align='center'  valign='middle' >" + GetGroupString(ss[0].length) + "</td>"); //级别
    str.append("<td width='60px' align='center' valign='middle' >" + ss[1] + "</td>");  //用户名
    str.append("<td width='80px' align='center' valign='middle' >" + ss[2] + "</td>");  //别名
    str.append("<td class='number' >" + parseInt(ss[3]) + "&nbsp;</td>"); //投注金额
    str.append("<td class='number' >" + parseFloat(ss[4]).toFixed(2) + "&nbsp;</td>"); //输赢金额
    str.append("<td class='number' >" + parseFloat(ss[5]).toFixed(2) + "&nbsp;</td>"); //洗码量
    if (isgd > 6) {
        str.append("<td  align='center' valign='middle' >" + Array2[ss[14]] + "</td>"); //洗码类型
        str.append("<td class='per' align='center' valign='middle'>" + ss[6] + "%" + "</td>"); //洗码比
    }
    str.append("<td class='number' align='right' valign='middle' >" + parseFloat(ss[7]).toFixed(2) + "&nbsp;</td>"); //洗码佣金
    var userAllWin;
    str.append("<td class='number' align='right' valign='middle' >" + parseFloat(ss[8]).toFixed(2) + "&nbsp;</td>"); //股东总赢
    if (isgd > 6) {
        str.append("<td class='per' align='right' valign='middle' >" + parseInt(ss[9] * 100) + "%" + "</td>");  //占成
    }
    str.append("<td class='number' align='right' valign='middle' >" + parseFloat(ss[10]).toFixed(2) + "&nbsp;</td>"); //交公司金额
    str.append("<td class='number' align='right' valign='middle' >" + parseFloat(ss[11]).toFixed(2) + "</td>");  //交公司投注金额
    str.append("<td class='number' align='right' valign='middle' >" + parseFloat(ss[12]).toFixed(2) + "</td>");  //交公司洗码量
    if (ss[13] < 0) {
        str.append("<td style='color:red' align='right' valign='middle' >" + ss[13] + "%" + "&nbsp;</td>"); //公司获利比
    }
    else {
        str.append("<td style='color:blue' align='right' valign='middle' >" + ss[13] + "%" + "&nbsp;</td>"); //公司获利比
    }
    //str.append("<td width='70px' align='center' valign='middle'></td>");
    str.append("</tr>");

    return str;
}

///
/// Show data of direct agent details
///
function showTodaySubGroupSummary(ss) {
    ss = ss.split('$$');
    var str = new StringBulider();
    str.append("<table width='99%' border='0' cellspacing='0' cellpadding='0'>"); // Dump data to table 

    str.append("<tr><td height='32' align='left' valign='middle' class='font5'>" + Text(25) + "</td></tr>");
    str.append("</table>");
    // ngdlong - Generate table to display data
    // Modify this table to width = 99% of parent table for better localization display
    str.append("<table width='99%'  border='0' cellpadding='0' cellspacing='1.5' bgcolor='#FFFFFF'>");
    str.append(showTodaySubGroupTableHead());
    var iAllBet = 0, iAllWin = 0, iWaterBet = 0, iWaterMoney = 0, iGroupWin = 0, iCompanyMonye = 0, iforcomBet = 0, iforcomWaterBet = 0;
    for (var i = 0; i < ss.length; i++) {
        var iLine = i % 2;
        str.append(showTodaySubGroupDetail(ss[i], iLine));
        var ssGroup = ss[i].split('##');
        iAllBet += parseInt(ssGroup[3]);
        iAllWin += parseFloat(ssGroup[4]);
        iWaterBet += parseFloat(ssGroup[5]);
        iWaterMoney += parseFloat(ssGroup[7]);
        iGroupWin += parseFloat(ssGroup[8]);
        iCompanyMonye += parseFloat(ssGroup[10]);
        iforcomBet += parseFloat(ssGroup[11]); //交公司投注金额
        iforcomWaterBet += parseFloat(ssGroup[12]); //交公司洗码量
    }
    //汇总
    str.append("<tr bgcolor='#815F40' >");
    str.append("<td  align='center' valign='middle' >" + Text(5) + "：</td>"); //级别
    str.append("<td width='60px' align='center' valign='middle' ></td>");  //用户名
    str.append("<td width='80px' align='center' valign='middle' ></td>");  //用户名
    str.append("<td width='40px' align='center' valign='middle' ></td>");  //币种
    str.append("<td class='number' align='right' valign='middle' >" + iAllBet + "&nbsp;</td>"); //投注金额
    str.append("<td class='number' align='right' valign='middle' >" + parseFloat(iAllWin).toFixed(2) + "&nbsp;</td>"); //输赢金额
    str.append("<td class='number' align='right' valign='middle' >" + parseFloat(iWaterBet).toFixed(2) + "&nbsp;</td>"); //洗码量
    if (isgd > 6) {
        str.append("<td class='per' ></td>"); //洗码类型
        str.append("<td class='per' align='center' valign='middle' ></td>"); //洗码比
    }
    str.append("<td class='number' align='right' valign='middle' >" + parseFloat(iWaterMoney).toFixed(2) + "&nbsp;</td>"); //洗码佣金
    str.append("<td class='number' align='right' valign='middle' >" + parseFloat(iGroupWin).toFixed(2) + "&nbsp;</td>"); //股东总赢
    if (isgd > 6) {
        str.append("<td class='per'  valign='middle' ></td>");  //占成
    }
    str.append("<td class='number' align='right' valign='middle' >" + parseFloat(iCompanyMonye).toFixed(2) + "&nbsp;</td>"); //交公司金额
    //str.append("<td class='per' align='center' valign='middle' >"+ss[10]+"</td>"); //获利比
    //str.append("<td width='150' height='25' align='center' valign='middle' ><input type='image' name='imageField2' src='../images/menu_cx2.jpg' onclick='listQuery(\""+ss[0]+"\")' /></td>"); //明细列表
    str.append("<td class='number' align='right' valign='middle' >" + parseFloat(iforcomBet).toFixed(2) + "</td>");  //交公司投注金额
    str.append("<td class='number' align='right' valign='middle' >" + parseFloat(iforcomWaterBet).toFixed(2) + "</td>");  //交公司洗码量
    str.append("<td class='number' align='right' valign='middle' >" + parseFloat(iCompanyMonye / iforcomBet * 100).toFixed(2) + "%</td>"); //公司获利比

    str.append("<td width='60' height='25' align='center' valign='middle' ></td>"); //明细列表
    str.append("</tr>");
    str.append("</table>");
    document.getElementById("divSubAccount").innerHTML = str;
}
/*
==================================================================

showSubGroupDetail 显示下级群组汇总详细

==================================================================
*/
function showTodaySubGroupDetail(StrArray, iLine) {
    var Array2 = new Array(Text(23), Text(24));
    var ss = StrArray.split('##');
    var str = new StringBulider();

    if (iLine == 0) {
        str.append("<tr bgcolor='#FFE3C8' onMouseOver='this.className=\"menu_title2\";' onMouseOut='this.className=\"menu_title_out1\";'>");
    }
    if (iLine == 1) {
        str.append("<tr bgcolor='#E1E1E1' onMouseOver='this.className=\"menu_title2\";' onMouseOut='this.className=\"menu_title_out2\";'>");
    }

    str.append("<td  align='center' valign='middle' >" + GetGroupString(ss[0].length) + "</td>"); //级别
    str.append("<td width='60px' align='center' valign='middle' >" + ss[1] + "</td>");  //用户名
    str.append("<td width='80px' align='center' valign='middle' >" + ss[2] + "</td>");  //别名
    str.append("<td width='40px' align='center' valign='middle' >" + getbz(ss[15]) + "</td>");  //币种
    str.append("<td class='number' align='right' valign='middle' >" + parseInt(ss[3]) + "&nbsp;</td>"); //投注金额
    str.append("<td class='number' align='right' valign='middle' >" + parseFloat(ss[4]).toFixed(2) + "&nbsp;</td>"); //输赢金额
    str.append("<td class='number' align='right' valign='middle' >" + parseFloat(ss[5]).toFixed(2) + "&nbsp;</td>"); //洗码量
    if (isgd > 6) {
        str.append("<td class='per' >" + Array2[ss[14]] + "</td>"); //洗码类型
        str.append("<td class='per' align='center' valign='middle' >" + FormatNumber(ss[6], 2) + "%" + "</td>"); //洗码比
    }
    str.append("<td class='number' align='right' valign='middle' >" + parseFloat(ss[7]).toFixed(2) + "&nbsp;</td>"); //洗码佣金
    str.append("<td class='number' align='right' valign='middle' >" + parseFloat(ss[8]).toFixed(2) + "&nbsp;</td>"); //股东总赢
    if (isgd > 6) {
        str.append("<td class='per'  valign='middle' >" + parseInt(ss[9] * 100) + "%" + "</td>");  //占成
    }
    str.append("<td class='number' align='right' valign='middle' >" + parseFloat(ss[10]).toFixed(2) + "&nbsp;</td>"); //交公司金额
    str.append("<td width='90px' align='right' valign='middle' >" + parseFloat(ss[11]).toFixed(2) + "</td>");  //交公司投注金额
    str.append("<td class='80px' align='right' valign='middle' >" + parseFloat(ss[12]).toFixed(2) + "</td>");  //交公司洗码量
    if (ss[13] < 0) {
        str.append("<td style='color:red' align='right' valign='middle' >" + ss[13] + "%" + "&nbsp;</td>"); //公司获利比
    }
    else {
        str.append("<td style='color:blue' align='right' valign='middle' >" + ss[13] + "%" + "&nbsp;</td>"); //公司获利比
    }

    str.append("<td width='60' height='25' align='center' valign='middle' ><input  style='with:14px;height:21px;font-size:9pt;' type='button' name='imageField2' src='../images/menu_cx2.jpg' value='" + Text(21) + "' onclick='listQuery(\"" + ss[0] + "\",\"" + ss[1] + "\")' /></td>"); //明细列表
    str.append("</tr>");

    return str;
}
/*
==================================================================

showCardSummary 显示会员输赢汇总

==================================================================
*/
function showTodayCardSummary(StrArray) {
    if (StrArray > "") {
        var ss = StrArray.split('$$');
        var str = new StringBulider();
        str.append("<table width='99%' border='0' cellspacing='0' cellpadding='0'>");
        str.append("<tr><td height='32' align='left' valign='middle' class='font5'>" + Text(26) + "</td></tr>");
        str.append("</table>");
        str.append("<table  height='26' border='0' cellpadding='0' cellspacing='1' bgcolor='#FFFFFF'>");
        str.append(showSubCardDateTableHead());
        var iAllBet = 0, iAllWin = 0, iWaterBet = 0, iWaterMoney = 0, iUserAllWin = 0;
        for (var i = 0; i < ss.length; i++) {
            var iLine = i % 2;
            str.append(showTodaySubCardDetail(ss[i], iLine));
            var ssCard = ss[i].split('##');
            iAllBet += parseInt(ssCard[2]);
            iAllWin += parseFloat(ssCard[3]);
            iWaterBet += parseFloat(ssCard[4]);
            iWaterMoney += parseFloat(ssCard[6]);
            iUserAllWin += parseFloat(ssCard[7]);
            //iUserAllWin += parseInt(ssCard[9])
        }
        //汇总
        str.append("<tr bgcolor='#815F40'>");
        str.append("<td  align='center' valign='middle' >" + Text(5) + "：</td>"); //级别
        str.append("<td  align='center' valign='middle' ></td>");  //用户名
        str.append("<td  align='center' valign='middle' ></td>");  //别名
        str.append("<td  align='center' valign='middle' ></td>");  //币种
        str.append("<td class='number' align='right' valign='middle' >" + iAllBet + "&nbsp;</td>"); //投注金额
        str.append("<td class='number' align='right' valign='middle' >" + parseFloat(iAllWin).toFixed(2) + "&nbsp;</td>"); //输赢金额
        str.append("<td class='number' align='right' valign='middle' >" + parseFloat(iWaterBet).toFixed(2) + "&nbsp;</td>"); //洗码量
        str.append("<td class='per'  ></td>"); //洗码类型
        str.append("<td class='per' align='center' valign='middle' ></td>"); //洗码比
        str.append("<td class='number' align='right' valign='middle'>" + parseFloat(iWaterMoney).toFixed(2) + "&nbsp;</td>"); //洗码佣金
        str.append("<td class='number' align='right' valign='middle' >" + parseFloat(iUserAllWin).toFixed(2) + "&nbsp;</td>"); //总赢
        //str.append("<td class='per' align='center' valign='middle' ></td>"); //占成
        str.append("<td class='number' align='right' valign='middle' >" + parseFloat(iUserAllWin).toFixed(2) + "&nbsp;</td>"); //交公司金额
        str.append("<td width='70px' align='center' valign='middle' ></td>");
        str.append("</tr>");
        str.append("</table>");
        document.getElementById("divMyCard").innerHTML = str;
    }
    else {
        document.getElementById("divMyCard").innerHTML = "";
    }
}
/*
==================================================================

showDatesTableHead 显示下级会员单日查询表格标题，多日不需明细

==================================================================
*/
function showSubCardDateTableHead() {
    var groupID = document.getElementById("HiddenGroupID").value;
    var ssName = new Array(20);
    ssName[0] = Text(6);
    ssName[1] = Text(7);
    ssName[2] = Text(8);
    ssName[3] = Text(9);
    ssName[4] = Text(10);
    ssName[5] = Text(145);
    ssName[6] = Text(11);
    ssName[7] = Text(12);
    ssName[8] = Text(27);
    ssName[9] = Text(41);
    ssName[10] = Text(14);
    ssName[11] = Text(16);
    ssName[12] = Text(17);
    ssName[13] = Text(29);
    ssName[14] = Text(22);
    var str = new StringBulider();
    str.append("<tr >");
    str.append("<td  width='60px' height='25' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[0] + "</td>");
    str.append("<td width='60px' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[1] + "</td>");
    str.append("<td width='80px' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[12] + "</td>");
    str.append("<td width='50px' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[14] + "</td>");
    str.append("<td width='80px' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[2] + "</td>");
    str.append("<td width='80px' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[3] + "</td>");
    str.append("<td width='80px' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[4] + "</td>");
    str.append("<td width='50px' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[5] + "</td>");
    str.append("<td width='50px' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[6] + "</td>");
    str.append("<td width='80px' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[7] + "</td>");
    str.append("<td width='80px' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[8] + "</td>");
    // str.append("<td width='50px' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[9] + "</td>");
    str.append("<td width='80px' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[10] + "</td>");
    //str.append("<td width='150px' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[11] + "</td>");
    str.append("<td width='80px' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[13] + "</td>");
    str.append("</tr>");
    return str;
}
/*
==================================================================

showSubCardDetail 显示会员汇总详细

==================================================================
*/
function showTodaySubCardDetail(StrArray, iLine) {
    var Array2 = new Array(Text(23), Text(24));
    var ss = StrArray.split('##');
    var str = new StringBulider();

    if (iLine == 0) {
        str.append("<tr bgcolor='#FFE3C8' onMouseOver='this.className=\"menu_title2\";' onMouseOut='this.className=\"menu_title_out1\";'>");
    }

    if (iLine == 1) {
        str.append("<tr bgcolor='#E1E1E1' onMouseOver='this.className=\"menu_title2\";' onMouseOut='this.className=\"menu_title_out2\";'>");
    }

    str.append("<td  align='center' valign='middle' >" + Text(30) + "</td>"); //级别
    str.append("<td  align='center' valign='middle' >" + ss[0] + "</td>");  //用户名
    str.append("<td  align='center' valign='middle' >" + ss[1] + "</td>");  //别名
    str.append("<td  align='center' valign='middle' >" + getbz(ss[11]) + "</td>");  //币种
    str.append("<td class='number' align='right' valign='middle' >" + parseInt(ss[2]) + "&nbsp;</td>"); //投注金额
    str.append("<td class='number' align='right' valign='middle' >" + parseFloat(ss[3]).toFixed(2) + "&nbsp;</td>"); //输赢金额
    str.append("<td class='number' align='right' valign='middle' >" + parseFloat(ss[4]).toFixed(2) + "&nbsp;</td>"); //洗码量
    str.append("<td class='per'  >" + Array2[ss[10]] + "</td>"); //洗码类型
    str.append("<td class='per' align='center' valign='middle' >" + FormatNumber(ss[5], 2) + "%" + "</td>"); //洗码比
    str.append("<td class='number' align='right' valign='middle'>" + parseFloat(ss[6]).toFixed(2) + "&nbsp;</td>"); //洗码佣金
    str.append("<td class='number' align='right' valign='middle' >" + parseFloat(ss[7]).toFixed(2) + "&nbsp;</td>"); //总赢
    // str.append("<td class='per' align='center' valign='middle' >"+parseInt(ss[8])+"%</td>"); //占成
    str.append("<td class='number' align='right' valign='middle' >" + parseFloat(ss[9]).toFixed(2) + "&nbsp;</td>"); //交公司金额
    //str.append("<td width='150px' heitht='25px' align='center' valign='middle' ><a href=''>每日明细</a></td>"); //明细列表
    str.append("<td width='70px' align='center' valign='middle' ><input type='button' style='with:14px;height:21px;font-size:9pt;' name='imageField2' src='../images/menu_cx2.jpg' value='今日明细' onclick='MySubCardDatesSummary(\"" + ss[0] + "\",\"" + dateBegin + "\",\"" + dateEnd + "\")' ></td>");
    str.append("</tr>");

    return str;
}
//---------------------------------------------单日查询----------------------------------------------------
//单日查询成功返回处理
function queryDate(result) {
    if (result > "") {
        result = result.split('%%')
        showDateGroupSummary(result[0]);
        showDateCardSummary(result[1]);
    }

}
//---------------------------------------------多日查询------------------------------------------------------
//多日查询成功返回处理
function queryDates(result) {
    document.getElementById("query").disabled = false;
    document.getElementById("prequery").disabled = false;
    document.getElementById("thisweek").disabled = false;
    document.getElementById("Premonth").disabled = false;
    document.getElementById("Month").disabled = false;
    document.getElementById("loading").style.display = "none";
    result = result.split('@@')
    showDatesGroupSummary(result);
    showDatesCardSummary(result[2]);
    document.getElementById("divMenu").style.display = "block";

}
/*
==================================================================

showGroupSummary 显示当前群组输赢汇总

==================================================================
*/

function showDatesGroupSummary(StrArray) {
    dd = 0;
    var ss = StrArray[0].split('$$');
    var ss1 = StrArray[1];
    var str = new StringBulider();
    var groupNameID = document.getElementById("HiddenNameID").value;
    var groupID = document.getElementById("HiddenGroupID").value;
    str.append("<table width='99%' border='0' cellspacing='0' cellpadding='0'>");
    str.append("<tr><td height='32' align='left' valign='middle' class='font5'>" + Text(4) + "（" + GetGroupString(groupID.length) + groupNameID + "）</td></tr>");
    str.append("</table>");
    str.append("<table  height='26' border='0' cellpadding='0' cellspacing='1' bgcolor='#FFFFFF'>");
    str.append(showDatesTableHead());
    if (StrArray > "") {
        if (ss > "") {
            var iAllBet = 0, iAllWin = 0, iWaterBet = 0, iWaterMoney = 0, iGroupWin = 0, iCompanyMonye = 0, iforcomBet = 0, iforcomWaterBet = 0, sxhlb = 0;
            for (var i = 0; i < ss.length; i++) {
                var iLine = i % 2;
                str.append(showDatesGroupDeatil(ss[i], iLine));
                var ssGroup = ss[i].split('##');
                iAllBet += parseInt(ssGroup[3]);
                iAllWin += parseFloat(ssGroup[4]);
                iWaterBet += parseFloat(ssGroup[5]);
                iWaterMoney += parseFloat(ssGroup[7]);
                iGroupWin += parseFloat(ssGroup[8]);
                iCompanyMonye += parseFloat(ssGroup[10]);
                iforcomBet += parseFloat(ssGroup[11]); //交公司投注金额
                iforcomWaterBet += parseFloat(ssGroup[12]); //交公司洗码量
                //sxhlb += parseFloat(ssGroup[13]);
            }
            str.append("<tr bgcolor='#815F40'>");
            str.append("<td width='90px' align='center' valign='middle'>" + Text(5) + "：</td>");
            str.append("<td width='60px' align='center' valign='middle' ></td>"); //级别
            str.append("<td  align='center' valign='middle' ></td>");  //用户名
            str.append("<td  align='center' valign='middle' ></td>");  //别名
            str.append("<td class='number' align='right' valign='middle' >" + iAllBet + "&nbsp;</td>"); //投注金额
            str.append("<td class='number' align='right' valign='middle' >" + parseFloat(iAllWin).toFixed(2) + "&nbsp;</td>"); //输赢金额
            str.append("<td class='number' align='right' valign='middle' >" + parseFloat(iWaterBet).toFixed(2) + "&nbsp;</td>"); //洗码量
            //str.append("<td class='per' align='center' valign='middle'>"+Array2[ss[8]]+"</td>"); //洗码类型
            str.append("<td class='number' align='right' valign='middle' >" + parseFloat(iWaterMoney).toFixed(2) + "&nbsp;</td>"); //洗码佣金
            str.append("<td class='number' align='right' valign='middle' >" + parseFloat(iGroupWin).toFixed(2) + "&nbsp;</td>"); //股东总赢
            str.append("<td class='number' align='right' valign='middle' >" + parseFloat(iCompanyMonye).toFixed(2) + "&nbsp;</td>"); //交公司金额
            //str.append("<td class='per' align='center' valign='middle' >"+ss[10]+"</td>"); //获利比
            str.append("<td class='number' align='right' valign='middle' >" + parseFloat(iforcomBet).toFixed(2) + "</td>");  //交公司投注金额
            str.append("<td class='number' align='right' valign='middle' >" + parseFloat(iforcomWaterBet).toFixed(2) + "</td>");  //交公司洗码量
            str.append("<td class='number' align='right' valign='middle' ></td>"); //公司获利比
            str.append("<td width='60px' height='25px' align='center' valign='middle' ></td>"); //明细列表
            str.append("</tr>");

        }
        if (ss1 > "") {
            showDatesSubGroupSummary(ss1);
        }
        else {
            document.getElementById("divSubAccount").innerHTML = "";
        }
    }
    else {
        document.getElementById("divSubAccount").innerHTML = "";
        document.getElementById("divMyCard").innerHTML = "";
    }
    str.append("</table>");
    document.getElementById("divMyAccount").innerHTML = str;
}
/*
==================================================================

showDatesTableHead 显示多日查询表格标题，多日不需洗码比

==================================================================
*/
function showDatesTableHead() {
    var groupID = document.getElementById("HiddenGroupID").value;
    var ssName = new Array(20);
    ssName[0] = Text(6);
    ssName[1] = Text(7);
    ssName[2] = Text(8);
    ssName[3] = Text(9);
    ssName[4] = Text(10);
    ssName[5] = Text(145);
    ssName[6] = Text(12);
    ssName[7] = GetGroupString(groupID.length) + Text(13);
    ssName[8] = Text(14);
    ssName[9] = Text(15);
    ssName[10] = Text(16);
    ssName[11] = Text(17);
    ssName[12] = Text(18);
    ssName[13] = Text(19);
    ssName[14] = "类型";
    var str = new StringBulider();
    str.append("<tr >");
    str.append("<td  width='60px'  height='25' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[14] + "</td>");
    str.append("<td  width='60px'  height='25' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[0] + "</td>");
    str.append("<td width='60px' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[1] + "</td>");
    str.append("<td width='80px' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[11] + "</td>");
    str.append("<td width='80px' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[2] + "</td>");
    str.append("<td width='80px' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[3] + "</td>");
    str.append("<td width='80px' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[4] + "</td>");
    //str.append("<td width='50px' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[5] + "</td>");
    str.append("<td width='80px' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[6] + "</td>");
    str.append("<td width='80px' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[7] + "</td>");
    str.append("<td width='80px' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[8] + "</td>");
    str.append("<td width='100px' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[12] + "</td>");
    str.append("<td width='80px' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[13] + "</td>");
    str.append("<td width='80px' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[9] + "</td>");
    str.append("<td width='70px' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[10] + "</td>");
    str.append("</tr>");
    return str;
}
/*
==================================================================

showDatesSubGroupTableHead 显示下级子群组多日查询表格标题，多日不需洗码比

==================================================================
*/
function showDatesSubGroupTableHead() {
    var groupID = document.getElementById("HiddenGroupID").value;
    var ssName = new Array(20);
    ssName[0] = Text(6);
    ssName[1] = Text(7);
    ssName[2] = Text(8);
    ssName[3] = Text(9);
    ssName[4] = Text(10);
    ssName[5] = Text(145);
    ssName[6] = Text(12);
    ssName[7] = GetGroupString(groupID.length) + Text(13);
    ssName[8] = Text(14);
    ssName[9] = Text(15);
    ssName[10] = Text(21);
    ssName[11] = Text(17);
    ssName[12] = Text(18);
    ssName[13] = Text(19);
    ssName[14] = Text(22);
    var str = new StringBulider();
    str.append("<tr >");
    str.append("<td  width='60px'  height='25' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[0] + "</td>");
    str.append("<td width='60px' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[1] + "</td>");
    str.append("<td width='80px' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[11] + "</td>");
    str.append("<td width='50px' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[14] + "</td>");
    str.append("<td width='80px' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[2] + "</td>");
    str.append("<td width='80px' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[3] + "</td>");
    str.append("<td width='80px' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[4] + "</td>");
    //str.append("<td width='50px' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[5] + "</td>");
    str.append("<td width='80px' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[6] + "</td>");
    str.append("<td width='100px' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[7] + "</td>");
    str.append("<td width='80px' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[8] + "</td>");
    str.append("<td width='100px' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[12] + "</td>");
    str.append("<td width='80px' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[13] + "</td>");
    str.append("<td width='80px' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[9] + "</td>");
    str.append("<td width='60px' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[10] + "</td>");
    str.append("<td width='90px' align='center' valign='middle' background='../images/tabbg.jpg'></td>");
    str.append("</tr>");
    return str;
}
/*
==================================================================

showDatesGroupDeatil 显示多日查询本群汇总详细，多日不需洗码比

==================================================================
*/
function showDatesGroupDeatil(StrArray, iLine) {
    var Array2 = new Array(Text(23), Text(24));
    var ss = StrArray.split('##');
    var str = new StringBulider();
    if (iLine == 0) {
        str.append("<tr bgcolor='#FFE3C8' onMouseOver='this.className=\"menu_title2\";' onMouseOut='this.className=\"menu_title_out1\";'>");
        str.append("<td  align='center' valign='middle' >" + game(ss[15]) + "</td>");
        str.append("<td  align='center' valign='middle' >" + GetGroupString(ss[0].length) + "</td>"); //级别
        str.append("<td  align='center' valign='middle' >" + ss[1] + "</td>");  //用户名
        str.append("<td  align='center' valign='middle' >" + ss[2] + "</td>");  //别名
        str.append("<td class='number' align='right' valign='middle' >" + parseInt(ss[3]) + "&nbsp;</td>"); //投注金额
        str.append("<td class='number' align='right' valign='middle'>" + parseFloat(ss[4]).toFixed(2) + "&nbsp;</td>"); //输赢金额
        str.append("<td class='number' align='right' valign='middle' >" + parseFloat(ss[5]).toFixed(2) + "&nbsp;</td>"); //洗码量
        // str.append("<td class='per' align='center' valign='middle' >"+Array2[ss[14]]+"</td>"); //洗码类型
        str.append("<td class='number' align='right' valign='middle' >" + parseFloat(ss[7]).toFixed(2) + "&nbsp;</td>"); //洗码佣金
        str.append("<td class='number' align='right' valign='middle' >" + parseFloat(ss[8]).toFixed(2) + "&nbsp;</td>"); //股东总赢
        str.append("<td class='number' align='right' valign='middle' >" + parseFloat(ss[10]).toFixed(2) + "&nbsp;</td>"); //交公司金额
        str.append("<td class='number' align='right' valign='middle' >" + parseFloat(ss[11]).toFixed(2) + "</td>");  //交公司投注金额
        str.append("<td class='number' align='right' valign='middle' >" + parseFloat(ss[12]).toFixed(2) + "</td>");  //交公司洗码量
        if (ss[13] < 0) {
            str.append("<td style='color:red' align='right' valign='middle' >" + ss[13] + "%" + "&nbsp;</td>"); //公司获利比
        }
        else {
            str.append("<td style='color:blue' align='right' valign='middle' >" + ss[13] + "%" + "&nbsp;</td>"); //公司获利比
        }
        str.append("<td width='150px' height='25px' align='center' valign='middle' >");
        if (dd == 0) {
            str.append("<input type='button' style='with:14px;height:21px;font-size:9pt;' name='imageField2' src='../images/menu_cx2.jpg' value='Text(35)' onclick='MyDatesSummary(\"" + ss[0] + "\",\"" + dateBegin + "\",\"" + dateEnd + "\",\"" + ss[1] + "\")'>");
            dd++;
        }
        str.append("</td>"); //明细列表
        str.append("</tr>");
    }
    if (iLine == 1) {
        str.append("<tr bgcolor='#E1E1E1' onMouseOver='this.className=\"menu_title2\";' onMouseOut='this.className=\"menu_title_out2\";'>");
        str.append("<td  align='center' valign='middle' >" + game(ss[15]) + "</td>");
        str.append("<td  align='center' valign='middle' >" + GetGroupString(ss[0].length) + "</td>"); //级别
        str.append("<td  align='center' valign='middle' >" + ss[1] + "</td>");  //用户名
        str.append("<td  align='center' valign='middle' >" + ss[2] + "</td>");  //别名
        str.append("<td class='number' align='right' valign='middle' >" + parseInt(ss[3]) + "&nbsp;</td>"); //投注金额
        str.append("<td class='number' align='right' valign='middle'>" + parseFloat(ss[4]).toFixed(2) + "&nbsp;</td>"); //输赢金额
        str.append("<td class='number' align='right' valign='middle' >" + parseFloat(ss[5]).toFixed(2) + "&nbsp;</td>"); //洗码量
        // str.append("<td class='per' align='center' valign='middle' >"+Array2[ss[14]]+"</td>"); //洗码类型
        str.append("<td class='number' align='right' valign='middle' >" + parseFloat(ss[7]).toFixed(2) + "&nbsp;</td>"); //洗码佣金
        str.append("<td class='number' align='right' valign='middle' >" + parseFloat(ss[8]).toFixed(2) + "&nbsp;</td>"); //股东总赢
        str.append("<td class='number' align='right' valign='middle' >" + parseFloat(ss[10]).toFixed(2) + "&nbsp;</td>"); //交公司金额
        str.append("<td class='number' align='right' valign='middle' >" + parseFloat(ss[11]).toFixed(2) + "</td>");  //交公司投注金额
        str.append("<td class='number' align='right' valign='middle' >" + parseFloat(ss[12]).toFixed(2) + "</td>");  //交公司洗码量
        if (ss[13] < 0) {
            str.append("<td style='color:red' align='right' valign='middle' >" + ss[13] + "%" + "&nbsp;</td>"); //公司获利比
        }
        else {
            str.append("<td style='color:blue' align='right' valign='middle' >" + ss[13] + "%" + "&nbsp;</td>"); //公司获利比
        }
        str.append("<td width='150px' height='25px' align='center' valign='middle' ></td>"); //明细列表
        str.append("</tr>");
    }
    return str;
}
var szname;
function MyDatesSummary(GroupID, dateBegin, dateEnd, name) {
    var GroupID = GroupID;
    isgd = GroupID.length;
    dateBegin = dateBegin;
    dateEnd = dateEnd;
    szname = name;
    var arys = new Array();
    var str = dateEnd;
    arys = str.split('-');
    var myDate = new Date(arys[0], parseInt(arys[1] - 1), arys[2]);
    myDate = dateAdd(myDate, "d", -1);
    var cbo = new CallBackObject();
    cbo.OnComplete = ShowMyDatesSummary;
    cbo.DoCallBack("AjaxDb.aspx?PageName=MyDatesSummary&GroupID=" + GroupID + "&BeginDate=" + dateBegin + "&EndDate=" + format(myDate, "yyyy-MM-DD") + "&type=" + timetype);
}
/*
==================================================================

显示代理每日明细

==================================================================
*/
function ShowMyDatesSummary(StrArray) {
    var ss = StrArray.split('$$');
    var str = new StringBulider();
    str.append("<table width='840px' border='0' cellspacing='0' cellpadding='0'>");
    str.append("<tr><td height='25px' width='800' align='left' valign='middle' class='font5'" + Text(4) + "-" + szname + Text(36) + dateBegin + Text(37) + dateEnd + "每日明细</td><td width='40px' align='left'><input type='button' class='but1' value='" + Text(38) + "' onclick='back()'></td></tr>");
    str.append("</table>");
    str.append("<table width='1000px'  border='0' cellpadding='0' cellspacing='1' bgcolor='#FFFFFF'>");
    str.append(showTableGroupHead());
    if (ss > "") {
        for (var i = 0; i < ss.length; i++) {
            var iLine = i % 2;
            str.append(showDeatil(ss[i], iLine));
        }
    }
    str.append("</table>");
    document.getElementById("sybb").style.display = "none";
    document.getElementById("MyDatesSummary").style.display = "block"
    document.getElementById("MyDatesSummary").innerHTML = str;
}
function back() {
    document.getElementById("sybb").style.display = "block";
    document.getElementById("MyDatesSummary").style.display = "none";
    document.getElementById('MyDatesSummary').innerHTML = "";
}
/*
==================================================================

代理每日明细-表头

==================================================================
*/
function showTableGroupHead() {
    var ssName = new Array(20);
    ssName[0] = Text(39);
    ssName[1] = Text(6);
    ssName[2] = Text(7);
    ssName[3] = Text(8);
    ssName[4] = Text(9);
    ssName[5] = Text(10);
    ssName[6] = Text(40);
    ssName[7] = Text(11);
    ssName[8] = Text(12);
    ssName[9] = Text(13);
    ssName[10] = Text(41);
    ssName[11] = Text(14);
    ssName[12] = Text(18);
    ssName[13] = Text(19);
    ssName[14] = Text(42);
    var str = new StringBulider();
    str.append("<tr height='25px' >");
    str.append("<td  width='80px' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[0] + "</td>");
    str.append("<td width='60px' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[1] + "</td>");
    str.append("<td width='60px' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[2] + "</td>");
    str.append("<td width='80px' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[3] + "</td>");
    str.append("<td width='80px' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[4] + "</td>");
    str.append("<td width='80px' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[5] + "</td>");
    if (isgd > 6) {
        str.append("<td width='60px' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[6] + "</td>");
        str.append("<td width='50px' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[7] + "</td>");
    }
    str.append("<td width='80px' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[8] + "</td>");
    str.append("<td width='80px' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[9] + "</td>");
    if (isgd > 6) {
        str.append("<td width='50px' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[10] + "</td>");
    }
    str.append("<td width='80px' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[11] + "</td>");
    str.append("<td width='100px' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[12] + "</td>");
    str.append("<td width='90px' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[13] + "</td>");
    if (timetype == 2) {
        str.append("<td width='60px' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[14] + "</td>");
    }
    str.append("</tr>");
    return str;
}
/*
==================================================================

代理每日明细 -汇总详细

==================================================================
*/
function showDeatil(StrArray, iLine) {
    var ss = StrArray.split('##');
    var datestr = ss[0].replace(" 00:00:00", "")
    var Array2 = new Array(Text(23), Text(24));
    var str = new StringBulider();

    if (iLine == 0) {
        str.append("<tr bgcolor='#FFE3C8' onMouseOver='this.className=\"menu_title2\";' onMouseOut='this.className=\"menu_title_out1\";'>");
    }

    if (iLine == 1) {
        str.append("<tr bgcolor='#E1E1E1' onMouseOver='this.className=\"menu_title2\";' onMouseOut='this.className=\"menu_title_out2\";'>");
    }

    str.append("<td align='center' valign='middle' >" + datestr + "</td>"); //日期
    str.append("<td class='text' align='center' valign='middle'>" + GetGroupString(ss[1].length) + "</td>");  //级  别
    str.append("<td class='text' align='center' valign='middle' >" + ss[2] + "</td>"); //用户名
    str.append("<td class='number' align='right' valign='middle' >" + parseInt(ss[3]) + "&nbsp;</td>"); //投注金额
    str.append("<td class='number' align='right' valign='middle' >" + parseFloat(ss[4]).toFixed(2) + "&nbsp;</td>"); //输赢金额
    str.append("<td class='number' align='right' valign='middle' >" + parseFloat(ss[5]).toFixed(2) + "&nbsp;</td>"); //洗码量
    if (isgd > 6) {
        str.append("<td class='per' align='center' valign='middle' >" + Array2[ss[6]] + "</td>"); //洗码类别
        str.append("<td class='per' align='center' valign='middle' >" + ss[7] + "%" + "</td>"); //洗码比
    }
    str.append("<td class='number' align='right' valign='middle' >" + parseFloat(ss[8]).toFixed(2) + "&nbsp;</td>"); //洗码佣金
    str.append("<td class='number' align='right' valign='middle' >" + parseFloat(ss[9]).toFixed(2) + "&nbsp;</td>"); //股东总赢
    if (isgd > 6) {
        str.append("<td class='per' align='center' valign='middle' >" + ss[10] * 100 + "%" + "</td>"); //占成
    }
    str.append("<td class='number' align='right' valign='middle' >" + parseFloat(ss[11]).toFixed(2) + "</td>"); //交公司金额
    str.append("<td class='number' align='right' valign='middle' >" + parseFloat(ss[12]).toFixed(2) + "</td>"); //交公司投注金额
    str.append("<td class='number' align='right' valign='middle' >" + parseFloat(ss[13]).toFixed(2) + "</td>"); //交公司洗码量
    if (timetype == 2) {
        str.append("<td class='number' align='right' valign='middle' >" + ss[14] + "</td>"); //交公司洗码量
    }
    str.append("</tr>");



    return str;
}
/*
==================================================================

showDatesSubGroupSummary 显示多日下级群组输赢汇总

==================================================================
*/
function showDatesSubGroupSummary(ss) {
    var aa = ss.split('$$');
    var str = new StringBulider();
    str.append("<table width='99%' border='0' cellspacing='0' cellpadding='0'>");
    str.append("<tr><td height='32' align='left' valign='middle' class='font5'>直属代理商明细</td></tr>");
    str.append("</table>");
    str.append("<table  height='26' border='0' cellpadding='0' cellspacing='1' bgcolor='#FFFFFF'>");
    str.append(showDatesSubGroupTableHead());
    var iAllBet = 0, iAllWin = 0, iWaterBet = 0, iWaterMoney = 0, iGroupWin = 0, iCompanyMonye = 0, iforcomBet = 0, iforcomWaterBet = 0, sxhlb = 0;
    for (var i = 0; i < aa.length; i++) {
        var iLine = i % 2;
        str.append(showDatesSubGroupDetail(aa[i], iLine));
        var ssGroup = aa[i].split('##');
        iAllBet += parseInt(ssGroup[3]);
        iAllWin += parseFloat(ssGroup[4]);
        iWaterBet += parseFloat(ssGroup[5]);
        iWaterMoney += parseFloat(ssGroup[7]);
        iGroupWin += parseFloat(ssGroup[8]);
        iCompanyMonye += parseFloat(ssGroup[10]);
        iforcomBet += parseFloat(ssGroup[11]); //交公司投注金额
        iforcomWaterBet += parseFloat(ssGroup[12]); //交公司洗码量
        //sxhlb += parseFloat(ssGroup[13]);
    }
    str.append("<tr bgcolor='#815F40'>");
    str.append("<td width='60px' align='center' valign='middle' >" + Text(5) + "：</td>"); //级别
    str.append("<td  align='center' valign='middle' ></td>");  //用户名
    str.append("<td  align='center' valign='middle' ></td>");  //别名
    str.append("<td  align='center' valign='middle' ></td>");  //币种
    str.append("<td class='number' align='right' valign='middle' >" + iAllBet + "&nbsp;</td>"); //投注金额
    str.append("<td class='number' align='right' valign='middle' >" + parseFloat(iAllWin).toFixed(2) + "&nbsp;</td>"); //输赢金额
    str.append("<td class='number' align='right' valign='middle' >" + parseFloat(iWaterBet).toFixed(2) + "&nbsp;</td>"); //洗码量
    //str.append("<td class='per' align='center' valign='middle'>"+Array2[ss[8]]+"</td>"); //洗码类型
    str.append("<td class='number' align='right' valign='middle' >" + parseFloat(iWaterMoney).toFixed(2) + "&nbsp;</td>"); //洗码佣金
    str.append("<td class='number' align='right' valign='middle' >" + parseFloat(iGroupWin).toFixed(2) + "&nbsp;</td>"); //股东总赢
    str.append("<td class='number' align='right' valign='middle' >" + parseFloat(iCompanyMonye).toFixed(2) + "&nbsp;</td>"); //交公司金额
    str.append("<td class='number' align='right' valign='middle' >" + parseFloat(iforcomBet).toFixed(2) + "</td>");  //交公司投注金额
    str.append("<td class='number' align='right' valign='middle' >" + parseFloat(iforcomWaterBet).toFixed(2) + "</td>");  //交公司洗码量
    str.append("<td class='number' align='right' valign='middle' >" + parseFloat(iCompanyMonye / iforcomBet * 100).toFixed(2) + "%</td>"); //公司获利比
    str.append("<td width='60px' height='25px' align='center' valign='middle' ></td>"); //明细列表
    str.append("<td width='90px' align='center' valign='middle'></td>"); //空白
    str.append("</tr>");
    str.append("</table>");
    document.getElementById("divSubAccount").innerHTML = str;
}
/*
==================================================================

showDatesSubGroupDetail 显示多日查询下级群组汇总详细，多日不需洗码比

==================================================================
*/
function showDatesSubGroupDetail(StrArray, iLine) {
    var Array2 = new Array(Text(23), Text(24));
    var ss = StrArray.split('##');
    var str = new StringBulider();

    if (iLine == 0) {
        str.append("<tr bgcolor='#FFE3C8' onMouseOver='this.className=\"menu_title2\";' onMouseOut='this.className=\"menu_title_out1\";'>");
    }

    if (iLine == 1) {
        str.append("<tr bgcolor='#E1E1E1' onMouseOver='this.className=\"menu_title2\";' onMouseOut='this.className=\"menu_title_out2\";'>");
    }

    str.append("<td width='60px' align='center' valign='middle' >" + GetGroupString(ss[0].length) + "</td>"); //级别
    str.append("<td  align='center' valign='middle' >" + ss[1] + "</td>");  //用户名
    str.append("<td  align='center' valign='middle' >" + ss[2] + "</td>");  //别名
    str.append("<td  align='center' valign='middle' >" + getbz(ss[15]) + "</td>");  //币种
    str.append("<td class='number' align='right' valign='middle' >" + parseInt(ss[3]) + "&nbsp;</td>"); //投注金额
    str.append("<td class='number' align='right' valign='middle' >" + parseFloat(ss[4]).toFixed(2) + "&nbsp;</td>"); //输赢金额
    str.append("<td class='number' align='right' valign='middle' >" + parseFloat(ss[5]).toFixed(2) + "&nbsp;</td>"); //洗码量
    //str.append("<td class='per' align='center' valign='middle'>"+Array2[ss[8]]+"</td>"); //洗码类型
    str.append("<td class='number' align='right' valign='middle' >" + parseFloat(ss[7]).toFixed(2) + "&nbsp;</td>"); //洗码佣金
    str.append("<td class='number' align='right' valign='middle' >" + parseFloat(ss[8]).toFixed(2) + "&nbsp;</td>"); //股东总赢
    str.append("<td class='number' align='right' valign='middle' >" + parseFloat(ss[10]).toFixed(2) + "&nbsp;</td>"); //交公司金额
    str.append("<td width='90px' align='right' valign='middle' >" + parseFloat(ss[11]).toFixed(2) + "</td>");  //交公司投注金额
    str.append("<td class='80px' align='right' valign='middle' >" + parseFloat(ss[12]).toFixed(2) + "</td>");  //交公司洗码量
    if (ss[13] < 0) {
        str.append("<td style='color:red' align='right' valign='middle' >" + ss[13] + "%" + "&nbsp;</td>"); //公司获利比
    }
    else {
        str.append("<td style='color:blue' align='right' valign='middle' >" + ss[13] + "%" + "&nbsp;</td>"); //公司获利比
    }

    str.append("<td width='60px' height='25px' align='center' valign='middle' ><input type='button' style='with:14px;height:21px;font-size:9pt;' name='imageField2' src='../images/menu_cx2.jpg' value='查询' onclick='listQuery(\"" + ss[0] + "\",\"" + ss[1] + "\")' /></td>"); //明细列表
    str.append("<td width='90px' align='center' valign='middle'></td>"); //空白
    str.append("</tr>");


    return str;
}
/*
==================================================================

showCardSummary 显示多日会员输赢汇总

==================================================================
*/
function showDatesCardSummary(StrArray) {
    if (StrArray > "") {
        var ss = StrArray.split('$$');
        var str = new StringBulider();
        str.append("<table width='99%' border='0' cellspacing='0' cellpadding='0'>");
        str.append("<tr><td height='32' align='left' valign='middle' class='font5'>" + Text(26) + "</td></tr>");
        str.append("</table>");
        str.append("<table  height='26' border='0' cellpadding='0' cellspacing='1' bgcolor='#FFFFFF'>");
        str.append(showSubCardDatesTableHead());
        var iAllBet = 0, iAllWin = 0, iWaterBet = 0, iWaterMoney = 0, iUserAllWin = 0, cardwin = 0, paycompany = 0;
        for (var i = 0; i < ss.length; i++) {
            var iLine = i % 2;
            str.append(showDatesSubCardDetail(ss[i], iLine));
            var ssCard = ss[i].split('##');
            iAllBet += parseInt(ssCard[2]);
            iAllWin += parseFloat(ssCard[3]);
            iWaterBet += parseFloat(ssCard[4]);
            iWaterMoney += parseFloat(ssCard[6]);
            cardwin += parseFloat(ssCard[7]);
            //paycompany += parseInt(ssCard[9]);
        }
        str.append("<tr bgcolor='#815F40'>");
        str.append("<td  align='center' valign='middle' >" + Text(5) + "：</td>"); //级别
        str.append("<td  align='center' valign='middle' ></td>");  //用户名
        str.append("<td  align='center' valign='middle' ></td>");  //别名
        str.append("<td  align='center' valign='middle' ></td>");  //别名
        str.append("<td class='number' align='right' valign='middle' >" + iAllBet + "&nbsp;</td>"); //投注金额
        str.append("<td class='number' align='right' valign='middle' >" + parseFloat(iAllWin).toFixed(2) + "&nbsp;</td>"); //输赢金额
        str.append("<td class='number' align='right' valign='middle' >" + parseFloat(iWaterBet).toFixed(2) + "&nbsp;</td>"); //洗码量
        str.append("<td class='number' align='right' valign='middle'>" + parseFloat(iWaterMoney).toFixed(2) + "&nbsp;</td>"); //洗码佣金
        str.append("<td class='number' align='right' valign='middle' >" + parseFloat(cardwin).toFixed(2) + "&nbsp;</td>"); //总赢
        //var forCompany=(parseFloat(ss[6])+parseFloat(ss[18]))*parseFloat(ss[16]);
        //str.append("<td class='per' align='right' valign='middle' ></td>"); //占成
        str.append("<td class='number' align='right' valign='middle' >" + parseFloat(cardwin).toFixed(2) + "&nbsp;</td>"); //交公司金额
        str.append("<td width='90px' align='center' valign='middle'></td>"); //空白
        str.append("</tr>");

        str.append("</table>");
        document.getElementById("divMyCard").innerHTML = str;
    }
    else {
        document.getElementById("divMyCard").innerHTML = "";
    }
}
/*
==================================================================

showDatesTableHead 显示下级会员多日查询表格标题，多日不需明细

==================================================================
*/
function showSubCardDatesTableHead() {
    var groupID = document.getElementById("HiddenGroupID").value;
    var ssName = new Array(20);
    ssName[0] = Text(6);
    ssName[1] = Text(7);
    ssName[2] = Text(8);
    ssName[3] = Text(9);
    ssName[4] = Text(10);
    ssName[5] = Text(145);
    ssName[6] = Text(12);
    ssName[7] = Text(27);
    ssName[8] = Text(41);
    ssName[9] = Text(14);
    ssName[11] = Text(17);
    ssName[12] = Text(16);
    ssName[13] = Text(22);
    var str = new StringBulider();
    str.append("<tr >");
    str.append("<td  width='60px'  height='25' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[0] + "</td>");
    str.append("<td width='60px' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[1] + "</td>");
    str.append("<td width='80px' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[11] + "</td>");
    str.append("<td width='50px' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[13] + "</td>");
    str.append("<td width='80px' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[2] + "</td>");
    str.append("<td width='80px' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[3] + "</td>");
    str.append("<td width='80px' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[4] + "</td>");
    //str.append("<td width='50px' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[5] + "</td>");
    str.append("<td width='80px' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[6] + "</td>");
    str.append("<td width='80px' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[7] + "</td>");
    //str.append("<td width='50px' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[8] + "</td>");
    str.append("<td width='90px' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[9] + "</td>");
    //str.append("<td width='150px' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[10] + "</td>");
    str.append("<td width='90px' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[12] + "</td>");
    str.append("</tr>");
    return str;
}
/*
==================================================================

showDatesSubCardDetail 显示多日查询会员汇总详细，多日不需洗码比

==================================================================
*/
function showDatesSubCardDetail(StrArray, iLine) {
    var Array2 = new Array(Text(23), Text(24));
    var ss = StrArray.split('##');
    var str = new StringBulider();
    if (iLine == 0) {
        str.append("<tr bgcolor='#FFE3C8' onMouseOver='this.className=\"menu_title2\";' onMouseOut='this.className=\"menu_title_out1\";'>");
        str.append("<td  align='center' valign='middle' >" + Text(30) + "</td>"); //级别
        str.append("<td  align='center' valign='middle' >" + ss[0] + "</td>");  //用户名
        str.append("<td  align='center' valign='middle' >" + ss[1] + "</td>");  //别名
        str.append("<td  align='center' valign='middle' >" + getbz(ss[11]) + "</td>");  //币种
        str.append("<td class='number' align='right' valign='middle' >" + parseInt(ss[2]) + "&nbsp;</td>"); //投注金额
        str.append("<td class='number' align='right' valign='middle' >" + parseFloat(ss[3]).toFixed(2) + "&nbsp;</td>"); //输赢金额
        str.append("<td class='number' align='right' valign='middle' >" + parseFloat(ss[4]).toFixed(2) + "&nbsp;</td>"); //洗码量
        //str.append("<td class='per' align='center' valign='middle' >"+Array2[ss[9]]+"</td>"); //洗码类型
        str.append("<td class='number' align='right' valign='middle'>" + parseFloat(ss[6]).toFixed(2) + "&nbsp;</td>"); //洗码佣金
        str.append("<td class='number' align='right' valign='middle' >" + parseFloat(ss[7]).toFixed(2) + "&nbsp;</td>"); //总赢
        //var forCompany=(parseFloat(ss[6])+parseFloat(ss[18]))*parseFloat(ss[16]);
        // str.append("<td class='per' align='right' valign='middle' >0%</td>"); //占成
        str.append("<td class='number' align='right' valign='middle' >" + parseFloat(ss[9]).toFixed(2) + "&nbsp;</td>"); //交公司金额
        str.append("<td width='90px' align='center' valign='middle'><input type='button' style='with:14px;height:21px;font-size:9pt;' name='imageField2' src='../images/menu_cx2.jpg' value='Text(35)' onclick='MySubCardDatesSummary(\"" + ss[0] + "\",\"" + dateBegin + "\",\"" + dateEnd + "\")' ></td>"); //空白
        str.append("</tr>");
    }
    if (iLine == 1) {
        str.append("<tr bgcolor='#E1E1E1' onMouseOver='this.className=\"menu_title2\";' onMouseOut='this.className=\"menu_title_out2\";'>");
        str.append("<td  align='center' valign='middle' >" + Text(30) + "</td>"); //级别
        str.append("<td  align='center' valign='middle' >" + ss[0] + "</td>");  //用户名
        str.append("<td  align='center' valign='middle' >" + ss[1] + "</td>");  //别名
        str.append("<td  align='center' valign='middle' >" + getbz(ss[11]) + "</td>");  //币种
        str.append("<td class='number' align='right' valign='middle' >" + parseInt(ss[2]) + "&nbsp;</td>"); //投注金额
        str.append("<td class='number' align='right' valign='middle' >" + parseFloat(ss[3]).toFixed(2) + "&nbsp;</td>"); //输赢金额
        str.append("<td class='number' align='right' valign='middle' >" + parseFloat(ss[4]).toFixed(2) + "&nbsp;</td>"); //洗码量
        //str.append("<td class='per' align='center' valign='middle' >"+Array2[ss[9]]+"</td>"); //洗码类型
        str.append("<td class='number' align='right' valign='middle'>" + parseFloat(ss[6]).toFixed(2) + "&nbsp;</td>"); //洗码佣金
        str.append("<td class='number' align='right' valign='middle' >" + parseFloat(ss[7]).toFixed(2) + "&nbsp;</td>"); //总赢
        //var forCompany=(parseFloat(ss[6])+parseFloat(ss[18]))*parseFloat(ss[16]);
        // str.append("<td class='per' align='right' valign='middle' >0%</td>"); //占成
        str.append("<td class='number' align='right' valign='middle' >" + parseFloat(ss[9]).toFixed(2) + "&nbsp;</td>"); //交公司金额
        str.append("<td width='90px' align='center' valign='middle'><input type='button' style='with:14px;height:21px;font-size:9pt;' name='imageField2' src='../images/menu_cx2.jpg' value='每日明细' onclick='MySubCardDatesSummary(\"" + ss[0] + "\",\"" + dateBegin + "\",\"" + dateEnd + "\")' ></td>"); //空白
        str.append("</tr>");
    }
    return str;
}
function MySubCardDatesSummary(GroupID, dateBegin, dateEnd) {
    var GroupID = GroupID;
    dateBegin = dateBegin;
    dateEnd = dateEnd;
    var arys = new Array();
    var str = dateEnd;
    arys = str.split('-');
    var myDate = new Date(arys[0], parseInt(arys[1] - 1), arys[2]);
    myDate = dateAdd(myDate, "d", -1);
    var cbo = new CallBackObject();
    cbo.OnComplete = showMySubCardDateDetail;
    cbo.DoCallBack("AjaxDb.aspx?PageName=showMySubCardDateDetail&GroupID=" + GroupID + "&BeginDate=" + dateBegin + "&EndDate=" + format(myDate, "yyyy-MM-DD"));
}
function showMySubCardDateDetail(StrArray) {
    var ss = StrArray.split('$$');
    var str = new StringBulider();
    str.append("<table width='80%' border='0' cellspacing='0' cellpadding='0'>");
    str.append("<tr><td height='25px' align='left' valign='middle' class='font5'>" + Text(44) + "" + dateBegin + Text(37) + dateEnd + Text(45) + "</td><td><input type='button' class='but1' value='" + Text(38) + "' onclick='back1()'></td></tr>");
    str.append("</table>");
    str.append("<table   border='0' cellpadding='0' cellspacing='1' bgcolor='#FFFFFF'>");
    str.append(showSubCardTableHead());
    if (StrArray > "") {
        for (var i = 0; i < ss.length; i++) {
            var iLine = i % 2;
            str.append(showSubCardDeatil(ss[i], iLine));
        }
        str.append("</table>");
    }
    document.getElementById('sybb').style.display = "none";
    document.getElementById('MyDatesSummary').style.display = "block";
    document.getElementById('MyDatesSummary').innerHTML = str;

}
function back1() {
    document.getElementById('sybb').style.display = "block";
    document.getElementById('MyDatesSummary').style.display = "none";
    document.getElementById('MyDatesSummary').innerHTML = "";
}
function showSubCardTableHead() {
    var ssName = new Array(20);
    ssName[0] = Text(39);
    ssName[1] = Text(6);
    ssName[2] = Text(7);
    ssName[3] = Text(8);
    ssName[4] = Text(9);
    ssName[5] = Text(10);
    ssName[6] = Text(145);
    ssName[7] = Text(11);
    ssName[8] = Text(12);
    ssName[9] = Text(27);
    ssName[10] = Text(14);
    ssName[11] = Text(47);
    ssName[12] = Text(16);
    var str = new StringBulider();
    str.append("<tr height='25px' >");
    str.append("<td  width='120px' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[0] + "</td>");
    str.append("<td width='60px' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[1] + "</td>");
    str.append("<td width='60px' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[2] + "</td>");
    str.append("<td width='80px' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[3] + "</td>");
    str.append("<td width='80px' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[4] + "</td>");
    str.append("<td width='80px' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[5] + "</td>");
    str.append("<td width='50px' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[6] + "</td>");
    str.append("<td width='50px' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[7] + "</td>");
    str.append("<td width='80px' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[8] + "</td>");
    str.append("<td width='80px' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[9] + "</td>");
    str.append("<td width='100px' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[12] + "</td>");
    //str.append("<td width='80px' align='center' valign='middle' background='../images/tabbg.jpg'>" + ssName[11] + "</td>");
    str.append("</tr>");
    return str;
}
function showSubCardDeatil(StrArray, iLine) {
    var ss = StrArray.split('##');
    //var datestr = ss[0].replace(" 00:00:00", "")
    var Array2 = new Array(Text(23), Text(24));
    var str = new StringBulider();

    if (iLine == 0) {
        str.append("<tr bgcolor='#FFE3C8' onMouseOver='this.className=\"menu_title2\";' onMouseOut='this.className=\"menu_title_out1\";'>");
    }

    if (iLine == 1) {
        str.append("<tr bgcolor='#E1E1E1' onMouseOver='this.className=\"menu_title2\";' onMouseOut='this.className=\"menu_title_out2\";'>");
    }

    str.append("<td  align='center' valign='middle' >" + ss[0] + "</td>"); //日期
    str.append("<td class='text' align='center' valign='middle' >" + Text(30) + "</td>");  //级  别
    str.append("<td class='text' align='center' valign='middle' >" + ss[2] + "</td>"); //用户名
    str.append("<td class='number' align='right' valign='middle' >" + parseInt(ss[3]) + "&nbsp;</td>"); //投注金额
    str.append("<td class='number' align='right' valign='middle' >" + parseFloat(ss[4]).toFixed(2) + "&nbsp;</td>"); //输赢金额
    str.append("<td class='number' align='right' valign='middle' >" + parseFloat(ss[5]).toFixed(2) + "&nbsp;</td>"); //洗码量
    str.append("<td class='per' align='center' valign='middle' >" + Array2[ss[6]] + "</td>"); //洗码类别
    str.append("<td class='per' align='center' valign='middle' >" + FormatNumber(ss[7], 2) + "%" + "</td>"); //洗码比
    str.append("<td class='number' align='right' valign='middle' >" + parseFloat(ss[8]).toFixed(2) + "&nbsp;</td>"); //洗码佣金
    str.append("<td class='number' align='right' valign='middle' >" + parseFloat(ss[9]).toFixed(2) + "&nbsp;</td>"); //股东总赢
    str.append("<td class='text' align='center' valign='middle' ><input type='button' style='with:14px;height:21px;font-size:9pt;' name='imageField2' src='../images/menu_cx2.jpg' value='交易明细' onclick='queryPlayList(\"" + ss[2] + "\",\"" + ss[0] + "\",\"" + ss[0] + "\")' ></td>");
    //str.append("<td class='per' align='center' valign='middle' >"+ss[12]*100 + "%"+"</td>"); //获利比
    str.append("</tr>");

    return str;
}
var DateSelect2;
function queryPlayList(cardID, datatime) {
    var DateSelect = datatime;
    DateSelect2 = datatime;
    var DateSelect1 = datatime;
    var CardID = cardID;
    var cbo = new CallBackObject();
    cbo.OnComplete = Cbo_Complete2;
    //cbo.onError = Cbo_Error;
    cbo.DoCallBack("AjaxDb.aspx?PageName=GamePlayList&DateSelect=" + DateSelect + "&DateSelect1=" + DateSelect1 + "&CardID=" + CardID);

}
/*
==================================================================

queryPlayList 点击按钮查询

==================================================================
*/
function Cbo_Complete2(responseText) {
    var Egame = responseText.split('@@')[1];
    var ss = responseText.split('@@')[0].split('$$');
    var str = new StringBulider();
    str.append("<table width='80%' border='0' cellspacing='0' cellpadding='0'>");
    str.append("<tr><td height='25px' align='left' valign='middle' class='font5'>" + Text(44) + "+DateSelect2+" + Text(29) + "</td><td><input type='button' class='but1' value='" + Text(38) + "' onclick='backjy()'></td></tr>");
    str.append("</table>");
    str.append("<table width='1150px'  border='0' cellpadding='0' cellspacing='1' bgcolor='#FFFFFF'>");
    str.append(showTableHead());
    var iAllBet = 0, iAllWin = 0;
    if (responseText.length > 0) {

        for (var i = 0; i < ss.length - 1; i++) {
            var iLine = i % 2;
            str.append(showPlayListDeatil(ss[i], iLine));
            ssPlay = ss[i].split('##');
            iAllBet += parseInt(ssPlay[5]);
            iAllWin += parseFloat(ssPlay[6]);

        }
    }
    str.append("<tr style='height:25px' bgcolor='#815F40' ");
    str.append("<td align='Center'></td>");
    str.append("<td align='Center'>" + Text(5) + "：</td>");
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
    ss = Egame.split('$$');
    str.append("<table width='99%' border='0' cellspacing='0' cellpadding='0'>");
    str.append("<tr><td height='32' align='left' valign='middle' class='font5'>" + Text(50) + "</td><td></td></tr>");
    str.append("</table>");
    str.append("<table width='1100px'  border='0' cellpadding='0' cellspacing='1' bgcolor='#FFFFFF'>");
    str.append(showTableHeadEgame());
    var iAllBet = 0, iAllWin = 0;
    if (responseText.length > 0) {

        for (var i = 0; i < ss.length - 1; i++) {
            var iLine = i % 2;
            str.append(showPlayListDeatilEgame(ss[i], iLine));
            ssPlay = ss[i].split('##');
            iAllBet += parseInt(ssPlay[5]);
            iAllWin += parseFloat(ssPlay[6]);

        }
    }
    str.append("<tr style='height:25px' bgcolor='#815F40' ");
    str.append("<td align='Center'></td>");
    str.append("<td align='Center'>" + Text(5) + "：</td>");
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
    document.getElementById("MyDatesSummary").style.display = "none";
    document.getElementById("divDetail").innerHTML = str;
    document.getElementById("divDetail").style.display = "block";
}
function backjy() {
    document.getElementById("divDetail").style.display = "none";
    document.getElementById("MyDatesSummary").style.display = "block";

}
