import styled from 'styled-components';

interface RdtPickerProps {
  position: 'left' | 'right';
}

export default styled.div<RdtPickerProps>`
  position: relative;

  .rdt {
    position: relative;
  }

  .rdtInput {
    font-size: 16px;
  }

  .rdtOpen .rdtPicker {
    display: block;
  }

  .rdtPicker {
    display: none;
    position: absolute;
    width: 130px;
    padding: 4px;
    margin-top: 1px;
    z-index: 99999 !important;
    background: #fff;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    border: 1px solid #f9f9f9;
    top: 100%;
    left: ${(props: any) => (props.position === 'right' ? 'auto' : '0')};
    right: ${(props: any) => (props.position === 'right' ? '0' : 'auto')};
  }

  .rdtTime {
    display: flex;
    justify-content: center;
  }

  .rdtTime td {
    cursor: default;
  }

  .rdtPicker td,
  .rdtPicker th {
    text-align: center;
    height: 28px;
  }

  .rdtCounters {
    display: inline-block;
  }

  .rdtCounter {
    height: 100px;
    width: 40px;
  }

  .rdtCounters > div {
    float: left;
  }

  .rdtCounter .rdtBtn {
    margin: 0 auto;
    height: 40%;
    line-height: 40px;
    cursor: pointer;
    display: block;
    border: none;
    background: none;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    user-select: none;
  }

  .rdtCounter .rdtCount {
    height: 20%;
    font-size: 1.2em;
  }

  .rdtCounterSeparator {
    line-height: 100px;
  }
`;
