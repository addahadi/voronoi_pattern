import { useState } from 'react'
import './App.css'
import Canvas from './canvas'




function App() {
  function draw(seeds , Velo , ctx){
    for (let i = 0; i < seeds.length; i++) {
      let p = seeds[i];
      let v = Velo[i];;
      ctx.fillStyle = "white";

  
      p.add(v);
      if (p.x > 600 || p.x < 0) {
        v.x *= -1;
      }
      if (p.y > 600 || p.y < 0) {
        v.y *= -1;
      }
  
    }
  }
  return (
    <Canvas draw = {draw}/>
  )
}

export default App
