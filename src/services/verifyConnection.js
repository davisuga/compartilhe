export default async function verifyConnection() {
    try {
        let response = await fetch("www.google.com");
        console.log("connection status: ", response.status);
        return true;
    } catch (error) {
        return false;
    }
}
