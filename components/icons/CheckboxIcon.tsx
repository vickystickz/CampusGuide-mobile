import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"


const CheckboxIcon = (props: SvgProps) => (
    <Svg
        fill="none"
        viewBox="0 0 14 10"
        {...props}
    >
        <Path
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12.3332 1.19043L8.56846 4.95514L4.80376 8.71984L1.6665 5.58259"
        />
    </Svg>
)
export default CheckboxIcon





