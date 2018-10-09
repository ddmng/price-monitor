/// <reference types="Cypress" />
import firebase from "firebase";
import * as selectors from '../support/selectors'



var config = {
    apiKey: "AIzaSyB1N3iqtOtnnKSWIjF0UtIJX1mOv72GgPU",
    authDomain: "pricemonitor-ha.firebaseapp.com",
    databaseURL: "https://pricemonitor-ha.firebaseio.com",
    projectId: "pricemonitor-ha",
    storageBucket: "pricemonitor-ha.appspot.com",
    messagingSenderId: "969469416607"
};
firebase.initializeApp(config);

var db = firebase.firestore();
db.settings({
    timestampsInSnapshots: true
});


describe('Check prices', () => {
    let fixtures = [];
    let data = [];

    before( async () => {
        await db.collection("prices").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                console.log(`${doc.id} => ${doc.data()}`);
                fixtures.push(doc.data())
            });
        });
    })

    it('should take price for the item', () => {
        fixtures.forEach((element, i) => {
            cy.visit('' + element.url)

            let out = {
                name: element.name,
                url: element.url,
                currentPrices: {...element.currentPrices},
                originalPrices: {...element.originalPrices}
            }
            let ts = `${new Date().toISOString()}`

            cy.get(selectors.itemPage.originalPrice).should((t) => {
                if (t && t.text()) {
                    out.originalPrices[ts] = {
                        date: ts,
                        price: `${t.text()}`
                    }
                }
            })

            cy.get(selectors.itemPage.currentPrice).should((t) => {
                if (t && t.text()) {
                    out.currentPrices[ts] = {
                        date: ts,
                        price: `${t.text()}`
                    }
                }
            })

            cy.get(selectors.itemPage.title).should((t) => {
                if (t && t.text()) {
                    out.title = t.text().toString().trim()
                }
            })
            data.push(out)
            console.log(out)

        });
    })

    after(() => {
        cy.log('Saving: ', data)

        data.forEach(f => {
            console.log(f)
            delete(f.__proto__)
            db.collection('prices').doc(f.name).set(Object.assign({}, f))
                .then(function (docRef) {
                    cy.log("Document written with ID: ", docRef);
                })
                .catch(function (error) {
                    cy.error("Error adding document: ", error);
                });;
        });
    })

})