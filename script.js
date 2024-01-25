var map=[
    [7,5,2,13],
    [11,0,3,6],
    [9,8,1,10],
    [15,14,12,4]
];

var konec=[
    [1,2,3,4],
    [5,6,7,8],
    [9,10,11,12],
    [13,14,15,0]
];

var cas=document.getElementById("time");
var korak=document.getElementById("stpotez");

function izpis(){

    var m=document.getElementById("map");


    while (m.hasChildNodes()) {
        m.removeChild(m.firstChild);
    }

    for(let i=0;i!=4;i++){
        for(let j=0;j!=4;j++){
            
            var div=document.createElement("button");
            div.setAttribute("id","del");
            div.setAttribute("onclick","premakni("+map[i][j]+")");
            div.textContent = map[i][j];
            if(map[i][j]===0){
                
                div.style.color="blue";
            }
            

            m.appendChild(div);
        }
        
        m.appendChild(document.createElement("br"));
    }
}

var sgame=true;
var ending=false;
var cet;

function izcas(){
var cass={
    s:0,
    m:0,
    h:0,
};

cet=setInterval(function(){
        cass.s++;
        if(cass.s===60){
            cass.m++;
            cass.s=0;
        }
        if(cass.m===60){
            cass.h++;
            cass.h=0;
        }
        cas.innerHTML="Čas: "+cass.h+":"+cass.m+":"+cass.s;
 
}, 1000);
    
}
var potezee=0;
function poteze(){
    potezee++;
    korak.innerHTML="Število opravljenih potez: "+potezee;
}

function premakni(st) {
    let x = 0;
    let y = 0;

    poteze();

    if(sgame){
        izcas();
        sgame=false;
    }

    for (let i = 0; i != 4; i++) {
        for (let j = 0; j != 4; j++) {
            if (map[j][i] === st) {
                x = j;
                y = i;
                break;
            }
        }
    }

    // Preveri meje
    if (x > 0 && map[x - 1][y] === 0) {
        map[x - 1][y] = st;
        map[x][y] = 0;
        izpis();
    }

    if (x < 3 && map[x + 1][y] === 0) {
        map[x + 1][y] = st;
        map[x][y] = 0;
        izpis();
    }

    if (y > 0 && map[x][y - 1] === 0) {
        map[x][y - 1] = st;
        map[x][y] = 0;
        izpis();
    }

    if (y < 3 && map[x][y + 1] === 0) {
        map[x][y + 1] = st;
        map[x][y] = 0;
        izpis();
    }

    if(pregled(map, konec)){
        ende();
        izpis();
        alert("Bravo konač si igro!");
    }

}

function nakljucno() {
    let m = [];

    do {
        let r = Math.floor(Math.random() * 16);
        let p = false;

        for (let i = 0; i < m.length; i++) {
            if (m[i] === r) {
                p = true;
                break;
            }
        }

        if (!p) {
            m.push(r);
        }

    } while (m.length !== 16);

    let s=0;

    for(let i=0;i!=4;i++){
        for(let j=0;j!=4;j++){
            map[i][j]=m[s];
            s++;
        }
    }

    izpis();

}

function ende(){
    clearInterval(cet);
}

function pregled(mapa,cilj){
    for (let i = 0; i < mapa.length; i++) {
        for (let j = 0; j < mapa[i].length; j++) {
            if (mapa[i][j] !== cilj[i][j]) {
                return false; // Če najdemo vsaj eno razliko, igra ni končana
            }
        }
    }
    return true; // Če smo pregledali celotno matriko in ni razlik, igra je končana
}

nakljucno()