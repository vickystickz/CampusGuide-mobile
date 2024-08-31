
import * as React from "react"
import Svg, { SvgProps, Path, } from "react-native-svg"


const CarModeIcon = (props: SvgProps) => (
    <Svg
        fill="none"
        viewBox="0 0 24 20"
        {...props}
    >
        <Path d="M11.8486 0.69454C9.05326 0.653558 5.17034 0.713455 4.37097 2.86095L2.40676 7.47006C2.31952 7.37056 2.20534 7.29846 2.07801 7.26245L1.28719 7.03998C1.20024 7.0153 1.10927 7.00804 1.01951 7.01862C0.929741 7.02919 0.842949 7.05739 0.764113 7.1016C0.685277 7.14581 0.61595 7.20516 0.560112 7.27623C0.504273 7.34731 0.463023 7.42871 0.438731 7.51577L0.0262104 8.98076C0.00153783 9.06773 -0.0057117 9.15871 0.00487861 9.24849C0.0154689 9.33826 0.0436903 9.42506 0.0879218 9.5039C0.132153 9.58274 0.191523 9.65206 0.262623 9.70789C0.333722 9.76372 0.41515 9.80495 0.50223 9.82922L1.29327 10.0517C1.31984 10.0591 1.34596 10.0616 1.37253 10.0657C1.22144 10.4424 1.12709 10.8567 1.12709 11.1033V16.46C1.12709 16.7347 1.24193 16.8617 1.42522 16.9213V18.3485C1.42499 18.4751 1.44976 18.6006 1.49812 18.7176C1.54649 18.8347 1.61749 18.941 1.70705 19.0306C1.79661 19.1201 1.90298 19.1911 2.02004 19.2394C2.1371 19.2878 2.26255 19.3125 2.3892 19.3122H4.97579C5.10241 19.3125 5.22784 19.2877 5.34488 19.2394C5.46191 19.191 5.56825 19.12 5.65779 19.0305C5.74733 18.941 5.81831 18.8346 5.86666 18.7176C5.91501 18.6006 5.93977 18.4751 5.93954 18.3485V16.9736H18.0607V18.3485C18.0605 18.4752 18.0853 18.6006 18.1337 18.7177C18.1821 18.8347 18.2531 18.9411 18.3427 19.0306C18.4323 19.1201 18.5387 19.1911 18.6557 19.2394C18.7728 19.2878 18.8983 19.3125 19.0249 19.3122H21.6111C21.7377 19.3125 21.8632 19.2878 21.9803 19.2395C22.0974 19.1912 22.2038 19.1202 22.2934 19.0307C22.383 18.9411 22.4541 18.8348 22.5025 18.7177C22.5509 18.6006 22.5757 18.4752 22.5755 18.3485V16.9213C22.7585 16.8617 22.8732 16.7344 22.8732 16.4597V11.1035C22.8732 10.8569 22.7788 10.4426 22.6277 10.0659C22.6543 10.0618 22.6804 10.0591 22.707 10.0519L23.4982 9.82944C23.5853 9.80515 23.6667 9.7639 23.7378 9.70807C23.8089 9.65223 23.8682 9.5829 23.9124 9.50406C23.9566 9.42523 23.9848 9.33844 23.9954 9.24867C24.006 9.15891 23.9987 9.06794 23.974 8.98099L23.562 7.516C23.5376 7.42892 23.4963 7.34751 23.4405 7.27643C23.3846 7.20535 23.3152 7.146 23.2363 7.1018C23.1575 7.05759 23.0706 7.02939 22.9808 7.01882C22.891 7.00825 22.8 7.01552 22.7131 7.0402L21.9222 7.26267C21.7949 7.29868 21.6807 7.37079 21.5935 7.47029L19.6293 2.86118C18.7725 0.681255 14.6439 0.735972 11.8486 0.69499V0.69454ZM19.8545 7.76121C19.9009 7.89947 19.7617 7.99134 19.616 7.9999C19.616 7.9999 19.1398 8.04043 18.4831 8.09334C17.9835 6.92581 16.8223 6.10325 15.4771 6.10325C14.001 6.10325 12.7477 7.09447 12.3458 8.44417C12.2343 8.44574 12.1048 8.45025 12.0013 8.45025C9.45835 8.45025 4.38425 7.9999 4.38425 7.9999C4.23856 7.99134 4.0994 7.89947 4.14579 7.76121C6.10009 1.8042 6.15818 2.25185 11.8918 2.31445C17.6257 2.37705 17.659 1.95147 19.8545 7.76121ZM15.4771 7.22912C15.8311 7.22788 16.1799 7.31479 16.4919 7.48202C16.804 7.64925 17.0695 7.89153 17.2645 8.18702C16.1161 8.27213 14.7943 8.35928 13.5626 8.40994C13.7398 8.05415 14.013 7.75501 14.3513 7.54635C14.6896 7.33768 15.0796 7.2278 15.4771 7.22912ZM2.25792 9.16248C2.27526 9.18792 2.29215 9.21359 2.31129 9.23859H2.23698L2.25792 9.16248ZM3.52859 10.6585C4.03163 10.6502 6.73215 11.5592 6.73215 11.5592C7.06924 11.654 7.36625 12.2917 7.36444 12.6421C7.35949 13.822 4.31422 13.4127 3.07824 13.4174C2.99513 13.4176 2.91281 13.4014 2.83599 13.3697C2.75917 13.338 2.68937 13.2914 2.63059 13.2327C2.57182 13.1739 2.52523 13.1041 2.49351 13.0273C2.46178 12.9505 2.44554 12.8682 2.44572 12.7851V11.2911C2.44572 10.9407 3.02554 10.6669 3.52859 10.6585ZM20.4721 10.6585C20.9752 10.6669 21.555 10.9407 21.555 11.2911V12.7851C21.5552 12.8682 21.5389 12.9505 21.5072 13.0273C21.4755 13.1041 21.4289 13.1739 21.3701 13.2327C21.3113 13.2914 21.2415 13.338 21.1647 13.3697C21.0879 13.4014 21.0056 13.4176 20.9225 13.4174C19.6863 13.4127 16.6412 13.822 16.6363 12.6421C16.6345 12.2917 16.9312 11.654 17.2686 11.5592C17.2686 11.5592 19.9691 10.6502 20.4721 10.6585Z" fill="currentColor" />

    </Svg>
)
export default CarModeIcon



