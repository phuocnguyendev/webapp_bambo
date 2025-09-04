import { FunctionComponent } from 'react';

import styled from 'styled-components';

export const SvgWrapper = styled.div<{ $visible: boolean }>`
  display: ${(props) => (props.$visible ? 'flex' : 'none')};
`;

export const DEFAULT_COLOR = '#4fa94d';
export const SVG_NAMESPACE = 'http://www.w3.org/2000/svg';

export type Style = {
  [key: string]: string;
};

export interface PrimaryProps {
  height?: string | number;
  width?: string | number;
  ariaLabel?: string;
  wrapperStyle?: Style;
  wrapperClass?: string;
  visible?: boolean;
}

export interface BaseProps extends PrimaryProps {
  color?: string;
}

export const DEFAULT_WAI_ARIA_ATTRIBUTE = {
  'aria-busy': true,
  role: 'progressbar',
};

interface BarsProps extends BaseProps {
  className?: string;
}

export const Bars: FunctionComponent<BarsProps> = ({
  height = 24,
  width = 24,
  color = DEFAULT_COLOR,
  ariaLabel = 'bars-loading',
  wrapperStyle,
  wrapperClass,
  visible = true,
}) => (
  <SvgWrapper
    $visible={visible}
    style={{ ...wrapperStyle }}
    className={wrapperClass}
    data-testid="bars-loading"
    aria-label={ariaLabel}
    {...DEFAULT_WAI_ARIA_ATTRIBUTE}
  >
    <svg
      width={width}
      height={height}
      fill={color}
      viewBox="0 0 135 140"
      xmlns={SVG_NAMESPACE}
      data-testid="bars-svg"
    >
      <rect y="10" width="15" height="120" rx="6">
        <animate
          attributeName="height"
          begin="0.5s"
          dur="1s"
          values="120;110;100;90;80;70;60;50;40;140;120"
          calcMode="linear"
          repeatCount="indefinite"
        />
        <animate
          attributeName="y"
          begin="0.5s"
          dur="1s"
          values="10;15;20;25;30;35;40;45;50;0;10"
          calcMode="linear"
          repeatCount="indefinite"
        />
      </rect>
      <rect x="30" y="10" width="15" height="120" rx="6">
        <animate
          attributeName="height"
          begin="0.25s"
          dur="1s"
          values="120;110;100;90;80;70;60;50;40;140;120"
          calcMode="linear"
          repeatCount="indefinite"
        />
        <animate
          attributeName="y"
          begin="0.25s"
          dur="1s"
          values="10;15;20;25;30;35;40;45;50;0;10"
          calcMode="linear"
          repeatCount="indefinite"
        />
      </rect>
      <rect x="60" width="15" height="140" rx="6">
        <animate
          attributeName="height"
          begin="0s"
          dur="1s"
          values="120;110;100;90;80;70;60;50;40;140;120"
          calcMode="linear"
          repeatCount="indefinite"
        />
        <animate
          attributeName="y"
          begin="0s"
          dur="1s"
          values="10;15;20;25;30;35;40;45;50;0;10"
          calcMode="linear"
          repeatCount="indefinite"
        />
      </rect>
      <rect x="90" y="10" width="15" height="120" rx="6">
        <animate
          attributeName="height"
          begin="0.25s"
          dur="1s"
          values="120;110;100;90;80;70;60;50;40;140;120"
          calcMode="linear"
          repeatCount="indefinite"
        />
        <animate
          attributeName="y"
          begin="0.25s"
          dur="1s"
          values="10;15;20;25;30;35;40;45;50;0;10"
          calcMode="linear"
          repeatCount="indefinite"
        />
      </rect>
      <rect x="120" y="10" width="15" height="120" rx="6">
        <animate
          attributeName="height"
          begin="0.5s"
          dur="1s"
          values="120;110;100;90;80;70;60;50;40;140;120"
          calcMode="linear"
          repeatCount="indefinite"
        />
        <animate
          attributeName="y"
          begin="0.5s"
          dur="1s"
          values="10;15;20;25;30;35;40;45;50;0;10"
          calcMode="linear"
          repeatCount="indefinite"
        />
      </rect>
    </svg>
  </SvgWrapper>
);
