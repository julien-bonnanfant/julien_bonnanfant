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

function openmenu(){
        var menuBar = document.querySelector('#menu_bar');
        menuBar.classList.add('open');
}
function closemenu(){
    var menuBar = document.querySelector('#menu_bar');
    menuBar.classList.remove('open');
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
    if( page == 'contact')
        particlesJS.load('particles-js', './src/particlesjs-config.json', function() {
          console.log('particles.js loaded - callback');
        });
}

function setActivemenu(page){
    for (i=0;i<4;i++){
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



onmousemove = function moveEyes(e){
    var left_eye = document.querySelector("#eye-left");
    var right_eye = document.querySelector("#eye-right");
    var position_lefteye = left_eye.getBoundingClientRect();
    var position_righteye = right_eye.getBoundingClientRect();
    // console.log("mouse location:", e.clientX, e.clientY);
    // console.log("left location:", position_lefteye.x, position_lefteye.y);
    // console.log("right location:", position_righteye.x, position_righteye.y);



    // Limite maximum definie
    const maxEyeMoveX = 7;
    const maxEyeMoveY = 4;


    var documentHeight = window.innerHeight;
    var documentWidth = document.querySelector('body').clientWidth;



    var eyeleft_x_diff = position_lefteye.x - e.clientX;
    var eyeleft_y_diff = position_lefteye.y - e.clientY;

    var eyeright_x_diff = position_righteye.x - e.clientX;
    var eyeright_y_diff = position_righteye.y - e.clientY;





    // On calcule la distance maximum por la sourie entre l'oeil et le bord de l'ecran a gauche et a droite
    var eyeLeftMaxMouseMoveOnYPositive = documentHeight - position_lefteye.y ;
    var eyeLeftMaxMouseMoveOnYNegative = position_lefteye.y ;

    var eyeLeftMaxMouseMoveOnXPositive = documentWidth -  position_lefteye.x;
    var eyeLeftMaxMouseMoveOnXNegative = position_lefteye.x;


    var eyeRightMaxMouseMoveOnYPositive = documentHeight - position_righteye.y ;
    var eyeRightMaxMouseMoveOnYNegative = position_righteye.y ;

    var eyeRightMaxMouseMoveOnXPositive = documentWidth - position_righteye.x;
    var eyeRightMaxMouseMoveOnXNegative = position_righteye.x;




     //On regarde si la sourie est entre les deux yeux
    if(position_lefteye.x < e.clientX &&  e.clientX <  position_righteye.x   &&  Math.abs(eyeleft_y_diff) < 80){
        left_eye.style.transition = "0.1s all";
        right_eye.style.transition = "0.1s all";
        var eyeLeftMaxMouseMoveOnXPositive = (position_righteye.x - position_lefteye.x) /1.5  ;
        var eyeRightMaxMouseMoveOnXNegative = (position_righteye.x - position_lefteye.x) /1.5  ;
    }
    else{
        setTimeout(function () {
            left_eye.style.transition = "0s all";
            right_eye.style.transition = "0s all";
        },200)
    }



    // Initalisation d nombre de pixel a deplacer
    var translate_eyeleft_X = 0;
    var translate_eyeleft_Y = 0;


    // Calcul du ratio a deplacer en fonction du Limite maximum definie
    if( eyeleft_x_diff > 0) translate_eyeleft_X = (maxEyeMoveX * eyeleft_x_diff) / eyeLeftMaxMouseMoveOnXNegative ;
    else                    translate_eyeleft_X = (maxEyeMoveX * eyeleft_x_diff) / eyeLeftMaxMouseMoveOnXPositive ;

    if( eyeleft_y_diff > 0) translate_eyeleft_Y = (maxEyeMoveY * eyeleft_y_diff) / eyeLeftMaxMouseMoveOnYNegative ;
    else                    translate_eyeleft_Y = ( maxEyeMoveY * eyeright_y_diff ) /  eyeLeftMaxMouseMoveOnYPositive;







    if( eyeright_x_diff > 0) translate_eyeright_X = (maxEyeMoveX * eyeright_x_diff) / eyeRightMaxMouseMoveOnXNegative ;
    else                    translate_eyeright_X = (maxEyeMoveX * eyeright_x_diff) / eyeRightMaxMouseMoveOnXPositive ;

    if( eyeright_y_diff > 0) translate_eyeright_Y = -((maxEyeMoveY * eyeright_y_diff ) / eyeRightMaxMouseMoveOnYNegative) ;
    else                    translate_eyeright_Y = -(maxEyeMoveY *eyeright_y_diff ) / eyeRightMaxMouseMoveOnYPositive ;






    left_eye.style.transform = "translate("+ -translate_eyeleft_X +"px,"+ -translate_eyeleft_Y +"px)";
    right_eye.style.transform = "translate("+ -translate_eyeright_X +"px,"+ translate_eyeright_Y +"px)";





}
