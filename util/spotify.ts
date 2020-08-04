var { getData } = require("spotify-url-info");

function getConcatedArray() { }

export function isSpotifyUri(uri: string):boolean {
    let matched = uri.match(/(?:https:\/\/)?(?:embed\.|open\.)(?:spotify\.com\/)(?:playlist\/|track\/|\?uri=spotify:track:)((\w|-){22})/);
    return matched !== null;
}

export async function getSongNamesFromPlaylist(url: string) {
    let data = await getData(url);
    let tracs = data.tracks.items.map((val: any) => val.track);
    let artists: string[] = tracs.map((track: any) => track.artists?.map((val: any) => val.name).join(" "));
    let concated: string[] = [];
    for (let i = 0; i < tracs.length; i++) {
        let conca = tracs[i].name + " " + artists[i];
        concated.push(conca);
    }
    console.log(concated);
    return concated;
}

// /https?:\/\/(?:embed\.|open\.)(?:spotify\.com\/)(?:track\/|\?uri=spotify:track:)((\w|-){22})/

async function hell() {
    let data = await getData("https://open.spotify.com/playlist/4mIychwu99ujzilx50lXoG?si=K1vTei9SSvm6TNkd47iqlQ");
    console.log(data);
    let tracs = data.tracks.items.map((val: any) => val.track);
    let artists: string[] = tracs.map((track: any) => track.artists?.map((val: any) => val.name).join(" "));
    // tracs.forEach((val1:any)=>{artists.push(val1.artists?.map((val: any) => val.name).join(" "))})

    let concated: string[] = [];
    for (let i = 0; i < tracs.length; i++) {
        let conca = tracs[i].name + " " + artists[i];
        concated.push(conca);
    }
    console.log(concated);
}
// getSongNamesFromPlaylist("https://open.spotify.com/playlist/4mIychwu99ujzilx50lXoG?si=K1vTei9SSvm6TNkd47iqlQ");
console.log(isSpotifyUri("open.spotify.com/playlist/4mIychwu99ujzilx50lXoG"));
