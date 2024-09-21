import { Component } from '@angular/core';

@Component({
  selector: 'app-birthday-card',
  templateUrl: './birthday-card.component.html',
  styleUrls: ['./birthday-card.component.css']
})
export class BirthdayCardComponent {
  showVoucher = false; // Controla el cambio entre las cartas
  isFlipped = false;   // Controla si la tarjeta está volteada

  // Alternar entre las cartas al hacer clic
  toggleCard() {
    this.isFlipped = !this.isFlipped; // Voltea la tarjeta
    this.playSound();
    if (this.isFlipped) {
      this.showVoucher = !this.showVoucher; // Alternar entre la primera y segunda carta
      this.launchFireworks(); // Lanza los fuegos artificiales cuando cambia la carta
    }
  }

  // Función para reproducir sonido
  playSound() {
    const audio = new Audio('./sound.mp3'); // Ruta del archivo de sonido
    audio.play();
  }

  // Función para lanzar los fuegos artificiales
  launchFireworks() {
    const duration = 5 * 1000; // Duración de 5 segundos
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);

      // Disparar confetti desde dos orígenes
      (window as any).confetti(Object.assign({}, defaults, {
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      }));
      (window as any).confetti(Object.assign({}, defaults, {
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      }));
    }, 250);
  }
}
