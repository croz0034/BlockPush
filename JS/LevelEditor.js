let WorldBuilder = {
    CurrentMap: {},
    
    
    
    
    
    
    SaveLevel: ()=>{
        
    CrozFire.AddItemToCollection(ConvertToJSON(WorldBuilder.CurrentMap))
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