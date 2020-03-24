// d3.json("/data/samples.json").then(function(data){
//     //console.log(data);
//     var samples = data.samples;
//     console.log(samples);

//     var top10Values = samples[0].sample_values.slice(0,10);

//    console.log(top10Values);

//     top10Values = top10Values.reverse();
//     // console.log(top10Values);

//     var test =samples[0].otu_ids.slice(0,10);
//     console.log(test);

//     var testing = samples[0].otu_labels.slice(0,10);
//     console.log(testing);

//     var trace1 = {
//         x: top10Values,
//         y: test,
//         text: testing,
//         type: "bar",
//         orientation: "h"
//     }
    
//     graphData = [trace1];

//     Plotly.newPlot("bar", graphData);

  
//});

function drawBarGraph(sampleID){

    console.log(`draw bar graph(${sampleID})`);
}

function drawBubble(sampleID){
    console.log(`draw bubble(${sampleID})`);
}

function showMeta(sampleID){
    console.log(`meta data${sampleID})`);
}

function optionChanged(newSampleId){
    
    console.log(`user selected ${newSampleID}`);
    drawBarGraph(newSampleId);
    drawBubble(newSampleId);
    showMeta(newSampleId);
}


function initDashboard(){

    console.log("initializing dashboard...");

    var selector = d3.select("selDataset");

    d3.json("/data/samples.json").then((data)=>{
        console.log(data);
        var sampleNames = data.names;
        
        sampleNames.forEach((sampleID) => {
            selector.append("option")
                .text(sampleID)
                .property("value", sampleID);
        });

    });

}

initDashboard();
