import React from 'react';

import {INGREDIENTS_CONTROLS} from '../../../configurations/Burger/BurgerConfig';
import styles from './BuildControls.module.scss';
import BuildControl from './BuildControl/BuildControl';

const buildControls = (props) => (
    <div className={styles.BuildControls}>
        <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
        {INGREDIENTS_CONTROLS.map(ctrl => (
            <BuildControl key={ctrl.label}
                label={ctrl.label}
                added={() => props.ingredientAdded(ctrl.type)}
                removed={() => props.ingredientRemoved(ctrl.type)}
                disabled={props.disabled[ctrl.type]}
            />
        ))}
        <button className={styles.OrderButton}
            disabled={!props.purchasable}
            onClick={props.ordered}
        >ORDER NOW</button>
    </div>
);

export default buildControls;