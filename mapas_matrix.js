///////////Creación variable mapa/////////// 
var map = L.map('map', {
		zoomControl: false,
		center: [38.5, 5],
		zoom: 5,
		minZoom: 3,
		maxZoom: 20,
		maxBounds: [
			[20, -50],
			[50, 50]
			],
	});

///////////Funcionalidades estructura del visor///////////
//Layers on top
map.createPane('límites');
// This pane is above markers but below popups
map.getPane('límites').style.zIndex = 650;
// Layers in this pane are non-interactive and do not obscure mouse/touch events
map.getPane('límites').style.pointerEvents = 'none';
//Labels on top
map.createPane('labels');
// This pane is above markers but below popups
map.getPane('labels').style.zIndex = 800;
// Layers in this pane are non-interactive and do not obscure mouse/touch events
map.getPane('labels').style.pointerEvents = 'none';
//bindTooltip on top
map.createPane('popups');
// el popup aparece al arrastar encima de todo pero debajo del popup que aparece al clicar
map.getPane('popups').style.zIndex = 1000;
// Layers in this pane are non-interactive and do not obscure mouse/touch events
map.getPane('popups').style.pointerEvents = 'none';
//bindPopup on top
map.createPane('popups1');
// aparece por encima de todas las capas
map.getPane('popups1').style.zIndex = 1500;
// Layers in this pane are non-interactive and do not obscure mouse/touch events
map.getPane('popups1').style.pointerEvents = 'none';
//Barra de interacción de capas	tantaas sildebar como grupos de capas
var sidebar = L.control.sidebar('sidebar', { closeButton:true, position: 'left' });
	map.addControl(sidebar);
	sidebar.hide();			
	sidebar.show();
	sidebar.toggle();
var visible = sidebar.isVisible();
var button = new L.Control.Button(L.DomUtil.get('helpbutton'), { toggleButton: 'active', position: 'topleft'});
	button.addTo(map);
	button.on('click', function () {
	 if (button.isToggled()) {
			sidebar.hide();
		} else {
			sidebar.show();
		}
	});
var sidebar2 = L.control.sidebar('sidebar2', { closeButton:true, position: 'right' });
	map.addControl(sidebar2);
	sidebar2.hide();			
	sidebar2.show();
	sidebar2.toggle();
var visible2 = sidebar.isVisible();

//Buscador
var geocoder = L.Control.geocoder({ position: 'topleft',
	//defaultMarkGeocode: false
	}).addTo(map);


///////////Diseño caracteriticas basicas del visor///////////
//Logo Matrix	
var title1 = L.control({position: 'bottomright'});
	title1.onAdd = function (map) {
var div = L.DomUtil.create('div', 'info1');
	 div.innerHTML +=
	 '<a href="https://www.fundacionmatrix.es"><img src="images/matrix.png" width="90px" height="45px" ></img></a>';
	 return div;
	};
	title1.addTo(map);
//Logo impactsig	
var title3 = L.control({position: 'bottomright'});
	title3.onAdd = function (map) {
var div = L.DomUtil.create('div','info3');
	 div.innerHTML +=
	 '<a><img src="images/impactsig.png" width="67px" height="45px" ></img></a>';
	 return div;
	};
	title3.addTo(map);  


///////////Cartografía de referencia///////////
var Mapa_fondo = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, opacity: 0.4, 
	attribution: '<a href="http://www.openstreetmap.org/copyright">OpenStreetMap </a>| Map data © 2018 <a href="https://www.fundacionmatrix.es"><strong>Fundación Matrix</strong></a>',
	}).addTo(map);		
var osm = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	attribution: 'Map data &copy'
	});
var osm1 = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 18,
	opacity: 0,
	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
	});
var osm2 = new L.TileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
	minZoom: 0, 
	maxZoom: 13,
	});
var osm3 = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, opacity: 0.4, 
	attribution: '<a href="http://www.openstreetmap.org/copyright">OpenStreetMap </a>| Map data © 2018 <a href="https://www.fundacionmatrix.es"><strong>Fundación Matrix</strong></a>',
	});
//Límites
var comunidades = L.geoJson(comunidades, {
	color: "#17202A", 
	weight: 1.3,
	opacity: 0.5,
	fillOpacity: 0,
	pane: 'límites', // layer goes on top.
	attribution: '| © <a href="http://www.ign.es">Instituto Geográfico Nacional |'			
	}).addTo(map);

///////////Otras funcionalidades			
//zoomHome
var zoomHome = L.Control.zoomHome({ position: 'topleft', homeCoordinates:[40, -5], zoomHomeTitle:'Posición inicial'}).addTo(map);
//fullscreen						
var fsControl = new L.Control.FullScreen();
	map.addControl(fsControl);
	map.on('enterFullscreen', function(){
	if(window.console) window.console.log('enterFullscreen');
	});
	map.on('exitFullscreen', function(){
	if(window.console) window.console.log('exitFullscreen');
	});
	L.control.scale().addTo(map);

///////////Estilo de las capas especificas del visor///////////
//SO2
function getColor1(a) {
	return a > 3.2 ? '#0B2C7B' :
	a > 1.6 ? '#209A8F' :
	a > 0.8 ? '#00DC00' :
	a > 0.4 ? '#FFFF00' :
	a > 0.2 ? '#EEA113' :
	'#C2523C';
};
function style1(feature) {
	return {
		fillColor: getColor1(feature.properties.SO2),
		weight: 0,
		opacity: 0.60,
		color: '#0B161D',
		dashArray: '1',
		fillOpacity: 0.6
	};
};
function popup1(feature, layer) {
	if (feature.properties && feature.properties.id_1) {
		layer.bindTooltip("<strong>Concentración de SO<SUB>2</SUB>: </strong>"+feature.properties.SO2.toLocaleString()+" µg/m<sup>3</sup>",{direction:"top",sticky:true, permanente:true,offset:[0,-5], pane: 'popups'});			
	};
};
var geojson1 = L.geoJson(tabla_imp, {
	style: style1,
	onEachFeature: popup1
});

//NO2
function getColor2(a) {
	return a > 3 ? '#0B2C7B' :
	a > 1.5 ? '#209A8F' :
	a > 1.25 ? '#00DC00' :
	a > 1 ? '#FFFF00' :
	a > 0.75 ? '#EEA113' :
	'#C2523C';
};
function style2(feature) {
	return {
		fillColor: getColor2(feature.properties.NO2),
		weight: 0,
		opacity: 0.60,
		color: '#0B161D',
		dashArray: '1',
		fillOpacity: 0.6
	};
};
function popup2(feature, layer) {
	if (feature.properties && feature.properties.id_1) {
		layer.bindTooltip("<strong>Concentración de NO<SUB>2</SUB>: </strong>"+feature.properties.NO2.toLocaleString()+" µg/m<sup>3</sup>",{direction:"top",sticky:true, permanente:true,offset:[0,-5], pane: 'popups'});			
	};
};
var geojson2 = L.geoJson(tabla_imp, {
	style: style2,
	onEachFeature: popup2
});

//NH3 NH4
function getColor3(a) {
	return a > 2 ? '#0B2C7B' :
	a > 1.5 ? '#209A8F' :
	a > 1.25 ? '#00DC00' :
	a > 1 ? '#FFFF00' :
	a > 0.75 ? '#EEA113' :
	'#C2523C';
};
function style3(feature) {
	return {
		fillColor: getColor3(feature.properties.NH3_NH4),
		weight: 0,
		opacity: 0.60,
		color: '#0B161D',
		dashArray: '1',
		fillOpacity: 0.6
	};
};
function popup3(feature, layer) {
	if (feature.properties && feature.properties.id_1) {
		layer.bindTooltip("<strong>NH<SUB>3</SUB> y NH<sub>4</sub><sup>+</sup>: </strong>"+feature.properties.NH3_NH4.toLocaleString()+" µg/m<sup>3</sup>",{direction:"top",sticky:true, permanente:true,offset:[0,-5], pane: 'popups'});			
	};
};
var geojson3 = L.geoJson(tabla_imp, {
	style: style3,
	onEachFeature: popup3
});

//O3
function getColor4(a) {
	return a > 42.5 ? '#0B2C7B' :
	a > 40 ? '#209A8F' :
	a > 37.5 ? '#00DC00' :
	a > 35 ? '#FFFF00' :
	a > 32.5 ? '#EEA113' :
	'#C2523C';
};
function style4(feature) {
	return {
		fillColor: getColor4(feature.properties.O3),
		weight: 0,
		opacity: 0.60,
		color: '#0B161D',
		dashArray: '1',
		fillOpacity: 0.6
	};
};
function popup4(feature, layer) {
	if (feature.properties && feature.properties.id_1) {
		layer.bindTooltip("<strong>Concentración de O<SUB>3</SUB>: </strong>"+feature.properties.O3.toLocaleString()+" ppb",{direction:"top",sticky:true, permanente:true,offset:[0,-5], pane: 'popups'});			
	};
};
var geojson4 = L.geoJson(tabla_imp, {
	style: style4,
	onEachFeature: popup4
});

//deposito total de nitrogeno
function getColor5(a) {
	return a > 12 ? '#0B2C7B' :
	a > 8 ? '#209A8F' :
	a > 6 ? '#00DC00' :
	a > 5 ? '#FFFF00' :
	a > 4 ? '#EEA113' :
	'#C2523C';
};
function style5(feature) {
	return {
		fillColor: getColor5(feature.properties.N_total),
		weight: 0,
		opacity: 0.60,
		color: '#0B161D',
		dashArray: '1',
		fillOpacity: 0.6
	};
};
function popup5(feature, layer) {
	if (feature.properties && feature.properties.id_1) {
		layer.bindTooltip("<strong>Depósito total de nitrógeno: </strong>"+feature.properties.N_total.toLocaleString()+" kg/ha",{direction:"top",sticky:true, permanente:true,offset:[0,-5], pane: 'popups'});			
	};
};
var geojson5 = L.geoJson(tabla_imp, {
	style: style5,
	onEachFeature: popup5
});
//tipificacion de contaminates
function getColor6(a) {
	return a == 1 ? '#70A800' :
	a == 2 ? '#CDF57A' :
	a == 3 ? '#E7E600' :
	a == 4 ? '#E69800' :
	'#A80000';
};
function style6(feature) {
	return {
		fillColor: getColor6(feature.properties.tipi5clas),
		weight: 0,
		opacity: 0.60,
		color: '#0B161D',
		dashArray: '1',
		fillOpacity: 0.6
	};
};
var geojson6 = L.geoJson(tabla_imp, {
	style: style6
});
//poblacion total
function getRadius1(a) {
	return a > 500000 ? '10' :
	a > 100000 ? '8' :
	a > 20000 ? '6' :
	'4';
};
function style7(feature) {
	return {
		radius: getRadius1(feature.properties.pob_total),
		color: 'black',
		weight: 1,
		fillColor: "#01C5FF",
		// opacity: 1,
		fillOpacity: 0.8
	};
};
var geojson7 = L.geoJson(tabla_imp_point, {
	pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, style7(feature));
	},onEachFeature: function(feature,layer){
	if (feature.properties && feature.properties.id_1) {
		layer.bindTooltip("<strong>Número de habitantes: </strong>"+feature.properties.pob_total.toLocaleString(),{direction:"top",sticky:true, permanente:true,offset:[0,-5], pane: 'popups'});			
	};}
});
//poblacion infantil
function getRadius2(a) {
	return a > 50000 ? '10' :
	a > 10000 ? '8' :
	a > 2000 ? '6' :
	'4';
};
function style8(feature) {
	return {
		radius: getRadius2(feature.properties.infantil),
		color: 'black',
		weight: 1,
		fillColor: "#01C5FF",
		// opacity: 1,
		fillOpacity: 0.8
	};
};
var geojson8 = L.geoJson(tabla_imp_point, {
	pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, style8(feature));
    },onEachFeature: function(feature,layer){
	if (feature.properties && feature.properties.id_1) {
		layer.bindTooltip("<strong>Población infantil: </strong>"+feature.properties.infantil.toLocaleString(),{direction:"top",sticky:true, permanente:true,offset:[0,-5], pane: 'popups'});			
	};}
});

//poblacion infantil
function getRadius3(a) {
	return a > 100000 ? '10' :
	a > 25000 ? '8' :
	a > 5000 ? '6' :
	'4';
};
function style9(feature) {
	return {
		radius: getRadius3(feature.properties.mayores),
		color: 'black',
		weight: 1,
		fillColor: "#01C5FF",
		// opacity: 1,
		fillOpacity: 0.8
	};
};
var geojson9 = L.geoJson(tabla_imp_point, {
	pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, style9(feature));
    },onEachFeature: function(feature,layer){
	if (feature.properties && feature.properties.id_1) {
		layer.bindTooltip("<strong>Número de mayores: </strong>"+feature.properties.mayores.toLocaleString(),{direction:"top",sticky:true, permanente:true,offset:[0,-5], pane: 'popups'});			
	};}
});
//ENP deposito total de nitrogeno
function getColor10(a) {
	return a > 12 ? '#FF2600' :
	a > 10 ? '#FF8500' :
	a > 8 ? '#FFD900' :
	a > 6 ? '#C5DA00' :
	a > 4 ? '#619900' :
	'#006100';
};
function style10(feature) {
	return {
		fillColor: getColor10(feature.properties.Ntotal),
		weight: 1,
		opacity: 0.60,
		color: '#0B161D',
		dashArray: '1',
		fillOpacity: 0.8
	};
};
function popup10(feature, layer) {
	if (feature.properties && feature.properties.FIRST_FID_) {
		layer.bindTooltip(feature.properties.FIRST_ODES+"<br><strong>"+feature.properties.FIRST_SITE+"</strong><br>Depósito total de nitrógeno: "+
		feature.properties.Ntotal.toLocaleString()+"kg/ha",{direction:"top",sticky:true, permanente:true,offset:[0,-5], pane: 'popups'});			
	};
};
var geojson10 = L.geoJson(table_enp, {
	style: style10,
	onEachFeature: popup10,
});

///////////Definicion de las capas del mapa///////////
//Capas	
var mapa1 = L.layerGroup([geojson1]).addTo(map);
var mapa2 = L.layerGroup([geojson2]);
var mapa3 = L.layerGroup([geojson3]);
var mapa4 = L.layerGroup([geojson4]);
var mapa5 = L.layerGroup([geojson5]);
var mapa6 = L.layerGroup([geojson6]);
var mapa7 = L.layerGroup([geojson6,geojson7]);
var mapa8 = L.layerGroup([geojson6,geojson8]);
var mapa9 = L.layerGroup([geojson6,geojson9]);
var mapa10 = L.layerGroup([geojson10]);

var baseTree = [
	{ label: "<strong>Limpiar mapa", layer: osm3 },
	{
	label: '<strong>Mapas de concentración de contaminantes atmosféricos',
	children: [
		{ label: "Concentración de SO<SUB>2</SUB>", layer: mapa1 },
		{ label: "Concentración de NO<SUB>2</SUB>", layer: mapa2 },
		{ label: "Concentración de NH<SUB>3</SUB> y NH<sub>4</sub><sup>+</sup>", layer: mapa3 },
		{ label: "Concentración de O<SUB>3</SUB>", layer: mapa4 },
	]
	},
	{
	label: '<strong>Mapas depósito de nitrógneo',
	children: [
		{ label: "Depósito total de nitrógeno", layer: mapa5 },
		{ label: "Depósito total de nitrógeno en espacios naturales protegidos", layer: mapa10},
	]},
	{
	label: '<strong>Mapas de vulnerabilidad a la contaminación atmosférica',
	children: [
		{ label: "Clases multivariantes de exposición a la contaminación atmosférica", layer: mapa6},
		{ label: "Vulnerabilidad de la población total", layer: mapa7},
		{ label: "Vulnerabilidad de la población infantil", layer: mapa8},
		{ label: "Vulnerabilidad de la población de mayores", layer: mapa9},
	]},
];
var overlayTree = {
	label: 'Mapas de referencia',
	children: [
		{ label: "<b>Límites de Comunidades Autónomas", layer: comunidades},
		{ label: "OpenStreetMap", layer: osm},
		]
};	

///////////Definicion del estilo de la leyenda de cada capa///////////
// leyenda mapa10	
var htmlLegend10 = L.control.htmllegend({
		position: 'bottomleft',
		legends: [{
			name: "<h5><em>Clicar para plegar/desplegar la leyenda</em><h/5><h4>"+'Depósito atmosférico total de nitrógeno en espacios naturales protegidos. Promedio anual 2000-2013'+"<\h3>",
			style: style10,
			layer: mapa10,
			elements: [{
				label:"<h4>"+  'Unidades: kg/ha'+"<\h4>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
				label:"<h4>"+  '0,5 - 4'+"<\h4>",html: '',style: {'background-color': '#006100','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label:"<h4>"+  '4,1 - 6'+"</h4>",html: '',style: {'background-color': '#619900','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label:"<h4>"+  '6,1 - 8'+"<\h4>",html: '',style: {'background-color': '#C5DA00','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label:"<h4>"+  '8,1 - 10'+"<\h4>",html: '',style: {'background-color': '#FFD900','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label:"<h4>"+  '10,1 - 12'+"<\h4>",html: '',style: {'background-color': '#FF8500','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {		
				label:"<h4>"+  '12,1 - 19,8'+"<\h4>",html: '',style: {'background-color': '#FF2600','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {		
				label:"<h5>"+  ''+"<\h5>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
				label:"<h4>"+  'Número de espacios naturales protegidos: 143'+"<\h4>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
				label:"<h5>"+  'Fuente: European Monitoring and Evaluation Programme (EMEP)'+"<\h5>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'},																
			}]
		}],
		collapseSimple: true,  // if true, legend entries that are from a simple renderer will use compact presentation
		detectStretched: true,  // if true, will test to see if legend entries look stretched.  These are usually in sets of 3 with the middle element having no label.
		collapsedOnInit: true,  // if true, legends will be collapsed when a new instance is initialized.
		defaultOpacity: 0.5, // default opacity for layers in specified in legends.
		visibleIcon: '',// 'leaflet-html-legend-icon-eye',  // css class for the visible icon on opacity slider
		hiddenIcon: '',//'leaflet-html-legend-icon-eye-slash',  // css class for the hidden icon on opacity slider
		toggleIcon:'',// 'leaflet-html-legend-icon-eye-slash'  // css class for the icon on visibility toggle button
	});
	map.addControl(htmlLegend10);
// leyenda mapa9	
var htmlLegend9 = L.control.htmllegend({
		position: 'bottomleft',
		legends: [{
			name: "<h5><em>Clicar para plegar/desplegar la leyenda</em><h/5><h4>"+'Vulnerabilidad a la contaminación atmosférica de la población de mayores'+"<\h4>",
			style: style9,
			layer: mapa9,
			elements: [{
				label:"<h4>"+  '<img src=images/pob_may.png width="215" height ="300">'+"<\h4>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
				label:"<h5>"+  'Fuente: European Monitoring and Evaluation Programme (EMEP)'+"<\h5>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'},																
			}]
		}],
		collapseSimple: true,  // if true, legend entries that are from a simple renderer will use compact presentation
		detectStretched: true,  // if true, will test to see if legend entries look stretched.  These are usually in sets of 3 with the middle element having no label.
		collapsedOnInit: true,  // if true, legends will be collapsed when a new instance is initialized.
		defaultOpacity: 0.5, // default opacity for layers in specified in legends.
		visibleIcon: '',// 'leaflet-html-legend-icon-eye',  // css class for the visible icon on opacity slider
		hiddenIcon: '',//'leaflet-html-legend-icon-eye-slash',  // css class for the hidden icon on opacity slider
		toggleIcon:'',// 'leaflet-html-legend-icon-eye-slash'  // css class for the icon on visibility toggle button
	});
	map.addControl(htmlLegend9);
// leyenda mapa8	
var htmlLegend8 = L.control.htmllegend({
		position: 'bottomleft',
		legends: [{
			name: "<h5><em>Clicar para plegar/desplegar la leyenda</em><h/5><h4>"+'Vulnerabilidad a la contaminación atmosférica de la población infantil'+"<\h4>",
			style: style8,
			layer: mapa8,
			elements: [{
				label:"<h4>"+  '<img src=images/pob_inf.png width="215" height ="300">'+"<\h4>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
				label:"<h5>"+  'Fuente: European Monitoring and Evaluation Programme (EMEP)'+"<\h5>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'},																
			}]
		}],
		collapseSimple: true,  // if true, legend entries that are from a simple renderer will use compact presentation
		detectStretched: true,  // if true, will test to see if legend entries look stretched.  These are usually in sets of 3 with the middle element having no label.
		collapsedOnInit: true,  // if true, legends will be collapsed when a new instance is initialized.
		defaultOpacity: 0.5, // default opacity for layers in specified in legends.
		visibleIcon: '',// 'leaflet-html-legend-icon-eye',  // css class for the visible icon on opacity slider
		hiddenIcon: '',//'leaflet-html-legend-icon-eye-slash',  // css class for the hidden icon on opacity slider
		toggleIcon:'',// 'leaflet-html-legend-icon-eye-slash'  // css class for the icon on visibility toggle button
	});
	map.addControl(htmlLegend8);
// leyenda mapa7	
var htmlLegend7 = L.control.htmllegend({
		position: 'bottomleft',
		legends: [{
			name: "<h5><em>Clicar para plegar/desplegar la leyenda</em><h/5><h4>"+'Vulnerabilidad a la contaminación atmosférica de la población total'+"<\h4>",
			style: style7,
			layer: mapa7,
			elements: [{
				label:"<h4>"+  '<img src=images/pob_tot.png width="215" height ="300">'+"<\h4>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
				label:"<h5>"+  'Fuente: European Monitoring and Evaluation Programme (EMEP)'+"<\h5>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'},																
			}]
		}],
		collapseSimple: true,  // if true, legend entries that are from a simple renderer will use compact presentation
		detectStretched: true,  // if true, will test to see if legend entries look stretched.  These are usually in sets of 3 with the middle element having no label.
		collapsedOnInit: true,  // if true, legends will be collapsed when a new instance is initialized.
		defaultOpacity: 0.5, // default opacity for layers in specified in legends.
		visibleIcon: '',// 'leaflet-html-legend-icon-eye',  // css class for the visible icon on opacity slider
		hiddenIcon: '',//'leaflet-html-legend-icon-eye-slash',  // css class for the hidden icon on opacity slider
		toggleIcon:'',// 'leaflet-html-legend-icon-eye-slash'  // css class for the icon on visibility toggle button
	});
	map.addControl(htmlLegend7);

// leyenda mapa6	
var htmlLegend6 = L.control.htmllegend({
		position: 'bottomleft',
		legends: [{
			name: "<h5><em>Clicar para plegar/desplegar la leyenda</em><h/5><h4>"+'Clases multivariantes de exposición a la contaminación atmosférica'+"<\h4>",
			style: style6,
			layer: mapa6,
			elements: [{
				label:"<h4>"+  '<img src=images/tipi.png width="215" height ="215">'+"<\h4>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
				//label:"<h5>"+  ''+"<\h5>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
				label:"<h5>"+  'Fuente: European Monitoring and Evaluation Programme (EMEP)'+"<\h5>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'},																
			}]
		}],
		collapseSimple: true,  // if true, legend entries that are from a simple renderer will use compact presentation
		detectStretched: true,  // if true, will test to see if legend entries look stretched.  These are usually in sets of 3 with the middle element having no label.
		collapsedOnInit: true,  // if true, legends will be collapsed when a new instance is initialized.
		defaultOpacity: 0.5, // default opacity for layers in specified in legends.
		visibleIcon: '',// 'leaflet-html-legend-icon-eye',  // css class for the visible icon on opacity slider
		hiddenIcon: '',//'leaflet-html-legend-icon-eye-slash',  // css class for the hidden icon on opacity slider
		toggleIcon:'',// 'leaflet-html-legend-icon-eye-slash'  // css class for the icon on visibility toggle button
	});
	map.addControl(htmlLegend6);
// leyenda mapa5	
var htmlLegend5 = L.control.htmllegend({
		position: 'bottomleft',
		legends: [{
			name: "<h5><em>Clicar para plegar/desplegar la leyenda</em><h/5><h4>"+'Depósito atmosférico total de nitrógeno. Promedio anual 2000-2013'+"<\h4>",
			style: style5,
			layer: mapa5,
			elements: [{
				label:"<h4>"+  'Unidades: kg/ha'+"<\h4>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
				label:"<h4>"+  '2,6 - 4'+"<\h4>",html: '',style: {'background-color': '#C2523C','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label:"<h4>"+  '4,1 - 5'+"<\h4>",html: '',style: {'background-color': '#EEA113','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label:"<h4>"+  '5,1 - 6'+"<\h4>",html: '',style: {'background-color': '#FFFF00','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label:"<h4>"+  '6,1 - 8'+"<\h4>",html: '',style: {'background-color': '#00DC00','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label:"<h4>"+  '8,1 - 12'+"<\h4>",html: '',style: {'background-color': '#209A8F','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {		
				label:"<h4>"+  '12,1 - 19,8'+"<\h4>",html: '',style: {'background-color': '#0B2C7B','width': '40px','height': '14px', 'border': 'black 1px solid'}}, { 
				label:"<h5>"+  ''+"<\h5>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
				//label:"<h5>"+  ''+"<\h5>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
				label:"<h5>"+  'Fuente: European Monitoring and Evaluation Programme (EMEP)'+"<\h5>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'},																
			}]
		}],
		collapseSimple: true,  // if true, legend entries that are from a simple renderer will use compact presentation
		detectStretched: true,  // if true, will test to see if legend entries look stretched.  These are usually in sets of 3 with the middle element having no label.
		collapsedOnInit: true,  // if true, legends will be collapsed when a new instance is initialized.
		defaultOpacity: 0.5, // default opacity for layers in specified in legends.
		visibleIcon: '',// 'leaflet-html-legend-icon-eye',  // css class for the visible icon on opacity slider
		hiddenIcon: '',//'leaflet-html-legend-icon-eye-slash',  // css class for the hidden icon on opacity slider
		toggleIcon:'',// 'leaflet-html-legend-icon-eye-slash'  // css class for the icon on visibility toggle button
	});
	map.addControl(htmlLegend5);
// leyenda mapa4	
var htmlLegend4 = L.control.htmllegend({
		position: 'bottomleft',
		legends: [{
			name: "<h5><em>Clicar para plegar/desplegar la leyenda</em><h/5><h4>"+'Concentración atmosférica de amoníaco (O<sub>3</sub>). Promedio anual 2000-2013'+"<\h4>",
			style: style4,
			layer: mapa4,
			elements: [{
				label:"<h4>"+  'Unidades: ppb'+"<\h4>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
				label:"<h4>"+  '32,1 - 32,5'+"<\h4>",html: '',style: {'background-color': '#C2523C','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label:"<h4>"+  '32,6 - 35'+"<\h4>",html: '',style: {'background-color': '#EEA113','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label:"<h4>"+  '35,1 - 37,5'+"<\h4>",html: '',style: {'background-color': '#FFFF00','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label:"<h4>"+  '37,5 - 40'+"<\h4>",html: '',style: {'background-color': '#00DC00','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label:"<h4>"+  '40,1 - 42,5'+"<\h4>",html: '',style: {'background-color': '#209A8F','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {		
				label:"<h4>"+  '42,6 - 47,5'+"<\h4>",html: '',style: {'background-color': '#0B2C7B','width': '40px','height': '14px', 'border': 'black 1px solid'}}, { 
				label:"<h5>"+  ''+"<\h5>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
				//label:"<h5>"+  ''+"<\h5>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
				label:"<h5>"+  'Fuente: European Monitoring and Evaluation Programme (EMEP)'+"<\h5>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'},																
			}]
		}],
		collapseSimple: true,  // if true, legend entries that are from a simple renderer will use compact presentation
		detectStretched: true,  // if true, will test to see if legend entries look stretched.  These are usually in sets of 3 with the middle element having no label.
		collapsedOnInit: true,  // if true, legends will be collapsed when a new instance is initialized.
		defaultOpacity: 0.5, // default opacity for layers in specified in legends.
		visibleIcon: '',// 'leaflet-html-legend-icon-eye',  // css class for the visible icon on opacity slider
		hiddenIcon: '',//'leaflet-html-legend-icon-eye-slash',  // css class for the hidden icon on opacity slider
		toggleIcon:'',// 'leaflet-html-legend-icon-eye-slash'  // css class for the icon on visibility toggle button
	});
	map.addControl(htmlLegend4);
// leyenda mapa3	
var htmlLegend3 = L.control.htmllegend({
		position: 'bottomleft',
		legends: [{
			name: "<h5><em>Clicar para plegar/desplegar la leyenda</em><h/5><h4>"+'Concentración atmosférica de amoníaco (NH<sub>3</sub>) y amonio (NH<sub>4</sub><sup>+</sup>). Promedio anual 2000-2013'+"<\h4>",
			style: style3,
			layer: mapa3,
			elements: [{
				label:"<h4>"+  'Unidades: µg/m<sup>3</sup>'+"<\h4>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
				label:"<h4>"+  '0,5 - 0,75'+"<\h4>",html: '',style: {'background-color': '#C2523C','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label:"<h4>"+  '0,76 - 1'+"<\h4>",html: '',style: {'background-color': '#EEA113','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label:"<h4>"+  '1,01 - 1,25'+"<\h4>",html: '',style: {'background-color': '#FFFF00','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label:"<h4>"+  '1,26 - 1,5'+"<\h4>",html: '',style: {'background-color': '#00DC00','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label:"<h4>"+  '1,51 - 2'+"<\h4>",html: '',style: {'background-color': '#209A8F','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {		
				label:"<h4>"+  '2,01 - 3,7'+"<\h4>",html: '',style: {'background-color': '#0B2C7B','width': '40px','height': '14px', 'border': 'black 1px solid'}}, { 
				label:"<h5>"+  ''+"<\h5>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
				//label:"<h5>"+  ''+"<\h5>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
				label:"<h5>"+  'Fuente: European Monitoring and Evaluation Programme (EMEP)'+"<\h5>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'},																
			}]
		}],
		collapseSimple: true,  // if true, legend entries that are from a simple renderer will use compact presentation
		detectStretched: true,  // if true, will test to see if legend entries look stretched.  These are usually in sets of 3 with the middle element having no label.
		collapsedOnInit: true,  // if true, legends will be collapsed when a new instance is initialized.
		defaultOpacity: 0.5, // default opacity for layers in specified in legends.
		visibleIcon: '',// 'leaflet-html-legend-icon-eye',  // css class for the visible icon on opacity slider
		hiddenIcon: '',//'leaflet-html-legend-icon-eye-slash',  // css class for the hidden icon on opacity slider
		toggleIcon:'',// 'leaflet-html-legend-icon-eye-slash'  // css class for the icon on visibility toggle button
	});
	map.addControl(htmlLegend3);
// leyenda mapa2	
var htmlLegend2 = L.control.htmllegend({
		position: 'bottomleft',
		legends: [{
			name: "<h5><em>Clicar para plegar/desplegar la leyenda</em><h/5><h4>"+'Concentración atmosférica de dióxido de nitrogeno (NO<sub>2</sub>). Promedio anual 2000-2013'+"<\h4>",
			style: style2,
			layer: mapa2,
			elements: [{
				label:"<h4>"+  'Unidades: µg/m<sup>3</sup>'+"<\h4>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
				label:"<h4>"+  '0,43 - 0,75'+"<\h4>",html: '',style: {'background-color': '#C2523C','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label:"<h4>"+  '0,76 - 1'+"<\h4>",html: '',style: {'background-color': '#EEA113','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label:"<h4>"+  '1,01 - 1,25'+"<\h4>",html: '',style: {'background-color': '#FFFF00','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label:"<h4>"+  '1,26 - 1,5'+"<\h4>",html: '',style: {'background-color': '#00DC00','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label:"<h4>"+  '1,51 - 3'+"<\h4>",html: '',style: {'background-color': '#209A8F','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {		
				label:"<h4>"+  '3,01 - 6,11'+"<\h4>",html: '',style: {'background-color': '#0B2C7B','width': '40px','height': '14px', 'border': 'black 1px solid'}}, { 
				label:"<h5>"+  ''+"<\h5>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
				//label:"<h5>"+  ''+"<\h5>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
				label:"<h5>"+  'Fuente: European Monitoring and Evaluation Programme (EMEP)'+"<\h5>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'},																
			}]
		}],
		collapseSimple: true,  // if true, legend entries that are from a simple renderer will use compact presentation
		detectStretched: true,  // if true, will test to see if legend entries look stretched.  These are usually in sets of 3 with the middle element having no label.
		collapsedOnInit: true,  // if true, legends will be collapsed when a new instance is initialized.
		defaultOpacity: 0.5, // default opacity for layers in specified in legends.
		visibleIcon: '',// 'leaflet-html-legend-icon-eye',  // css class for the visible icon on opacity slider
		hiddenIcon: '',//'leaflet-html-legend-icon-eye-slash',  // css class for the hidden icon on opacity slider
		toggleIcon:'',// 'leaflet-html-legend-icon-eye-slash'  // css class for the icon on visibility toggle button
	});
	map.addControl(htmlLegend2);
// leyenda mapa1	
var htmlLegend1 = L.control.htmllegend({
		position: 'bottomleft',
		legends: [{
			name: "<h5><em>Clicar para plegar/desplegar la leyenda</em><h/5><h4>"+'Concentración atmosférica de dióxido de azufre (SO<sub>2</sub>). Promedio anual 2000-2013'+"<\h3>",
			style: style1,
			layer: mapa1,
			elements: [{
				label:"<h4>"+  'Unidades: µg/m<sup>3</sup>'+"<\h4>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
				label:"<h4>"+  '0,13 - 0,2'+"<\h4>",html: '',style: {'background-color': '#C2523C','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label:"<h4>"+  '0,21 - 0,4'+"<\h4>",html: '',style: {'background-color': '#EEA113','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label:"<h4>"+  '0,41 - 0,80'+"<\h4>",html: '',style: {'background-color': '#FFFF00','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label:"<h4>"+  '0,81 - 1,6'+"<\h4>",html: '',style: {'background-color': '#00DC00','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label:"<h4>"+  '1,61 - 3,2'+"<\h4>",html: '',style: {'background-color': '#209A8F','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {		
				label:"<h4>"+  '3,21 - 6,53'+"<\h4>",html: '',style: {'background-color': '#0B2C7B','width': '40px','height': '14px', 'border': 'black 1px solid'}}, { 
				label:"<h5>"+  ''+"<\h5>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
				//label:"<h5>"+  ''+"<\h5>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
				label:"<h5>"+  'Fuente: European Monitoring and Evaluation Programme (EMEP)'+"<\h5>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'},																
			}]
		}],
		collapseSimple: true,  // if true, legend entries that are from a simple renderer will use compact presentation
		detectStretched: true,  // if true, will test to see if legend entries look stretched.  These are usually in sets of 3 with the middle element having no label.
		collapsedOnInit: true,  // if true, legends will be collapsed when a new instance is initialized.
		defaultOpacity: 0.5, // default opacity for layers in specified in legends.
		visibleIcon: '',// 'leaflet-html-legend-icon-eye',  // css class for the visible icon on opacity slider
		hiddenIcon: '',//'leaflet-html-legend-icon-eye-slash',  // css class for the hidden icon on opacity slider
		toggleIcon:'',// 'leaflet-html-legend-icon-eye-slash'  // css class for the icon on visibility toggle button
	}).addTo(map);
	map.addControl(htmlLegend1);

//Visualizar capas
// L.control.layers(baseLayers, overlays,{collapsed:true, position: 'topright',}).addTo(map);
L.control.layers.tree(baseTree, overlayTree).addTo(map);

//boton de informacion 
var button2 = new L.Control.Button(L.DomUtil.get('helpbutton2'), { toggleButton: 'active', position: 'topright'});
	button2.addTo(map);
	button2.on('click', function () {
	 if (button2.isToggled()) {
			sidebar2.hide();
		} else {
			sidebar2.show();
		}
	});