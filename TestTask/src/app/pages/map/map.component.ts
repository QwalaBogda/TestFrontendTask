import { Component, OnInit, OnDestroy, inject } from '@angular/core'; 
import * as L from 'leaflet'; 
import { NgIf } from '@angular/common'; 
import { ApiService } from '../../services/auth/api.service';
import { PositionsStore } from '../../services/positions.store';
import { Router } from '@angular/router';
import { AuthStore } from '../../services/auth/store/auth.store';

const iconUrl = 'assets/marker-icon.png';
const iconRetinaUrl = 'assets/marker-icon-2x.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = L.icon({
  iconUrl,
  iconRetinaUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = iconDefault;

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent {
  store = inject(PositionsStore); 
  private api = inject(ApiService); 
  private auth = inject(AuthStore);
  private router = inject(Router);
  private map?: L.Map; 
  private markersLayer = L.layerGroup();
  private updateInterval: any; 
 
  ngOnInit() { 
    this.initMap(); 
    this.store.load(); 
    this.renderMarkers(); 
 
    this.updateInterval = setInterval(() => {
      this.store.load();
      this.renderMarkers();
    }, 10000); 
  } 
 
  ngOnDestroy() { 
    this.map?.remove(); 
  } 
 
  initMap() { 
    this.map = L.map('map').setView([	56.0184, 92.8672], 12);
 
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { 
      maxZoom: 19, 
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' 
    }).addTo(this.map); 
 
    this.markersLayer.addTo(this.map); 
 
    this.map.on('click', (e: L.LeafletMouseEvent) => { 
      if (!this.auth.isLoggedIn()) {
        this.router.navigateByUrl('/login');
        return;
      }

      const name = window.prompt('Имя точки:'); 
      if (!name) return; 
 
      const { lat, lng } = e.latlng; 
      const latitude = parseFloat(lat.toFixed(7))
      const longitude = parseFloat(lng.toFixed(7))
      this.api.addPosition(name, latitude, longitude).subscribe({ 
        next: (created) => { 
          this.store.add(created); 
          this.addMarker(created); 
        }, 
        error: _ => { 
          alert('Не удалось сохранить точку (нужно войти?)'); 
        } 
      }); 
    }); 
  } 
 
  renderMarkers() { 
    if (!this.map) return; 
    this.markersLayer.clearLayers(); 
    for (const p of this.store.points()) { 
      this.addMarker(p); 
    } 
  } 
 
  addMarker(p: { name: string; latitude: number; longitude: number; }) { 
    const m = L.marker([p.latitude, p.longitude]); 
    m.bindTooltip(p.name); 
    m.addTo(this.markersLayer); 
  } 
}
