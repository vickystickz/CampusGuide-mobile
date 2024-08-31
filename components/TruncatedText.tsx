import React from 'react';
import { StyledText } from './StyledText';
import { truncateText } from '@/utils/stringUtils';

type TextDisplayProps = {
    text: string;
    maxLength?: number;
    customStyle?: string
}

const TruncatedText: React.FC<TextDisplayProps> = ({ text, maxLength = 50, customStyle }) => {

    // For some reason, `truncate` is not working, perhaps it's not supported yet by nativewind, so 
    // we have to use this function for now.
    const truncatedName = truncateText(text, maxLength);
    return <StyledText className={customStyle}>{truncatedName}</StyledText>;
};



export default TruncatedText;
