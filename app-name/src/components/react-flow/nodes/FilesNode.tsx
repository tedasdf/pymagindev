// SPDX-FileCopyrightText: 2023 Dash0 Inc.
// SPDX-License-Identifier: Apache-2.0

import { memo } from "react";
import ParentNodeTag from "./ParentNodeTag";

interface IData {
    label: string;
    height: number;
    position: { x: number; y: number };
    width: number;
}

export const fileNodesConfig = [
    {
        type: "__init__",
        typeRegex: /^__init__(\/.*)?$/i,
        backgroundColor: "rgba(251, 191, 36, 0.05)",
        tagBackgroundColor: "#FBBF24",
        borderColor: "1px dashed #F59E0B",
    },
    {
        type: "normal",
        typeRegex: /^m(\/.*)?$/i,
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

const FilessNode = ({ data }: { data: IData }) => {
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