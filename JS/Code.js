let Mapgrid = {
    BuildArray: [],
    Map : document.querySelector(".Map"),
    MPS: [],
    TileTypes: 
    {0: {
        Type: "Grass",
        Colour: "green",
        Effect: (Direction)=>{return "Complete"}
    },
    1: {
        Type: "Ice",
        Colour: "#A5F2F3",
        Effect: (Direction)=>{
                    console.log(Direction)
                    MoveBlock[Direction]();
        }
    },
    2: {
        Type: "Rock",
        Colour: "Gray",
        Effect: (Direction)=>{ 
            MoveBlock.LeaveLocation();
            
            let x = MoveBlock.Location.x
            let y = MoveBlock.Location.y
            
            switch(Direction){
                case "Up":
                MoveBlock.Location.y = (y + 1)
                break;
                case "Down":
                MoveBlock.Location.y = (y - 1)
                break;
                case "Left":
                MoveBlock.Location.x = (x + 1)
                break;
                case "Right":
                MoveBlock.Location.x = (x - 1)
                break;}
            
     MoveBlock.PlaceUnit(Mapgrid.MPS[MoveBlock.Location.y][MoveBlock.Location.x]);}
    },
    3: {
        Type: "Goal",
        Colour: "Yellow",
     Effect: ()=>{
     alert("Goal!")
    }},
    4: {
        Type: "Lock",
        Colour: "Black",
     Effect: (Direction)=>{
         if(MoveBlock.DungeonKey > 0){
            let x = MoveBlock.Location.x
            let y = MoveBlock.Location.y
            Mapgrid.BuildArray[y][x] = 0;
             MoveBlock.DungeonKey --
         } else { 
            MoveBlock.LeaveLocation();
            
            let x = MoveBlock.Location.x
            let y = MoveBlock.Location.y
             
            switch(Direction){
                case "Up":
                MoveBlock.Location.y = (y + 1)
                break;
                case "Down":
                MoveBlock.Location.y = (y - 1)
                break;
                case "Left":
                MoveBlock.Location.x = (x + 1)
                break;
                case "Right":
                MoveBlock.Location.x = (x - 1)
                break;}
            
     MoveBlock.PlaceUnit(Mapgrid.MPS[MoveBlock.Location.y][MoveBlock.Location.x]);
             
         }
    }},
    5: {
        Type: "Key",
        Colour: "Purple",
     Effect: (Direction)=>{
         MoveBlock.DungeonKey ++
            let x = MoveBlock.Location.x
            let y = MoveBlock.Location.y
            console.log("Ping")
            if(String(Mapgrid.BuildArray[y][x]).substr(1)){
            Mapgrid.BuildArray[y][x] = String(Mapgrid.BuildArray[y][x]).substr(1);   
            MoveBlock.GeneralMove(x,y, Direction)
                
            } else{
               Mapgrid.BuildArray[y][x] = 0 
            }
    }}},  
    init: (BuildArray)=>{
        Mapgrid.BuildArray = [];
            Mapgrid.MPS = [];
        document.querySelector(".BannerName").textContent = BuildArray.Name
        console.log(BuildArray);
        Mapgrid.BuildArray = JSON.parse(BuildArray.Map);
        MoveBlock.Location = JSON.parse(BuildArray.Start);
        
        Mapgrid.BuildTerrain(Mapgrid.BuildArray);
        MoveBlock.init();
        
        
    },
    BuildTerrain: (Level)=>{
        console.log(Mapgrid.MPS)
        let map = Mapgrid.Map;
        map.style.height = `${parseInt(map.style.width)}px`
        
        console.log(map.style.width)
        for(let y = 0; y < Mapgrid.BuildArray.length; y ++){
            let row = []
        for(let x = 0; x < Mapgrid.BuildArray[0].length; x ++){
            let newSquare = document.createElement('div');
            newSquare.id = `x${x}y${y}`;
            newSquare.style.position = "absolute";
            newSquare.style.width = `${
(parseInt(map.style.width))/(Mapgrid.BuildArray[0].length)}px`
            newSquare.style.left = `${
(((parseInt(map.style.width))/(Mapgrid.BuildArray[0].length)) * x)}px`
            newSquare.style.height = `${
(parseInt(map.style.width))/(Mapgrid.BuildArray[0].length)}px`
            newSquare.style.top = `${
(((parseInt(map.style.width))/(Mapgrid.BuildArray[0].length)) * y)}px`
            map.appendChild(newSquare)
            row.push(newSquare)
        }
            Mapgrid.MPS.push(row)
        }
        
        for(let y = 0; y < Mapgrid.BuildArray.length; y ++){
        for(let x = 0; x < Mapgrid.BuildArray[0].length; x ++){
            console.log()
            Mapgrid.MPS[y][x].style.background = Mapgrid.TileTypes[String(Level[y][x])[0]].Colour
        }}
    }
}

let MoveBlock = {
    DungeonKey: 0,
    SwitchesHit: 0,
    SwitchesTotal: 0,
    Location : {x:0, y: 0},
    SwipeOrigin: {x:0, y: 0},
    SwipeEnd: {x:0, y: 0},
    LastCommand: "",
    init : ()=>{
        let location = Mapgrid.MPS[MoveBlock.Location.y][MoveBlock.Location.x];
        MoveBlock.PlaceUnit(location),
        MoveBlock.MoveBinder()
        
        document.querySelector(".Map").addEventListener("touchstart", MoveBlock.SwipeStart)
        document.querySelector(".Map").addEventListener("mousedown", MoveBlock.SwipeStart)
        document.querySelector(".Map").addEventListener("click", MoveBlock.SwipeAgain)
    },
    PlaceUnit: (location)=>{
        location.style.background = "red"
    },
    LeaveLocation: ()=>{
        let x = MoveBlock.Location.x;
        let y = MoveBlock.Location.y;
            Mapgrid.MPS[y][x].style.background = Mapgrid.TileTypes[(Mapgrid.BuildArray[y][x])].Colour
    },
    MoveBinder: ()=>{
     document.getElementById("up").addEventListener("click", MoveBlock.Up);
        document.getElementById("down").addEventListener("click", MoveBlock.Down);
        document.getElementById("left").addEventListener("click", MoveBlock.Left);
        document.getElementById("right").addEventListener("click", MoveBlock.Right);
        window.addEventListener("keypress", MoveBlock.MoveTranslate)
        
    },
    MoveTranslate: (ev)=>{
        console.log(ev.which)
        
        switch(ev.which){
            case 119:
                MoveBlock.Up();
                break;
            case 115:
                MoveBlock.Down();
                break;
            case 97:
                MoveBlock.Left();
                break;
            case 100:
                MoveBlock.Right();
                break;
            default:
                console.log(ev);
        }
    },
    Up: ()=>{
        MoveBlock.GeneralMove(MoveBlock.Location.x, MoveBlock.Location.y-1, 'Up');
        },
    Down: ()=>{
        MoveBlock.GeneralMove(MoveBlock.Location.x, MoveBlock.Location.y+1, 'Down');
        },
    Left: ()=>{
        MoveBlock.GeneralMove(MoveBlock.Location.x-1, MoveBlock.Location.y, 'Left');
        },
    Right: ()=>{
        MoveBlock.GeneralMove(MoveBlock.Location.x+1, MoveBlock.Location.y, 'Right');
         },
    GeneralMove: (nx, ny, direction)=>{
        let y = MoveBlock.Location.y;
        let x = MoveBlock.Location.x;
        
        if(Mapgrid.MPS[ny] && Mapgrid.MPS[ny][nx]){
                MoveBlock.LeaveLocation();
                MoveBlock.Location = {x: nx, y: ny};
                
                Mapgrid.TileTypes[String(Mapgrid.BuildArray[ny][nx])[0]].Effect(direction);
            
     MoveBlock.PlaceUnit(Mapgrid.MPS[MoveBlock.Location.y][MoveBlock.Location.x]);
            
        }else{console.log("Out of Bounds")
             
            MoveBlock.LeaveLocation();
                    
                MoveBlock.Location = {x: x, y: y};
     MoveBlock.PlaceUnit(Mapgrid.MPS[MoveBlock.Location.y][MoveBlock.Location.x])}
        },
    SwipeStart: (ev)=>{
        if (ev.targetTouches){
            MoveBlock.SwipeOrigin = {x: ev.targetTouches[0].clientX, y: ev.targetTouches[0].clientY};
            MoveBlock.SwipeEnd = {x: ev.targetTouches[0].clientX, y: ev.targetTouches[0].clientY}
        }
            else{
            MoveBlock.SwipeOrigin = {x: ev.clientX, y: ev.clientY};
                
            MoveBlock.SwipeEnd = {x: ev.clientX, y: ev.clientY};
        }
        document.querySelector(".Map").addEventListener("touchmove", MoveBlock.SwipeMove)
        document.querySelector(".Map").addEventListener("mousemove", MoveBlock.SwipeMove)
        document.querySelector(".Map").addEventListener("touchend", MoveBlock.SwipeFinish)
        document.querySelector(".Map").addEventListener("mouseup", MoveBlock.SwipeFinish)
    
        
    },
    SwipeMove: (ev)=>{
        if (ev.targetTouches && ev.targetTouches[0].clientX > 0 && ev.targetTouches[0].clientY > 0){
            MoveBlock.SwipeEnd = {x: ev.targetTouches[0].clientX, y: ev.targetTouches[0].clientY}}
            else if (ev.clientX > 0 && ev.clientY > 0){
            MoveBlock.SwipeEnd = {x: ev.clientX, y: ev.clientY}
        }
},
    SwipeFinish: (ev)=>{
        let screenWidth = window.innerWidth;
        let screenHeight = window.innerHeight;
        let distanceWidth = (MoveBlock.SwipeEnd.x - MoveBlock.SwipeOrigin.x)
        let distanceHeight = (MoveBlock.SwipeEnd.y - MoveBlock.SwipeOrigin.y)
        
        console.log(MoveBlock.SwipeOrigin)
        console.log(MoveBlock.SwipeEnd)
    
        console.log(screenWidth/10)
        if(Math.abs(distanceWidth) > Math.abs(distanceHeight)){
            if (distanceWidth > (screenWidth/10)) {
                MoveBlock.Right();
                MoveBlock.LastCommand = "Right"
                } else if (distanceWidth < (screenWidth/10)) {
                    MoveBlock.Left()
                MoveBlock.LastCommand = "Left"
                }
            } 
        else if(Math.abs(distanceWidth) < Math.abs(distanceHeight)){
            if (distanceHeight > (screenHeight/10)) {
                MoveBlock.Down();
                MoveBlock.LastCommand = "Down"
                } else if (distanceHeight < (screenHeight/10)) {
                    MoveBlock.Up()
                MoveBlock.LastCommand = "Up"
                }
            }
    MoveBlock.SwipeOrigin = {x:0, y: 0};
    MoveBlock.SwipeEnd = {x:0, y: 0};
        document.querySelector(".Map").removeEventListener("touchmove", MoveBlock.SwipeMove)
        document.querySelector(".Map").removeEventListener("mousemove", MoveBlock.SwipeMove)
        document.querySelector(".Map").removeEventListener("touchend", MoveBlock.SwipeFinish)
        document.querySelector(".Map").removeEventListener("mouseup", MoveBlock.SwipeFinish)
},
    SwipeAgain: (ev)=>{
        console.log(MoveBlock.LastCommand)
        MoveBlock[MoveBlock.LastCommand]()
    }
}


