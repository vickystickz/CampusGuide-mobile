import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"


const CloseIcon = (props: SvgProps) => (
    <Svg
        fill="none"
        viewBox="0 0 14 14"
        {...props}
    >
        <Path
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13 1.13257L1 13.1326M1 1.13257L13 13.1326" />
    </Svg>
)
export default CloseIcon





