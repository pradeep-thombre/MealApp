let alphabet;
let httpReq = new XMLHttpRequest();
var itemSet=new Set();

try{
    let list=localStorage.getItem("list").split("-");
    for(let id of list){
        if(id!=""){
            itemSet.add(id);
        }
    }
}catch(err){
    localStorage.setItem("list", "");
}

function favDel(name){
    if(itemSet.has(name)){
        itemSet.delete(name);
        let list="";
        for(let id of itemSet){
            list+=id+"-";
        }
        localStorage.setItem("list",list);
    }
    loadAll();
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
            a=document.createElement("a");
            title.id=meal.idMeal;
            title.innerHTML = meal.strMeal;
            
            a.setAttribute("href", "details.html");
            a.appendChild(title);
            title.setAttribute("onclick", "detailsClicked(this.id)");

            button=document.createElement("button");
            button.innerHTML = "Remove from Favorite";
            button.id= meal.idMeal;
            button.setAttribute("onclick", "favDel(this.id)" );

            parent.appendChild(div);
            parent.appendChild(a);
            parent.appendChild(button);
            
            document.getElementById("fav-list").appendChild(parent);

    }
    httpReq.send();
}


function loadAll(){

    const myNode = document.getElementById("fav-list");
    while (myNode.firstChild) {
        myNode.removeChild(myNode.lastChild);
    }
    

    for(var name of itemSet){
        
        alphabet ="https://www.themealdb.com/api/json/v1/1/lookup.php?i="+ name;
        console.log(alphabet);
        getFavData(alphabet);
    }
    if(itemSet.size==0){
        heading=document.createElement("h2");
        heading.innerHTML = "Oops!!! You haven't added any Meals to Favourites";
        document.getElementById("fav-list").appendChild(heading);
    }

}

loadAll();