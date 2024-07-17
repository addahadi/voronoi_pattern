import { Delaunay } from "d3";



export function zippedPoint(points){
    let newarr = []
    
    for(let v of points){
        newarr.push(v.x , v.y)
    }
    return new Delaunay(newarr);
}


