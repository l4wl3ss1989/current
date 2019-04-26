import React from 'react';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import styles from './SideDrawer.module.scss';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Auxiliary from '../../../hoc/Auxiliar/Auxilar';

const sideDrawer = (props) => {

    let attachedStyles = `${styles.SideDrawer} ${styles.Close}`;
    
    if(props.open){
        attachedStyles = `${styles.SideDrawer} ${styles.Open}`;
    }
    return (
        <Auxiliary>
            <Backdrop show={props.open} clicked={props.closed}/>
            <div className={attachedStyles}>
                <div className={styles.Logo}>
                    <Logo />
                </div>            
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </Auxiliary>        
    );
};

export default sideDrawer;