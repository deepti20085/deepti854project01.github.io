function Song(id,name,songUrl,songimage){
    this.id = id;
    this.name = name;
    this.songUrl = songUrl;
    this.songimage = songimage;
    this.delete = false;
}

var obj = {
    playList : [],

    addSong : function(id,name,songUrl, songimage){
        var song = new Song(id, name, songUrl, songimage);
        this.playList.push(song);
        
    },

    deleteSong : function(id){
        var toDelete = this.playList.filter(function(obj){
            return obj.id == id;
        })

        toDelete[0].delete = true;
        
        this.playList = this.playList.filter(function(obj){
            return obj.delete == false;
        })
        
    },

    searchSong : function(songName) {
        this.playList = this.playList.filter(function(obj){
            return obj.name.includes(songName);
        })
    }

}