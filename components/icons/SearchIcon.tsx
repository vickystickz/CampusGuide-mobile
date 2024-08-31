
import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"


const SearchIcon = (props: SvgProps) => (
    <Svg
        fill="none"
        viewBox="0 0 14 14"
        {...props}
    >
        <Path
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.33333"
            strokeLinejoin="round"
            d="M13 13L10.1 10.1M11.6667 6.33333C11.6667 9.27885 9.27885 11.6667 6.33333 11.6667C3.38781 11.6667 1 9.27885 1 6.33333C1 3.38781 3.38781 1 6.33333 1C9.27885 1 11.6667 3.38781 11.6667 6.33333Z"
        />
    </Svg>
)
export default SearchIcon


