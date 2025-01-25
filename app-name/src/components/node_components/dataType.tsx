

export interface IFile {
    constants?: string[];
    functions?: IFunction[];
    class?: IClass[];
    rootnode?: IFunction;
}

interface IClass{
    functions?: IFunction[];
    attributes?: string[];
}

interface IFunction{
    process?: string[];
}
