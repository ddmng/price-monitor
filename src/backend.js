import {
    SetIdle
} from './general'

import * as firebase from './fx/firebase'

import {
    fbConfig
} from './fbconfig'

export const Connected = (state) => SetIdle({
    ...state,
    firebase: "connected",
})

export const Connect = (state) => [{
        ...state,
        status: "connecting"
    },
    firebase.Connect({
        action: Connected,
        config: fbConfig,
        name: state.appname
    })
]

export const SyncRequest = (state, {
    documents
}) => {
    if (documents) {
        return SetIdle({
            ...state,
            data: documents
        })
    } else {
        return SetIdle(state)
    }
}


const BackendError = (state, {
    error
}) => SetIdle({
    ...state,
    errors: {
        ...state.errors,
        firebase: error
    }
})


export const ToFirebase = (state) => {
    if (state.firebase == "connected") {
        if (state.status == "changed") {
            return [{ ...state,
                    status: "saving_state"
                },
                firebase.SaveData({
                    action: StateSaved,
                    error: BackendError,
                    data: {
                        savedAt: state.lastChange,
                        fontIndex: state.fontIndex,
                        containerStyle: {
                            ...state.containerStyle,
                        },
                        textStyle: {
                            ...state.textStyle,
                        },
                        text: state.text,
                        footer: state.footer,
                    },
                    collection: 'prices',
                    key: "xxxx",
                    database: state.appname,
                    savedAt: state.lastChange
                })
            ]
        } else {
            return state
        }
    } else {
        return Connect
    }
}

export const FromFirebase = (state) => [{
    ...state,
    status: "fetching"
}, firebase.SyncCollection({
    collection: 'prices',
    database: state.appname,
    error: BackendError,
    actions: [SyncRequest]
})]