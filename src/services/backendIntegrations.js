import { fetchData, storeData, seeAllValues } from "../storage";
import client from "./client";

export const deleteRefugee = async memberID => {
    stringfy = array => {
        let stringedArray = "";
        let item;
        let index;
        for (index in array) {
            item = array[index];
            item = `"${item}",`;
            stringedArray = stringedArray.concat(item);
        }
        return stringedArray;
    };

    const deleteRefugeeMutation = `
            mutation {
                deleteRefugee(id:"${memberID}"){id
                     Family{id}}
            }

        `;
    let deletionResponse = await client.gfetch(deleteRefugeeMutation);
    deletionResponse = JSON.parse(deletionResponse);
    const familyID = deletionResponse.data.deleteRefugee.Family.id;
    debugger;
    unbindMemberFromFamily(memberID, familyID);
};

export const unbindMemberFromFamily = async (memberID, familyID) => {
    const refugeeFamilyRaw = await fetchData("refugeeFamily");
    let refugeeFamily = JSON.parse(refugeeFamilyRaw);
    //console.log("refugee family: ", refugeeFamily);
    const newRefugeesArray = refugeeFamily.members.ids.filter(
        (value, index) => {
            if (value != memberID) {
                return value;
            }
        }
    );
    refugeeFamily.members.ids = newRefugeesArray;
    const newRefugeesArrayStringed = stringfy(newRefugeesArray);
    const unbindMemberFromFamilyQuery = `
        mutation UpdateFamilyByID{
            updateFamily(id: "${familyID}", 
              fields: {
              members: {
                  ids:[  {ids:[${newRefugeesArrayStringed}]}  ]
                } 
            }) {
              id
              members
            }
          }
          
    `;

    const unbindFromDatabaseResponse = await client.gfetch(
        unbindMemberFromFamilyQuery
    );

    const unbindFromDatabaseResponseObject = JSON.parse(
        unbindFromDatabaseResponse
    );

    if (unbindFromDatabaseResponse.error) {
        console.log("Deu ruim: ", unbindFromDatabaseResponseObject.error);
    } else {
        storeData("refugeeFamily", refugeeFamily);
        return unbindFromDatabaseResponse;
    }

    debugger;
};

export const getFamilyID = async email => {
    const getFamilyIDQuery = `
        query{
        refugees(limit:1, where:{email:{equalTo:${email}}}){
            results{                    
		Family{
      id
    }
                
                }
            }
        }
        
    `;
    const memberIDResponse = await client.gfetch(getFamilyIDQuery);
    let memberIDJSON = JSON.parse(memberIDResponse);
    //console.log("member id json: ", memberIDJSON);
    return memberIDJSON.data.refugees.results[0].Family.id;
};
export const deleteFamily = async () => {
    let refugeeFamily = await fetchData("refugeeFamily");
    const refugeeFamilyObject = JSON.parse(refugeeFamily);
    const familyID = refugeeFamilyObject.id;
    const deleteFamilyMutation = `
    mutation {
        deleteFamily(id:"${familyID}"){
            id
        }
    }
    `;
    const familyDeletionResponse = await client.gfetch(deleteFamilyMutation);
    debugger;
    return familyDeletionResponse;
};
export const getMembersFromFamily = async () => {
    const email = await fetchData("RefugeeEmail");
    const familyID = await getFamilyID(email);
    // let familyResponse = await fetchData("refugeeFamily");
    // console.log("family inside asyncqstorage: " + familyResponse);
    // const familyObject = JSON.parse(familyResponse);

    // familyID = familyObject[0].id;

    let getMembersDetails = `query refugeeInfoByFamily {
                refugees(where:
                  
                  {
              Family:{equalTo:"${familyID}"}
                  }
                                ) {
                  results {
                    name
                    email
                    age
                    scholarity
                    needs
                    identificationDocument
                    identificationDocumentType
                    primaryContact
                    id
                  }
                }
              }
              `;

    let familyQueryResponse = await client.gfetch(getMembersDetails);
    let familyObj = JSON.parse(familyQueryResponse);

    //console.log(familyObj);
    let membersArray = familyObj.data.refugees.results;
    //console.log(`Members array:`, membersArray);
    storeData("membersDetails", membersArray);
    return membersArray;
};
