'use client';

import React, { useEffect, useRef } from 'react';

export default function RedLineCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDrawing = useRef(false);
  const lastPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const updateSize = () => {
      // Save canvas content
      const tempCanvas = document.createElement('canvas');
      const tempCtx = tempCanvas.getContext('2d');
      tempCanvas.width = canvas.width;
      tempCanvas.height = canvas.height;
      if (tempCtx) tempCtx.drawImage(canvas, 0, 0);

      // Resize
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      // Restore content
      ctx.drawImage(tempCanvas, 0, 0);
    };

    // Initial size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    window.addEventListener('resize', updateSize);

    const onMouseMove = (e: MouseEvent) => {
      if (!isDrawing.current) {
        lastPos.current = { x: e.clientX, y: e.clientY };
        isDrawing.current = true;
      }

      ctx.beginPath();
      ctx.moveTo(lastPos.current.x, lastPos.current.y);
      ctx.lineTo(e.clientX, e.clientY);
      ctx.strokeStyle = '#ff0000';
      // Match the very thin, sharp line seen on lqve.jp
      ctx.lineWidth = 1;
      ctx.lineCap = 'butt';
      ctx.lineJoin = 'miter';
      ctx.stroke();

      lastPos.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseEnter = (e: MouseEvent) => {
      lastPos.current = { x: e.clientX, y: e.clientY };
      isDrawing.current = true;
    };

    const onMouseLeave = () => {
      isDrawing.current = false;
    };

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseenter', onMouseEnter);
    document.addEventListener('mouseleave', onMouseLeave);

    return () => {
      window.removeEventListener('resize', updateSize);
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-50 w-full h-full"
    />
  );
}
