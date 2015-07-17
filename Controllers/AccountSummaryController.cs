using System;
using System.Collections.Generic;
using System.Linq;
using System.Transactions;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;
using DotNetOpenAuth.AspNet;
using Microsoft.Web.WebPages.OAuth;
using WebMatrix.WebData;
using glw.Filters;
using glw.Models;

namespace glw.Controllers
{
    public class AccountSummaryController : Controller
    {
        int GroupID; //当前群编号
        int NameID; //当前群帐号
        string [] arrLeve; //存储级别信息
        int currLeave;//当前级别
        int currLoginGroupLength;
        int isgd; //是否是股东以上
        int dd = 0;
        int timetype;

        //
        // GET: /AccountSummary/

        public ActionResult Index()
        {
            return View();
        }


        public string GetGroupString(int grouplength, QuerryModel model)
        {
            string[] arrGroupLevleName = model.HiddenGroupLevelName.Split(';');
            string groupstring = "";
            int iLeve = grouplength / 3 - 2;
            if (iLeve >= 0)
            {
                groupstring = arrGroupLevleName[iLeve];
            }
            return groupstring;
        }

        string getbz(int id, QuerryModel model) 
        {
            string str = "";
            string [] bztype = model.bz.Split(';');
            str = bztype[id - 1];
            return str;
        }

        void listQuery(int groupID, int groupNameID, QuerryModel model) 
        {
            string dateBegin = model.dateBegin;
            string dateEnd = model.dateEnd;
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
    }
}
