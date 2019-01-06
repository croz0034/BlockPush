let Interractable = {
    HomeInitalized: false,
    init: () => {
        Interractable.Scour("page");
        Interractable.page.NaviBuild()
        console.log(screen.height)
        if (!Interractable.HomeInitalized) {
            let initList = Object.keys(Interractable);
            for (i = 2; i < (initList.length - 2); i++) {
                if (initList[i] != "page") {
                    Interractable.Scour(initList[i]);
                }
                Interractable.allBuild(initList[i]);
                if (Interractable[initList[i]].Used) {
                    console.log(initList[i])
                }
            };
        }
    },
    //////////////// Touch Functionality
    draggable: {
        Used: false,
        List: [],
        Build: (zone) => {
            Interractable.draggable.Used = true;
            let Start = {
                x: 0,
                y: 0
            };
            let Current = {
                x: 0,
                y: 0
            };

            let screenwidth = window.innerWidth;
            let screenheight = window.innerHeight;
            console.log(screenwidth);
            console.log(screenheight);
            zone.style.top = `${
(((zone.getAttribute("FromTop"))/100)*screenheight)}px`;
            zone.style.left = `${
(((zone.getAttribute("FromLeft"))/100)*screenwidth)}px`;



            //////////////// Desktop Drag
            zone.draggable = "true";
            zone.ondragstart = (ev) => {
                Start.x = ev.clientX;
                Start.y = ev.clientY;
                console.log('start')
            };

            zone.ondrag = (ev) => {
                if (ev.clientX > 0 && ev.clientY > 0) {
                    Current.x = ev.clientX;
                    Current.y = ev.clientY;
                };

                console.log(Current)
            }
            zone.ondragend = (ev) => {
                differenceX = parseInt(zone.style.left) + (Current.x - Start.x);
                differenceY = parseInt(zone.style.top) + (Current.y - Start.y);
                zone.style.top = `${differenceY}px`;
                zone.style.left = `${differenceX}px`;
                console.log(`Moved to X: ${differenceX}px, Y: ${differenceY}px`)
            }

            //////////////// Mobile Drag
            let draggo = (ev) => {
                let newArea = {
                    x: ev.targetTouches[0].screenX,
                    y: ev.targetTouches[0].screenY
                };
                if (newArea.x > 0 && newArea.y) {
                    Current = newArea;
                    console.log(newArea)
                }
            }
            let dragstart = (ev) => {
                let newArea = {
                    x: ev.targetTouches[0].screenX,
                    y: ev.targetTouches[0].screenY
                };
                if (newArea.x > 0 && newArea.y) {
                    Start = newArea;
                    console.log(newArea)
                }
            };
            let dragend = (ev) => {
                differenceX = parseInt(zone.style.left) + (Current.x - Start.x);
                differenceY = parseInt(zone.style.top) + (Current.y - Start.y);
                zone.style.top = `${differenceY}px`;
                zone.style.left = `${differenceX}px`;
                console.log(`Moved to X: ${differenceX}px, Y: ${differenceY}px`)

            }

            zone.addEventListener("touchstart", dragstart);
            zone.addEventListener("touchmove", draggo);
            zone.addEventListener("touchend", dragend);

        }

    },
    zoneTetheredDrag: {
        Used: false,
        List: [],
        Build: (zone) => {

            Interractable.zoneTetheredDrag.Used = true;
            zone.id = zone.textContent;
            //////////////// Mobile Drag
            let dragstart = (ev) => {
                ev.preventDefault()
                console.log(ev)
            }
            zone.addEventListener("touchstart", dragstart)
            /////////////// Desktop Drag
            zone.setAttribute("draggable", true)
            zone.ondragstart = Interractable.zoneTetheredDrag.DragFunc;
        },
        DragFunc: (ev) => {
            ev.dataTransfer.setData("player", ev.target.id);
        }
    },
    dropZone: {
        Used: false,
        List: [],
        ItemCount: () => {
            Interractable.dropZone.List.forEach((zone) => {
                console.log(`${zone.childElementCount} items in column ${zone.id}`)
            })
        },
        Build: (zone) => {
            Interractable.dropZone.Used = true;

            ///////// Mobile Drop
            let zoneTarget;
            Draggo = (ev) => {
                let targetArea = ev.targetTouches[0];
                zoneTarget = {
                    x: Math.floor(targetArea.clientX),
                    y: Math.floor(targetArea.clientY)
                }
            }
            Dragend = (ev) => {
                document.elementFromPoint(zoneTarget.x, zoneTarget.y).appendChild(ev.target);
            }
            zone.addEventListener("touchmove", Draggo);
            zone.addEventListener("touchend", Dragend);
            ////////////// Desktop Drop
            zone.ondragover = Interractable.dropZone.allowDrop;
            zone.ondrop = Interractable.dropZone.drop
        },
        drop: (ev) => {
            ev.preventDefault();
            var data = ev.dataTransfer.getData("player");
            data ? ev.target.appendChild(document.getElementById(data)) : console.log("Probably The Wind");
            Interractable.dropZone.ItemCount();
        },
        allowDrop: (ev) => {
            ev.preventDefault();
        }
    },
    swipeCard: {
        Used: false,
        List: [],
        Build: (zone) => {

            Interractable.swipeCard.Used = true;
            let ThreshHold;
            let Current;

            ////////////////////// Mobile Drag 
            let draggo = (ev) => {
                let newArea = ev.targetTouches[0].screenX
                if (newArea > 0) {
                    Current = newArea;
                    console.log(newArea)
                }
            }
            let dragstart = (ev) => {
                ThreshHold = ev.targetTouches[0].screenX;
                console.log(ev.targetTouches[0].screenX)
            };
            let dragend = (ev) => {
                if (Current > (ThreshHold + 100)) {
                    zone.textContent = `Right!`;
                    console.log("right")
                } else if (Current < (ThreshHold - 100)) {
                    zone.textContent = `Left!`
                    console.log("left")

                }
            }

            zone.addEventListener("touchstart", dragstart);
            zone.addEventListener("touchmove", draggo);
            zone.addEventListener("touchend", dragend);

            //////////////// Desktop Drag
            zone.draggable = "true";
            zone.ondragend = (ev) => {
                console.log(ev.screenX);
                Current = ev.screenX;
                console.log(zone)
                if (ev.screenX > (ThreshHold + 100)) {
                    ev.target.textContent = `Right!`;
                } else if (ev.screenX < (ThreshHold - 100)) {
                    zone.textContent = `Left!`;

                }
            };
            zone.ondragstart = (ev) => {
                ThreshHold = ev.screenX;
                console.log(ev.screenX)
            };
            /////////////////////////////////
            zone.addEventListener('click', () => {
                zone.textContent = `Center!`
            })


        }

    },
    /////////////// Page Quality of life.
    page: {
        Used: false,
        List: [],
        Build: (zone) => {

            Interractable.page.Used = true;
            if (Interractable.HomeInitalized == false) {} else {
                zone.id = "hidden"
            }
            Interractable.HomeInitalized = true
        },
        NaviGate: (ev) => {
            let pageList = Interractable.Scour('page');
            console.log(Interractable.page.List[ev.target.id])
            Interractable.page.List.forEach((zone) => {
                zone.id = "hidden"
            });
            ev.target.parentElement.childNodes.forEach((Gate) => {
                Gate.classList.remove("Current")
            });
            Interractable.page.List[ev.target.id].id = "active";
            ev.target.classList.add("Current")
        },
        NaviBuild: () => {
            if (Interractable.page.List.length > 1) {
                let WebPage = document.querySelector('body');

                let HeaderSection = document.createElement('h4');
                HeaderSection.id = 'nav';
                WebPage.appendChild(HeaderSection);
                let ListSection = document.createElement('ul');
                HeaderSection.appendChild(ListSection);
                let zoneTitle;
                let pageNumbers = 0;
                Interractable.page.List.forEach((zone) => {
                    zone.id ? zoneTitle = zone.id : zoneTitle = pageNumbers + 1;
                    let additions = document.createElement('li');
                    additions.id = pageNumbers;
                    additions.textContent = zoneTitle;
                    pageNumbers != 0 ? console.log(pageNumbers) : additions.classList.add("Current");
                    additions.addEventListener('click', Interractable.page.NaviGate);
                    pageNumbers++;
                    ListSection.appendChild(additions)
                })

            }
        }

    },
    Minbar: {
        Used: false,
        List: [],
        Build: (zone) => {

            Interractable.Minbar.Used = true;
            let target = zone.previousElementSibling;
            console.log(target);

            let MiniBar = document.createElement("p");
            MiniBar.classList = zone.classList;
            MiniBar.innerHTML = `${zone.id} <div style="float: right; height: 1rem; width: 1rem" id="Toggler"> - </div>`;
            zone.parentElement.replaceChild(MiniBar, zone);
            MiniBar.appendChild(zone)
            let Button = MiniBar.querySelector("#Toggler");

            Button.addEventListener('click', Interractable.Minbar.BarToggle)
        },
        BarToggle: (ev) => {
            console.log(ev.target)
            ev.target.parentElement.childNodes.forEach((Item) => {
                if (Item.id != "Toggler" && Item.id != "DeleteX") {
                    if (Item.id != "hidden") {
                        Item.id = "hidden";
                    } else {
                        Item.id = "";
                    }
                } else {
                    if (Item.textContent.includes("-")) {
                        console.log('pling')
                        Item.textContent = "+"
                    } else if (Item.textContent.includes("+")) {
                        Item.textContent = "-"
                    }
                }
            })
        }
    },
    Deletable: {
        Used: false,
        List: [],
        Build: (zone) => {
            Interractable.Deletable.Used = true;

            if (zone.classList.contains("Minbar")) {
                let target = zone.parentElement.querySelector("#Toggler")
                let additions = document.createElement("div");
                additions.style.float = "right";
                additions.style.height = "1rem";
                additions.style.width = "1rem";
                additions.id = "DeleteX";
                additions.textContent = "X";
                additions.addEventListener('click', Interractable.Deletable.trash)
                console.log(target)
                target.parentElement.insertBefore(additions, target);
            } else {

                let target = zone.previousElementSibling;
                console.log(target);

                let DeleteX = document.createElement("p");
                DeleteX.classList = zone.classList;
                DeleteX.innerHTML = `${zone.id} <div style="float: right; height: 1rem; width: 1rem" id="DeleteX" onclick="${Interractable.Deletable.trash}"> X </div>`;
                zone.parentElement.replaceChild(DeleteX, zone);
                DeleteX.appendChild(zone)
                let Button = DeleteX.querySelector("#DeleteX")

                Button.addEventListener('click', Interractable.Deletable.trash)

            }
        },
        trash: (ev) => {
            let choppingBlock = ev.target.parentElement;
            console.log(choppingBlock);
            choppingBlock.parentElement.removeChild(choppingBlock)
        },

    },
    ///////////////// Filters (Add at a later date)
    listFromObject: {
        Used: false,
        List: [],
        ListItems: [],
        Build: (zone) => {
            Interractable.listFromObject.Used = true;
            let targets = zone.firstElementChild;
            let Builder = {}
            targets.childNodes.forEach((target) => {
                if (target.classList) {
                    console.log(target.classList[0])
                    Builder[target.classList[0]] = target;
                }
            })
            let ListBuilder = Object.keys(Builder)
zone.innerHTML = ""
            Interractable.listFromObject.FilterConstruct(ListBuilder, zone)
            ObjectArrays[zone.id].forEach((item) => {
                let stage = document.createElement('div');

                let additions;
                ListBuilder.forEach((li) => {
                    additions = Builder[li].cloneNode(true)
                    additions.textContent += item[li];
                    stage.appendChild(additions);
                    
                })
                zone.appendChild(stage)
                Interractable.listFromObject.ListItems.push(stage);
            })
        },
        FilterConstruct: (prop, zone)=>{
            let filter = document.createElement('div');
            zone.appendChild(filter);
             let By = document.createElement('select');
            filter.appendChild(By);
            let additions = document.createElement("option")
            additions.value = "";
            additions.textContent = "Filter by";
            By.appendChild(additions)
            
            prop.forEach((option)=>{
            additions = document.createElement("option")
            additions.value = option;
            additions.textContent = option;
            By.appendChild(additions)
            })
            additions = document.createElement('select');
            additions.innerHTML = 
            `<option value="includes">contains</option><option value="excludes">excludes</option>
            <option value="greater"> greater than </option>
            <option value="less"> less than </option>`;
            filter.appendChild(additions);
            additions = document.createElement("input");
            additions.type = "text";
            additions.hint = "value";
            filter.appendChild(additions);
            
            
        filter.addEventListener("change", Interractable.listFromObject.FilterHandler);
        },
        
        FilterHandler: (ev)=>{
        console.log(ev.target.parentElement.parentElement)
        let By = ev.target.parentElement.childNodes[0].value
        let Filter = ev.target.parentElement.childNodes[1].value
        let UserInput = ev.target.parentElement.childNodes[2].value
        let items = Interractable.listFromObject.ListItems
        
        if(By && Filter && UserInput){
            let x = 0;
            let target = ObjectArrays[ev.target.parentElement.parentElement.id]
        if(Filter == "includes" ){
            items.forEach((item)=>{
                console.log(items)
            console.log(item.textContent);
            console.log(target[x][By])
                console.log('ping!')
            if(target[x][By].includes(UserInput)){
            item.id = "passed"
            console.log(item)}
                
            else {item.id = 'hidden'}  x ++
            })
        }
                   if(Filter == "excludes" ){
            items.forEach((item)=>{
                console.log(items)
            console.log(item.textContent);
            console.log(target[x][By])
                console.log('ping!')
            if(target[x][By].includes(UserInput)){
            item.id = "hidden"
            console.log(item)}
                
            else {item.id = 'passed'}  x ++
            })
        }
            
            
            
    }
        }
    },
    ///////////////// Initalization aids
    Scour: (Item) => {
        Interractable[Item].List = document.querySelectorAll(`.${Item}`);
    },
    allBuild: (Item) => {
        Interractable[Item].List.forEach((X) => {
            Interractable[Item].Build(X)
        })
    }
}
///////////////////////////////////////////

//let test = document.createElement("p")
//test.textContent = Interractable.draggable.Build
//document.querySelector(".page").appendChild(test)
document.addEventListener("DOMContentLoaded", Interractable.init)
