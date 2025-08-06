import { navigationItems } from "../../router/navigationItems";

const Navigation = () => {
  return (
    <nav>
      <ul>
        {navigationItems.map((item) => (
          <li key={item.path}>
            <a href={item.path}>{item.name}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
