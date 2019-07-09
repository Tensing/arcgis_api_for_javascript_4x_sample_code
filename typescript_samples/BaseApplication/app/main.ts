import Basemap from "esri/Basemap";
import BasemapGallery from "esri/widgets/BasemapGallery";
import Compass from "esri/widgets/Compass";
import Expand from "esri/widgets/Expand";
import Home from "esri/widgets/Home";
import LocalBasemapsSource from "esri/widgets/BasemapGallery/support/LocalBasemapsSource";
import Locator from "esri/tasks/Locator";
import Map from "esri/Map";
import MapView from "esri/views/MapView";
import Point from "esri/geometry/Point";
import Search from "esri/widgets/Search";
import SearchSource from "esri/widgets/Search/SearchSource";

// Basemaps Esr Nederland
const lightGrayCanvas_RD_EsriNL = new Basemap({portalItem: {id: "9ff6521e85d24df1aa9cd4aebfef748b"}}); //Lichtgrijze Canvas RD
const darkGrayCanvas_RD_EsriNL = new Basemap({portalItem: {id: "62a3befb579e4d9f9c5c51576c8a7c25"}}); //Donkergrijze Canvas RD
const topo_RD_EsriNL = new Basemap({portalItem: {id: "7aea6fa913a94176a1074edb40690318"}}); //Topo RD
const open_Topo_RD_EsriNL = new Basemap({portalItem: {id: "0698b71eb7cf47898086d072e574ac32"}}); //Open Topo RD
const stratenkaart_RD_EsriNL = new Basemap({portalItem: {id: "9fe1a753955f418fa1cbaf1c47610a47"}}); //Stratenkaart RD
const luchtfoto_RD_EsriNL = new Basemap({portalItem: {id: "38e1a1c6ee2c421290622400d22ecf57"}}); //Luchtfoto RD

const esriNLBasemaps = new LocalBasemapsSource({
  basemaps : [topo_RD_EsriNL, open_Topo_RD_EsriNL, stratenkaart_RD_EsriNL, luchtfoto_RD_EsriNL, lightGrayCanvas_RD_EsriNL, darkGrayCanvas_RD_EsriNL]
});

// Map
const map = new Map({
  basemap: topo_RD_EsriNL	  
});

// View
const view = new MapView({
  spatialReference: {wkid: 28992},
  map: map,
  container: "viewDiv",
  center: new Point({ x: 155000, y: 463000, spatialReference: {wkid: 28992}}),
  zoom: 3
});

// Basemapgallery
const basemapGallery = new BasemapGallery({
  view: view,
  source: esriNLBasemaps
});

const basemapGalleryExpand = new Expand({
  expandIconClass: "esri-icon-basemap",
  expandTooltip: basemapGallery.label,
  view: view,
  content: basemapGallery,
  group: "top-right"
});

// Search
const sources = [{
  locator: new Locator({ url: "https://services.arcgisonline.nl/arcgis/rest/services/Geocoder_BAG_RD/GeocodeServer"}), // GeocodeServer van Esri Nederland
  singleLineFieldName: "SingleLine", // Deze optie zorgt er voor dat je kunt zoeken op postcode/huisnummer combinatie, bijvoorbeeld: 4181 AE 38
  placeholder: "Adres of plaats zoeken"
}];

const searchWidget = new Search({
  view: view,
  includeDefaultSources: false,
  sources: sources
});

const searchWidgetExpand = new Expand({
  expandIconClass: "esri-icon-search",
  expandTooltip: searchWidget.label,
  view: view,
  content: searchWidget,
  expanded: true,
  group: "top-right"
});

// Add expandable widgets to same group in view
view.ui.add([searchWidgetExpand, basemapGalleryExpand], "top-right");

// Home
var homeWidget = new Home({
  view: view
});
      
view.ui.add(homeWidget, "top-left");

// Compass
const compass = new Compass({
  view: view
});

view.ui.add(compass, "top-left");



