import { memo } from "react";
import type { IClass } from "../dataType"
import { NodeTag } from "./NodeTag";



const ClassNode = ({
    data
}:{
    data: IClass
}) => {
    const token_name = data.name;    
    return (
        <div
            id={"parentNode"}
            key={token_name}
            style={{
                backgroundColor: "rgba(145, 29, 201, 0.05)" ,
                border: "1px dashed black",
                borderRadius: "4px"
            }}
            className={`flex`}>
            <NodeTag type="class" />
            <div className="flex items-center px-3 text-xs font-medium overflow-hidden whitespace-nowrap overflow-ellipsis w-full">
                {token_name}
            </div>
        </div>
    )
}

export default memo(ClassNode);