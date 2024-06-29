import { Injectable } from '@angular/core';

declare let Plotly: any;

@Injectable({
  providedIn: 'root'
})
export class PlotterService {

  constructor() { }

  public plotLine(title: string, plotDiv: string, x: string[], y: number[]) {

    let trace = {
      x: x,
      y: y,
      type: 'scatter'
    };

    let layout = {
      title: title,
      autosize: false,
      width: 770,
      height: 400,
      margin: {
        l: 50,
        r: 50,
        b: 50,
        t: 50,
        pad: 4
      }
    };

    Plotly.newPlot(plotDiv, [trace], layout);
  }
}

