import { memo } from "react";
import { NodeTag } from "./NodeTag";
import { fetchAndCreateProcess } from "../../../utils/helper";

interface SymbolNodeInterface {
    SymbolName: string,
    type: 'function'|'class'|'constant',
    parentToken: string,
    setNodes?: (callback: (nodes: any[]) => any[]) => void,
    setEdges?: (callback: (edges: any[]) => any[]) => void,
}



const SymbolNode = ({
    data, 
}:{
    data: SymbolNodeInterface,
    isConnectable: boolean
}) => {
    const token_name = data.SymbolName;
    const type = data.type;
    const parent_token = data.parentToken;
    // const input_length = data.input?.length ?? 0;
    // const output_length = data.output?.length ?? 0;

    const handleClick = async () => {
        if (type === 'function') {
            console.log('Function clicked:', token_name);
            try {
                const [newNode, newEdge] = await fetchAndCreateProcess('..test.test_example10.functional', token_name);
                console.log(newNode);
                console.log(newEdge);
                if (data.setNodes) {
                    data.setNodes((currentNodes) => [...currentNodes, ...newNode]);
                }
                if (data.setEdges) {
                    data.setEdges((currentEdges) => [...currentEdges, ...newEdge]); 
                }
            } catch (error) {
                console.error('Error creating node:', error);
            }
        } else if (type === 'class'){
            console.log('Class clicked:' , token_name);

        } else {

        }
    };

    return (
        <div
            key={token_name}
            style={{
                backgroundColor: "rgba(145, 29, 201, 0.05)" ,
                border: "1px dashed black",
                borderRadius: "4px",
                position: 'relative'
            }}
            onClick={type !== 'constant' ? handleClick : undefined}
            className={`flex`}>
            <NodeTag type={type} />
            <div className="flex items-center px-3 text-xs font-medium overflow-hidden whitespace-nowrap overflow-ellipsis w-full">
                {token_name}
            </div>
        </div>
    )
}

export default memo(SymbolNode);