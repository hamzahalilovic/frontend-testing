import React from "react";
import { CssGrid, CssCell } from "@blend-ui/css-grid";
import { withTheme, ThemeProvider } from "styled-components";

import { useTheme } from "@blend-ui/core";
// eslint-disable-next-line
const dashboardTheme2 = {
  backgroundColor: "#FFFFFF",
  header: { height: "65px" },
  footer: { height: "65px" },
  sidebar: {
    left: {
      width: "230px",
    },
    right: {
      width: "230px",
    },
  },
};

const Sidebar = (props) => {
  const { position = "left", children, theme, ...rest } = props;
  //  console.log('SIDEBAR ',props)
  // this is only for left boxShadow={"6px 0px 18px rgba(0, 0, 0, 0.06)"}
  const _shadow =
    (position === "left" ? "6px" : "-6px") + " 0px 18px rgba(0, 0, 0, 0.06)";

  return (
    <CssCell area={position} {...rest} boxShadow={_shadow}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </CssCell>
  );
};

const Header = (props) => {
  const { children, theme, ...rest } = props;
  //console.log('HEADER ',props);
  return (
    <CssCell area="header" {...rest} borderBottom={"1px solid #E2E5E6"}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </CssCell>
  );
};
const Footer = ({ children, theme, ...props }) => (
  <CssCell area="footer" {...props}>
    <ThemeProvider theme={theme}>{children}</ThemeProvider>
  </CssCell>
);
const Content = (props) => {
  const { children, theme, ...rest } = props;
  //console.log('CONTENT ',props)
  return (
    <CssCell area="content" {...rest}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </CssCell>
  );
};
Footer.displayName = "LayoutFooter";
Header.displayName = "LayoutHeader";
Sidebar.displayName = "LayoutSidebar";
Content.displayName = "LayoutContent";

//const Dashboard=({children,sidebar="left",...props})=>{
const Layout = ({ children, theme: layoutTheme, ...props }) => {
  //const { children, theme, ...rest } = props;
  console.log("LAYOUT ", layoutTheme);
  //console.log('LAYOUT PROPS ',props);
  const theme = useTheme();
  // eslint-disable-next-line
  const dashboardTheme = layoutTheme || theme;

  //const dashboardTheme={};
  let dashboardCols = [];
  let dashboardRows = [];
  React.Children.map(children, (child, index) => {
    if (React.isValidElement(child)) {
      //console.log(index, child);
      if (child.type.displayName === "LayoutHeader") {
        dashboardRows.push("HEADER");
      }
      if (child.type.displayName === "LayoutFooter") {
        dashboardRows.push("FOOTER");
      }
      if (child.type.displayName === "LayoutContent") {
        dashboardRows.push("CONTENT");
        dashboardCols.push("CONTENT");
      }
      if (child.type.displayName === "LayoutSidebar") {
        if (
          typeof child.props !== "undefined" &&
          typeof child.props.position !== "undefined"
        ) {
          dashboardCols.push(child.props.position.toUpperCase());
        } else {
          dashboardCols.push("LEFT");
        }
      }
    }
  });

  let gridColumns = ["", "", ""];
  let gridRows = ["", "", ""];
  let gridAreas = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  dashboardCols.forEach((col) => {
    if (col === "CONTENT") {
      gridColumns[1] = "1fr";
      gridAreas[1][1] = "content";
    }
    if (col === "LEFT") {
      //gridColumns[0] = dashboardTheme.sidebar.left.width;
      gridAreas[1][0] = "left";
    }
    if (col === "RIGHT") {
      //gridColumns[2] = dashboardTheme.sidebar.right.width;
      gridAreas[1][2] = "right";
    }
  });
  dashboardRows.forEach((row) => {
    if (row === "CONTENT") {
      gridRows[1] = "1fr";
    }
    if (row === "HEADER") {
      //gridRows[0] = dashboardTheme.header.height;
      dashboardCols.forEach((col, i) => {
        gridAreas[0][i] = "header";
      });
    }
    if (row === "FOOTER") {
      //gridRows[2] = dashboardTheme.footer.height;
      dashboardCols.forEach((col, i) => {
        gridAreas[2][i] = "footer";
      });
    }
  });

  //console.log(gridColumns.join(" ").trim());
  //console.log(gridRows.join(" ").trim());

  let _areas = [];
  dashboardRows.forEach((row, i) => {
    _areas.push(gridAreas[i].join(" ").trim());
  });
  //console.log(_areas);
  /*
     console.log(gridAreas[0].join(" ").trim());
     console.log(gridAreas[1].join(" ").trim());
     console.log(gridAreas[2].join(" ").trim());
     */

  /*
      const Items=React.Children.map(children, (child, index) => {
        if (!React.isValidElement(child)) return;
    
        const isLast = index + 1 === React.Children.count(children);
        if (isLast) {
          return child;
        }
    
        return React.cloneElement(child, { spacing });
      })
    */
  const Items = React.Children.map(children, (child, index) => {
    if (!React.isValidElement(child)) return;

    /*    
    const isLast = index + 1 === React.Children.count(children);
    if (isLast) {
      return child;
    }
    */

    return React.cloneElement(child, { theme });
  });

  return (
    <CssGrid
      columns={gridColumns.join(" ").trim()}
      rows={gridRows.join(" ").trim()}
      areas={_areas}
      {...props}
    >
      {Items}
    </CssGrid>
  );

  /*
return <React.Fragment>
    {children}
</React.Fragment>
*/
};
Layout.Header = Header;
Layout.Footer = Footer;
Layout.Sidebar = Sidebar;
Layout.Content = Content;

export default withTheme(Layout);

/*
import { CssGrid as Grid, CssCell as Cell } from "../src";

const MyGrid = () => (
  <Grid columns={2} gap="2px">
    <Cell>foo</Cell>
    <Cell height={2}>bar</Cell>
    <Cell width={2}>baz</Cell>
  </Grid>
);

*/
