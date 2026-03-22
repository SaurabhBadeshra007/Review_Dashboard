const reviews = [
{name:"Rahul", platform:"Amazon", rating:5, review:"Amazing product!", sentiment:"Positive"},
{name:"Aman", platform:"Flipkart", rating:4, review:"Very good quality", sentiment:"Positive"},
{name:"Sneha", platform:"Website", rating:2, review:"Not satisfied", sentiment:"Negative"},
{name:"Riya", platform:"Playstore", rating:1, review:"Worst experience", sentiment:"Negative"},
{name:"Karan", platform:"Amazon", rating:3, review:"Average product", sentiment:"Positive"},
{name:"Neha", platform:"Flipkart", rating:5, review:"Loved it!", sentiment:"Positive"},
{name:"Pooja", platform:"Website", rating:2, review:"Quality poor", sentiment:"Negative"}
];

const table = document.getElementById("reviewsTable");

function renderTable(data){
table.innerHTML="";

data.forEach(r=>{
table.innerHTML+=`
<tr>
<td>${r.name}</td>
<td>${r.platform}</td>
<td>${r.rating}⭐</td>
<td>${r.review}</td>
<td>${r.sentiment}</td>
</tr>`;
});
}

function updateCards(data){
document.getElementById("totalReviews").textContent = data.length;
document.getElementById("positiveReviews").textContent = data.filter(r=>r.sentiment==="Positive").length;
document.getElementById("negativeReviews").textContent = data.filter(r=>r.sentiment==="Negative").length;
document.getElementById("avgRating").textContent = (data.reduce((a,b)=>a+b.rating,0)/data.length).toFixed(1);
}

function applyFilters(){
let platform = document.getElementById("platformFilter").value;
let rating = document.getElementById("ratingFilter").value;

let filtered = reviews.filter(r=>{
return (platform==="All" || r.platform===platform) &&
       (rating==="All" || r.rating==rating);
});

renderTable(filtered);
updateCards(filtered);
updateChart(filtered);
}

document.getElementById("platformFilter").addEventListener("change",applyFilters);
document.getElementById("ratingFilter").addEventListener("change",applyFilters);

/* CHART */
const ctx = document.getElementById("ratingChart");

let chart;

function updateChart(data){

let ratings = [0,0,0,0,0];

data.forEach(r=>{
ratings[r.rating-1]++;
});

if(chart) chart.destroy();

chart = new Chart(ctx,{
type:"bar",
data:{
labels:["1 Star","2 Star","3 Star","4 Star","5 Star"],
datasets:[{
label:"Ratings",
data:ratings
}]
}
});
}

renderTable(reviews);
updateCards(reviews);
updateChart(reviews);