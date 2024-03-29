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
                name: 'Demander à l\'IA',
                code: 'ASK_IA',
                svg: 'M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z'
            },
            {
                id: 2,
                name: 'Nouvel onglet',
                code: 'NEW_TAB',
                svg: 'M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z'
            },
            {
                id: 3,
                name: 'Dupliquer l\'onglet',
                code: 'DUP_TAB',
                svg: 'M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75'
            },
            {
                id: 4,
                name: 'Fermer l\'onglet',
                code: 'CLO_TAB',
                svg: 'M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m6.75 12H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z'
            },
            {
                id: 5,
                name: 'Epingler l\'onglet',
                code: 'PIN_TAB',
                svg: 'M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z'
            },
            {
                id: 6,
                name: 'Ajouter aux favoris',
                code: 'ADD_FAV',
                svg: 'M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z'
            },
            {
                id: 7,
                name: 'Télécharger les images',
                code: 'DL_IMG',
                svg: 'M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3'
            },
            {
                id: 8,
                name: 'Note libre',
                code: 'FREE_NOTE',
                svg: 'M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25'
            },
            {
                id: 9,
                name: 'Récupérer la palette de couleur',
                code: 'GET_COLORS',
                svg: 'M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42'
            },
            {
                id: 10,
                name: 'Lancer Lighthouse',
                code: 'LIGHTHOUSE',
                svg: 'M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z'
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
            document.body.classList.toggle('noscroll');

            state.modal = value;
        },
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
