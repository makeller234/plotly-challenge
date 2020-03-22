d3.json("/data/samples.json").then(function(data){
    //console.log(data);
    var samples = data.samples;
    console.log(samples);

    var top10Values = samples[0].sample_values.slice(0,10);

    // console.log(top10Values);

    top10Values = top10Values.reverse();
    console.log(top10Values);

    var trace1 = {
        x: top10Values.map(obj =>obj.sample_values),
        y: top10Values.map(obj => obj.uto_ids),
        text: top10Values.map(obj => obj.uto_labels),
        type: "bar",
        orientation: "h"
    }
    
    graphData = [trace1];

    Plotly.newPlot("bar", graphData);

  
});
