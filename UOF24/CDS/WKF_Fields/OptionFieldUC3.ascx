<%@ Control Language="C#" AutoEventWireup="true" CodeFile="OptionFieldUC3.ascx.cs" Inherits="WKF_OptionalFields_OptionFieldUC3" %>
<%@ Reference Control="~/WKF/FormManagement/VersionFieldUserControl/VersionFieldUC.ascx" %>
<%@ Register Assembly="Ede.Uof.Utility.Component.Grid" Namespace="Ede.Uof.Utility.Component" TagPrefix="Fast" %>

 <script>
        function btn3_Click(sender) {        
            //從前端開始視窗
            //sender為註冊是由哪個視窗開啟，作為事後要觸發哪個元件的依據
            //OpenDialogResult為關閉視後會執行的JS Function
            //參數使用JSON格式傳遞
            $uof.dialog.open2("~/CDS/WKF_Fields/Dialog/MaintainItem.aspx",
                sender, "", 800, 600, OpenDialogResult,
                { "docNBR": $('#<%=lbtnDOCNBR.ClientID%>').text() });



            return false;

        }

        //如果有設定回傳值則執行sender Event
        function OpenDialogResult (returnValue) {
            if( typeof(returnValue)=="undefined")
                return false;
            else
                return true;
        }



 </script>

<table class="PopTable" style="width:600px">
    <tr>
        <td>
            <asp:Label ID="Label1" runat="server" Text="請購單號"></asp:Label>
        </td>
        <td>
             <asp:Label ID="lblTaskID" runat="server" Text="" Visible="false"></asp:Label>
            <asp:LinkButton ID="lbtnDOCNBR" runat="server" Text=""></asp:LinkButton>
            <asp:Button ID="btnQuery" runat="server" Text="查詢" OnClick="btnQuery_Click" />
        </td>
        <td>
            <asp:Label ID="Label2" runat="server" Text="品項"></asp:Label>
        </td>
        <td>
            <asp:Label ID="lblItem" runat="server" Text=""></asp:Label>
        </td>
    </tr>
    <tr>
        <td>
            <asp:Label ID="Label3" runat="server" Text="申請人"></asp:Label>
        </td>
        <td>
            <asp:Label ID="lblApplicant" runat="server" Text=""></asp:Label>
        </td>
         <td>
            <asp:Label ID="Label5" runat="server" Text="部門"></asp:Label>
        </td>
        <td>
            <asp:Label ID="lblGroup" runat="server" Text=""></asp:Label>
        </td>
    </tr>
</table>
<asp:Button ID="btnAdd" runat="server" Text="新增" OnClientClick="return btn3_Click(this);" OnClick="btnAdd_Click" />
<asp:Button ID="btnDelete" runat="server" Text="刪除" OnClick="btnDelete_Click" />




    <Fast:Grid ID="grid" runat="server" 
        DataKeyNames="ID"
        AutoGenerateCheckBoxColumn="true" AutoGenerateColumns="true"
        
        >
    
    </Fast:Grid>

<asp:TextBox ID="txtFieldValue" runat="server" 
    TextMode="MultiLine" Width="600px" Height="200px"
    ></asp:TextBox>

<asp:Label ID="lblHasNoAuthority" runat="server" Text="無填寫權限" ForeColor="Red" Visible="False" meta:resourcekey="lblHasNoAuthorityResource1"></asp:Label>
<asp:Label ID="lblToolTipMsg" runat="server" Text="不允許修改(唯讀)" Visible="False" meta:resourcekey="lblToolTipMsgResource1"></asp:Label>
<asp:Label ID="lblModifier" runat="server" Visible="False" meta:resourcekey="lblModifierResource1"></asp:Label>
<asp:Label ID="lblMsgSigner" runat="server" Text="填寫者" Visible="False" meta:resourcekey="lblMsgSignerResource1"></asp:Label>
<asp:Label ID="lblAuthorityMsg" runat="server" Text="具填寫權限人員" Visible="False" meta:resourcekey="lblAuthorityMsgResource1"></asp:Label>