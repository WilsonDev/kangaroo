import React, { useEffect, createRef } from 'react';
import classNames from 'classnames';

import { Light, Dark } from './themes';

type ThemeProps = {
  mode: string;
  children: any;
  className: string;
};

const Theme = ({ mode, children, className }: ThemeProps) => {
  const variables = mode === 'dark' ? Dark : Light;
  const containerRef = createRef<HTMLDivElement>();

  useEffect(() => {
    const updateCSSVariables = () => {
      if (!variables) {
        return;
      }

      Object.entries(variables).forEach(([prop, value]) => {
        const node = containerRef.current;
        if (node) {
          node.style.setProperty(prop, value);
        }
      });
    };

    updateCSSVariables();
  }, [containerRef, variables]);

  const containerClassNames = classNames(
    {
      'bp3-dark': mode === 'dark',
      'bp3-focus-disabled': true,
    },
    className,
  );

  return (
    <div className={containerClassNames} ref={containerRef}>
      {children}
    </div>
  );
};

Theme.Light = Light;
Theme.Dark = Dark;

export default Theme;
