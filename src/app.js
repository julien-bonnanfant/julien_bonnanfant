if(window.history.state )
    gotopage(window.history.state)
else{
    gotopage('home')
}


function gotopage(page){
    var xhr= new XMLHttpRequest();
    xhr.open('GET', './src/pages/'+page+'.html', true);
    xhr.onreadystatechange= function() {
        if (this.readyState!==4) return;
        if (this.status!==200) return; // or whatever error handling you want
        document.getElementById('app-container').innerHTML= this.responseText;
        window.history.pushState(page,'','#'+page)
        setActivemenu(page)

    };
    xhr.send();
}

function setActivemenu(page){
    for (i=0;i<5;i++){
    document.getElementsByClassName("indicator")[i].classList.remove("active");
}
    document.getElementsByClassName(page)[0].classList.add("active");
}
