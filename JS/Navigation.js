let Navigator = {
    CurrentPage: "",
    LevelList: "",
    init: async ()=>{
        ////////////// MapSizing
        let Width = window.innerWidth;
        console.log(Width);
        document.querySelector(".Map").style.width = `${Width}px`;
        document.querySelector("#GenMap").style.width = `${Width}px`;
    ///////////////// LevelChoices
    CrozFire.init()
    Navigator.LevelList = await CrozFire.RetrieveCollection()
    
    /////////////// MainMenu:
    document.querySelector(".MapEditor").addEventListener("click", Navigator.navigate);
    
        
    ///////////// LevelMenu
    let Play = document.querySelector(".GameZone");
            console.log("Ping");
       Object.keys(Navigator.LevelList).forEach((Level)=>{
           let additions = document.createElement("li");
           additions.textContent = Level;
           additions.id = Level;
           console.log(Level)
           additions.addEventListener("click", Navigator.navigate)
           Play.appendChild(additions)
       }) 
    console.log(Object.keys(Navigator.LevelList))
        
        
    ////////////// MapEditor
        
        WorldBuilder.Init()
    ///////////////// SaveButton
        
        document.querySelector(".Save").addEventListener("click", Navigator.saveHandler);
    /////////////////
        
        
    Navigator.GoTo("Menu")
    document.querySelector(".Menu").addEventListener('click', Navigator.navigate)
    
},
    
    navigate: (ev)=>{
        if(ev.target.id){
            console.log(ev.target.id);
            Mapgrid.init(Navigator.LevelList[ev.target.id]);
        Navigator.GoTo("GameZone");
        } else {
            document.querySelector(".BannerName").textContent = ev.target.className;
        Navigator.GoTo(ev.target.className);
        }
//        ev.target.className
    },
        
    GoTo: (Page)=>{
        console.log(Page)
        Navigator.CurrentPage = document.querySelector(`#${Page}`);
        zones.forEach((zone)=>{document.querySelector(`#${zone}`).classList.add("hidden")});
        Navigator.CurrentPage.classList.remove("hidden");
    },
    RunLevel: (levelNumber)=>{
    let MapNames = Object.keys(MapValues);
    Mapgrid.init(MapValues[MapNames[levelNumber]])
        
    },
    saveHandler: (ev)=>{
        let currentPlace
        zones.forEach((zone)=>{
            if(!document.querySelector(`#${zone}`).classList.contains("hidden")){
                currentPlace = zone;
            };
        })
            console.log(currentPlace)
        if(currentPlace == "MapEditor"){
            WorldBuilder.SaveLevel()
        }
    }
}

let zones = ["Menu", "GameZone", "MapEditor"]

document.addEventListener("DOMContentLoaded", Navigator.init)