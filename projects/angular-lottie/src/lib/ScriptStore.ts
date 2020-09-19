interface ScriptsInterface {
    name: string;
    src: string;
    async: boolean;
    defer: boolean;
}

const ScriptStore: ScriptsInterface[] = [
    {
        name: 'lottie',
        src:
            'https://cdnjs.cloudflare.com/ajax/libs/bodymovin/5.7.3/lottie.min.js',
        async: false,
        defer: true,
    },
];

export default ScriptStore;
