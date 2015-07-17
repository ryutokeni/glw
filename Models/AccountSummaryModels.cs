using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace glw.Models
{
    public class AccountSummaryModels : Controller
    {
        //
        // GET: /AccountSummary/

        public ActionResult Index()
        {
            return View();
        }

    }

    public class QuerryModel
    {
        public string HiddenGroupID { get; set; }
        public string HiddenNameID { get; set; }
        public string HiddenBeginDate { get; set; }
        public string HiddenEndDate { get; set; }
        public string HiddenGroupLevelName { get; set; }
        public string bz { get; set; }
        public string dateBegin { get; set; }
        public string dateEnd { get; set; }
    }
    
}
