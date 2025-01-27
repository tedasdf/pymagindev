import type { Edge, EdgeTypes } from '@xyflow/react';

export const initialEdges: Edge[] = [
  { id: 'a->c', source: 'function-Logic', target: 'function-error', animated: true }, // source and target should be id of the node
  { id: 'b->d', source: 'b', target: 'd' },
  { id: 'c->d', source: 'c', target: 'd', animated: true },
];

export const edgeTypes = {
  // Add your custom edge types here!
} satisfies EdgeTypes;
