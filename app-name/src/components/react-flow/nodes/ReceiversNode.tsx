// SPDX-FileCopyrightText: 2023 Dash0 Inc.
// SPDX-License-Identifier: Apache-2.0

import type { IData } from "../FlowChart";
import Node, { handleStyle } from "./Node";
import { memo } from "react";
import { Handle, Position } from '@xyflow/react';

const ReceiversNode = ({ data }: { data: IData }) => {
	return (
		<Node
			data={data}
			type="receiver"
			handle1={<Handle type="target" position={Position.Left} style={handleStyle} />}
			handle2={<Handle type="source" position={Position.Right} style={handleStyle} />}
		/>
	);
};

export default memo(ReceiversNode);