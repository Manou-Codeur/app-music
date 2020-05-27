export class generateData {
    constructor(input) {
        this.input = input;
    }

    async getData() {
        const config = {
            method: 'get',
            headers: {
                "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
                "x-rapidapi-key": "f71b085143msh517af3594e3330dp1ae11ajsn2a02e5d9c963"
            }
        }
        try {
            const res = await (await fetch(`https://deezerdevs-deezer.p.rapidapi.com/search?q=${this.input}`, config)).json();
            this.result = res.data;
        }catch (err) {
            console.log(err.message);
        }       
    }
}


