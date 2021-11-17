let alphabet;
let httpReq = new XMLHttpRequest();

for(i=9,alphabet='';++i<36;){
    let char=i.toString(36);
    node=document.createElement("li");
    node.innerHTML = char;
    
    node.setAttribute("onclick", "para_click(this.innerHTML)" );
    // node.addEventListener('click',para_click(alphabet));
    document.getElementById("alphaDiv").appendChild(node);
}

function para_click(char){
    alphabet ="https://www.themealdb.com/api/json/v1/1/search.php?f="+ char;
    getData(alphabet);
}


getData("https://www.themealdb.com/api/json/v1/1/search.php?f=s");


function getData(alphabet){
    httpReq.open("get", alphabet, false);

    const myNode = document.getElementById("alpha-list");
    while (myNode.firstChild) {
        myNode.removeChild(myNode.lastChild);
    }

    httpReq.onload = function() {
        data = JSON.parse(httpReq.response);
        for(let meal of data.meals){


            parent=document.createElement("div");
            parent.id="alpha-items";

            div=document.createElement("div");
            img=document.createElement("img");
            img.src=meal.strMealThumb;
            div.appendChild(img);

            title=document.createElement("h5");
            title.innerHTML = meal.strMeal;

            button=document.createElement("button");
            button.innerHTML = "Add to Favorite";
            // node.setAttribute("onclick", "para_click('${meal.id}')" );

            parent.appendChild(div);
            parent.appendChild(title);
            parent.appendChild(button);
            
            document.getElementById("alpha-list").appendChild(parent);
        }

    }
    httpReq.send();
}

function getCatData(alphabet){
    httpReq.open("get", alphabet, false);

    const myNode = document.getElementById("cat-list");
    while (myNode.firstChild) {
        myNode.removeChild(myNode.lastChild);
    }

    httpReq.onload = function() {
        data = JSON.parse(httpReq.response);
        for(let meal of data.meals){


            parent=document.createElement("div");
            parent.id="cat-items";

            div=document.createElement("div");
            img=document.createElement("img");
            img.src=meal.strMealThumb;
            div.appendChild(img);

            title=document.createElement("h5");
            title.innerHTML = meal.strMeal;

            button=document.createElement("button");
            button.innerHTML = "Add to Favorite";

            parent.appendChild(div);
            parent.appendChild(title);
            parent.appendChild(button);
            
            document.getElementById("cat-list").appendChild(parent);
        }

    }
    httpReq.send();
}

httpReq.open("get", "https://www.themealdb.com/api/json/v1/1/categories.php", false);

const myNode = document.getElementById("select-cat");

httpReq.onload = function() {
        data = JSON.parse(httpReq.response);
        for(let category of data.categories){

            node=document.createElement("option");
            node.innerHTML = category.strCategory;
            node.setAttribute("value", category.strCategory );
            node.setAttribute("onclick", "cat_click(this.value)" );
            document.getElementById("select-cat").appendChild(node);
        }

}
httpReq.send();

function cat_click(char){
    console.log(char);
    alphabet ="www.themealdb.com/api/json/v1/1/filter.php?c="+ char;
    getCatData(alphabet);
}