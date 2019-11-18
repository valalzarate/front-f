import React from "react";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

function RFTSelect(props) {
  const { items, ...other } = props;

  return (
    <Select {...other}>
      {items.map(item => (
        <MenuItem value={item.value}>{item.text}</MenuItem>
      ))}
    </Select>
  );
}

export default RFTSelect;
