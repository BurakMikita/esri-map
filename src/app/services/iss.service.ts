import { Injectable, signal } from '@angular/core';

export interface IssPosition {
  latitude: number;
  longitude: number;
  altitude: number;
  velocity: number;
  timestamp: Date;
}

export interface SatelliteData {
  name: string;
  tleLine1: string;
  tleLine2: string;
}

@Injectable({
  providedIn: 'root'
})
export class IssService {
  history = signal<IssPosition[]>([]);
  countdown = signal<number>(10);
  hoveredPosition = signal<IssPosition | null>(null);
  
  private timerInterval: any;

  constructor() { }

  setHovered(pos: IssPosition | null) {
    this.hoveredPosition.set(pos);
  }

  startTracking() {
    this.fetchPosition();
    
    this.timerInterval = setInterval(() => {
      const current = this.countdown();
      if (current <= 1) {
        this.fetchPosition();
        this.countdown.set(10);
      } else {
        this.countdown.set(current - 1);
      }
    }, 1000);
  }

  stopTracking() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }

  private async fetchPosition() {
    try {
      const response = await fetch('https://api.wheretheiss.at/v1/satellites/25544');
      const data = await response.json();
      
      const newPos: IssPosition = {
        latitude: data.latitude,
        longitude: data.longitude,
        altitude: data.altitude,
        velocity: data.velocity,
        timestamp: new Date()
      };
      
      // Adds the new position to the beginning of the array (index 0)
      this.history.update(currentHistory => [newPos, ...currentHistory]);
    } catch (error) {
      console.error('Error fetching ISS position:', error);
    }
  }

  issLive3DPosition = signal<{latitude: number, longitude: number} | null>(null);
  celestrakSatellites = signal<SatelliteData[]>([]);
  private live3DInterval: any;

  async loadCelestrakSatellites() {
    try {
      // API to download TLEs in real-time (visual list)
      const response = await fetch('https://celestrak.org/NORAD/elements/gp.php?GROUP=visual&FORMAT=tle');
      const data = await response.text();
      
      const lines = data.split('\n');
      const sats: SatelliteData[] = [];

      for (let i = 0; i < lines.length - 2; i += 3) {
        const name = lines[i].trim();
        const tleLine1 = lines[i + 1].trim();
        const tleLine2 = lines[i + 2].trim();

        if (tleLine1 && tleLine2) {
          sats.push({ name, tleLine1, tleLine2 });
        }
      }
      this.celestrakSatellites.set(sats);
    } catch (error) {
      console.error('Error fetching Celestrak satellites:', error);
    }
  }



}
