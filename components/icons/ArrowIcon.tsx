

import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"


const ArrowIcon = (props: SvgProps) => (
    <Svg
        fill="none"
        viewBox="0 0 10 6"
        {...props}
    >

        <Path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
)
export default ArrowIcon


