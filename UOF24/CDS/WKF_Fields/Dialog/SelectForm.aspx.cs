using Ede.Uof.Utility.Page;
using Ede.Uof.Utility.Page.Common;
using Org.BouncyCastle.Crypto.Tls;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class CDS_WKF_Fields_Dialog_SelectForm :BasePage
{

    

    protected void Page_Load(object sender, EventArgs e)
    {
        ((Master_DialogMasterPage)this.Master).Button1Text = "";
        ((Master_DialogMasterPage)this.Master).Button2Text = "";

        if (!IsPostBack) {
            BindGrid();
        }
    }

    private void BindGrid()
    {
        DB db = new DB();
        var dt = db.GetFormData();
        grid.DataSource = dt;
        grid.DataBind();
    }

    protected void grid_RowCommand(object sender, GridViewCommandEventArgs e)
    {
        if(e.CommandName=="btnDocNBR")
        {
            Dialog.SetReturnValue2(e.CommandArgument.ToString());
            Dialog.Close(this);
        }
    }
}


class DB :Ede.Uof.Utility.Data.BasePersistentObject
{
    public DataTable GetFormData()
    {
        string cmdTxt = @"SELECT TASK_ID, DOC_NBR FROM TB_WKF_TASK
            WHERE FORM_VERSION_ID = '3288492d-db7d-4a28-bae9-e304d2bde854'";


        DataTable dt = new DataTable();
        dt.Load(this.m_db.ExecuteReader(cmdTxt));

        return dt;

    }

}