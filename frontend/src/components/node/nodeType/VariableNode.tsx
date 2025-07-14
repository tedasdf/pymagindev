import { Variable } from "../dataType"
import React, { memo, useState } from 'react';
import { Handle, useStore, Position } from '@xyflow/react';

const VariableNode = ({
    data
}: {
    data: Variable;
}) => {
    const [isHovered, setIsHovered] = useState(false);

    const onHover = () => {
        setIsHovered(true);
    };

    const onLeave = () => {
        setIsHovered(false);
    };

    return (
        <div onMouseEnter={onHover} onMouseLeave={onLeave}
        style={{
            position: 'relative',
            display: 'inline-block',
            width: '10px', // Set the width of the circle
            height: '10px', // Set the height of the circle
            borderRadius: '50%', // Makes the div a circle
            border: '2px solid black', // Black border
            textAlign: 'center', // Centers text inside the circle
            lineHeight: '80px', // Vertically centers text inside the circle
        }}

        >
            
            <Handle type="target" position={Position.Top} className='custom-handle'  isConnectable={true}/>
            <Handle type="source" position={Position.Bottom} className='custom-handle' isConnectable={true}/>
            {isHovered && (
                <div
                    style={{
                        position: 'absolute',
                        top: '0',
                        left: '100%',
                        marginLeft: '10px',
                        borderRadius: '5px',
                        transform: 'translateY(-50%)', 
                    }}
                    className="text-xs"
                >
                    {data.name} {/* Display any string passed in the data */}
                </div>
            )}
        </div>
    );
};


export default memo(VariableNode);