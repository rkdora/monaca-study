function DataBase(){
    this.pickLanguage();
};

DataBase.prototype = {
    init: function() {
        
    },
    
    pick: function(fieldName,targetName){
        var Data = ncmb.DataStore("Data");
        Data.order(fieldName,false)
            .equalTo(filedName,targetName)
            .fetchAll()
            .then(function(results){


                
            })
            .catch(function(err){
                alert(err);
            });
    },
    pickLanguage: async function() {
        var Data = ncmb.DataStore("Data");
        var obj = [];
        console.log("1");
        await Data.order("Language",false)
            .fetchAll()
            .then(function(results){
                var sorted = [];
                var k = 1;
                console.log(results);
                var buff = results[0].get("Language");
                sorted[0] = buff;
                console.log("2");
                for(i = 1; i < results.length; i++){
                    
                    if(results[i].get("Language") != buff){
                        sorted[k] = results[i].get("Language");
                        k++;
                        buff = results[i].get("Language");   
                    }
                }
                console.log("3");

                for(i = 0; i < sorted.length; i++){
                    console.log("sorted:"+sorted[i]);
                    
                    var target = document.getElementById("defaultOption")
                    var option = document.createElement('option');
                    option.label = sorted[i];
                    option.value = sorted[i]; 
                    target.insertAdjacentElement("afterend", option);
                }
                
            })
            .catch(function(err){
                alert(err);
            });
        
    },

    extract: function(array,fieldName) {
        return array.get(fieldName);
    },    

    save: function(user,language,element) {
        var Data = ncmb.DataStore("Data");
        var data = new Data();

        data.set("User",user)
            .set("Language",language)
            .set("Element",element)
            .save()
            .then(function(results){
                alert("saved");
            })
            .catch(function(err){
                alert("save err");
            });
    },
    showCheckBox: function(){
        var inputValue = getId("language").value;
        //console.log(inputValue);
        if(inputValue == "other"){
            var target = getId("language")
            var langText = document.createElement('input');
            var langButton = document.createElement('input');
            var elementText = document.createElement('input');
            var elementButton = document.createElement('input');
            elementText.type = "text";
            elementText.id = "newElem";
            target.insertAdjacentElement("afterend", elementButton);
            target.insertAdjacentElement("afterend", elementText);
            langText.type = "text";
            langText.id = "newLang";
            target.insertAdjacentElement("afterend", langButton);
            target.insertAdjacentElement("afterend", langText);
            
        }
        else{
            var Data = ncmb.DataStore("Data");
            //  console.log(inputValue);
            Data.order("Language",false)
                .equalTo("Language",inputValue)
                .fetchAll()
                .then(function(results){
                    var elesorted = [];
                    var k = 1;
                    console.log("results[0]"+results[0].get("Element"));
                    var buff = results[0].get("Element");
                    //  console.log(buff);
                    elesorted[0] = buff;
                    
                    for(i = 1; i < results.length; i++){
                        
                        if(results[i].get("Element") != buff){
                            elesorted[k] = results[i].get("Element");
                            k++;
                            buff = results[i].get("Element");
                            //  console.log(buff);
                        }
                    }
                    var target = document.getElementById("elemSpace");
                    target.innerHTML = "";
                    
                    for(i = 0; i < elesorted.length; i++){
                        console.log(elesorted[i]);
                       var  checkBox = "<input type='radio' value="+elesorted[i]+">"+elesorted[i];

                        target.innerHTML += checkBox;
                        
                    }
                    
                })
                .catch(function(err){
                    alert(err);
                });
        }
        

    }
    
    
};
