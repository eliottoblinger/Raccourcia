class Shortcut{
    constructor(
        id = null,
        name = '',
        keys = [],
        action =
            {
                id: 1,
                name: 'Demande IA'
            },
        strategy =
            {
                id: 1,
                name: 'Libre',
                instruction: ''
            }
        ) {
        this.id = id;
        this.name = name;
        this.keys = keys;
        this.action = action;
        this.strategy = strategy
    }
}

export default Shortcut;
