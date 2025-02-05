'server'
import { useMemo } from 'react';
import { fetchAllFileItems, fetchFunctionDetails, FileHierarchyItem, FileItem } from '../api/item';
import { initialNodes } from '../nodes';




// const createNode = (fileNode: FileItem, height: number, connectors?: object) => {
// 	const nodesToAdd: Node[] = [];
// 	const keyTraces = Object.keys(parentNode);

// 	const calcYPosition = (index: number, parentHeight: number, nodes: string[]): number | undefined => {
// 		const childNodePositions = [];
// 		const spaceBetweenNodes = (parentHeight - nodes.length * childNodesHeight) / (nodes.length + 1);

// 		for (let i = 0; i < nodes.length; i++) {
// 			const yPosition = spaceBetweenNodes + i * (childNodesHeight + spaceBetweenNodes);

// 			childNodePositions.push(yPosition);
// 		}
// 		switch (nodes.length) {
// 			case 0:
// 				return;
// 			case 1:
// 				return (parentHeight - 40) / 2 - 20;
// 			default:
// 				return childNodePositions[index];
// 		}
// 	};

// 	const processorPosition = (index: number, parentHeight: number, receivers: string[]): XYPosition => {
// 		const receiverLength = receivers.length ? 250 : 0;
// 		return { x: receiverLength + index * 200, y: (parentHeight - 40) / 2 - 20 };
// 	};

// 	const receiverPosition = (index: number, parentHeight: number, receivers: string[]): XYPosition => {
// 		const positionY = calcYPosition(index, parentHeight, receivers);
// 		return { x: 50, y: positionY ?? parentHeight / 2 };
// 	};

// 	const exporterPosition = (
// 		index: number,
// 		parentHeight: number,
// 		exporters: string[],
// 		processors: string[]
// 	): XYPosition => {
// 		const positionY = calcYPosition(index, parentHeight, exporters);
// 		const processorLength = (processors?.length ?? 0) * 200 + 260;
// 		return { x: processorLength, y: positionY ?? parentHeight / 2 };
// 	};
// 	const processors = parentNode.processors;
// 	const receivers = parentNode.receivers;
// 	const exporters = parentNode.exporters;
// 	keyTraces.forEach((traceItem) => {
// 		switch (traceItem) {
// 			case "processors":
// 				processors?.map((processor, index) => {
// 					const id = `${pipelineName}-Processor-processorNode-${processor}`;

// 					nodesToAdd.push({
// 						id: id,
// 						parentNode: pipelineName,
// 						extent: "parent",
// 						type: "processorsNode",
// 						position: processorPosition(index, height, processors),
// 						data: {
// 							label: processor,
// 							parentNode: pipelineName,
// 							type: "processors",
// 							height: childNodesHeight,
// 							id: id,
// 							position: processorPosition(index, height, processors),
// 						},
// 						draggable: false,
// 					});
// 				});
// 				break;
// 			case "receivers":
// 				receivers?.map((receiver, index) => {
// 					const isConnector = connectors?.hasOwnProperty(receiver) ? "connectors/receivers" : "receivers";
// 					const id = `${pipelineName}-Receiver-receiverNode-${receiver}`;

// 					nodesToAdd.push({
// 						id: id,
// 						parentNode: pipelineName,
// 						extent: "parent",
// 						type: "receiversNode",
// 						position: receiverPosition(index, height, receivers),
// 						data: {
// 							label: receiver,
// 							parentNode: pipelineName,
// 							type: isConnector,
// 							height: childNodesHeight,
// 							id: id,
// 							position: receiverPosition(index, height, receivers),
// 						},
// 						draggable: false,
// 					});
// 				});
// 				break;
// 			case "exporters":
// 				exporters?.map((exporter, index) => {
// 					const isConnector = connectors?.hasOwnProperty(exporter) ? "connectors/exporters" : "exporters";
// 					const id = `${pipelineName}-exporter-exporterNode-${exporter}`;
// 					nodesToAdd.push({
// 						id: id,
// 						parentNode: pipelineName,
// 						extent: "parent",
// 						type: "exportersNode",
// 						position: exporterPosition(index, height, exporters, processors ?? []),
// 						data: {
// 							label: exporter,
// 							parentNode: pipelineName,
// 							type: isConnector,
// 							height: childNodesHeight,
// 							id: id,
// 							position: exporterPosition(index, height, exporters, processors ?? []),
// 						},
// 						draggable: false,
// 					});
// 				});
// 				break;
// 		}
// 	});
// 	return nodesToAdd;
// };


// export const useClientNodes = (value) => {
// 	return useMemo(() => calcNodes(value), [value]);
// };

// const childNodesHeight = 80;

// export const calcNodes = (value) => {

//     let newNode:any = [];
//     for (const [fileName, fileItem] of Object.entries(value)){
//         const num_function = fileItem.function_list?.length ?? 0;
//         const spaceBetweenParents = 40;
// 		const spaceBetweenNodes = 90;
//         const totalSpacing = num_function * spaceBetweenNodes;
// 		const parentHeight = totalSpacing + num_function * childNodesHeight;


//         newNode.push({
// 			id: fileName,
// 			type: "fileNode",
// 			position: { x: 0, y: 0 },
// 			data: {
// 				token: pipelineName,
// 				parentNode: pipelineName,
// 				width: 430 + 200 * (pipeline.processors?.length ?? 0),
// 				height: maxNodes === 1 ? parentHeight : parentHeight + spaceBetweenParents,
// 				type: "parentNodeType",
// 				childNodes: createNode(pipelineName, pipeline, parentHeight + spaceBetweenParents, connectors),
// 			},
// 			draggable: false,
// 			ariaLabel: pipelineName,
// 			expandParent: true,
// 		});
//     }



// 	for (const [pipelineName, pipeline] of Object.entries(pipelines)) {
// 		const receivers = pipeline.receivers?.length ?? 0;
// 		const exporters = pipeline.exporters?.length ?? 0;
// 		const maxNodes = Math.max(receivers, exporters) ?? 1;
// 		const spaceBetweenParents = 40;
// 		const spaceBetweenNodes = 90;
// 		const totalSpacing = maxNodes * spaceBetweenNodes;
// 		const parentHeight = totalSpacing + maxNodes * childNodesHeight;

// 		nodesToAdd.push({
// 			id: pipelineName,
// 			type: "parentNodeType",
// 			position: { x: 0, y: 0 },
// 			data: {
// 				label: pipelineName,
// 				parentNode: pipelineName,
// 				width: 430 + 200 * (pipeline.processors?.length ?? 0),
// 				height: maxNodes === 1 ? parentHeight : parentHeight + spaceBetweenParents,
// 				type: "parentNodeType",
// 				childNodes: createNode(pipelineName, pipeline, parentHeight + spaceBetweenParents, connectors),
// 			},
// 			draggable: false,
// 			ariaLabel: pipelineName,
// 			expandParent: true,
// 		});
// 		const childNodes = createNode(pipelineName, pipeline, parentHeight + spaceBetweenParents, connectors);
// 		nodesToAdd.push(...childNodes);
// 	}
// 	return nodesToAdd;
// };


// Main function to fetch and create nodes
export default async function fetchAndCreateNodes(): Promise<FlowNode> {
    try {
        const result: Record<string, FileItem> = await fetchAllFileItems('..test.test_example10.functional');
        const ChangedResult = result['file'];
        console.log("THIS IS THE FILE ITEM");
		console.log(ChangedResult);
        let newNode: Node[] = makeNode(ChangedResult);
        return newNode;
    } catch (error) {
        console.error("Error in fetchAndCreateNodes:", error);
    }
}

// Function to create nodes from a FileItem
export function makeNode(file: FileItem): Node[] {
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
        for (const process of processNode.process){
           if (process.type === 'Call'){

           }elseif (process.type === 'Variable'){
           
            }else{
                
            }
            
        }
        return newNode;

    } catch (error) {
        console.error("Error creating process node:", error);
        throw error;
    }

};