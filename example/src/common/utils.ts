export function resetCanvas(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) {
    const devicePixelRatio = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * devicePixelRatio;
    canvas.height = window.innerHeight * devicePixelRatio;
    canvas.style.height = `${window.innerHeight}px`;
    canvas.style.width = `${window.innerWidth}px`;
    context.scale(devicePixelRatio, devicePixelRatio);
}