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
                border: "1px dashed black"
            }}>
            <NodeTag type="class" />
            <div
				className={`px-3 text-xs font-medium overflow-hidden whitespace-nowrap overflow-ellipsis w-full flex justify-center`}
			>
				{token_name}
			</div>
        </div>
    )
}

export default memo(ClassNode);