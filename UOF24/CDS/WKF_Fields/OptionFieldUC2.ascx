<%@ Control Language="C#" AutoEventWireup="true" CodeFile="OptionFieldUC2.ascx.cs" Inherits="WKF_OptionalFields_OptionFieldUC2" %>
<%@ Reference Control="~/WKF/FormManagement/VersionFieldUserControl/VersionFieldUC.ascx" %>
<%@ Register Src="~/Common/ChoiceCenter/UC_ChoiceList.ascx" TagPrefix="uc1" TagName="UC_ChoiceList" %>
<%@ Register Assembly="Ede.Uof.Utility.Component.Grid" Namespace="Ede.Uof.Utility.Component" TagPrefix="Fast" %>

<table class="PopTable">
    <tr>
        <td>
            <asp:Label ID="Label1" runat="server" Text="類別" meta:resourcekey="Label1Resource1"></asp:Label>
        </td>
        <td>
            <asp:RadioButtonList ID="rbList" runat="server" RepeatDirection="Horizontal" meta:resourcekey="rbListResource1">
                <asp:ListItem Text="A" Value="A"></asp:ListItem>
                  <asp:ListItem Text="B" Value="B"></asp:ListItem>
                  <asp:ListItem Text="C" Value="C"></asp:ListItem>
            </asp:RadioButtonList>
             </td>
    </tr>
     <tr>
        <td>
            <asp:Label ID="Label2" runat="server" Text="品項" meta:resourcekey="Label2Resource1"></asp:Label>
        </td>
        <td>
            <asp:TextBox ID="txtItem" runat="server" meta:resourcekey="txtItemResource1"></asp:TextBox>
             </td>
    </tr>
    <tr>
        <td>
            <asp:Label ID="Label3" runat="server" Text="金額" meta:resourcekey="Label3Resource1"></asp:Label>
        </td>
        <td>
           <telerik:RadNumericTextBox ID="rnumAmount" runat="server"
               MinValue="0" MaxValue="10000"></telerik:RadNumericTextBox>
             </td>
    </tr>
     <tr>
        <td>
            <asp:Label ID="Label4" runat="server" Text="負責人"
                meta:resourcekey="Label4Resource1"></asp:Label>
        </td>
        <td>
            <uc1:UC_ChoiceList runat="server" ID="UC_ChoiceList" />
             </td>
    </tr>
</table>


<asp:Label ID="lblHasNoAuthority" runat="server" Text="無填寫權限" ForeColor="Red" Visible="False" meta:resourcekey="lblHasNoAuthorityResource1"></asp:Label>
<asp:Label ID="lblToolTipMsg" runat="server" Text="不允許修改(唯讀)" Visible="False" meta:resourcekey="lblToolTipMsgResource1"></asp:Label>
<asp:Label ID="lblModifier" runat="server" Visible="False" meta:resourcekey="lblModifierResource1"></asp:Label>
<asp:Label ID="lblMsgSigner" runat="server" Text="填寫者" Visible="False" meta:resourcekey="lblMsgSignerResource1"></asp:Label>
<asp:Label ID="lblAuthorityMsg" runat="server" Text="具填寫權限人員" Visible="False" meta:resourcekey="lblAuthorityMsgResource1"></asp:Label>