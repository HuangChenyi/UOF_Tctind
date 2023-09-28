<%@ Page Title="" Language="C#" MasterPageFile="~/Master/DefaultMasterPage.master" AutoEventWireup="true" CodeFile="Default.aspx.cs" Inherits="CDS_Auth_Default" %>

<%@ Register Src="~/Common/ChoiceCenter/UC_ChoiceList.ascx" TagPrefix="uc1" TagName="UC_ChoiceList" %>


<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">

    <script>
        function AA()
        {

            $('#<%=RadioButtonList1.ClientID%>_0').prop("checked",true);
            console.log('inp1 id is:' + '<%=inp1.ClientID%>')
            console.log('inp2 id is:' + '<%=inp2.ClientID%>')
            console.log('inp3 id is:' + '<%=inp3.ClientID%>')
            console.log('inp5 id is:' + '<%=inp5.ClientID%>')
            console.log('inp6 id is:' + '<%=inp6.ClientID%>')
            console.log('TextBox1 id is:' + '<%=TextBox1.ClientID%>')
            return false;
        }
    </script>

            

    <input id="inp1" runat="server"> </input>
    <asp:Button ID="btnSave" runat="server" Text="儲存" OnClick="btnSave_Click"  OnClientClick="return AA();"/>
        <input id="inp3" runat="server"> </input>
     <input id="inp2" runat="server"> </input>
    <input id="inp4"></input>
         <asp:Button ID="Button1" runat="server" Text="儲存" OnClick="btnSave_Click" />

    
    <div id="div1">
          <input id="inp5" runat="server"> </input>
    </div>

       <div id="div2" runat="server">
           <asp:TextBox ID="TextBox1" runat="server"></asp:TextBox>
          <input id="inp6" runat="server"> </input>
    </div>

    <uc1:UC_ChoiceList runat="server" ID="UC_ChoiceList" ExpandToUser="false" />

    <asp:Label ID="lblAlert" runat="server" Text="儲存成功!" Visible="false"></asp:Label>

    <asp:Table ID="Table1" runat="server"></asp:Table>

        <asp:RadioButtonList ID="RadioButtonList1" runat="server">
        <asp:ListItem>A</asp:ListItem>
         <asp:ListItem>B</asp:ListItem>
         <asp:ListItem>C</asp:ListItem>
    </asp:RadioButtonList>
   
  
</asp:Content>

