using Ede.Uof.Utility.Page;
using Ede.Uof.Utility.Page.Common;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Training.FieldObj;

public partial class CDS_WKF_Fields_Dialog_MaintainItem : BasePage
{
    protected void Page_Load(object sender, EventArgs e)
    {
        lblDOCNBR.Text = Request["docNBR"];
        ((Master_DialogMasterPage)this.Master).Button1OnClick += CDS_WKF_Fields_Dialog_MaintainItem_Button1OnClick;
        
    }

    private void CDS_WKF_Fields_Dialog_MaintainItem_Button1OnClick()
    {
        POList list = new POList();
        list.ID = Guid.NewGuid().ToString();
        list.產品名稱 = "品名"+DateTime.Now.ToString("HHmmss");
        list.零件編號 = "品名" + DateTime.Now.ToString("HHmmss");
        list.金額 = DateTime.Now.Second;

        Dialog.SetReturnValue2(JsonConvert.SerializeObject(list));
    }
}