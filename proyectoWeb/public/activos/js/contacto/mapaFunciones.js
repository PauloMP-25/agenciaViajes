// js/contacto/mapaFunciones.js
import { regiones } from './ubicaciones.js';
import { estiloNoche } from './mapaConfig.js';

let map, marker, infoWindow;

export function initMap() {
  console.log("🗺️ initMap() se está ejecutando");

  const defaultRegion = regiones["ICA"];
  
  if (!defaultRegion) {
    console.error("❌ No se encontró la región por defecto: LIMA");
    return;
  }

  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: defaultRegion.lat, lng: defaultRegion.lng },
    zoom: 15,
    mapTypeId: "satellite",
    styles: estiloNoche
  });

  console.log("✅ Mapa inicializado correctamente");

  infoWindow = new google.maps.InfoWindow();

  marker = new google.maps.Marker({
    position: { lat: defaultRegion.lat, lng: defaultRegion.lng },
    map,
    title: defaultRegion.direccion,
  });

  marker.addListener("click", () => {
    mostrarInfoWindow("LIMA");
  });

  const mensaje = document.getElementById("mensaje-sucursal");
  mensaje.textContent = `Sucursal encontrada: ${defaultRegion.direccion}`;
  mensaje.style.color = "green";
}

export function mostrarInfoWindow(region) {
  console.log("ℹ️ Mostrando InfoWindow para:", region);
  const data = regiones[region];
  if (!data) {
    console.warn("⚠️ Región no válida para InfoWindow:", region);
    return;
  }

  const contenido = `
    <div style="font-family:sans-serif;">
      <strong>${data.direccion}</strong><br>
      Tel: <a href="tel:${data.telefono}">${data.telefono}</a><br>
      Email: <a href="mailto:${data.email}">${data.email}</a>
    </div>
  `;
  infoWindow.setContent(contenido);
  infoWindow.open(map, marker);
}

export function cambiarUbicacion(region) {
  const data = regiones[region];
  const mensaje = document.getElementById("mensaje-sucursal");

  if (!data) {
    mensaje.textContent = "Lo sentimos, no tenemos sucursal en esta región aún.";
    mensaje.style.color = "red";
    if (marker) marker.setMap(null);
    return;
  }

  const nuevaPos = { lat: data.lat, lng: data.lng };
  map.setCenter(nuevaPos);
  map.setZoom(16);
  marker.setPosition(nuevaPos);
  marker.setMap(map);
  marker.setTitle(data.direccion);

  mensaje.textContent = `Sucursal encontrada: ${data.direccion}`;
  mensaje.style.color = "green";

  marker.addListener("click", () => mostrarInfoWindow(region));
  mostrarInfoWindow(region);
}
