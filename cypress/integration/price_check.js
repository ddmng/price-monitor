/// <reference types="Cypress" />
import firebase from "firebase";
import * as selectors from '../support/selectors'

/* *************************************** */
/* firebase */
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
/* *************************************** */


const parsePrice = priceString =>
    priceString && priceString.split(" ").length ?
    parseFloat(priceString.trim().replace(',', '.').split(" ")[1]) :
    undefined;

describe('Check prices', () => {
    let fixtures = [];
    let ts = '';
    let out = []

    before(async () => {
        // TODO create command here
        ts = new Date().toISOString()

        await db.collection("prices").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                const d = doc.data()

                const o = Object
                    .entries(d.prices)
                    .sort((a, b) => a[0] < b[0])
                    .slice(0, 5)
                    .map(([k, v]) => ({
                        [k]: v
                    }))

                const p = o.reduce((acc, element) => {
                    console.log("-->", acc, element)
                    return element ? Object.assign(acc, element) : {}
                }, {})

                fixtures.push({
                    ...d,
                    prices: d.prices ? p : {}
                })
            });
        });

        out = [...fixtures]

        db.collection('sessions').doc().set({
            date: ts
        }).then(function (docRef) {
            console.log("Logged session");
        }).catch(function (error) {
            console.log("Error logging session document: ", error);
        })

    })

    it('should take price for the item', () => {

        fixtures.forEach((element, i) => {
            cy.visit(`${element.url}`)
            ts = new Date().toISOString()

            out[i] = {
                ...out[i],
                prices: out[i].prices || {
                    [`${ts}`]: {
                        original: 0,
                        current: 0
                    }
                }
            }

            cy.get(selectors.itemPage.originalPrice).should((t) => {
                if (t && t.text()) {
                    out[i].prices[`${ts}`] = {
                        ...out[i].prices[`${ts}`],
                        original: parsePrice(t.text())
                    }
                }
            })
            cy.get(selectors.itemPage.currentPrice).should((t) => {
                if (t && t.text()) {
                    out[i].prices[`${ts}`] = {
                        ...out[i].prices[`${ts}`],
                        current: parsePrice(t.text())
                    }
                }
            })

            cy.get(selectors.itemPage.salePrice).should((t) => {
                if (t && t.text()) {
                    out[i].prices[`${ts}`] = {
                        ...out[i].prices[`${ts}`],
                        current: parsePrice(t.text())
                    }
                }
            })

            cy.get(selectors.itemPage.dealPrice).should((t) => {
                if (t && t.text()) {
                    out[i].prices[`${ts}`] = {
                        ...out[i].prices[`${ts}`],
                        current: parsePrice(t.text())
                    }
                }
            })

            cy.get(selectors.itemPage.title)
                .should((t) => {
                    if (t && t.text()) {
                        out[i].title = t.text().toString().trim()
                    }
                })

            cy.get(selectors.itemPage.availability)
                .should((t) => {
                    if (t && t.text()) {
                        out[i].prices[`${ts}`] = {
                            ...out[i].prices[`${ts}`],
                            availability: t.text().toString().trim()
                        }
                    }
                })

            out[i].lastRun = `${ts}`
        })
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