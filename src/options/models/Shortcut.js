class Shortcut{
    constructor(
        id = null,
        name = '',
        keys = [],
        action =
            {
                value: {
                    id: 1,
                    name: 'Demande à l\'IA',
                    code: 'ASK_IA'
                },
                strategy:
                    {
                        name: 'Libre',
                        instruction: '',
                        withSelectedText: false
                    },
            }
        ) {
        this.id = id;
        this.name = name;
        this.keys = keys;
        this.action = action;
    }

    setStrategy(strategy =
        {
            name: 'Libre',
            instruction: '',
            withSelectedText: false
        }
    ) {
        this.action.strategy = strategy;
    }
}

export default Shortcut;
