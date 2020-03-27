function drawBarGraph(sampleID){

    d3.json("/data/samples.json").then((data) => {

    var samples = data.samples;
    var resultArray = samples.filter(s=>s.id==sampleID);
    var result = resultArray[0];

    var otu_ids=result.otu_ids;
    var otu_labels = result.otu_labels;
    var sample_values = result.sample_values;

    var yticks = otu_ids.slice(0,10).map(otuID =>`OTU ${otuID}`).reverse();

    var barData = {
        x: sample_values.slice(0,10).reverse(),
        y: yticks,
        type: "bar",
        text: otu_labels.slice(0,10).reverse(),
        orientation:"h",
        marker:{
            color:otu_ids
        }
    };

    barArray = [barData];

    var barLayout = {
        title: "Top 10 Bacteria Cultures Found",
        margin: {t: 30, l: 150}
    };

    Plotly.newPlot("bar", barArray, barLayout);


    });

}

function drawBubbleGraph(sampleID){

    d3.json("/data/samples.json").then((data)=>{
        var samples = data.samples;
        var resultArray = samples.filter(s=>s.id==sampleID);
        var result = resultArray[0];
       
        var otu_ids=result.otu_ids;
        var otu_labels = result.otu_labels;
        var sample_values = result.sample_values;

        var bubble = {
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            type: "scatter",
            mode: "markers",
            marker: {
                color: otu_ids,
                size: sample_values
            }
        };

        var bubbleData = [bubble];

        Plotly.newPlot("bubble", bubbleData);

    });
}

function drawGauge(sampleID){
    d3.json("/data/samples.json").then((data)=>{
        var metadata = data.metadata;
        var resultArray = metadata.filter(s=>s.id==sampleID);
        var result = resultArray[0];

        var gaugeData = [
            {
                domain: { x: [0, 1], y: [0, 1] },
                gauge: {
                    axis: {range: [0,10], tickwidth:1, tickcolor:"rgb(180,10,20"},
                    steps:[
                            {range:[0,1], color:"rgb(220, 220, 220)"},
                            {range:[1,2], color:"rgb(231, 209, 191)"},
                            {range:[2,3], color:"rgb(236, 204, 179)"},
                            {range:[3,4],color:"rgb(245, 187, 145)"},
                            {range:[4,5], color:"rgb(245, 172, 123)"},
                            {range:[5,6], color:"rgb(245, 158, 113)"},
                            {range:[6,7], color:"rgb(227, 119, 84)"},
                            {range:[7,8], color:"rgb(217, 97, 73)"},
                            {range:[8,9], color:"rgb(197, 53, 50)"},
                            {range:[9,10], color:"rgb(178, 10, 28)"}

                        ],
                    bar: {color:"rgb(180,10,20"}
                },
                value: result.wfreq,
                title: { text: "Belly Button Washing Frequency <br> Scrubs Per Day"},
                type: "indicator",
                mode: "gauge+number"
            }
        ];
    
        var layout = { width: 600, height: 500, margin: { t: 0, b: 0 } };
        Plotly.newPlot('gauge', gaugeData, layout);

    });
}

function showMeta(sampleID){

    d3.json("/data/samples.json").then((data) =>{

        var metadata = data.metadata;
        var resultArray = metadata.filter(s=>s.id==sampleID);
        var result = resultArray[0];

        var otu_ids=result.otu_ids;
        var otu_labels = result.otu_labels;
        var sample_values = result.sample_values;

        var panel = d3.select("#sample-metadata");

        panel.html("");
        Object.entries(result).forEach(([key,value])=>{
     
            var textToShow = `${key}: ${value}`;
            panel.append("h6").text(textToShow);
        });
        
    });
    
}

function optionChanged(newSampleID){

    drawBarGraph(newSampleID);
    drawBubbleGraph(newSampleID);
    showMeta(newSampleID);
    drawGauge(newSampleID);
}


function initDashboard(){

    console.log("initializing dashboard...");

    var selector = d3.select("#selDataset");

    d3.json("/data/samples.json").then((data)=>{

        var sampleNames = data.names;
        
        
        sampleNames.forEach((sampleID) => {
            selector.append("option")
                .text(sampleID)
                .property("value", sampleID);
        });


    // shows first result on homepage, even before user selects from dropdown.
    var sampleID = sampleNames[0];
    drawBarGraph(sampleID);
    drawBubbleGraph(sampleID);
    showMeta(sampleID);
    drawGauge(sampleID);

    });

}


initDashboard();
