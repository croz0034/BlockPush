//import * as firebase from 'firebase';

//const config = {
//    apiKey: "AIzaSyC2Q2mS3i2Egz-nWVD_NvqckjX5B8UrQzI",
//    authDomain: "blockpush-41c97.firebaseapp.com",
//    databaseURL: "https://blockpush-41c97.firebaseio.com",
//    projectId: "blockpush-41c97",
//    storageBucket: "",
//    messagingSenderId: "321081899277"
//  };
//
//  firebase.initializeApp(config);

let CrozFire = {
    Collection: "TestMaps",
    Info: "Database Call added in init function ",
    settings: {
        timestampsInSnapshots: true
    },
    init: () => {
        firebase.firestore().settings(CrozFire.settings)
        CrozFire.Info = firebase.firestore().collection(CrozFire.Collection)
    },
    RetrieveCollection: () => {
        let ReturnObject = {};
        let Query = CrozFire.Info;
         let MyData = Query.get().then(
            (Results) => {
            Results.forEach((item) => {
                ReturnObject[item.id] = item.data();
            })
        }).then(()=>{
        return ReturnObject})
         return MyData
    },
    DeleteItemFromCollection: (item) => {
        CrozFire.Info.doc(item).delete()
            .then(() => {
                console.log("Deletion sucessfull")
            })
            .catch((err) => {
                console.log(err)
            });
    },
    AddItemToCollection: (itemObject)=>{
        console.log(itemObject)
        let itemKey
        if(itemObject.Name){
        itemKey = itemObject.Name
        }
        else{
        itemKey = (CrozFire.Info.get().length) + 1
        }
        CrozFire.Info.doc(itemKey).set(itemObject)
    },
    DestructiveEdit: (item, itemObject)=>{
        CrozFire.DeleteItemFromCollection(item);
        CrozFire.AddItemToCollection(itemObject);
    }
}



