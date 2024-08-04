import React, { useEffect, useRef } from 'react'
import { Delaunay , Voronoi } from 'd3'
import { zippedPoint } from './utils/utlis'
import Victor from 'victor'

const Canvas = ({ draw }) => {
  const ref = useRef(null);
  const seeds = [];
  const Velo = []
  const Color = ["#6ef8c9" , "#ff6472" , "#5dc1b4"]
  // Initialize seeds and velocities
  for (let i = 0; i < 100; i++) {
    seeds[i] = new Victor(Math.random() *1000, Math.random() * 660);
    Velo[i] = new Victor(Math.random(), Math.random()).multiplyScalar(Math.random() * 0.75 + 0.25);
  }

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");

    let animatedFrame;
    function render(){
      let delaunay = zippedPoint(seeds);
      let voronoi = delaunay.voronoi([0, 0, 1000, 660]);
      let polygons = voronoi.cellPolygons();
      // Function to render each frame
      for (let poly of polygons) {
        // Set random fill color for each cell
        ctx.fillStyle = "black"
        // Begin a new path for each polygon
        ctx.beginPath();
        ctx.moveTo(poly[0][0], poly[0][1]);
        for (let i = 1; i < poly.length; i++) {
            ctx.lineTo(poly[i][0], poly[i][1]);
        }
        ctx.closePath();
    
        // Fill the polygon with the current fill style
        ctx.fill();
    
        // Optionally, you can stroke the outline of the polygon
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 3
        ctx.stroke();
      }
      draw(seeds, Velo , ctx)
      let animatedFrame = requestAnimationFrame(render)
    }  
    render()
    return () => {
      cancelAnimationFrame(animatedFrame);
    };
  }, []);
  return (
    <canvas ref={ref} width={1000} height={660} style={{
      
      backgroundColor: "black", 
      position:"absolute",
      top:"50%",
      left:"50%",
      transform:'translate(-50% , -50%)'
    
    }}></canvas>
  );
}

export default Canvas;