declare var module: NodeModule;

type NodeModule = {
    hot: HotModule;
};

type HotModule = {
    accept: (path?: string) => void;
};
