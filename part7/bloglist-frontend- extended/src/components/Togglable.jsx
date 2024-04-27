import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import Box from '@mui/material/Box';

const Togglable = ({ buttonLabel, children }) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const childrenWithVisibilityToggle = React.Children.map(
    children,
    (child) => {
      return React.cloneElement(child, { toggleVisibility });
    }
  );

  return (
    <Box>
      {!visible && (
        <Button
          variant="contained"
          color="primary"
          onClick={toggleVisibility}
        >
          {buttonLabel}
        </Button>
      )}
      <Collapse in={visible}>
        {childrenWithVisibilityToggle}
        <Button
          variant="text"
          color="secondary"
          onClick={toggleVisibility}
          sx={{ mt: 2 }}
        >
          Cancel
        </Button>
      </Collapse>
    </Box>
  );
};

export default Togglable;
