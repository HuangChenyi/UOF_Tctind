<%@ Page Title="" Language="C#" MasterPageFile="~/Master/DialogMasterPage.master" AutoEventWireup="true" CodeFile="MaintainItem.aspx.cs" Inherits="CDS_WKF_Fields_Dialog_MaintainItem" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">

    <table class="PopTable" >
        <tr>
            <td>
                <asp:Label ID="Label1" runat="server" Text="請購編號(參數展示)"></asp:Label>
            </td>
            <td>
                <asp:Label ID="lblDOCNBR" runat="server" Text=""></asp:Label>
            </td>
        </tr>
        <tr>
            <td>
                <asp:Label ID="Label2" runat="server" Text="零件編號"></asp:Label>
            </td>
            <td>
                <asp:Button ID="btnSelect" runat="server" Text="請選擇" />
            </td>
        </tr>
                <tr>
            <td>
                <asp:Label ID="Label3" runat="server" Text="品名"></asp:Label>
            </td>
            <td>
                <asp:Label ID="lblProductName" runat="server" Text=""></asp:Label>
            </td>
        </tr>
             <tr>
            <td>
                <asp:Label ID="Label4" runat="server" Text="金額"></asp:Label>
            </td>
            <td>
               <telerik:RadNumericTextBox ID="rnumAmount" runat="server"></telerik:RadNumericTextBox>
            </td>
        </tr>
    </table>
</asp:Content>

