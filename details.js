let mealId=localStorage.getItem("id");

console.log(mealId);
let alphabet="https://www.themealdb.com/api/json/v1/1/lookup.php?i="+mealId;

let httpReq = new XMLHttpRequest();
httpReq.open("get", alphabet,false);

httpReq.onload = function() {
    data = JSON.parse(httpReq.response);
    for(let meal of data.meals){
            console.log(meal.strMeal);

            document.getElementById('heading').innerHTML=meal.strMeal;
            document.getElementById('instruction').innerHTML=meal.strInstructions;
            document.getElementById('category').innerHTML=document.getElementById('category').innerHTML+meal.strCategory;
            document.getElementById('img').setAttribute("src", meal.strMealThumb);
            document.getElementById('yt').setAttribute("href", meal.strYoutube);
            break;
    }

}
httpReq.send();