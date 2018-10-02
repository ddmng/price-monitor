Genesi e2e test suite
---

e2e test suite for GenesiX.

List of tests made and still to be written:

 * login
    * [x] login success
    * [x] login failure
    * [x] login input contents
    * [x] logout
 * routes
    * [x] search menu
    * [x] realtime menu
    * [ ] admin menu
    * [x] target deferred page
 * sidebar
    * [x] target name filter
    * [x] open/close sidebar
    * [ ] number of targets in realtime
    * [ ] open/close realtime panel
    * [ ] open deferred on target click
    * [ ] open deferred at click on target from closed sidebar
    * [ ] realtime GPS target icon
    * [ ] HQ realtime target icon
    * [ ] play HQ audio
 * deferred page
    * single target
        * [x] datetime picker clicks
        * [ ] map tests from realtime
        * [ ] all labels present and updated
        * [ ] play, stop, pause
        * [ ] map toggles
        * [ ] add/modify/delete note
        * [ ] view note in timeline
        * [ ] zoom timeline
        * [ ] reset timeline zoom
    * multi-target
        * [ ] todo
 * search
    * [x] search pressing enter
    * [ ] search clicking on button
    * [ ] filter toggles (many tests)
    * [ ] pagination
    * [x] badges
    * [x] jump to target deferred data on click
 * realtime
    * [ ] zoom in/out
    * [ ] pan
    * [ ] change map style
    * [ ] realtime target list is present
    * [ ] realtime target list open/collapse
    * [ ] fullscreen on/off
    * [ ] open/close menu
    * [ ] change map style
    * [ ] mapo toggles---> multiple
    * [ ] edit zones
    * [ ] edit pois
    * [ ] zone violation in-out
    * [ ] nearby start-end

## Develop
Clone the repo, run `npm install`, start with `npm start`.

To test the CI script, run `npm run ci`, or `npm run ci-headed`.

## CI
Tests are run by the CI regardless of which branch is pushed.
