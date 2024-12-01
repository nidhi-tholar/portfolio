// Data
const skillsData = [
  { 
    name: "Languages",
    children: [
      { name: "Python", logo: "images/python-logo.svg" },
      { name: "JavaScript", logo: "images/javascript-logo.svg" },
      { name: "Java", logo: "images/java-logo.svg" },
      { name: "C#", logo: "images/csharp-logo.svg" },
      { name: "TypeScript", logo: "images/typescript-logo.svg" },
      { name: "SQL", logo: "images/sql-logo.svg" },
      { name: "HTML", logo: "images/html-logo.svg" },
      { name: "CSS", logo: "images/css-logo.svg" },
    ]
  },
  { 
    name: "Web Technologies",
    children: [
      { name: "GraphQL", logo: "images/graphql-logo.svg" },
      { name: "Flask", logo: "images/flask-logo.svg" },
      { name: "Spring", logo: "images/spring-logo.svg" },
      { name: "React", logo: "images/react-logo.svg" },
      { name: "Angular", logo: "images/angular-logo.svg" },
      { name: "Next.js", logo: "images/next-js-logo.svg" },
      { name: "Node.js", logo: "images/node-js-logo.svg" },
      { name: "Express.js", logo: "images/express-js-logo.svg" },
      { name: "MUI", logo: "images/material-ui-logo.svg" },
      { name: "Bootstrap", logo: "images/bootstrap-logo.svg" },
      { name: "ASP.NET", logo: "images/dotnet-logo.svg" }
    ] 
  },
  { 
    name: "Databases",
    children: [
      { name: "MySQL", logo: "images/mysql-logo.svg" },
      { name: "MongoDB", logo: "images/mongodb-logo.svg" },
      { name: "PostgreSQL", logo: "images/postgresql-logo.svg" },
      { name: "SQL Server", logo: "images/mssql-logo.svg" },
      { name: "Redis", logo: "images/redis-logo.svg" },
    ]
  },
  {
    name: "Data",
    children: [
      { name: "Spark", logo: "images/spark-logo.svg" },
      { name: "Pandas", logo: "images/pandas-logo.svg" },
      { name: "Snowflake", logo: "images/snowflake-logo.svg" },
      { name: "Airflow", logo: "images/airflow-logo.svg" },
      { name: "Tableau", logo: "images/tableau-logo.svg" },
      { name: "D3.js", logo: "images/d3-js-logo.svg" },
    ]
  },
  {
    name: "Others",
    children: [
      { name: "Git", logo: "images/git-logo.svg" },
      { name: "AWS (EC2, S3)", logo: "images/aws-logo.svg" }, 
      { name: "OAuth 2.0", logo: "images/oauth-logo.svg" },
      { name: "Docker", logo: "images/docker-logo.svg" },
      { name: "Kubernetes", logo: "images/kubernetes-logo.svg" },
      { name: "Jenkins", logo: "images/jenkins-logo.svg" },
      { name: "Jest", logo: "images/jest-logo.svg" },
      { name: "Pytest", logo: "images/pytest-logo.svg" }
    ]
  }
];

// Mapping data for pie chart
const chartData = skillsData.map(item => ({ name: item.name, value: 1 }));

// Chart dimensions
const width = 550;
const height = 550;
const radius = Math.min(width, height) / 2;

const svg = d3.select("svg")
  .append("g")
  .attr("transform", `translate(${width / 2}, ${height / 2})`);

// Calculating angles for slices
const pie = d3.pie().value(d => d.value).padAngle(0.02);

// Arc for the pie slices
const arc = d3.arc()
  .innerRadius(radius * 0.02)
  .outerRadius(radius);

// Expanded arc for hover effect
const expandedArc = d3.arc()
  .innerRadius(radius * 0.01)
  .outerRadius(radius + 18);

// Color scale for the slices
const color = d3.scaleOrdinal([
  "#FF6F61", "#6B5B95", "#88B04B", "#F7CAC9", "#92A8D1"
]);

// Function to display default summary
function displaySummaryText() {
  const summaryText = `
  <div id="summary-content">
    <div>
      <p><strong>Web Development: </strong>Developed REST APIs to seamlessly supply data to UI dashboards, and translated data-visualization heavy wireframes into responsive and interactive UI.</p>
    </div>

    <div>
      <p><strong>Data Engineering & Analytics: </strong>Built scalable data pipelines and provided actionable insights, while closely collaborating with clients and business leaders to meet their requirements.</p>
    </div>
    
    <div>
      <p class="summary-text"><strong>Key Strengths: </strong>I have experience working on multiple 0-1 projects while owning end-to-end implementation of features. My ability to quickly adapt to new technologies and attention to detail have consistently been key strengths.</p>
    </div>

    <div>
      <p class="summary-callout">Hover over the chart to view the technologies I've worked with!</p>
    </div>
    </div>
  `;
  d3.select("#tech-container").html(summaryText);
}

// Function to handle hover event to display tech items
function handleSliceHover(d) {

  d3.select("#tech-container").html("");

  // Find the hovered slice from the data
  const selectedTech = skillsData.find(item => item.name === d.data.name);
  
  selectedTech.children.forEach(tech => {
    const techItem = d3.select("#tech-container")
      .append("div")
      .attr("class", "tech-item")
      .html(`<img src="${tech.logo}" alt="${tech.name}"> ${tech.name}`);
  });
}

// Setting up pie chart slices
const slices = svg.selectAll("path")
  .data(pie(chartData))
  .enter()
  .append("path")
  .attr("d", arc)
  .attr("fill", (d, i) => color(i))
  .style("cursor", "pointer")
  .on("mouseover", function(event, d) {
    // Expand slice on hover
    d3.select(this)
      .transition()
      .duration(200)
      .attr("d", expandedArc);
    
    // Display tech items for the hovered slice
    handleSliceHover(d);
  })
  .on("mouseout", function(event, d) {
    // Revert slice size on mouse out
    d3.select(this)
      .transition()
      .duration(200)
      .attr("d", arc);

     // Display summary text when no slice is hovered
     displaySummaryText();
  });

// Add text labels to pie chart
svg.selectAll("text")
  .data(pie(chartData))
  .enter()
  .append("text")
  .attr("transform", d => {
    const [x, y] = arc.centroid(d);
    const distance = 1.2;
    return `translate(${x * distance}, ${y * distance})`;
  })
  .attr("text-anchor", "middle")
  .attr("alignment-baseline", "middle")
  .style("font-size", "16px")
  .style("fill", "white")
  .style("font-weight", "bold")
  .style("cursor", "pointer")
  .style("pointer-events", "none")  // Prevents text from blocking clicks on slices
  .text(d => d.data.name);

// Displaying the default summary text when the page loads
window.onload = function() {
  displaySummaryText();
};
