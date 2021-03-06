import { Fragment } from 'react';
import { NavLink } from 'react-router-dom';

function NavigationLinks(props) {
  const { className, link, content, component } = props;

  return (
    <Fragment>
      <li>
        <NavLink className={className} to={link} component={component}>
          {content}
        </NavLink>
      </li>
    </Fragment>
  );
}

export default NavigationLinks;
