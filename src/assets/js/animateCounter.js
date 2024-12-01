export class AnimateCounter {
  constructor(target, endValue, duration) {
    this.startTime = performance.now();
    this.counterElement = target;
    this.endValue = endValue;
    this.duration = duration;
    this.startAnimation();
  }

  formatNumber(value) {
    if (value >= 10000) {
      const kValue = Math.floor(value / 1000);
      const remainder = value % 10000;
      return `${kValue}k${remainder > 0 ? '+' : ''}`;
    }
    return value;
  }

  update(currentTime) {
    const progress = Math.min((currentTime - this.startTime) / this.duration, 1);
    const currentValue = this.formatNumber(Math.floor(this.endValue * progress));

    this.counterElement.textContent = currentValue;
    if (progress < 1) {
      requestAnimationFrame((time) => this.update(time));
    }
  }

  startAnimation() {
    requestAnimationFrame((time) => this.update(time));
  }
}
