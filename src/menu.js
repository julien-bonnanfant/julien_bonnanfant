
 function setMenuPosition(){
     let menu_bar = document.getElementById('menu_bar');
     let heightmenu_bar = menu_bar.clientHeight;
     let headerHeight = document.getElementsByTagName("header")[0].clientHeight
     let fixedPoint =  headerHeight - heightmenu_bar
     if (document.documentElement.scrollTop >=fixedPoint) {
         document.getElementById('menu_bar').classList.add("fixed");
     }
     if (document.documentElement.scrollTop <= fixedPoint) {
         document.getElementById('menu_bar').classList.remove("fixed");
     }
 }
