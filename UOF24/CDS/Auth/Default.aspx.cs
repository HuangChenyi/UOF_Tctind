﻿using Ede.Uof.Utility.Configuration;
using Ede.Uof.Utility.Page;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class CDS_Auth_Default : BasePage
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if(!IsPostBack)
        {
          //  inp
            Setting setting = new Setting();
            
            UC_ChoiceList.XML = setting["DemoWebPartAuth"];

            for(int i=0;i<10;i++)
            {
                TableRow tr = new TableRow();
                TableCell tc = new TableCell();
                TextBox txt1 = new TextBox();
                txt1.ID = "txt";
                txt1.Text = txt1.ClientID;
                txt1.Width = Unit.Pixel(200);
                //tc.Controls.Add(txt1);
                UserControl uc = (UserControl)LoadControl("~/CDS/Auth/WebUserControl.ascx");
                tc.Controls.Add(uc);
                tr.Cells.Add(tc);

                Table1.Rows.Add(tr);
            }

        }

   
    }

    protected void btnSave_Click(object sender, EventArgs e)
    {
        string value="";
        Setting setting = new Setting();
        
        setting["DemoWebPartAuth"] = UC_ChoiceList.XML;

        ScriptManager.RegisterStartupScript(this, GetType(),
            Guid.NewGuid().ToString(), string.Format("alert('{0}');", lblAlert.Text),true);


    }
}