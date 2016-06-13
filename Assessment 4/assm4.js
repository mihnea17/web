var items = [];
var items1=[];
var items2=[];
var scorers=[];
var scorers1=[];
var teams1=[];
var teams=[];
function initialise()
{
	requestData("leagueTable.json", minitable);
	var lgtable=document.getElementById("lgtab");
	lgtable.onclick=function(){requestData("leagueTable.json",lgtbl);};
	var home=document.getElementById("home");
	home.onclick=function(){avhome()};
	var topscor=document.getElementById("topscor");
	topscor.onclick=function() {requestData("topScorers.xml",loadScorers);};
	var teams=document.getElementById("teams");
	teams.onclick=function(){requestData("teams.json",loadTeams);};
	var sortValue=document.getElementById("value");
	sortValue.onclick=function() {sortByValue();};
	var sortClub=document.getElementById("club");
	sortClub.onclick=function(){sortByClub();};
	var filGoals=document.getElementById("9g");
	filGoals.onclick=function(){filterGoals();};
	var sortblgoals=document.getElementById("goals");
	sortblgoals.onclick=function(){sortByGoals();};
	var sortblgd=document.getElementById("gd");
	sortblgd.onclick=function(){sortByGd();};
	var filterrel=document.getElementById("relegation");
	filterrel.onclick=function(){filterRel();};
	var filtereur=document.getElementById("europe");
	filtereur.onclick=function(){filterEur();};
	var searchkey=document.getElementById("fakelink");
	searchkey.onclick=function(){ word=prompt("Search","");
	fillMiniTable();
	$('th:contains("'+ word +'")').css('background-color', '#FFFF88');};
}
/* Hide all the "pages" */
function hide()
{
	document.getElementById("mainpag").style.display="none";
	document.getElementById("leaguetable").style.display="none";
	document.getElementById("topscorers").style.display="none";
	document.getElementById("teamsdiv").style.display="none";
}
/* Gets the teams for the minitable from the home page and fills it.*/
function minitable(xmlhttp)
{
	avhome();
	var jsonDoc = JSON.parse(xmlhttp.responseText);
	var jsonItems = jsonDoc.standing;
	for (var i = 0; i < jsonItems.length; i++) {
		var itemteamName = jsonItems[i].teamName;
		var itemgoals=jsonItems[i].goals;
		var itemdif=jsonItems[i].goalDifference;
		var itemPld = jsonItems[i].playedGames;
		var itemPos = jsonItems[i].position;
		var itemPoints = jsonItems[i].points;
	
		var team = {
			name : itemteamName,
			played : itemPld,
			position : itemPos,
			points : itemPoints,
			gd: itemdif,
			goals: itemgoals,
		};
	
		items1.push(team);
	}
	
	fillMiniTable();
}
/* Fills the minitable from the main page */
function fillMiniTable()
{
	var table = document.getElementById("minitable");
	while (table.childNodes.length > 0) {
		table.removeChild(table.firstChild);
	}
	for (var i = 0; i < items1.length; i++) {
		var tr = document.createElement("tr");
		var th1 = document.createElement("th");
		th1.innerHTML=(items1[i].position);
		var th2 = document.createElement("th");
		th2.className="name";
		th2.innerHTML=items1[i].name;
		var th3 = document.createElement("th");
		var th4 = document.createElement("th");
		th3.innerHTML=items1[i].played;
		th4.innerHTML=items1[i].points;
		tr.appendChild(th1);
		tr.appendChild(th2);
		tr.appendChild(th3);
		tr.appendChild(th4);
		table.appendChild(tr);
	}
}
/* Gets the teams info and fills the League Table */
function lgtbl(xmlhttp)
{
	hide();
	var leaguetable=document.getElementById("leaguetable");
	leaguetable.style.display="block";
	var jsonDoc = JSON.parse(xmlhttp.responseText);
	var jsonItems = jsonDoc.standing;
	
	for (var i = 0; i < jsonItems.length; i++) {
	
		var itemteamName = jsonItems[i].teamName;
		var itemgoals=jsonItems[i].goals;
		var itemdif=jsonItems[i].goalDifference;
		var itemPld = jsonItems[i].playedGames;
		var itemPos = jsonItems[i].position;
		var itemPoints = jsonItems[i].points;
		
		var team = {
			name : itemteamName,
			played : itemPld,
			position : itemPos,
			points : itemPoints,
			gd: itemdif,
			goals: itemgoals,
		};
		items.push(team);
	}
	items2=items;
	fillPremiertab();
}
/* Makes the home page available */
function avhome()
{
	hide();
	document.getElementById("mainpag").style.display="block";
}
/* Filter the teams that will play in european competitions */
function filterEur()
{
	items3=items2;
	items2 = items2.filter(function(a) { return a.position <=5; } );
	FillSortedLgTable();
	items2=items3;
}
/* Filter the teams that will get relegated */
function filterRel()
{
	items3=items2;
	items2 = items2.filter(function(a) { return a.position >=18; } );
	FillSortedLgTable();
	items2=items3;
}
/* Sorts the teams by their goal difference */
function sortByGd()
{
	items2.sort(function(a,b){if (a.gd>b.gd) return -1; else return 1;});
	FillSortedLgTable();
}
/* Sorts the league table by the number of goals */
function sortByGoals()
{
	items2.sort(function(a,b){if(a.goals>b.goals) return -1; else return 1;});
	FillSortedLgTable();
}
/* Fills the sorted/filtered league table */
function FillSortedLgTable()
{
	var table=document.getElementById("lgtable");
	while (table.childNodes.length>0) {
		table.removeChild(table.firstChild);
	}
	var tr=document.createElement("tr");
	var th1=document.createElement("th");
	th1.className="top";
	th1.innerHTML="Pos";
	var th2=document.createElement("th");
	th2.className="top";
	th2.innerHTML="Club";
	var th3=document.createElement("th");
	th3.className="top";
	th3.innerHTML="Pld";
	var th4=document.createElement("th");
	th4.className="top";
	th4.innerHTML="Goals";
	var th5=document.createElement("th");
	th5.className="top";
	th5.innerHTML="GD";
	var th6=document.createElement("th");
	th6.className="top";
	th6.innerHTML="Pts";
	tr.appendChild(th1);
	tr.appendChild(th2);
	tr.appendChild(th3);
	tr.appendChild(th4);
	tr.appendChild(th5);
	tr.appendChild(th6);
	table.appendChild(tr);
	for (var i = 0; i < items2.length; i++) {
		var tr = document.createElement("tr");
		var th1 = document.createElement("th");
		th1.innerHTML=(items2[i].position);
		var th2 = document.createElement("th");
		th2.className="name1";
		th2.innerHTML=items2[i].name;
		var th3 = document.createElement("th");
		var th4 = document.createElement("th");
		var th5 = document.createElement("th");
		var th6 = document.createElement("th");
		th3.innerHTML=items2[i].played;
		th4.innerHTML=items2[i].goals;
		th5.innerHTML=items2[i].gd;
		th6.innerHTML=items2[i].points;
		
		tr.appendChild(th1);
		tr.appendChild(th2);
		tr.appendChild(th3);
		tr.appendChild(th4);
		tr.appendChild(th5);
		tr.appendChild(th6);
		table.appendChild(tr);
	}
}
/* Filters the scorers by their number of goals. above 9 goals*/
function filterGoals()
{
	scorers2=scorers1;
	scorers1 = scorers1.filter(function(a) { return a.goals > 9; } );
	FillSortedScorers();
	scorers1=scorers2;
}
/* Sort the scorers by their club */
function sortByClub()
{
	scorers1.sort(function(a,b){if (a.team<b.team) return -1; else return 1;});
	FillSortedScorers();
}
/* Sort the teamb by their market value */
function sortByValue()
{
	teams1.sort(function(a,b){if (parseInt(a.mv)>parseInt(b.mv)) return -1; else return 1;});
	FillSortedTeamTable();
}
/* Fills the sorted scorers table */
function FillSortedScorers()
{
	var table=document.getElementById("topscort");
	while (table.childNodes.length>0) {
		table.removeChild(table.firstChild);
	}
	var tr=document.createElement("tr");
	var th1=document.createElement("th");
	th1.className="top";
	th1.innerHTML="Name";
	var th2=document.createElement("th");
	th2.className="top";
	th2.innerHTML="Team";
	var th3=document.createElement("th");
	th3.className="top";
	th3.innerHTML="Goals";
	tr.appendChild(th1);
	tr.appendChild(th2);
	tr.appendChild(th3);
	table.appendChild(tr);
	for (var i = 0; i < scorers1.length; i++) {
		var tr = document.createElement("tr");
		var th1 = document.createElement("th");
		th1.innerHTML=(scorers1[i].name);
		th1.className="name";
		var th2 = document.createElement("th");
		th2.className="name";
		th2.innerHTML=scorers1[i].team;
		var th3 = document.createElement("th");
		th3.innerHTML=scorers1[i].goals;
		tr.appendChild(th1);
		tr.appendChild(th2);
		tr.appendChild(th3);
		table.appendChild(tr);
	}
}
/* Fills the sorted team table*/
function FillSortedTeamTable()
{
	var table=document.getElementById("teamstable");
	while (table.childNodes.length>0) {
		table.removeChild(table.firstChild);
	}
	var tr=document.createElement("tr");
	var th1=document.createElement("th");
	th1.className="top";
	th1.innerHTML="Club";
	var th2=document.createElement("th");
	th2.className="top";
	th2.innerHTML="Market Value";
	tr.appendChild(th1);
	tr.appendChild(th2);
	table.appendChild(tr);
	for(var i=0;i<teams1.length;i++)
	{
		var tr=document.createElement("tr");
		var th1=document.createElement("th");
		var img=document.createElement("img");
		img.src=teams1[i].crest;
		img.className="crest";
		th1.appendChild(img);
		th1.innerHTML=th1.innerHTML+" "+teams1[i].name+" ("+teams1[i].shortname+")";
		var th2=document.createElement("th");
		th2.innerHTML=teams1[i].mv;
		tr.appendChild(th1);
		tr.appendChild(th2);
		table.appendChild(tr);
	}
}
/* Loads the teams info*/
function loadTeams(xmlhttp)
{
	hide();
	var teamsdiv=document.getElementById("teamsdiv");
	teamsdiv.style.display="block";
	var jsonDoc = JSON.parse(xmlhttp.responseText);
	var jsonItems = jsonDoc.teams;
	for (var i = 0; i < jsonItems.length; i++) {
		var tname=jsonItems[i].name;
		var tsname=jsonItems[i].shortName;
		var crest=jsonItems[i].crestUrl;
		var mv=jsonItems[i].squadMarketValue;

		var team={
			name:tname,
			shortname:tsname,
			crest:crest,
			mv:mv,
		};
		teams.push(team);
	}
	teams1=teams;
	FillTeamTable();
}
/* Fills the team table*/
function FillTeamTable()
{
	var table=document.getElementById("teamstable");
	while (table.childNodes.length>0) {
		table.removeChild(table.firstChild);
	}
	var tr=document.createElement("tr");
	var th1=document.createElement("th");
	th1.className="top";
	th1.innerHTML="Club";
	var th2=document.createElement("th");
	th2.className="top";
	th2.innerHTML="Market Value";
	tr.appendChild(th1);
	tr.appendChild(th2);
	table.appendChild(tr);
	for(var i=0;i<teams.length;i++)
	{
		var tr=document.createElement("tr");
		var th1=document.createElement("th");
		var img=document.createElement("img");
		img.src=teams[i].crest;
		img.className="crest";
		th1.appendChild(img);
		th1.innerHTML=th1.innerHTML+" "+teams[i].name+" ("+teams[i].shortname+")";
		var th2=document.createElement("th");
		th2.innerHTML=teams[i].mv;
		tr.appendChild(th1);
		tr.appendChild(th2);
		table.appendChild(tr);
	}
	teams=[];
}
/* Loads the scorers info*/
function loadScorers(xmlhttp)
{
	hide();
	var tops=document.getElementById("topscorers");
	tops.style.display="block";
	var xmldoc=xmlhttp.responseXML;
	var players=xmldoc.getElementsByTagName("player");
	for(var i=0;i<players.length;i++)
	{
		var name=players[i].getElementsByTagName("name")[0].firstChild.data;
		var team=players[i].getElementsByTagName("team")[0].firstChild.data;
		var goals=players[i].getElementsByTagName("goals")[0].firstChild.data;
		var playa={
			name: name,
			team: team,
			goals: goals,
		};
		scorers.push(playa);
	}
	scorers1=scorers;
	Scorers();
}
/* Fills the scorers table */
function Scorers()
{
	var table=document.getElementById("topscort");
	while (table.childNodes.length>0) {
		table.removeChild(table.firstChild);
	}
	var tr=document.createElement("tr");
	var th1=document.createElement("th");
	th1.className="top";
	th1.innerHTML="Name";
	var th2=document.createElement("th");
	th2.className="top";
	th2.innerHTML="Team";
	var th3=document.createElement("th");
	th3.className="top";
	th3.innerHTML="Goals";
	tr.appendChild(th1);
	tr.appendChild(th2);
	tr.appendChild(th3);
	table.appendChild(tr);
	for (var i = 0; i < scorers.length; i++) {	
		var tr = document.createElement("tr");
		var th1 = document.createElement("th");
		th1.innerHTML=(scorers[i].name);
		th1.className="name";
		var th2 = document.createElement("th");
		th2.className="name";
		th2.innerHTML=scorers[i].team;
		var th3 = document.createElement("th");
		th3.innerHTML=scorers[i].goals;
		tr.appendChild(th1);
		tr.appendChild(th2);
		tr.appendChild(th3);
		table.appendChild(tr);
	}
	scorers=[];
}
/* Fills the premier league table*/
function fillPremiertab()
{
	var table=document.getElementById("lgtable");
	while (table.childNodes.length>0) {
		table.removeChild(table.firstChild);
	}
	var tr=document.createElement("tr");
	var th1=document.createElement("th");
	th1.className="top";
	th1.innerHTML="Pos";
	var th2=document.createElement("th");
	th2.className="top";
	th2.innerHTML="Club";
	var th3=document.createElement("th");
	th3.className="top";
	th3.innerHTML="Pld";
	var th4=document.createElement("th");
	th4.className="top";
	th4.innerHTML="Goals";
	var th5=document.createElement("th");
	th5.className="top";
	th5.innerHTML="GD";
	var th6=document.createElement("th");
	th6.className="top";
	th6.innerHTML="Pts";
	tr.appendChild(th1);
	tr.appendChild(th2);
	tr.appendChild(th3);
	tr.appendChild(th4);
	tr.appendChild(th5);
	tr.appendChild(th6);
	table.appendChild(tr);
	for (var i = 0; i < items.length; i++) {
		var tr = document.createElement("tr");
		var th1 = document.createElement("th");
		th1.innerHTML=(items[i].position);
		var th2 = document.createElement("th");
		th2.className="name1";
		th2.innerHTML=items[i].name;
		var th3 = document.createElement("th");
		var th4 = document.createElement("th");
		var th5 = document.createElement("th");
		var th6 = document.createElement("th");
		th3.innerHTML=items[i].played;
		th4.innerHTML=items[i].goals;
		th5.innerHTML=items[i].gd;
		th6.innerHTML=items[i].points;
		
		tr.appendChild(th1);
		tr.appendChild(th2);
		tr.appendChild(th3);
		tr.appendChild(th4);
		tr.appendChild(th5);
		tr.appendChild(th6);
		table.appendChild(tr);
	}
	items=[];
}
