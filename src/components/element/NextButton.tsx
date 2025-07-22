import * as React from "react"
import type { SVGProps } from "react";
const NextButton = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={222}
    height={39}
    fill="none"
    {...props}
  >
    <g filter="url(#a)">
      <rect width={222} height={39} fill="url(#b)" rx={4} />
      <path
        fill="#fff"
        d="M97.38 18.026V23h-1.27v-8.268h1.226v1.292h.108c.194-.42.488-.757.883-1.012.395-.258.904-.388 1.529-.388.559 0 1.049.115 1.469.345.42.226.746.57.98 1.034.233.459.35 1.04.35 1.744V23h-1.271v-5.167c0-.65-.168-1.156-.506-1.518-.337-.366-.8-.55-1.388-.55-.406 0-.768.089-1.088.264a1.887 1.887 0 0 0-.748.77c-.183.337-.275.747-.275 1.227Zm11.062 5.146c-.796 0-1.484-.176-2.061-.527a3.54 3.54 0 0 1-1.33-1.486c-.308-.639-.463-1.381-.463-2.228 0-.847.155-1.594.463-2.24.312-.649.747-1.155 1.303-1.517.56-.367 1.213-.55 1.959-.55.431 0 .856.072 1.276.216.42.143.802.377 1.146.7.345.319.619.742.824 1.27.204.527.307 1.177.307 1.948v.539h-6.373v-1.098h5.081c0-.467-.093-.883-.28-1.25a2.11 2.11 0 0 0-.786-.866c-.337-.211-.736-.317-1.195-.317-.506 0-.944.125-1.313.376-.366.248-.648.571-.845.97a2.838 2.838 0 0 0-.296 1.28v.733c0 .624.107 1.153.323 1.587.218.431.522.76.909.985.388.223.838.334 1.351.334.334 0 .635-.046.905-.14.272-.097.507-.24.705-.43.197-.194.35-.435.457-.722l1.227.345a2.719 2.719 0 0 1-.651 1.098 3.179 3.179 0 0 1-1.13.732 4.197 4.197 0 0 1-1.513.258Zm6.081-8.44 1.981 3.38 1.981-3.38h1.464l-2.67 4.134 2.67 4.134h-1.464l-1.981-3.208L114.523 23h-1.464l2.627-4.134-2.627-4.134h1.464Zm10.834 0v1.077h-4.284v-1.077h4.284Zm-3.035-1.98h1.27v7.88c0 .358.052.628.156.807a.81.81 0 0 0 .409.355c.169.058.346.086.533.086.14 0 .255-.007.344-.021l.216-.043.258 1.14a2.56 2.56 0 0 1-.361.098 2.644 2.644 0 0 1-.586.054c-.359 0-.711-.078-1.055-.232a2.097 2.097 0 0 1-.851-.705c-.222-.316-.333-.714-.333-1.195v-8.225Z"
      />
      <path fill="#fff" d="M191 0h27a4 4 0 0 1 4 4h-31V0Z" opacity={0.3} />
      <path fill="#fff" d="M206 0h12a4 4 0 0 1 4 4h-16V0Z" opacity={0.3} />
      <path
        fill="#fff"
        d="M208 0h10a4 4 0 0 1 4 4h-14V0ZM191 4h31v1h-31V4Z"
        opacity={0.3}
      />
      <path fill="#fff" d="M206 4h16v1h-16V4Z" opacity={0.3} />
      <path fill="#fff" d="M208 4h14v1h-14V4ZM217 5h5v18h-5V5Z" opacity={0.3} />
      <path fill="#fff" d="M217 5h5v9h-5V5Z" opacity={0.3} />
      <path fill="#fff" d="M216 5h6v9h-6V5Z" opacity={0.45} />
    </g>
    <defs>
      <linearGradient
        id="b"
        x1={0}
        x2={222}
        y1={19.5}
        y2={19.5}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#9F1EFB" />
        <stop offset={0.5} stopColor="#FF1FEC" />
        <stop offset={1} stopColor="#FCB842" />
      </linearGradient>
      <filter
        id="a"
        width={222}
        height={43}
        x={0}
        y={-4}
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset dy={-4} />
        <feGaussianBlur stdDeviation={2} />
        <feComposite in2="hardAlpha" k2={-1} k3={1} operator="arithmetic" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.33 0" />
        <feBlend in2="shape" result="effect1_innerShadow_64_81" />
      </filter>
    </defs>
  </svg>
)
export default NextButton
