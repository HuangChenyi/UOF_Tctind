<!--
//------------------------------------------------------------------------------
// <copyright author="Jeffrey Bazinet" company="VWD-CMS">
//	Copyright (c) VWD-CMS (http://www.vwd-cms.com/).
//  All rights reserved.
// </copyright>
//------------------------------------------------------------------------------

// define the array of VwdCmsSplitterBars on the page
var _vwdCmsSplitterBars = new Array();
var _activeSplitterBar = null;
var _isIE = (document.all) ? true : false;

// define the VwdCmsSplitterBar "class"
function VwdCmsSplitterBar(splitter)
{  
	this.id = splitter.id; 
	this.debugElementId = "";
	this.debug = null;
	this.primaryResizeTarget = null;
	this.liveResize = false;
	this.splitterBar = splitter;
	this.leftResizeTargetIds = "";  // semi-colon delimited list of ids
	this.rightResizeTargetIds = ""; // semi-colon delimited list of ids
	this.leftResizeTargets = null;  // array of target elements
	this.rightResizeTargets = null; // array of target elements
	this.offsetLeft = new Number(0);
	this.isResizing = false;
	this.backgroundColor = "lightsteelblue";  
	this.backgroundColorHilite = "lightsteelblue"; 
	this.backgroundColorResizing = "lightsteelblue"; 
	this.backgroundColorLimit = "firebrick";
	this.maxWidth = new Number(0);
	this.minWidth = new Number(0);
	this.totalWidth = new Number(0);
	this.saveWidthToElement = null;
	this.splitterWidth = new Number(6);
	this.onResizeStart = null; // ( onmousedown, resizing starting )
	this.onResize = null; // ( dynamic resizing, resizing complete)
	this.onResizeComplete = null; // ( onmouseup, resizing complete)
	this.onDoubleClick = null;
	this.hdnWidth = document.getElementById(splitter.id + "_hdnWidth");
	this.iframeHiding = "UseVisibility";
	this.iframes = null;
	this.iframeStates = null;
	this.namingContainerId = "";
}

// define the "instance" methods
VwdCmsSplitterBar.prototype.SetBackgroundColor = VwdCmsSplitterBar_SetBackgroundColor;
VwdCmsSplitterBar.prototype.configure = VwdCmsSplitterBar_configure;
VwdCmsSplitterBar.prototype.show = VwdCmsSplitterBar_show;
VwdCmsSplitterBar.prototype.hide = VwdCmsSplitterBar_hide;
VwdCmsSplitterBar.prototype.setTargetWidth = VwdCmsSplitterBar_setTargetWidth;
VwdCmsSplitterBar.prototype.drag = VwdCmsSplitterBar_drag;
VwdCmsSplitterBar.prototype.onmousedown = VwdCmsSplitterBar_onmousedown;
VwdCmsSplitterBar.prototype.onmouseup = VwdCmsSplitterBar_onmouseup;
VwdCmsSplitterBar.prototype.ondblclick = VwdCmsSplitterBar_ondblclick;
VwdCmsSplitterBar.prototype.showIFrames = VwdCmsSplitterBar_showIFrames;
VwdCmsSplitterBar.prototype.hideIFrames = VwdCmsSplitterBar_hideIFrames;

// define the "static" methods
VwdCmsSplitterBar.createNew = VwdCmsSplitterBar_createNew;
VwdCmsSplitterBar.getById = VwdCmsSplitterBar_getById;
VwdCmsSplitterBar.getCurrent = VwdCmsSplitterBar_getCurrent;
VwdCmsSplitterBar.reconfigure = VwdCmsSplitterBar_reconfigure;
VwdCmsSplitterBar.setLiveResize = VwdCmsSplitterBar_setLiveResize;
VwdCmsSplitterBar.setDebug = VwdCmsSplitterBar_setDebug;

// create the property set for backgroundColor
function VwdCmsSplitterBar_SetBackgroundColor(value)
{
    this.backgroundColor = value;
    this.splitterBar.style.backgroundColor = value;
}

// create the createNew static method
function VwdCmsSplitterBar_createNew(splitterId)
{
	var splitter = document.getElementById(splitterId);
	var sbar = new VwdCmsSplitterBar(splitter);
	_vwdCmsSplitterBars[_vwdCmsSplitterBars.length] = sbar;
	return sbar;
}

// create the getById static method
function VwdCmsSplitterBar_getById(id)
{
	var sbar = null;
	var sbarId = id; 
	for ( var i = 0; i < _vwdCmsSplitterBars.length; i++ )
	{
		sbar = _vwdCmsSplitterBars[i];
		if ( sbar.id == sbarId )
		{
			break;
		}
	}
	return sbar;
}

// create the getCurrent static method
function VwdCmsSplitterBar_getCurrent()
{
	return _activeSplitterBar;
}

// create the reinitialize static method
function VwdCmsSplitterBar_reconfigure()
{
	for ( var i = 0; i < _vwdCmsSplitterBars.length; i++ )
	{
		_vwdCmsSplitterBars[i].configure();
	}	
}

// create the setLiveResize static method
function VwdCmsSplitterBar_setLiveResize(setting)
{
	for ( var i = 0; i < _vwdCmsSplitterBars.length; i++ )
	{
		_vwdCmsSplitterBars[i].liveResize = setting;
	}	
}

// create the setDebug static method
function VwdCmsSplitterBar_setDebug(debugId, namingContainerId)
{
	var txt = null;
	if ( debugId ) 
	{
		txt = document.getElementById(namingContainerId + debugId);
		if ( txt == null )
		{
			txt = document.getElementById(debugId);
		}
	}
	for ( var i = 0; i < _vwdCmsSplitterBars.length; i++ )
	{
		_vwdCmsSplitterBars[i].debug = txt;
	}	
}
	
// create the initialize method
function VwdCmsSplitterBar_configure()
{
	// the purpose of the configure method is to setup initial 
	// properties on the splitterbar as well as calculate some
	// important values rather than calculating them over and 
	// over again in methods like 'drag', 'onmousedown', 
	// 'onmouseup', and 'setTargetWidth' -  the less work 
	// we have to do inside these methods, the better the UI 
	// performance will be for the user.
	var sbar = null;
	if ( this.splitterBar )
	{
		sbar = this;
	}
	else
	{
		sbar = VwdCmsSplitterBar.getById(this.id);
	}
	
	if ( sbar )
	{
		// setup the debug element, expecting an ID for a textarea element
		if ( sbar.debugElementId )
		{
			var dbg = document.getElementById(sbar.namingContainerId + sbar.debugElementId);
			if ( dbg == null )
			{
				dbg = document.getElementById(sbar.debugElementId);
			}
			sbar.debug = dbg;
		}
		if ( sbar.debug ) 
		{ 
			sbar.debug.value = "configuring '" + sbar.id + "'\r\n" + sbar.debug.value;
		}
		
		// setup the splitterBar control
		var splitter = sbar.splitterBar;
		
		// get the left resize target elements from the Ids
		sbar.leftResizeTargets = getTargets(sbar.leftResizeTargetIds, sbar.namingContainerId);
		
		// get the right resize target elements from the Ids
		sbar.rightResizeTargets = getTargets(sbar.rightResizeTargetIds, sbar.namingContainerId);

		// get the primary resize target element (first one in leftResizeTargets)
		var target = null;
		if ( sbar.leftResizeTargets && sbar.leftResizeTargets.length > 0 )
		{
			target = sbar.leftResizeTargets[0];
			sbar.primaryResizeTarget = target;
		}
		
		if ( splitter && target )
		{
			splitter.style.margin = "0px";
			splitter.style.padding = "0px";
			
			splitter.onmousedown = sbar.onmousedown;
			splitter.onmouseup = sbar.onmouseup;
			splitter.onmouseover = sbar.show; 
			splitter.onmouseout = sbar.hide;
			
			if ( sbar.onDoubleClick != null )
			{
				splitter.ondblclick = sbar.onDoubleClick; 
			}
			else
			{
				splitter.ondblclick = sbar.ondblclick; 
			}
			
			splitter.style.backgroundColor = sbar.backgroundColor;
			splitter.style.cursor = "e-resize";
			splitter.style.position = "absolute";
			splitter.style.width = sbar.splitterWidth + "px";
			splitter.style.zIndex = 0;
			
			// determine the min and max widths
			var op = target.offsetParent;
			if ( sbar.maxWidth == 0 )
			{
				sbar.maxWidth = getInt(op.offsetWidth);
				sbar.maxWidth -= sbar.splitterWidth;
				sbar.maxWidth -= getInt(op.style.borderLeftWidth);
				sbar.maxWidth -= getInt(op.style.borderRightWidth);
				sbar.maxWidth -= getInt(splitter.style.borderLeftWidth);
				sbar.maxWidth -= getInt(splitter.style.borderRightWidth);
			}
			
			// set the top location of the SplitterBar
			var top = getOffsetTop(target);
			splitter.style.top = top + "px";
			
			// set the left location of the SplitterBar
			var offsetLeft = getOffsetLeft(target);
			sbar.offsetLeft = offsetLeft;
			
			var left = offsetLeft;
			left += getInt(target.offsetWidth);
			splitter.style.left = left + "px";
			
			// set the height of the SplitterBar
			var height = getInt(target.clientHeight);
			height += getInt(target.style.borderTopWidth);
			height += getInt(target.style.borderBottomWidth);
			splitter.style.height = 663;
			
			// output to the debug window
			if ( sbar.debug ) 
			{ 
				sbar.debug.value = sbar.id + ".splitterBar.style.top='" 
					+ splitter.style.top + "'\r\n" + sbar.debug.value;
				sbar.debug.value = sbar.id + ".offsetLeft='" 
					+ sbar.offsetLeft + "'\r\n" + sbar.debug.value;
				sbar.debug.value = sbar.id + ".splitterBar.style.left='" 
					+ splitter.style.left + "'\r\n" + sbar.debug.value;
				sbar.debug.value = sbar.id + ".splitterBar.style.height='" 
					+ splitter.style.height + "'\r\n" + sbar.debug.value;
			}
			
			// handle window resizing
			// this is problematic in Firefox because the event
			// does not fire until the resizing is complete, so 
			// if the SplitterBar's backcolor is not set to Transparent,
			// it will display in the wrong location while the resizing
			// is happening.
			window.onresize = VwdCmsSplitterBar.reconfigure; 
		}
	}	
}

// create the show method
function VwdCmsSplitterBar_show()
{
	var sbar = VwdCmsSplitterBar.getById(this.id);
	if (sbar && !sbar.isResizing)
	{
		sbar.splitterBar.style.backgroundColor=sbar.backgroundColorHilite;
	}
}

// create the hide method
function VwdCmsSplitterBar_hide()
{
	var sbar = VwdCmsSplitterBar.getById(this.id);
	if (sbar && !sbar.isResizing)
	{
		sbar.splitterBar.style.backgroundColor=sbar.backgroundColor;
	}
}

// create the setTargetWidth method
function VwdCmsSplitterBar_setTargetWidth(sbar)
{
	if ( sbar == null )
	{
		sbar = VwdCmsSplitterBar.getCurrent();
	}
	if ( sbar )
	{
		var width = 0;
		// get the primary target ( the first one in LeftResizeTargets)
		var target = sbar.primaryResizeTarget; // sbar.leftResizeTargets[0];
		if ( target )
		{		
			// calculate the width based on the splitterbar's location
			width = getInt(sbar.splitterBar.style.left);
			width -= getInt(sbar.offsetLeft);
			width -= getInt(target.style.borderLeftWidth);
			width -= getInt(target.style.borderRightWidth);
			// do not set the width to 0, 1 is the minimum
			if ( width < 1 ) { width = 1; }

			// set the width of the target element
			target.style.width = width + "px";
			
			// set the width value to the hidden field hdnWidth
			if ( sbar.hdnWidth )
			{
				sbar.hdnWidth.value = width + "px";
			}
			
			// set the width value to the saveWidthToElement
			if ( sbar.saveWidthToElement )
			{
				var elmWidth = document.getElementById(sbar.namingContainerId + sbar.saveWidthToElement);
				if ( elmWidth == null )
				{
					elmWidth = document.getElementById(sbar.saveWidthToElement);
				}
				if ( elmWidth ) 
				{
					elmWidth.value = width + "px";
				}
			}
			
			// output some debugging info
			if ( sbar.debug ) 
			{ 
				sbar.debug.value = sbar.id + ".leftResizeTargets[0].style.width='" 
				+ target.style.width + "'\r\n" + sbar.debug.value;
			}
			
			// resize any other LeftResizeTarget elements
			if ( sbar.leftResizeTargets && sbar.leftResizeTargets.length > 1 )
			{
				for (var i = 1; i < sbar.leftResizeTargets.length; i++)
				{
					target = sbar.leftResizeTargets[i];
					target.style.width = width + "px";
				}
			}
			
			// resize the RightResizeTarget elements
			// Note: this calculation requires that the TotalWidth property is 
			// set so we can determine the width of the RightResizeTarget elements
			if ( sbar.totalWidth > 0 && sbar.rightResizeTargets 
				&& sbar.rightResizeTargets.length > 0 )
			{
				width = sbar.totalWidth - width - sbar.splitterWidth; 
				for (var i = 0; i < sbar.rightResizeTargets.length; i++)
				{
					target = sbar.rightResizeTargets[i];
					target.style.width = width + "px";
				}
			}
			
			// always reconfigure when not in IE because
			// we don't get enough resize events
			if ( !_isIE )
			{
				VwdCmsSplitterBar.reconfigure();
			}
			
			// fire the onResize event
			if ( sbar.onResize )
			{
				sbar.onResize(sbar, width);
			}
		}
	}
}		

// create the drag method
function VwdCmsSplitterBar_drag(evnt)
{
	evnt = evnt ? evnt : event;
	if ( evnt )
	{
		var sbar = VwdCmsSplitterBar.getCurrent();
		if ( sbar && sbar.isResizing )
		{
			evnt.cancelBubble = true;
			evnt.returnValue = false;
						
			// get the new location to move the SplitterBar to 
			// from the event object
			var x = getInt(evnt.pageX ? evnt.pageX : evnt.clientX);
			
			// adjust for the width of the SplitterBar and
			// keep the SplitterBar centered on the cursor	
			pixX = sbar.splitterWidth/2; 
			x = x - pixX; 
			
			// determine the min and max allowable locations
			var minX = getInt(sbar.offsetLeft);
			minX += getInt(sbar.minWidth);		
			
			var maxX = getInt(sbar.offsetLeft);
			maxX += getInt(sbar.maxWidth);
			
			// output some debug info
			if ( sbar.debug ) 
			{ 
				sbar.debug.value = sbar.id + " resizing: minX='" + minX + "'\r\n" + sbar.debug.value;
				sbar.debug.value = sbar.id + " resizing: maxX='" + maxX + "'\r\n" + sbar.debug.value;
				sbar.debug.value = sbar.id + " resizing: x='" + x + "'\r\n" + sbar.debug.value;
			}

			// check to see if this location is allowed,
			// otherwise, set the Limit color to indicate that the 
			// min or max width has been reached
			if ( ( minX == 0 || x >= minX ) && ( maxX == 0 || x <= maxX) )
			{
				sbar.splitterBar.style.backgroundColor = sbar.backgroundColorResizing;
				sbar.splitterBar.style.left = x + "px";
				
				if ( sbar.liveResize )
				{
					sbar.setTargetWidth();
				}
			}
			else
			{
				sbar.splitterBar.style.backgroundColor = sbar.backgroundColorLimit;
			}
		}
	}
}    

// create the onmousedown method
function VwdCmsSplitterBar_onmousedown(evnt)
{
	var sbar = VwdCmsSplitterBar.getById(this.id);
	if ( sbar )
	{
		// ensure that the splitterbar is at the top of the z-index
		sbar.splitterBar.style.zIndex = 0;//5000;
		
		// start resizing
		_activeSplitterBar = sbar; // set the current/active splitter bar
		sbar.isResizing = true;
		sbar.splitterBar.style.backgroundColor = sbar.backgroundColorResizing;

		// hookup the mouse events on the document
		document.onmousemove = sbar.drag;
		document.onmouseup = sbar.onmouseup;
				
		// deal with IFrames
		sbar.hideIFrames();
		
		// fire the onResizeStart event
		if ( sbar.onResizeStart )
		{
			sbar.onResizeStart(sbar);
		}
		
	}	
}	

// create the onmouseup method
function VwdCmsSplitterBar_onmouseup(evnt)
{
	var sbar = VwdCmsSplitterBar.getCurrent();

	if ( sbar )
	{
		// stop resizing 
		// unhook the mouse events on the document
		document.onmousemove = null;
		document.onmouseup = null;
		
		// set the final width of the target element
		sbar.setTargetWidth();
		
		// return the splitterbar to an inactive state		
		sbar.isResizing = false;
		sbar.splitterBar.style.backgroundColor = sbar.backgroundColor;
		_activeSplitterBar = null; 
		
		// deal with IFrames
		sbar.showIFrames();
		
		// fire the onResizeComplete event
		if ( sbar.onResizeComplete )
		{
			sbar.onResizeComplete(sbar, sbar.primaryResizeTarget.style.width);
		}
		
	}	
}	

// create the ondblclick method
function VwdCmsSplitterBar_ondblclick(evnt)
{
	var splitter = this; //VwdCmsSplitterBar.getCurrent();
	var sbar = VwdCmsSplitterBar.getById(splitter.id);

	if ( sbar )
	{
		// fire the onResizeStart event
		if ( sbar.onResizeStart )
		{
			sbar.onResizeStart(sbar);
		}

		// if the SplitterBar is at the MinWidth then 
		// set it to the MaxWidth, otherwise set it 
		// to the MinWidth
		
		// get the min and max allowable locations
		var minX = getInt(sbar.offsetLeft);
		if ( getInt(sbar.maxWidth) == 0 )
		{
			minX += 1;		
		}
		else
		{
			minX += getInt(sbar.minWidth);		
		}
			
		var maxX = getInt(sbar.offsetLeft);
		if ( getInt(sbar.maxWidth) == 0 )
		{
			maxX += getInt(sbar.clientWidth);
		}
		else
		{
			maxX += getInt(sbar.maxWidth);
		}
				
		if (sbar.splitterBar.style.left == minX + "px")
		{
			sbar.splitterBar.style.left = maxX + "px";
		}
		else
		{
			sbar.splitterBar.style.left = minX + "px";
		}
		sbar.setTargetWidth(sbar);	
		
		// fire the onResizeComplete event
		if ( sbar.onResizeComplete )
		{
			sbar.onResizeComplete(sbar, sbar.primaryResizeTarget.style.width);
		}
			
	}	
}	
function VwdCmsSplitterBar_hideIFrames()
{
	var sbar = this;
	
	if (sbar.iframeHiding != "DoNotHide")
	{
		// make sure we don't get into a weird state
		// ** if the user rapidly clicks/dbl-clicks on the SplitterBar
		// or if the onmouseup event does not get fired for some reason 
		// this method might get called twice before the showIFrames 
		// method is called - what happens is the IFrame ends up being
		// permanently hidden. To avoid this problem call showIFrames 
		// from within this method before doing the hidding.
		sbar.showIFrames();
		
		// IFrames:  hide IFrames so 
		// that the splitterbar can work properly
		// because IFrames capture/steal the mouse events
		var op = sbar.primaryResizeTarget.offsetParent;
		sbar.iframeStates = new Array();
		sbar.iframes = op.getElementsByTagName("iframe");
		if (sbar.iframes && sbar.iframes.length > 0 )
		{
			var iframe = null;
			for (var i=0; i < sbar.iframes.length; i++)
			{
				iframe = sbar.iframes[i];
				if ( iframe )
				{
					switch ( sbar.iframeHiding )
					{
						case "UseVisibility":
							sbar.iframeStates[i] = iframe.style.visibility;
							//if ( iframe.style.visibility != "hidden" )
							//{
								iframe.style.visibility = "hidden";
							//}
							break;
							
						case "UseDisplay":
							sbar.iframeStates[i] = iframe.style.display;
							//if ( iframe.style.display != "none" )
							//{
								iframe.style.display = "none";
							//}
							break;
					}
				}
			}
		}
	}
}
function VwdCmsSplitterBar_showIFrames()
{
	var sbar = this;
	if (sbar.iframeHiding != "DoNotHide")
	{
		// re-enable/re-display the elements in sbar.elementsToDisable
		// these elements are known to interfere with the 
		// splitterBar, but must be returned to their 
		// normal state before resizing started
		var iframe = null;
		if (sbar.iframes && sbar.iframes.length > 0 )
		{
			for (var i=0; i < sbar.iframes.length; i++)
			{
				iframe = sbar.iframes[i];
				switch ( sbar.iframeHiding )
				{
					case "UseVisibility":
						iframe.style.visibility = sbar.iframeStates[i];
						break;
						
					case "UseDisplay":
						iframe.style.display = sbar.iframeStates[i];
						break;
				}
			}
		}
		sbar.iframes = null;
		sbar.iframeStates = null;
	}
}

// utility functions
function getTargets(targetIds, namingContainerId)
{
	// parse a string of element id's 
	// and get a reference to the element 
	// from the document
	var target = null;
	var targetIdArray = targetIds.split(';');
	var targets = new Array();
	var t = 0;
	var id = null;
	
	for ( var i = 0; i < targetIdArray.length; i++ )
	{
		id = targetIdArray[i];
		if ( id && id.length > 0 )
		{
			target = document.getElementById(namingContainerId + id);
			if ( target == null )
			{
				// elements that don't have runat="server" will not 
				// have the naming container prefix
				target = document.getElementById(id);
			}
			
			if ( target )
			{
				targets[t] = target;
				t++;
			}
		}
	}
	return targets;
}

function getOffsetTop(element)
{
	// walk up the stack of elements collecting
	// the offset top values
	var offsetTop = new Number(0);
	try
	{
		offsetTop = getInt(element.offsetTop);
		var op = element.offsetParent;
		while ( op )
		{
			offsetTop += getInt(op.offsetTop);
			op = op.offsetParent;
		}
	}
	catch (ex) {}
	return offsetTop;
}

function getOffsetLeft(element)
{
	// walk up the stack of elements collecting
	// the offset left values
	var offsetLeft = new Number(0);
	try
	{
		offsetLeft = getInt(element.offsetLeft);
		var op = element.offsetParent;
		while ( op )
		{
			offsetLeft += getInt(op.offsetLeft);
			op = op.offsetParent;
		}
	}
	catch (ex) {}
	return offsetLeft;
}

function getInt(value)
{
	var num;
	if ( value )
	{
		num = parseInt(value);
		if (isNaN(num))
		{
			num = new Number(0);
		}
	}
	else
	{
		num = new Number(0);
	}
	return num;
}
	
// -->
