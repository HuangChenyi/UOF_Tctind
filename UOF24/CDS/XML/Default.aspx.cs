using Ede.Uof.Utility.Page.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Xml;
using System.Xml.Linq;

public partial class CDS_XML_Default : Ede.Uof.Utility.Page.BasePage
{
    protected void Page_Load(object sender, EventArgs e)
    {


        //<FieldValue>
        //  <Item id='A01' value='V01' />
        //  <Item id='A02' value='V02' >InnerText</Item>
        //  <Item id='A03' value='V03' />
        //<FieldValue>

        XElement xe = new XElement("FieldValue"  );

        XElement item01XE = new XElement("Item", new XAttribute("id", "A01"), new XAttribute("value", "V01"));
        XElement item02XE = new XElement("Item", new XAttribute("id", "A02"), new XAttribute("value", "V02"), "InnerText");
        XElement item03XE = new XElement("Item", new XAttribute("id", "A03"), new XAttribute("value", "V<0>3"));

        xe.Add(item01XE, item02XE, item03XE);
        
        txtXML.Text = xe.ToString(  SaveOptions.DisableFormatting );
        return;
        XmlDocument xmlDoc = new XmlDocument();
        //<FieldValue/>
        XmlElement fieldValueElement = xmlDoc.CreateElement("FieldValue");

        //  <Item id='A01' value='V01' ></Iteem>        //
        XmlElement item01Element = xmlDoc.CreateElement("Item");
        item01Element.SetAttribute("id" , "A01");
        item01Element.SetAttribute("value", "V01");

        //  <Item id='A02' value='V02' >InnerText</Iteem>        //
        XmlElement item02Element = xmlDoc.CreateElement("Item");
        item02Element.SetAttribute("id", "A02");
        item02Element.SetAttribute("value", "V02");
        item02Element.InnerText = "InnerTextxxxxx";

        //  <Item id='A03' value='V03' ></Iteem>        //
        XmlElement item03Element = xmlDoc.CreateElement("Item");
        item03Element.SetAttribute("id", "A03");
        item03Element.SetAttribute("value", "V<0>3");

        fieldValueElement.AppendChild(item01Element);
        fieldValueElement.AppendChild(item02Element);
        fieldValueElement.AppendChild(item03Element);

        xmlDoc.AppendChild(fieldValueElement);

        txtXML.Text = xmlDoc.OuterXml;



    }
    protected void btnGetValue_Click(object sender, EventArgs e)
    {

        XElement xe = XElement.Parse(txtXML.Text);

        var node = (from xl in xe.Elements("Item")
                    where xl.Attribute("id").Value == txtID.Text
                    select xl).FirstOrDefault();
        txtValue.Text = node.Attribute("value").Value;

        return;
        XmlDocument xmlDoc = new XmlDocument();
        xmlDoc.LoadXml(txtXML.Text);
        txtValue.Text = xmlDoc.SelectSingleNode
            (string.Format("./FieldValue/Item[@id='{0}']", txtID.Text)).
            Attributes["value"].Value;
        
         
        //<FieldValue>
        //  <Item id='A01' value='V01' />
        //  <Item id='A02' value='V02' >InnerText</Item>
        //  <Item id='A03' value='V03' />
        //<FieldValue>


    }
}