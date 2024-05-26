// SideMenu.js
// implement side menu mui drawer

import React, { useState } from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { ListItemButton } from "@mui/material";

const SideMenu = ({ isOpen, onClose, categories }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId === selectedCategory ? null : categoryId);
  };

  return (
    <Drawer anchor="left" open={isOpen} onClose={onClose}>
      <List>
        {categories &&
          categories.map((category) => (
            <ListItem>
              <ListItemButton
                key={category.id}
                onClick={() => handleCategoryClick(category.id)}
              ></ListItemButton>
              <ListItemText primary={category.name} />
              {/* Visa underkategorier om kategorin är vald */}
              {selectedCategory === category.id && category.subcategories && (
                <List>
                  {category.subcategories.map((subcategory) => (
                    <ListItem button key={subcategory} onClick={onClose}>
                      <ListItemText primary={subcategory} />
                    </ListItem>
                  ))}
                </List>
              )}
            </ListItem>
          ))}
      </List>
    </Drawer>
  );
};

export default SideMenu;
