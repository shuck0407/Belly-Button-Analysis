
// Function that changes event when a new sample is selected 
// (i.e. fetch data for the newly selected sample)
function bbChanged(newbb) {

    // Define the Flask routes that need to happen for a change in button
    var bbURL = `/samples/${newbb}`;

    // Fetch the JSON data for the new sample and console log it       
    d3.json(bbURL, function(error, response) {
        if(error) {return console.warn(error);}
        console.log(response);  
<<<<<<< HEAD
        

        //First update the metadata table
        var metadata = response['meta'];
        console.log(metadata);
        // Select the table with id of `#sample-metadata` using d3
              var table = d3.select("#sample-metadata");
          
              // Use `.html("") to clear any existing metadata
              table.html("");
          
              // Use `Object.entries` to add each key and value pair to the panel
              
              Object.entries(metadata).forEach(([key, value]) => {
                table.append("h6").text(`${key}: ${value}`);
              });
        
                 
=======

        //get the metadata and build the table
        var meta_data = response['meta'];
        var tbody = d3.select("tbody");
   
        Object.entries(meta_data).forEach(function([key, value]) {
            console.log(key, value)
            var row = tbody.append("tr class="bold"");     
            var cell = tbody.append("td");
            cell.text(`${key}: ${value}`);
            var row = tbody.append("tr"); 
        });
       
              
>>>>>>> ed4e85caf8b4647c8ba35388e4e733097fc952c3
        // Grab values from the response json object to build the pie chart
        var pie_response = response['pie'];
        var data = [pie_response];
        console.log(data);
        var layout = {title: '<b>Top 10 Bacteria Found in Belly Button</b>'};
        var pie_chart_div = document.querySelector(".bb-pie");

        Plotly.newPlot(pie_chart_div, data, layout);

        // Grab values from the response json object to build the bubble chart
        var bubble_response = response['bubble'];
        var bubble_data = bubble_response['data'];
        var bubble_layout = bubble_response['layout']
        
        console.log(bubble_response, bubble_data, bubble_layout);
        
        var bubble_chart_div = document.querySelector(".bb-bubble");

        Plotly.newPlot(bubble_chart_div, bubble_data, bubble_layout);

       
    });
};

function init() {
      // create a URL variable for the buttons Flask route
      var buttonURL = '/buttons';
<<<<<<< HEAD
      
      //Use d3 to populate the dropdown list of belly buttons
      d3.json(buttonURL, function(error, response) {
=======

      //Use Plotly and d3 to populate the dropdown list of belly buttons
      Plotly.d3.json(buttonURL, function(error, response) {
>>>>>>> ed4e85caf8b4647c8ba35388e4e733097fc952c3
          if (error) {
              return console.warn(error);
          };
      
<<<<<<< HEAD
          var firstSample = response[0];
          console.log(firstSample);

          var buttons = d3.select('#selDataset')
          response.forEach((metavalue) => {
              buttons.append('option')
                     .text(metavalue) 
                     .property('value', metavalue);
             });
          
      
          d3.select('#selDataset').on('change', function() {
=======
          console.log(response);

          var firstSample = response[0];
          console.log(firstSample);
      
          Plotly.d3.select("#selDataset")
                  .append('option')
                  .attr('selected', 'true')
                  .attr('disabled', 'true')
                  .text('BB');
              
          var buttons = Plotly.d3.select('#selDataset').selectAll('option').data(response);
          buttons.enter()
                  .append('option')
                  .attr('value', d => d)
                  .text(d => d);
      
          Plotly.d3.select('#selDataset').on('change', function() {
>>>>>>> ed4e85caf8b4647c8ba35388e4e733097fc952c3
              var newbb = this.options[this.selectedIndex].value;
              bbChanged(newbb);
              });


        // Use the first sample from the list to build the initial plots
        bbChanged(firstSample);

        });

    
};

init();

