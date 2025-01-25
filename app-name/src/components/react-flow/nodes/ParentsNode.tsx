// SPDX-FileCopyrightText: 2023 Dash0 Inc.
// SPDX-License-Identifier: Apache-2.0

import { memo } from "react";
import ParentNodeTag from "./ParentNodeTag";
import type { IData } from "../FlowChart";

export const parentNodesConfig = [
	{
		type: "traces",
		typeRegex: /^traces(\/.*)?$/i,
		backgroundColor: "rgba(251, 191, 36, 0.05)",
		tagBackgroundColor: "#FBBF24",
		borderColor: "1px dashed #F59E0B",
	},
	{
		type: "metrics",
		typeRegex: /^metrics(\/.*)?$/i,
		backgroundColor: "rgba(56, 189, 248, 0.05)",
		tagBackgroundColor: "#38BDF8",
		borderColor: "1px dashed #0AA8FF",
	},
	{
		type: "logs",
		typeRegex: /^logs(\/.*)?$/i,
		tagBackgroundColor: "#34D399",
		borderColor: "1px dashed #40ad54",
	},
	{
		type: "spans",
		typeRegex: /^spans(\/.*)?$/i,
		backgroundColor: "rgba(145, 29, 201, 0.05)",
		tagBackgroundColor: "#911dc9",
		borderColor: "1px dashed #911dc9",
	},
];

const ParentsNode = ({ data }: { data: IData }) => {
	return (
		<>

			{parentNodesConfig
				.filter((config) => data.label.match(config.typeRegex))
				.map((node, idx) => {
					return (
						<div
							id={"parentNode"}
							key={idx}
							style={{
								display: "flex",
								justifyContent: "space-between",
								position: "relative",
								backgroundColor: node.backgroundColor,
								border: node.borderColor,
							}}
							className="rounded-[4px] text-[10px] text-black"
						>
							<ParentNodeTag tag={data.label} />
						</div>
					);
				})}
		</>
	);
};
export default memo(ParentsNode);