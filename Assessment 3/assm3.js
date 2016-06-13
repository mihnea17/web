var bnCounter = 1;
var bnNames = [];
function initialise()
{
	var menuitems = document.getElementsByClassName("menuitems");
	for(var i=0; i<menuitems.length; i++)
	{
		menuitems[i].style.display = "none";
		menuitems[i].setAttribute("onmouseover","show(this);");
		menuitems[i].setAttribute("onmouseout","hide(this);");
	}

	var menuTitle=document.getElementsByClassName("menutitle");
	for(var a=1;a<menuTitle.length;a++) 
	{
		var mt=menuTitle[a];	
		mt.setAttribute("onmouseout","hideMenu(this);");
		mt.setAttribute("onmouseover","showMenu(this);");
	}
	var sto=document.getElementsByClassName("story");
	for(var b=1;b<sto.length;b++)
	{
		sto[b].style.display="none";
	}
	<!-- breaking news -->
	var newstories=document.getElementsByClassName("storylist")[2];
	var list=newstories.getElementsByTagName("span");
	breakingnews(list[0].innerHTML);
	setupTicker();
	<!-- stories -->
	var topstories=document.getElementById("topstories-list").getElementsByTagName("span");
	var mostread=document.getElementById("mostread-list").getElementsByTagName("span");
	var newst=document.getElementById("newstories-list").getElementsByTagName("span");
	setattrclic(topstories);
	setattrclic(mostread);
	setattrclic(newst);
	<!-- panel -->
	var mostreadp=document.getElementById("mostread");
	mostreadp.setAttribute("onclick","av(this);");
	var newstoriesp=document.getElementById("newstories");
	newstoriesp.setAttribute("onclick","av(this);");
	var top=document.getElementById("topstories");
	top.setAttribute("onclick","av(this);");
	<!-- search -->
	var searchbox=document.getElementsByClassName("search")[0];
	searchbox.setAttribute("onclick","srch(this);");
}

function srch(s)
{
	var found=false;
	var word=prompt("Search","");
	word1=word.charAt(0).toUpperCase()+word.substring(1,word.length);
	word2=word.toLowerCase();
	keywords=document.getElementsByClassName("keywords");
	var stories=document.getElementsByClassName("story");
	for(var a=0;a<stories.length;a++)
	{
		stories[a].style.display="none";
	}
	for(var i=0;i<keywords.length;i++)
	{
		var keys=keywords[i].getElementsByTagName("span");
		for(var j=0;j<keys.length;j++)
		{

			if(keys[j].innerHTML==word || keys[j].innerHTML==word1 || keys[j].innerHTML==word2)
			{
				found=true;
				keywords[i].parentNode.style.display="block";
			}
		}
	}
	var titles=document.getElementsByClassName("title");
	for (var b=0;b<titles.length;b++) 
	{
		var words=titles[b].innerHTML.split(" ");
		for(c=0;c<words.length;c++)
		{
			if(words[c]==word || words[c]==word1 || words[c]==word2)
			{
				found=true;
				titles[b].parentNode.style.display="block";
			}
		}
	}
	if(found==false)
	{
		alert("No story found");
	}
}
function av(pan)
{
	var lh=document.getElementById("listheaders").getElementsByTagName("div");
	for(var i=0;i<lh.length;i++)
	{
		lh[i].className="listheader-hidden";
		var str=lh[i].id+"-list";
		var li=document.getElementById(str);
		li.style.display="none";
	}
	pan.className="listheader";
	document.getElementById(pan.id+"-list").style.display="block";
}
function setattrclic(list)
{
	for(b=0;b<list.length;b++)
	{
		var story=list[b];
		story.setAttribute("onclick","showstory(this);");
	}
}
function showstory(story)
{
	var stories=document.getElementsByClassName("story");
	for(var i=0;i<stories.length;i++)
	{
		stories[i].style.display="none";
	}
	var topid=story.id;
	var storyid=topid.split("-")[1];
	document.getElementById(storyid).style.display="block";
	
}
function setupTicker()
{
	var newstories=document.getElementsByClassName("storylist")[2];
	var list=newstories.getElementsByTagName("span");
	for(var i=0;i<list.length;i++) {
		var li=list[i].innerHTML;
		bnNames.push(li);
	}
	setInterval(updateTicker,3000);
}
function updateTicker()
{
	var newstories=document.getElementsByClassName("storylist")[2];
	var list=newstories.getElementsByTagName("span");
	var nr=list.length;
	if(bnCounter+1==nr) {
		breakingnews1(bnNames[bnCounter],nr);
		bnCounter=0;
	}
	else{
		breakingnews1(bnNames[bnCounter],nr);
		bnCounter++;
	}
}
function breakingnews(li)
{
	document.getElementById("breaking").innerHTML=document.getElementById("breaking").innerHTML.replace("..."," "+li);
}
function breakingnews1(li,nr)
{
	if(bnCounter==0)
		document.getElementById("breaking").innerHTML=document.getElementById("breaking").innerHTML.replace(bnNames[nr-1]," "+li);
	else
		document.getElementById("breaking").innerHTML=document.getElementById("breaking").innerHTML.replace(bnNames[bnCounter-1]," "+li);
}
function show(mi)
{
	mi.style.display="block";
}
function hide(mi)
{
	mi.style.display="none";
}
function showMenu(mt)
{
	var menuItemsHolder = mt.parentNode.getElementsByClassName("menuitemsholder")[0];
	var menuItem=menuItemsHolder.getElementsByClassName("menuitems")[0];
	menuItem.style.display="block";

}
function hideMenu(mt)
{	
	var menuItemsHolder = mt.parentNode.getElementsByClassName("menuitemsholder")[0];
	var menuItem=menuItemsHolder.getElementsByClassName("menuitems")[0];
	menuItem.style.display="none";
} 