import React from 'react';

import styles from './Button.module.scss';

const button = (props) => (
    <button className={[styles.Button, styles[props.btnType]].join(' ')}
        disabled={props.disabled}
        onClick={props.clicked}
    >
        {props.children}
    </button>
);

export default button;