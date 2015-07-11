using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;

/// <summary>
/// Summary description for ReportBetting
/// </summary>

    public class ReportBetting : Cw.PageBase.mPage
    {
        virtual protected string deskName(int nGameIndex, string lang)
        {
            String deskName = Common.getGameNameByGameIndex(nGameIndex, lang);
            return deskName;
        }
        virtual protected string isOnline(int type, string lang)
        {
            return Common.getUserStatus(type, lang);
        }
        virtual protected string state(int state, string lang)
        {
            return Common.getGameStateName(state, lang);
        }
        virtual protected string getGroupid(string GroupName)
        {
            string groupid = "";
            DataTable dt = (DataTable)Session["jiedian"];
            DataView dv = new DataView(dt);
            dv.RowFilter = "szNameStr = '" + GroupName + "'";
            foreach (DataRowView row in dv)
            {
                groupid = row["szGroupID"].ToString();
            }
            if (groupid == "")
            {
                groupid = Cw.Global.Global.GetSeesionManUser().UserNum;
            }
            return groupid;
        }
        virtual protected void Timer1_Tick(object sender, EventArgs e)
        {
            bind();
        }
        virtual protected void bind()
        {
            //must override
        }
    }
