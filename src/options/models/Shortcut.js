class Shortcut{
    constructor(
        id = null,
        name = '',
        keys = [],
        action =
            {
                id: 1,
                name: 'Demander à l\'IA',
                code: 'ASK_IA'
            },
        strategy =
            {
                id: 1,
                name: 'Libre'
            },
        instruction = '',
        withSelectedText = false
        ) {
        this.id = id;
        this.name = name;
        this.keys = keys;
        this.action = action;
        this.strategy = strategy;
        this.instruction = instruction;
        this.withSelectedText = withSelectedText;
    }

    setStrategy(strategy =
        {
            id: 1,
            name: 'Libre'
        }
    ) {
        this.strategy = strategy;
    }
}

export default Shortcut;
