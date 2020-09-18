interface ScriptsInterface {
    name: string;
    src: string;
    async: boolean;
    defer: boolean;
}

const ScriptStore: ScriptsInterface = {
    name: 'lottie',
    src: 'https://d1shyureub17fu.cloudfront.net/lottie/lottie.js',
    async: false,
    defer: true,
};

export default ScriptStore;
