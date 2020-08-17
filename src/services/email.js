import { fetchData } from "../storage";

export const sendEmail = (code, destination) => {
    console.log(`Enviando email para ${destination}...`);
    return fetch("https://parseapi.back4app.com/functions/email", {
      body: `{\"destination\":\"${destination}\", \"verificationCode\":\"${code}\", \"lang\":\"spanish\"}`,
      headers: {
        "Content-Type": "application/json",
        "X-Parse-Application-Id": "47RAnYvxm7rWLUTUZYHt9SItJjd9FnmWj5ZK5g92",
        "X-Parse-Rest-Api-Key": "exy1jOc1RYcpS3O6boeK3opNctvE29BjeED7jsM9"
      },
      method: "POST"
    });
};
