﻿<%@ Control Language="C#" AutoEventWireup="true" CodeFile="OptionFieldUC1.ascx.cs" Inherits="WKF_OptionalFields_OptionFieldUC1" %>
<%@ Reference Control="~/WKF/FormManagement/VersionFieldUserControl/VersionFieldUC.ascx" %>
<asp:TextBox ID="txtFieldValue" runat="server"></asp:TextBox>
<asp:Label ID="lblFieldValue" runat="server" Text="Label"></asp:Label>
<asp:RequiredFieldValidator ID="RequiredFieldValidator1"  Display="Dynamic"
    runat="server" ControlToValidate="txtFieldValue"
    ErrorMessage="欄位必填"></asp:RequiredFieldValidator>

<asp:RegularExpressionValidator ID="RegularExpressionValidator1" runat="server"
  ValidationExpression="09\d{8}" ControlToValidate="txtFieldValue"
    ErrorMessage="請輸入手機格式"></asp:RegularExpressionValidator>
<asp:Label ID="lblHasNoAuthority" runat="server" Text="無填寫權限" ForeColor="Red" Visible="False" meta:resourcekey="lblHasNoAuthorityResource1"></asp:Label>
<asp:Label ID="lblToolTipMsg" runat="server" Text="不允許修改(唯讀)" Visible="False" meta:resourcekey="lblToolTipMsgResource1"></asp:Label>
<asp:Label ID="lblModifier" runat="server" Visible="False" meta:resourcekey="lblModifierResource1"></asp:Label>
<asp:Label ID="lblMsgSigner" runat="server" Text="填寫者" Visible="False" meta:resourcekey="lblMsgSignerResource1"></asp:Label>
<asp:Label ID="lblAuthorityMsg" runat="server" Text="具填寫權限人員" Visible="False" meta:resourcekey="lblAuthorityMsgResource1"></asp:Label>