if(window.history.state )
gotopage(window.history.state)
else{
    var currentlocation = window.location.href
    var currentpath = currentlocation.replace(window.location.origin,"");
    var currentfolder = currentpath.split("/")[1]


    if (currentfolder == "#articles")
    gotopage(currentpath.split('#')[1])

    else
    gotopage('home');
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

        // show_hide_scrolltop();

    };
    xhr.send();
}

function setActivemenu(page){
    for (i=0;i<5;i++){
        document.getElementsByClassName("indicator")[i].classList.remove("active");
    }
    document.getElementsByClassName(page)[0].classList.add("active");
}



function scrolltop(){
    let scrollposition = document.documentElement.scrollTop

    let timetorefresh = 16; //(for 60htz)
    let animationtime = 100;
    let numberofanimation = animationtime/timetorefresh;

    window.scrollTo(scrollposition - ( scrollposition  /numberofanimation ),scrollposition - ( scrollposition  /numberofanimation ));

    setTimeout(function () {
        if(scrollposition !=0) scrolltop()
    }, timetorefresh);
}


    window.addEventListener('popstate',function(){
            var url = window.location.href;
            gotopage(url.split('#')[1])
    })
