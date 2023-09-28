<%@ Page Title="" Language="C#" MasterPageFile="~/Master/DialogMasterPage.master" AutoEventWireup="true" CodeFile="SelectForm.aspx.cs" Inherits="CDS_WKF_Fields_Dialog_SelectForm" %>
<%@ Register Assembly="Ede.Uof.Utility.Component.Grid" Namespace="Ede.Uof.Utility.Component" TagPrefix="Ede" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">
  
    <Ede:Grid ID="grid" runat="server" AutoGenerateCheckBoxColumn="false" AutoGenerateColumns="false"
        OnRowCommand="grid_RowCommand"
        >
        <Columns>
            <asp:TemplateField HeaderText="單號">
                <ItemTemplate>
                    <asp:LinkButton ID="btnDocNBR" runat="server" Text='<%# Bind("DOC_NBR") %>'  
                        CommandName="btnDocNBR"
                        CommandArgument='<%# Bind("TASK_ID") %>'  ></asp:LinkButton>
                </ItemTemplate>
            </asp:TemplateField>
        </Columns>
    </Ede:Grid>

    <asp:GridView runat="server"></asp:GridView>


</asp:Content>

