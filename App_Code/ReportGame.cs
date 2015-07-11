using System;
using System.Collections;
using System.Configuration;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.HtmlControls;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Xml.Linq;
using System.Collections.Generic;
using BLL;
using Model;


    public class ReportGame : Cw.PageBase.mPage
    {
        BLL.LoginUserDAL lud = new LoginUserDAL();
        //protected HtmlInputText _Date;
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                Response.CacheControl = "no-cache";
                Response.Expires = 0;
            }
            //this._Date.Value = DateTime.Now.ToString("yyyy-MM-dd");
        }
        protected DataTable bind()
        {
            DataTable dt = new DataTable();
            //this._Date.Value = DateTime.Now.ToShortDateString();
            dt = new DataTable();
            dt.Columns.Add(new System.Data.DataColumn("id", typeof(System.Int32)));
            dt.Columns.Add(new System.Data.DataColumn("name", typeof(System.String)));
            int a = -1;
            try
            {
                List<ComGameDeskInfo> cci = lud.GetGameDeskList(Cw.Global.Global.GetSeesionManUser().RoleID, ref a);
                if (a == 10)
                {
                    for (int i = 0; i < cci.Count; i++)
                    {

                        DataRow newRow;
                        newRow = dt.NewRow();
                        newRow[0] = cci[i].nGameIndex;
                        newRow[1] = deskName(cci[i].nGameIndex);
                        dt.Rows.Add(newRow);

                    }
                }
            }
            catch (Exception ex)
            { }
            return dt;
        }
        virtual protected string deskName(int nGameIndex)
        {
            String deskName = Common.getGameNameByGameIndex(nGameIndex, Common.Lang.cn.ToString());
            return deskName;
        }
    }
