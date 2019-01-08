let WorldBuilder = {
    ////////// Variables ////////
    BuildArray: [],
    SelectedType: "",
    MapData: {
        Map: [],
        Name: "",
        Start: {x: 1, y: 1}
    },
    ////////// Initalization and Buttons
    Init: ()=>{
        W = WorldBuilder;
        document.getElementById("GridMake").addEventListener("click", WorldBuilder.MapGenerate);
    
        let tileSelect = document.getElementById("TileTypes");
        Object.keys(Mapgrid.TileTypes).forEach((tile)=>{
            tileSelect.innerHTML += `<option value="${tile}"> ${Mapgrid.TileTypes[tile].Type} </option>`
        })
        tileSelect.addEventListener("change", W.tileShift);
        
        let stage = document.getElementById("GenMap");
        stage.addEventListener("click", W.TilePlace);
        stage.addEventListener("touchstart", W.paintStart);
        stage.addEventListener("mousedown", W.paintStart);
        stage.addEventListener("touchend", W.paintEnd);
        stage.addEventListener("mouseup", W.paintEnd);
    },
    paintStart: (ev)=>{
        let wb = WorldBuilder.TilePlace
        window.addEventListener("mousemove", wb);
        window.addEventListener("touchmove", wb);
    },
    paintEnd: (ev)=>{
        let wb = WorldBuilder.TilePlace
        window.removeEventListener("mousemove", wb);
        window.removeEventListener("touchmove", wb);
    },
    tileShift: (ev)=>{
            WorldBuilder.SelectedType = ev.target.value;
            console.log(WorldBuilder.SelectedType);
        },
    
    /////////////// Wordl Mod Controlls
    MapGenerate: ()=>{
        let maxWidth = window.innerWidth;
        let Across = document.getElementById("MapWidth").value
        let UpDown = document.getElementById("MapHeight").value
        
        let stage = document.getElementById("GenMap")
        stage.style.height = `${parseInt(stage.style.width)}px`
        stage.innerHTML = "";
            WorldBuilder.BuildArray = [];
            WorldBuilder.MapData.Map = [];
        
        
        for(let y = 0; y < UpDown; y ++){
            let row = []
            let saveRow = []
        for(let x = 0; x < Across; x ++){
            let newSquare = document.createElement('div');
            newSquare.id = `x${x}y${y}`;
            newSquare.style.position = "absolute";
            newSquare.style.width = `${
(parseInt(stage.style.width))/(Across)}px`
            newSquare.style.left = `${
(((parseInt(stage.style.width))/(Across)) * x)}px`
            newSquare.style.height = `${
(parseInt(stage.style.width))/(UpDown)}px`
            newSquare.style.top = `${
(((parseInt(stage.style.width))/(UpDown)) * y)}px`
            stage.appendChild(newSquare);
            newSquare.style.background = "green";
            row.push(newSquare)
            saveRow.push(0);
        }
            WorldBuilder.BuildArray.push(row)
            WorldBuilder.MapData.Map.push(saveRow)
        }
        
    },
    TilePlace: (ev)=>{
        let targetArea
        if(ev.targetTouches){
         targetArea = ev.targetTouches[0];
        } else {
            targetArea = ev
        }
            
    
    let data = document.elementFromPoint(targetArea.clientX, targetArea.clientY).id;
        console.log(data)
    data = data.split("");
    console.log(data[1])
    console.log(data[3])
    WorldBuilder.MapData.Map[data[3]][data[1]] = parseInt(WorldBuilder.SelectedType);
    document.elementFromPoint(targetArea.clientX, targetArea.clientY).style.background = Mapgrid.TileTypes[WorldBuilder.SelectedType].Colour;
    
    console.log(WorldBuilder.MapData.Map)
        
    },
////////////////////// Firebase Save/add    
    SaveLevel: ()=>{
        WorldBuilder.MapData.Name = prompt("Enter a Level Name:");
        
    CrozFire.AddItemToCollection(WorldBuilder.ConvertToJSON(WorldBuilder.MapData))
    },
    
ConvertToJSON : (LEVEL)=>{
    console.log(LEVEL)
    let OBJReturn = {Name: "", Map: "", Start: {x:1, y: 1}}
    OBJReturn.Name = LEVEL.Name;
    OBJReturn.Map = JSON.stringify(LEVEL.Map);
    OBJReturn.Start = JSON.stringify(LEVEL.Start)
    return OBJReturn;
}
}