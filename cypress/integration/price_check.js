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
    let ts = '';
    let out = []

    before(async () => {
        // TODO create command here

        ts = new Date().toISOString()

        await db.collection("prices").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                console.log(`${doc.id} => ${doc.data()}`);
                fixtures.push(doc.data())
            });
        });

        db.collection('sessions').doc().set({
            date: ts
        }).then(function (docRef) {
            console.log("Logged session");
        }).catch(function (error) {
            console.log("Error logging session document: ", error);
        })

    })

    it('should take price for the item', () => {

        out = [...fixtures]

        fixtures.forEach((element, i) => {
            cy.visit(`${element.url}`)

            out[i] = {
                ...out[i],
                originalPrices: out[i].originalPrices || {},
                currentPrices: out[i].currentPrices || {}
            }

            cy.get(selectors.itemPage.originalPrice).should((t) => {
                if (t && t.text()) {
                    out[i]['originalPrices'][`${ts}`] = {
                        date: ts,
                        price: `${t.text()}`
                    }
                }
            })
            cy.get(selectors.itemPage.currentPrice).should((t) => {
                if (t && t.text()) {
                    out[i]['currentPrices'][`${ts}`] = {
                        date: ts,
                        price: `${t.text()}`
                    }
                }
            })

            cy.get(selectors.itemPage.salePrice).should((t) => {
                if (t && t.text()) {
                    out[i]['currentPrices'][`${ts}`] = {
                        date: ts,
                        price: `${t.text()}`
                    }
                }
            })

            cy.get(selectors.itemPage.dealPrice).should((t) => {
                if (t && t.text()) {
                    out[i]['currentPrices'][`${ts}`] = {
                        date: ts,
                        price: `${t.text()}`
                    }
                }
            })

            cy.get(selectors.itemPage.title)
                .should((t) => {
                    if (t && t.text()) {
                        out[i].title = t.text().toString().trim()
                    }
                })

        });
    })

    after(() => {
        cy.log('Saving: ', out)
        console.log(out)

        out.forEach(element => {
            const savedObj = Object.assign({}, element)
            db.collection('prices').doc(`${savedObj.name}`).set(savedObj)
                .then(function (docRef) {
                    cy.log("Document written with ID: ", docRef);
                })
                .catch(function (error) {
                    cy.log("Error adding document: ", error);
                })
            });
    })

})