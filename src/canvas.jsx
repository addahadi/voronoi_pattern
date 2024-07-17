import React, { useEffect, useRef } from 'react'
import { Delaunay , Voronoi } from 'd3'
import { zippedPoint } from './utils/utlis'
import Victor from 'victor'

const Canvas = ({ draw }) => {
  const ref = useRef(null);
  const seeds = [];
  const Velo = [];

  // Initialize seeds and velocities
  for (let i = 0; i < 100; i++) {
    seeds[i] = new Victor(Math.random() * 600, Math.random() * 600);
    Velo[i] = new Victor(Math.random(), Math.random()).multiplyScalar(Math.random() * 0.75 + 0.25);
  }

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");

    let animatedFrame;

    // Function to render each frame
    function render() {
      ctx.clearRect(0, 0, 600, 600); // Clear canvas

      // Call draw function to update and draw points
      draw(seeds, Velo, ctx);

      // Recalculate Voronoi cells
      const delaunay = zippedPoint(seeds);
      const voronoi = delaunay.voronoi([0, 0, 600, 600]);
      const polygons = voronoi.cellPolygons();
      
      // Draw Voronoi cells
      ctx.strokeStyle = 'white';
      for (let poly of polygons) {
        ctx.beginPath();
        ctx.moveTo(poly[0][0], poly[0][1]);
        for (let i = 1; i < poly.length; i++) {
          ctx.lineTo(poly[i][0], poly[i][1]);
        }
        ctx.closePath();
        ctx.stroke();
      }

      animatedFrame = requestAnimationFrame(render);
      console.log("hi")
    }

    // Start rendering loop
    render();

    // Clean up animation frame
    return () => {
      cancelAnimationFrame(animatedFrame);
    };
  }, [draw]);
  return (
    <canvas ref={ref} width={600} height={600} style={{ backgroundColor: "black" }}></canvas>
  );
}

export default Canvas;