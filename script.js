let alphabet;
let httpReq = new XMLHttpRequest();
var itemSet=new Set();

for(i=9,alphabet='';++i<36;){
    let char=i.toString(36);
    node=document.createElement("li");
    node.innerHTML = char;
    
    node.setAttribute("onclick", "para_click(this.innerHTML)" );
    document.getElementById("alphaDiv").appendChild(node);
}

function para_click(char){
    alphabet ="https://www.themealdb.com/api/json/v1/1/search.php?f="+ char;
    getData(alphabet);
}




function getData(alphabet){
    httpReq.open("get", alphabet, true);
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
            button.id= meal.strMeal;
            button.setAttribute("onclick", "fav_click(this.id)" );

            parent.appendChild(div);
            parent.appendChild(title);
            parent.appendChild(button);
            
            document.getElementById("alpha-list").appendChild(parent);
        }

    }
    httpReq.send();
}

function getCatData(alphabet){
    let httpReq = new XMLHttpRequest();
    httpReq.open("get", alphabet,false);

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
            button.id= meal.strMeal;
            button.setAttribute("onclick", "fav_click(this.id)" );

            parent.appendChild(div);
            parent.appendChild(title);
            parent.appendChild(button);
            
            document.getElementById("cat-list").appendChild(parent);
        }

    }
    httpReq.send();
}


function getFavData(alphabet){
    let httpReq = new XMLHttpRequest();
    httpReq.open("get", alphabet,false);

    


    httpReq.onload = function() {
        data = JSON.parse(httpReq.response);
        let meal = data.meals[0];
            parent=document.createElement("div");
            parent.id="fav-items";

            div=document.createElement("div");
            img=document.createElement("img");
            img.src=meal.strMealThumb;
            div.appendChild(img);

            title=document.createElement("h5");
            title.innerHTML = meal.strMeal;

            button=document.createElement("button");
            button.innerHTML = "Remove from Favorite";
            button.id= meal.strMeal;
            button.setAttribute("onclick", "favDel(this.id)" );

            parent.appendChild(div);
            parent.appendChild(title);
            parent.appendChild(button);
            
            document.getElementById("fav-list").appendChild(parent);

    }
    httpReq.send();
}

httpReq.open("get", "https://www.themealdb.com/api/json/v1/1/list.php?c=list", false);

const myNode = document.getElementById("select-cat");

httpReq.onload = function() {
        data = JSON.parse(httpReq.response);
        for(let category of data.meals){
            node=document.createElement("option");
            node.innerHTML = category.strCategory;
            node.setAttribute("value", category.strCategory );
            node.setAttribute("onclick", "cat_click(this.value)" );
            document.getElementById("select-cat").appendChild(node);
        }

}
httpReq.send();

function cat_click(char){
    
    alphabet ="https://www.themealdb.com/api/json/v1/1/filter.php?c="+ char;
    getCatData(alphabet);
}

function fav_click(name){
    if(itemSet.size==0){
        const myNode = document.getElementById("fav-list");
        myNode.removeChild(myNode.lastChild);
    }
    if(!itemSet.has(name)){
        itemSet.add(name);
        alphabet ="https://www.themealdb.com/api/json/v1/1/search.php?s="+ name;
        getFavData(alphabet);
    }
}

function favDel(name){
    if(itemSet.has(name)){
        itemSet.delete(name);
    }
    loadAll();

    
}


function loadAll(){

    const myNode = document.getElementById("fav-list");
    while (myNode.firstChild) {
        myNode.removeChild(myNode.lastChild);
    }
    

    for(var name of itemSet){
        alphabet ="https://www.themealdb.com/api/json/v1/1/search.php?s="+ name;
        getFavData(alphabet);
    }
    if(itemSet.size==0){
        heading=document.createElement("h2");
        heading.innerHTML = "Oops!!! You haven't added any Meals to Favourites";
        document.getElementById("fav-list").appendChild(heading);
    }

}
loadAll();
getCatData("https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood");
getData("https://www.themealdb.com/api/json/v1/1/search.php?f=s");