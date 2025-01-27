import { memo } from "react";
import { IFile } from "../dataType"


const FileNode = ({
    data
}:{
    data: IFile
}) => {
    const fileName = data.token;

    return (
        <div
            id={data.token}
            style={{
                border: "1px dashed black",
                height: data.height,
                width: data.width
            }}
            className="rounded-[4px] text-[10px] text-black"
        >
            <p>{fileName}</p>
        </div>
    )
}


export default memo(FileNode);