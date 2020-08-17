export default class gfClient {
    graphqlEndpoint: string;
    initialHeaders: Object;
    headers: Headers;
    constructor(graphqlEndpoint: string, initialHeaders: Object) {
        this.graphqlEndpoint = graphqlEndpoint;
        const fullHeader: HeadersInit = new Headers();
        fullHeader.set("content-type", "application/json");
        for (let header in initialHeaders) {
            fullHeader.set(header, initialHeaders[header]);
        }
        this.headers = new Headers(fullHeader);
    }
    gfetch = async (query: string, variables: string = "") => {
        const response = await fetch(this.graphqlEndpoint, {
            method: "POST",
            headers: this.headers,
            body: JSON.stringify({ query, variables })
        });
        if (response.status == 500) {
            console.log("Request returned error 500");
        }
        return response;
    };
}

const test = async () => {
    const gf = new gfClient("https://parseapi.back4app.com/graphql", {
        "X-Parse-Application-Id": "47RAnYvxm7rWLUTUZYHt9SItJjd9FnmWj5ZK5g92",
        "X-Parse-Master-Key": "ROXjba6KiTyXFEd8rKTuQgRhT2eo7qLA2z2pjuBq",
        "X-Parse-Client-Key": "TBMpytUUyOzTAOlGP7e5vHLeFWxyvpUrQkD0UHHH"
    });
    let familyID = "";
    let response: any = await gf.gfetch(`query{
        families(where:{id:{equalTo:"${familyID}"}}){
            results{
            id 
            members
            }
        }
        }`);
    // let json = await response.json();
    console.log(response);
};
test();
