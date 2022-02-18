export function resetCanvas(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) {
    const devicePixelRatio = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * devicePixelRatio;
    canvas.height = window.innerHeight * devicePixelRatio;
    canvas.style.height = `${window.innerHeight}px`;
    canvas.style.width = `${window.innerWidth}px`;
    context.scale(devicePixelRatio, devicePixelRatio);
}

declare global {
    interface Number {
        clamp(min: number, max: number): number;
    }
}

Number.prototype.clamp = function clamp(min: number, max: number) {
    const num = this.valueOf();
    return num < min ? min : this > max ? max : num;
}

export function getPWADisplayMode() {
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
    if (document.referrer.startsWith('android-app://')) {
      return 'twa';
    } else if ((navigator as any).standalone || isStandalone) {
      return 'standalone';
    }
    return 'browser';
  }
  export function iOS() : boolean {
    return [
      'iPad Simulator',
      'iPhone Simulator',
      'iPod Simulator',
      'iPad',
      'iPhone',
      'iPod'
    ].includes(navigator.platform)
    // iPad on iOS 13 detection
    || (navigator.userAgent.includes("Mac") && "ontouchend" in document)
  }