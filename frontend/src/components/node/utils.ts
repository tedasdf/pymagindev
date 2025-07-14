


export const getHandleStyle = (index: number, total: number) => {
    const spacing = 100 / (total+1); // 100% / number of handles
    const position = spacing * (index+1);

    return { left: `${position}%` };
};