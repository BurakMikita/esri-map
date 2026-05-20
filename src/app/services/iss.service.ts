import { Injectable, signal } from '@angular/core';

export interface IssPosition {
  latitude: number;
  longitude: number;
  altitude: number;
  velocity: number;
  timestamp: Date;
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
      
      // Aggiunge la nuova posizione all'inizio dell'array (indice 0)
      this.history.update(currentHistory => [newPos, ...currentHistory]);
    } catch (error) {
      console.error('Errore nel recupero della posizione ISS:', error);
    }
  }

  issLive3DPosition = signal<{latitude: number, longitude: number} | null>(null);
  private live3DInterval: any;

  async fetchOpenNotifyPosition() {
    try {
      const response = await fetch('http://api.open-notify.org/iss-now.json');
      const data = await response.json();
      
      if (data.message === 'success') {
        const pos = {
          latitude: parseFloat(data.iss_position.latitude),
          longitude: parseFloat(data.iss_position.longitude)
        };
        this.issLive3DPosition.set(pos);
        return pos;
      }
    } catch (error) {
      console.error('Errore API open-notify:', error);
    }
    return null;
  }

  startLive3DTracking() {
    this.fetchOpenNotifyPosition();
    this.live3DInterval = setInterval(() => {
      this.fetchOpenNotifyPosition();
    }, 10000);
  }

  stopLive3DTracking() {
    if (this.live3DInterval) {
      clearInterval(this.live3DInterval);
    }
  }
}
