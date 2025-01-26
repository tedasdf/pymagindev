

export interface IFile{
    token: string; //
    constants?: string[];
    classes?: IClass[];
    functions?: IFunction[];
    width: number,
    height: number
}


export interface IClass{
    name: string;
    functions?: IFunction[];
}


export interface IFunction {
    name: string;
    proces?: (Variable | Call | LogicStatement)[];
    input?: string[];
    output?: string[];
}
  

export interface LogicStatement {
    type: string;
    expression: string[]; // representing a logical expression as a string (you can use other types too)
    branch: number;
}

interface Variable {
    type: "variable";
    name: string; // example of a variable having a name
    value?: any; // optional value for the variable
}

export interface Call {
    functionName: string;
    args?: any[]; // arguments for the function call
    outputs?: string[];
}

