import React, { useState } from 'react';

interface CollapsibleProps {
  title: string | React.ReactNode;
  content: string | React.ReactNode;
}

function Collapsible(props: CollapsibleProps): JSX.Element {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(true);

  const toggleCollapse = (): void => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div>
      <button className="w-full" onClick={toggleCollapse}>
        {props.title}
      </button>

      {!isCollapsed && (
        <div>
          <hr className="my-4" />
          {props.content}
        </div>
      )}
    </div>
  );
}

export default Collapsible;
