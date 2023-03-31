import { createStore } from 'vuex'
import Shortcut from "./models/Shortcut.js"
import shortcutService from "./services/shortcutService.js"
import sluggify from "./utils/sluggify.js";
import Modal from "./models/Modal.js";

export default createStore({
    state: {
        filters: {
            name: ''
        },
        actions: [
            {
                id: 1,
                name: 'Demande IA'
            },
            {
                id: 2,
                name: 'Recherche Google'
            },
            {
                id: 3,
                name: 'Nouvel onglet'
            },
            {
                id: 4,
                name: 'Dupliquer l\'onglet'
            },
            {
                id: 5,
                name: 'Fermer l\'onglet'
            }
        ],
        shortcuts: [],
        modal: new Modal(),
        shortcut: new Shortcut(),
        keyup: true,
        keysSelectedValid: false
    },
    mutations: {
        setKeysSelectedValid(state, value){
            state.keysSelectedValid = value;
        },
        setKeyup(state, value){
            state.keyup = value;
        },
        setFilters(state, value){
            state.filters = value;
        },
        resetModal(state){
            state.modal = new Modal();
        },
        resetShortcut(state){
            state.shortcut = new Shortcut();
        },
        setShortcut(state, value){
            state.shortcut = value;
        },
        setShortcuts(state, value){
            state.shortcuts = value;
        },
        setModal(state, value){
            document.body.style.overflowY = value.isOpened ? 'hidden': 'unset';

            state.modal = value;
        },
        setStoreModalOpened(state, value){
            document.body.style.overflowY = value ? 'hidden': 'unset';

            state.storeModalOpened = value;
        },
        setLoading(state, value){
            state.loading = value;
        }
    },
    actions: {
        async setShortcuts({ getters, commit }){
            const { shortcuts } = await chrome.storage.sync.get(["shortcuts"]);

            commit('setShortcuts', shortcuts
                .filter(shortcut => sluggify(shortcut.name)
                    .includes(
                        sluggify(getters.getFilters.name)
                    )
                )
                .reverse()
            );
        },
        async storeShortcut({ dispatch, getters, commit }, method){
            try{
                await shortcutService[`${method}Shortcut`](getters.getShortcut);
            }catch(e){
                throw new Error(e);
            }finally{
                commit('setFilters', {});

                await dispatch('setShortcuts');

                commit('resetShortcut');
            }
        },
        async deleteShortcut({ dispatch, getters, commit }){
            await shortcutService.deleteShortcut(getters.getShortcut.id);

            commit('setFilters', {});

            await dispatch('setShortcuts');
        },
    },
    getters: {
        getActions(state){
            return state.actions;
        },
        areKeysSelected(state) {
            return (state.shortcut.keys.length > 1 && state.keyup) ||
                state.shortcut.keys.length === 3;
        },
        areKeysSelectedValid(state){
            return state.keysSelectedValid;
        },
        getFilters(state){
            return state.filters;
        },
        isKeyup(state){
            return state.keyup;
        },
        getShortcut(state){
            return state.shortcut
        },
        getShortcuts(state){
          return state.shortcuts;
        },
        getModal(state){
            return state.modal;
        },
    }
})
