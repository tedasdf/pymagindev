'server'
import { fetchAllFileItems, fetchFunctionDetails, FileItem } from '../api/item';
import { Edge, Node } from '@xyflow/react';

// Main function to fetch and create nodes
export default async function fetchAndCreateNodes(setNodes , setEdges): Promise<Node[]> {
    try {
        const result: Record<string, FileItem> = await fetchAllFileItems('..test.test_example10.functional');
        const ChangedResult = result['file'];

        console.log("THIS IS THE FILE ITEM");
		console.log(ChangedResult);
        let newNode: Node[] = makeNode(ChangedResult, setNodes, setEdges);
        return newNode;
    } catch (error) {
        console.error("Error in fetchAndCreateNodes:", error);
    }
}

// Function to create nodes from a FileItem
export function makeNode(file: FileItem, setNodes , setEdges): Node[] {
    const newNode: Node[] = [];
    
    const nodeGap = 250 ;
    const nodeGapy = 50;
    const filex = 0;
    const filey = 0;
    // Create the file node
    const fileNodeId = `file-${file.token}`;
    newNode.push({
        id: fileNodeId,
        type: 'fileNode',
        position: { x: filex, y: filey },
        draggable: false,
        data: {
            token: file.token,
            width: 500,
            height: 250,
        },
        style: {
            width: 500,
            height: 250,
        },
    });

    let i = 0;
    let j = 0;
    // Create nodes for each function in the function_list
    for (const func of file.function_list) {
        j += 1;
        if ((filey + j * nodeGapy) > 200){
            j = 1;
            i += 1;
        }
        const funcNodeId = `func-${func.token}`;
        newNode.push({
            id: funcNodeId,
            type: 'symbolNode',
            position: { x: filex + i * nodeGap, y: filey + j * nodeGapy  }, // Adjust position as needed
            data: {
                SymbolName: func.token,
                type: 'function',
                parent: file.token,
                setNodes: setNodes,
                setEdges: setEdges,
            },
            extent: 'parent',
            parentId: fileNodeId,
        });
    }


    return newNode; // Return the array of created nodes
}


export const fetchAndCreateProcess = async (fileToken: string, functionName: string) => {
    try {
        const processNode = await fetchFunctionDetails(fileToken, functionName);
        // Create and return the process node
        let newNode: Node[] = [];
        let newEdge: Edge[] = [];


        const nodeStart = 550;
        const nodeGap = 20;
        
        const processLength = processNode.process?.length?? 0;
        
        // size is determined by the nubmer of processs
        //and also the max number of varaibles in a single process

        newNode.push({
            id: `function_${processNode.token}`,
            type: 'processFunctionNode',
            position: { x: nodeStart, y: 0 },
            style: {
                width: 500,
                height: 250,
            },
            data: {
                name: processNode.token,
            },
        })
        
        let x_pos = 0;

        for (const input_inst of processNode.inputs){
            
            newNode.push({
                id: `function_${processNode.token}_variable_${input_inst}`,
                type: 'variableNode',
                position: { x: x_pos, y: 0 },
                data: {
                    name: input_inst,
                },
                extent: 'parent',
                parentId: `function_${processNode.token}`,
            })
            x_pos += nodeGap;
        }

        let  y_position = 0;

        for (const process_inst of processNode.process){
            y_position += nodeGap;
           if (process_inst.points_to){
                newNode.push({
                    id: `function_${processNode.token}_variable_${process_inst.token}`,
                    type: 'variableNode',
                    position: { x: 0, y: y_position },
                    data: {
                        name: process_inst.token,
                    },
                    draggable:true,
                    extent: 'parent',
                    parentId: `function_${processNode.token}`,
                })
                for (const point_to of process_inst.points_to){
                    if (point_to.func_token != 'unknown_func'){
                        newNode.push({
                            id: `function_call_${point_to.func_token}`,
                            type: 'functionNode',
                            position: { x: x_pos, y: y_position },
                            data: {
                                name: point_to.func_token,
                            },
                            extent: 'parent',
                            parentId: `function_${processNode.token}`,
                        })    
                    }else{
                        point_to.inputs.forEach((input: string) => {
                            newEdge.push({
                                id: `${processNode.token}_${process_inst.token}_${input}`,
                                source: `function_${processNode.token}_variable_${input}`,
                                target: `function_${processNode.token}_variable_${process_inst.token}`,
                            })
                        })
                    }
                    
                }
            }
        }

        return [newNode, newEdge];

    } catch (error) {
        console.error("Error creating process node:", error);
        throw error;
    }

};