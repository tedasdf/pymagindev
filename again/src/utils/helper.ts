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
            type: 'functionNode',
            position: { x: filex + i * nodeGap, y: filey + j * nodeGapy  }, // Adjust position as needed
            data: {
                name: func.token,
                input: ['input1', 'INPUT2'],
                output: ['x', 'y', 'z'],
                setNodes: setNodes,
                setEdges: setEdges,
            },
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


        const nodeGap = 25 ;
        const nodeStart = 550;
        let i = 0;
        const nodeStartY = 0;
        for (const input_inst of processNode.inputs){
            
            newNode.push({
                id: `variable-${input_inst}`,
                type: 'variableNode',
                position: { x: nodeStart + i * nodeGap, y: nodeStartY + i *nodeGap },
                data: {
                    name: input_inst,
                },
                
            })
            i += 1;
        }

        for (const input_inst of processNode.inputs){
            
            newNode.push({
                id: `variable-${input_inst}`,
                type: 'variableNode',
                position: { x: nodeStart + i * nodeGap, y: nodeStartY + i *nodeGap },
                data: {
                    name: input_inst,
                },
                draggable:true,
            })
            i += 1;
        }
        let j = i;

        for (const process_inst of processNode.process){
            j += 1;
           if (process_inst.points_to){
                newNode.push({
                    id: `variable-${process_inst.token}`,
                    type: 'variableNode',
                    position: { x: nodeStart + i * nodeGap, y: nodeStartY + j *nodeGap },
                    data: {
                        name: process_inst.token,
                    },
                    draggable:true,
                })
                for (const point_to of process_inst.points_to){
                    if (point_to.func_token != 'unknown_func'){
                        console.log(point_to);
                    }else{
                        point_to.inputs.forEach((input: string) => {
                            newEdge.push({
                                id: `${process_inst.token}-${input}`,
                                source: `variable-${input}`,
                                target: `variable-${process_inst.token}`,
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