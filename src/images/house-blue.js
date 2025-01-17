import React from "react";
import PropTypes from "prop-types";

export const House = ({ size }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={size}
      width={size}
      viewBox="0 0 166.37 168.47"
      version="1.1"
    >
      <defs id="defs2967">
        <linearGradient
          id="linearGradient5323"
          y2="-148.13"
          gradientUnits="userSpaceOnUse"
          y1="-298.54"
          x2="387.75"
          x1="379.92"
        >
          <stop id="stop3954" stopColor="#0146a8" offset="0" />
          <stop id="stop3956" stopColor="#0146a8" stopOpacity="0" offset="1" />
        </linearGradient>
        <linearGradient
          id="linearGradient3003"
          x1="381.89"
          gradientUnits="userSpaceOnUse"
          x2="387.75"
          gradientTransform="matrix(.93571 0 0 .97143 96.553 671.01)"
          y1="-310.05"
          y2="-147.97"
        >
          <stop
            id="stop3919"
            stopColor="#edf4fd"
            stopOpacity=".52846"
            offset="0"
          />
          <stop id="stop3921" stopColor="#175bb3" stopOpacity="0" offset="1" />
        </linearGradient>
      </defs>
      <g id="layer1" transform="translate(-322.53 -473.84)">
        <g
          id="g5314"
          strokeWidth="1.9"
          transform="matrix(.75853 0 0 .75853 57.261 203.74)"
        >
          <path
            id="path4087"
            transform="matrix(1 0 0 1.0126 71.626 678.21)"
            fill="#103683"
            d="m497.42-208.45c0 60.568-49.1 109.67-109.67 109.67-60.568 0-109.67-49.1-109.67-109.67 0-60.568 49.1-109.67 109.67-109.67 60.568 0 109.67 49.1 109.67 109.67z"
          />
          <path
            id="path4089"
            transform="matrix(.93571 0 0 .97143 96.553 671.01)"
            fill="url(#linearGradient5323)"
            d="m497.42-208.45c0 60.568-49.1 109.67-109.67 109.67-60.568 0-109.67-49.1-109.67-109.67 0-60.568 49.1-109.67 109.67-109.67 60.568 0 109.67 49.1 109.67 109.67z"
          />
          <g
            id="g4126"
            fill="#eee"
            transform="matrix(.85187 0 0 .85187 -241.81 5.46)"
          >
            <path
              id="path4109"
              d="m820.67 454.65a16.355 12.354 0 0 0 -6.3125 1.2188 16.355 12.354 0 0 0 -7.0312 4.9062l-68.406 88.781a16.355 12.354 0 0 0 7.75 17.594l61.438-79.719a16.355 12.354 0 0 1 7.0312 -4.9375 16.355 12.354 0 0 1 21.312 5l60.25 79.531a16.355 12.354 0 0 0 6.5 -17.031l-67.531-89.125a16.355 12.354 0 0 0 -15 -6.2188z"
            />
            <path
              id="rect4116"
              transform="translate(0 308.27)"
              d="m820.34 187.12a10.051 7.8493 0 0 0 -3.875 0.75 10.051 7.8493 0 0 0 -4.34 3.13l-42.031 56.406a10.051 7.8493 0 0 0 -0.40625 0.5625c-0.01 0.0143 0.01 0.0481 0 0.0625a10.051 7.8493 0 0 0 -0.0937 0.0937c-1.2273 1.8742-1.9062 4.1136-1.9062 6.5312v49.031c0 6.5978 5.2831 11.906 11.875 11.906h24.562v-42.906c0-6.5978 5.2831-11.906 11.875-11.906h9.125c6.5919 0 11.875 5.3085 11.875 11.906v42.906h24.531c6.5919 0 11.906-5.3085 11.906-11.906v-49.031c0-3.1164-1.212-5.913-3.1562-8.0312l-40.75-55.562a10.051 7.8493 0 0 0 -9.1875 -3.9375z"
            />
            <rect
              id="rect4124"
              rx="18.414"
              ry="18.431"
              height="39.167"
              width="22.717"
              y="469.55"
              x="770.03"
            />
          </g>
          <path
            id="path4091"
            fill="url(#linearGradient3003)"
            d="m459.38 361.97c-56.674 0-102.62 47.725-102.62 106.56 0 3.7524 0.1979 7.4415 0.5625 11.094 50.067 18.726 126.58 32.369 204.69-10.594 0.00074-0.16695 0-0.33287 0-0.5 0-58.837-45.951-106.56-102.62-106.56z"
          />
        </g>
      </g>
    </svg>
  );
};

House.propTypes = {
  size: PropTypes.number
};
