export const gfetch = async (
    graphqlEndpoint,
    initialHeaders,
    query,
    variables = {}
) => {
    const contentType = { "content-type": "application/json" };
    const headers = { ...contentType, ...initialHeaders };
    const response = await fetch(graphqlEndpoint, {
        method: "POST",
        headers: headers,
        body: JSON.stringify({ query, variables })
    });
    if (response.status == 500) {
        console.log("Request returned error 500");
    }
    return response.text();
};

class gfClient {
    constructor(graphqlEndpoint, initialHeaders) {
        this.graphqlEndpoint = graphqlEndpoint;
        const contentType = { "content-type": "application/json" };
        this.headers = { ...contentType, ...initialHeaders };
    }
    gfetch = async (query, variables) => {
        const response = await fetch(this.graphqlEndpoint, {
            method: "POST",
            headers: this.headers,
            body: JSON.stringify({ query, variables })
        });
        if (response.status == 500) {
            console.log("Request returned error 500");
        }
        return response.text();
    };
}
export default gfClient;
