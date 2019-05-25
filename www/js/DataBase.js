function DataBase(){
};

DataBase.prototype = {
    /*
    pick: function(fieldName,targetName){
        var Data = ncmb.DataStore("Data");
        Data.order(fieldName,false)
            .equalTo(filedName,targetName)
            .fetchAll()
            .then(function(results){
                var array = results;
                return array;
            })
    },

    extract: function(array,fieldName) {
        return array.get(fieldName);
    },
*/
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

    everyLanRecord: async function() {
        var Data = ncmb.DataStore("Data");
        await Data.order("Language",false)
            .fetchAll()
            .then(function(results){
                var lang = document.getElementById("lang");
                var language,buff = "";
                for(i = 0;i < results.length;i++){
                    language = results[i].get("Language");
                    if(language != buff || i == 0){
                        console.log("language :" + language);
                        lang.innerHTML += "<div id='" + language
                            + "'>" + language + "</div><hr>";
                        buff = language;
                    }
                }
                alert("everyLanRecord");
            })
            .catch(function(err) {
                alert("everyLanRecord err");
            });
        this.everyEleRecord();
    },
    
    everyEleRecord: function() {
        var Data = ncmb.DataStore("Data");
        Data.order("Element",false)
            .fetchAll()
            .then(function(results){
                var Lang,langId,Elem,buff = "";
                for(i = 0;i < results.length;i++){
                    Elem = results[i].get("Element");
                    if(Elem != buff || i == 0){
                        buff = Elem;
                        console.log("Element :" + Elem);
                        Lang = results[i].get("Language");
                        langId = document.getElementById(Lang);
                        langId.innerHTML += "<div>" + results[i].get("Element") + "</div>"; 
                    }
                }
                alert("everyEleRecord");
            })
            .catch(function(err){
                alert("everyEleRecord err");
            });
    }
};
