
import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"


const SchoolIcon = (props: SvgProps) => (
    <Svg
        fill="none"
        viewBox="0 0 16 14"
        {...props}
    >

        <Path d="M8 0.45459L0 4.81823L8 9.18186L14.5455 5.61095V10.6364H16V4.81823M2.90909 7.85823V10.7673L8 13.5455L13.0909 10.7673V7.85823L8 10.6364L2.90909 7.85823Z" fill="currentColor" />
    </Svg>
)
export default SchoolIcon


