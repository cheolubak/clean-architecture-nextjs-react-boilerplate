import React from 'react';

import { TextLogo } from 'ui/common/components/typography/TextLogo/TextLogo';
import { SideNavigationLinks } from 'ui/common/components/layout/SideNavigation/SideNavigationLinks/SideNavigationLinks';
import { LOGO_TEXT } from 'ui/common/components/layout/SideNavigation/SideNavigation.dictionary';

import styles from 'ui/common/components/layout/SideNavigation/sideNavigation.module.scss';

export const SideNavigation = () => (
  <aside className={styles.sideNavigation}>
    <TextLogo className={styles.logo}>{LOGO_TEXT}</TextLogo>
    <SideNavigationLinks />
  </aside>
);
