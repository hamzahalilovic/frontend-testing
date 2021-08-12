/* eslint-disable react/no-multi-comp */
import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  Box,
  Flex,
  Text,
  Button,
  ThemeProvider,
  Divider,
  Image,
  Radio,
} from "@blend-ui/core";

import { BlendIcon } from "@blend-ui/icons";

import { ReactComponent as DefaultWidget } from "../assets/third-party-app.svg";

import { PrifinaLogo } from "../components/PrifinaLogo";
import styled, { createGlobalStyle } from "styled-components";

import Layout from "../components/Layout";

import {
  getPrifinaWidgetsQuery,
  getPrifinaUserQuery,
  installWidgetMutation,
} from "../graphql/api";

import PropTypes from "prop-types";

//app-market homepage
import appMarketBanner from "./assets/app-market-banner.png";

//data requirements page

import healthData from "./assets/app-market/health-data.png";
import viewingData from "./assets/app-market/viewing-data.png";

import bxsCheckCircle from "@iconify/icons-bx/bxs-check-circle";
import bxsXCircle from "@iconify/icons-bx/bxs-x-circle";
import lefArrow from "@iconify/icons-bx/bxs-chevron-left";

import { widgetsManifest } from "./widgetsManifest.js";

const propTest = props => {
  console.log("PROP TEST ", props);
  return null;
};

const installedApps = [
  "Settings",
  "DataConsole",
  "AppMarket",
  "SmartSearch",
  "DisplayApp",
  "ProfileCards",
  "DevConsole",
];

console.log("ICON", widgetsManifest);

const WidgetBase = styled.div`
  display: flex;
  padding-top: 15px;
  padding-right: 15px;
  width: 362px;
  height: 262px;
  background: #fbfbfb; // color missing from theme
  box-shadow: 0px 4px 8px #ebf0f1; // color missing,... shadow missing from theme
  border-radius: 0.625rem; // missing from theme...
  margin-right: 24px;
  margin-bottom: 24px;
`;

const StyledText = styled(Text)`
  font-weight: ${props =>
    props.hasOwnProperty("fontWeight")
      ? Object.keys(props.theme.fontWeights).indexOf(props.fontWeight) > -1
        ? props.theme.fontWeights[props.fontWeight]
        : props.fontWeight
      : "null"};
`;

const StyledDescription = styled(Text)`
  color: #6b767e;
  word-break: break-word;
`;

const InstallButton = styled(Button)`
  //   width: 74px; // fixed width is not good idea... because of the translations
  height: 23px;
  width: 74px;
  min-width: 74px; //
  background: #47a7d6; // not on theme
  border-radius: 15px; // not on theme
  line-height: 23px;
`;

const InstalledText = styled(Text)`
  color: #47a7d6; // not on theme
  line-height: 23px;
`;
const TitleText = styled(Text)`
  /* */
`;

const GlobalStyle = createGlobalStyle`
.app-market path {
  fill: #47a7d6;
}
`;

//not on blend theme
const TextButton = styled(Button)`
  background: transparent;
  color: black;
  border: 0;
  font-size: 14px;
  &:hover {
    border: 0 !important;
    background: white !important;
    color: grey !important;
  }
`;

//not on blend theme
const OutlineButton = styled(Button)`
  background: white; // not on theme
  border: 1px solid #4295e1;
  color: #4295e1;
  line-height: 23px;
  &:hover {
    border: 1px solid #4295e1 !important;
    background: white !important;
    color: #4295e1 !important;
  }
`;

//not on blend theme
const UnderlineButton = styled(Button)`
  background: white; // not on theme
  border-radius: 0;
  border: 0;
  border-bottom: 2px solid #4295e1;
  color: #4295e1;
  line-height: 23px;
  font-size: 14px;
  &:hover {
    border: 0 !important;
    border-bottom: 2px solid #4295e1 !important;
    background: white !important;
    color: #4295e1 !important;
  }
`;

//not in blend theme
const Badge = styled.span`
  min-width: 98px;
  height: 27px;
  border-radius: 20px;
  background: #d1eaf9;
  font-size: 12px;
  line-height: 27px;
  color: #066fe1;
  font-weight: 700;
  text-transform: capitalize;
  text-align: center;
`;

//not in blend theme

const OrderedList = styled.ol`
  margin: 0;
  list-style-position: outside;
  padding-inline-start: 20px;
  margin-block-start: 0px;
  padding: 0;
  padding-left: 20px;
`;
const ListItem = styled.li`
  /* */
  color: #969595;
`;

const Card = ({ title, value }) => {
  return (
    <Flex width="100px" flexDirection="column" marginRight="12px">
      <Flex
        height="35px"
        borderRadius="8px"
        bg="#ECE8E8"
        alignItems="center"
        justifyContent="center"
        marginBottom="16px"
      >
        <Text fontSize="10px">{title}</Text>
      </Flex>
      <Flex justifyContent="center">
        <Text fontSize="12px">{value}</Text>
      </Flex>
    </Flex>
  );
};

const Navbar = () => {
  return (
    <Flex
      height="65px"
      width="100%"
      bg="#F6F7F9"
      alignItems="center"
      paddingLeft="20px"
      style={{ position: "sticky", top: 0, zIndex: 1 }}
    >
      <PrifinaLogo className={"app-market"} />
    </Flex>
  );
};
const UserMenu = ({ children }) => {
  return (
    <Flex
      height="100%"
      flexDirection="column"
      width="286px"
      position="fixed"
      bg="#F6F7F9"
      zIndex={1}
      alignItems="left"
      paddingTop={25}
    >
      {children}
    </Flex>
  );
};
const WidgetBox = ({
  title,
  installed,
  installWidget,
  name,
  shortDescription,
  installedWidget,
  icon,
  onClick,
  ...props
}) => {
  console.log("PROPS ", name, installed, title, installedWidget, props);
  return (
    <WidgetBase onClick={onClick}>
      <Flex width={"73px"} justifyContent={"center"}>
        {/* <DefaultWidget width={"42px"} height={"42px"} /> */}
        <Image src={icon} width={"42px"} height={"42px"} />
      </Flex>
      <Flex width={"237px"} flexDirection={"column"}>
        <Flex flexDirection={"row"}>
          <StyledText textStyle={"body"} fontWeight={"semiBold"}>
            {title}
          </StyledText>
          <Flex width={"100%"} justifyContent={"flex-end"}>
            {installedWidget > -1 && <InstalledText>Installed</InstalledText>}
            {installedWidget === -1 && (
              <InstallButton
                onClick={e => {
                  installWidget(e, name);
                }}
              >
                Install
              </InstallButton>
            )}
          </Flex>
        </Flex>
        <StyledDescription textStyle={"caption"} mt={"16px"}>
          {shortDescription}
        </StyledDescription>
      </Flex>
    </WidgetBase>
  );
};

export default { title: "App Market" };

export const AppMarket = ({ GraphQLClient, prifinaID, ...props }) => {
  console.log("APP MARKET PROPS ", props);
  //const [widgets, setWidgets] = useState({});
  // const widgets = useRef({});
  const widgets = useRef(widgetsManifest);

  const [installedWidgets, setInstalledWidgets] = useState([]);

  const [allValues, setAllValues] = useState({
    title: "",
    shortDescription: "",
    icon: "",
    publisher: "",
    screenshots: [],
  });

  const [step, setStep] = useState(0);

  useEffect(() => {
    // getPrifinaWidgetsQuery(GraphQLClient, "WIDGETS").then(res => {
    // const widgetData = JSON.parse(res.data.getPrifinaApp.widgets);
    const widgetData = widgetsManifest;

    let availableWidgets = {};
    Object.keys(widgetData).forEach(w => {
      if (!widgetData[w].hasOwnProperty("restricted")) {
        availableWidgets[widgetData[w].name] = {
          title: widgetData[w].title,
          publisher: widgetData[w].publisher,
          icon: widgetData[w].icon,
          bannerImage: widgetData[w].bannerImage,
          description: widgetData[w].description,
          shortDescription: widgetData[w].shortDescription,
          longDescription: widgetData[w].longDescription,
          dataType: widgetData[w].dataType,
          category: widgetData[w].category,
          deviceSupport: widgetData[w].deviceSupport,
          languages: widgetData[w].languages,
          age: widgetData[w].age,
          screenshots: widgetData[w].screenshots,
          keyFeatures: widgetData[w].keyFeatures,
          userHeld: widgetData[w].userHeld,
          userGenerated: widgetData[w].userGenerated,
          public: widgetData[w].public,
          dataConnectionsImage: widgetData[w].dataConnectionsImage,
          installed: false,
        };
      }
    });
    console.log("AVAILABLE WIDGETS ", availableWidgets);
    let currentInstalled = [];
    // getPrifinaUserQuery(GraphQLClient, prifinaID).then(res => {
    // if (
    //   res.data.getPrifinaUser.hasOwnProperty("installedWidgets") &&
    //   res.data.getPrifinaUser.installedWidgets !== null
    // ) {
    //   const installedWidgets = JSON.parse(
    //     res.data.getPrifinaUser.installedWidgets,
    //   );
    //   installedWidgets.forEach(w => {
    //     //console.log(w, typeof availableWidgets[w.name]);
    //     //console.log(availableWidgets[w.name]);
    //     //availableWidgets[w].installed = true;
    //     if (availableWidgets.hasOwnProperty(w.name)) {
    //       availableWidgets[w.name].installed = true;
    //       currentInstalled.push(w.name);
    //     }
    //   });
    console.log("HUUUU", availableWidgets);
    widgets.current = availableWidgets;
    setInstalledWidgets(currentInstalled);
    // }
    // else {
    //   // no widgets installed....
    //   widgets.current = availableWidgets;
    //   setInstalledWidgets(currentInstalled);
    // }
    // });
    // });
  }, []);

  const installWidget = (e, name) => {
    console.log("CLICK ", name);
    //console.log("INSTALL ", widgets);

    // installWidgetMutation(GraphQLClient, prifinaID, {
    //   name: name,
    //   index: -1,
    // }).then(res => {
    //   console.log("INSTALL ", res);

    //   //let availableWidgets = widgets.current;
    //   //availableWidgets[name].installed = true;
    //   widgets.current[name].installed = true;

    //   setInstalledWidgets(...installedWidgets, name);
    // });

    setInstalledWidgets(...installedWidgets, name);
  };
  console.log(installedWidgets, widgets.current);

  switch (step) {
    case 0:
      break;
    case 1:
      break;
    case 2:
      break;
    case 3:
      break;
    case 3:
      break;
    default:
  }

  function userHeldData() {
    const newData = allValues.userHeld.map(item => {
      return (
        <Flex alignItems="center">
          <BlendIcon iconify={bxsCheckCircle} color={"#066FE1"} size="16px" />
          <Text fontSize="14px" color="#066FE1" marginLeft="8px">
            {item}
          </Text>
        </Flex>
      );
    });
    if (newData.length > 0) {
      return <Flex flexDirection="column"> {newData}</Flex>;
    } else {
      return (
        <Flex alignItems="center">
          <BlendIcon iconify={bxsXCircle} color={"#ADADAD"} size="16px" />
          <Text marginLeft="8px" color="#969595" fontSize="14px">
            None needed
          </Text>
        </Flex>
      );
    }
  }

  function userGeneratedData() {
    const newData = allValues.userGenerated.map(item => {
      return (
        <Flex alignItems="center">
          <BlendIcon iconify={bxsCheckCircle} color={"#066FE1"} size="16px" />
          <Text fontSize="14px" color="#066FE1" marginLeft="8px">
            {item}
          </Text>
        </Flex>
      );
    });
    if (newData.length > 0) {
      return <Flex flexDirection="column"> {newData}</Flex>;
    } else {
      return (
        <Flex alignItems="center">
          <BlendIcon iconify={bxsXCircle} color={"#ADADAD"} size="16px" />
          <Text marginLeft="8px" color="#969595" fontSize="14px">
            None needed
          </Text>
        </Flex>
      );
    }
  }
  function publicData() {
    const newData = allValues.public.map(item => {
      return (
        <Flex alignItems="center">
          <BlendIcon iconify={bxsCheckCircle} color={"#066FE1"} size="16px" />
          <Text fontSize="14px" color="#066FE1" marginLeft="8px">
            {item}
          </Text>
        </Flex>
      );
    });
    if (newData.length > 0) {
      return <Flex flexDirection="column"> {newData}</Flex>;
    } else {
      return (
        <Flex alignItems="center">
          <BlendIcon iconify={bxsXCircle} color={"#ADADAD"} size="16px" />
          <Text marginLeft="8px" color="#969595" fontSize="14px">
            None needed
          </Text>
        </Flex>
      );
    }
  }

  return (
    <>
      {step === 0 && (
        <>
          <GlobalStyle />
          <Navbar />
          <UserMenu
          // children={
          //   <ul>
          //     <div>Market</div>
          //     <div>Applications</div>
          //     <div>Widgets</div>
          //   </ul>
          // }
          />
          <Flex
            width="100%"
            height="100%"
            paddingLeft="286px"
            bg="white"
            flexDirection="column"
            alignItems="center"
          >
            <Flex
              height="316px"
              bg="#EBF3FF"
              width="100%"
              justifyContent="space-between"
              paddingLeft="40px"
              paddingRight="40px"
              paddingTop="32px"
              paddingBottom="32px"
            >
              <Flex
                flexDirection="column"
                marginRight="143px"
                paddingTop="62px"
              >
                <Text fontSize="28px" color="#639AED" marginBottom="24px">
                  Data on your side
                </Text>
                <Text fontSize="16px" color="#639AED">
                  Free your data from its silos and utilize it in different apps
                  and widgets. Like a key, your data can unlock valuable
                  experiences and insights. By using your data directly, you
                  capture the value and open a new market of apps.
                </Text>
              </Flex>
              <Image src={appMarketBanner} />
            </Flex>

            <Box mt={"40px"} ml={"64px"}>
              <TitleText textStyle={"h4"}>Category</TitleText>
              <Text textStyle={"h6"}>
                This section features all the widgets which require user-held
                data
              </Text>
              <Flex mt={"24px"} flexDirection={"row"} flexWrap="wrap">
                {Object.keys(widgets.current).map(w => {
                  console.log("HEEEEE", widgets.current);
                  return (
                    <WidgetBox
                      key={w}
                      name={w}
                      {...widgets.current[w]}
                      installWidget={installWidget}
                      installedWidget={installedWidgets.indexOf(w)}
                      onClick={() => {
                        setStep(1);
                        setAllValues({
                          ...allValues,
                          title: widgets.current[w].title,
                          publisher: widgets.current[w].publisher,
                          icon: widgets.current[w].icon,
                          bannerImage: widgets.current[w].bannerImage,
                          description: widgets.current[w].description,
                          shortDescription: widgets.current[w].shortDescription,
                          longDescription: widgets.current[w].longDescription,
                          dataType: widgets.current[w].dataType,
                          category: widgets.current[w].category,
                          deviceSupport: widgets.current[w].deviceSupport,
                          languages: widgets.current[w].languages,
                          age: widgets.current[w].age,
                          screenshots: widgets.current[w].screenshots,
                          keyFeatures: widgets.current[w].keyFeatures,
                          userHeld: widgets.current[w].userHeld,
                          userGenerated: widgets.current[w].userGenerated,
                          public: widgets.current[w].public,
                          dataConnectionsImage:
                            widgets.current[w].dataConnectionsImage,
                        });
                      }}
                    />
                  );
                })}
              </Flex>
            </Box>
          </Flex>
        </>
      )}
      {step === 1 && (
        <ThemeProvider>
          <GlobalStyle />

          <Navbar />
          <UserMenu
          // children={
          //   <ul>
          //     <div>Market</div>
          //     <div>Applications</div>
          //     <div>Widgets</div>
          //   </ul>
          // }
          />
          <Flex
            width="100%"
            height="100%"
            paddingLeft="286px"
            bg="white"
            flexDirection="column"
            alignItems="center"
          >
            <Flex
              width="100%"
              height="71px"
              alignItems="center"
              paddingLeft="64px"
            >
              <TextButton
                onClick={() => {
                  setStep(0);
                }}
              >
                <BlendIcon iconify={lefArrow} size="12px" />
                Widgets Directory
              </TextButton>
            </Flex>
            <Image
              src={allValues.bannerImage}
              alt={"Image"}
              shape={"square"}
              style={{ filter: "blur(1.5px)" }}
            />
            <Flex
              alt="innerContainer"
              marginTop={-120}
              borderRadius="8px"
              width="1026px"
              height="auto"
              bg="white"
              boxShadow="0px 0px 16px rgba(74, 77, 79, 0.25)"
              flexDirection="column"
              marginBottom="82px"
              paddingLeft="40px"
              paddingRight="40px"
              paddingBottom="30px"
              zIndex={0}
            >
              <Flex
                alt="topContainer"
                justifyContent="space-between"
                alignItems="center"
                width="100%"
                paddingTop="32px"
                paddingBottom="24px"
              >
                <Flex alt="leftSide" alignItems="center" flex="2">
                  <Image
                    src={allValues.icon}
                    alt={"Image"}
                    shape={"square"}
                    width={57}
                  />
                  <Flex flexDirection="column" marginLeft="16px">
                    <Flex alignItems="center">
                      <Text fontSize="24px" bold marginRight="24px">
                        {allValues.title}
                      </Text>
                      <Badge>Widget</Badge>
                    </Flex>
                    <Flex paddingTop="8px">
                      <Text marginRight="18px" color="#969595" fontSize="12px">
                        {allValues.publisher}
                      </Text>
                      <Text color="#969595" fontSize="12px">
                        {allValues.category}
                      </Text>
                    </Flex>
                  </Flex>
                </Flex>
                <Flex alt="rightSide" justifyContent="space-between" flex="2">
                  <OutlineButton variation="outline">Report bug</OutlineButton>
                  <OutlineButton variation="outline">Support</OutlineButton>
                  <Button disabled>Install</Button>
                </Flex>
              </Flex>
              <Flex alt="buttons" marginBottom="40px">
                <UnderlineButton
                  onClick={() => {
                    setStep(1);
                  }}
                >
                  Widget Details
                </UnderlineButton>
                <UnderlineButton
                  style={{
                    color: "#ADADAD",
                    borderBottom: "2px solid #ADADAD",
                  }}
                  onClick={() => {
                    setStep(2);
                  }}
                >
                  Data requirements
                </UnderlineButton>
              </Flex>
              <Flex alt="bottomContainer" justifyContent="space-between">
                <Flex
                  alt="leftSide"
                  flexDirection="column"
                  paddingRight="113px"
                >
                  <Flex alt="widgetInfo" alignItems="center">
                    <Text marginRight="24px" fontSize="18px">
                      {allValues.title}
                    </Text>
                    {/* temproray */}
                    <Box
                      width="117px"
                      height="30px"
                      bg="#B2F5EA"
                      textAlign="center"
                      lineHeight="30px"
                      fontSize="10px"
                      color="#00A3C4"
                    >
                      User Held
                    </Box>
                  </Flex>
                  <Text fontSize="12px" color="#969595">
                    {allValues.publisher}
                  </Text>
                  <Text fontSize="14px">{allValues.shortDescription}</Text>
                  <Flex
                    alt="requirementCards"
                    paddingTop="32px"
                    marginBottom="40px"
                  >
                    <Card title="Data types" value={allValues.dataType} />
                    <Card title="Category" value={allValues.category} />
                    <Card
                      title="Device support"
                      value={allValues.deviceSupport}
                    />
                    <Card title="Languages" value={allValues.languages} />
                    <Card title="App Appropriate" value={allValues.age} />
                  </Flex>
                  <Text color="#969595" fontSize="14px" marginBottom="16px">
                    {allValues.longDescription}
                  </Text>
                  <Flex alt="features" flexDirection="column">
                    <Text color="#969595" fontSize="14px" marginBottom="8px">
                      Features
                    </Text>
                    <OrderedList>
                      {allValues.keyFeatures.map(item => {
                        return (
                          <ListItem fontSize="14px" color="#969595">
                            {item}
                          </ListItem>
                        );
                      })}
                    </OrderedList>
                  </Flex>
                </Flex>
                <Flex alt="rightSide" flexDirection="column">
                  {allValues.screenshots.map((item, index) => {
                    return (
                      <Box width="284px" height="213px" marginBottom="16px">
                        <Image key={index} src={item} />
                      </Box>
                    );
                  })}
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        </ThemeProvider>
      )}
      {step === 2 && (
        <ThemeProvider>
          <GlobalStyle />

          <Navbar />
          <UserMenu
          // children={
          //   <ul>
          //     <div>Market</div>
          //     <div>Applications</div>
          //     <div>Widgets</div>
          //   </ul>
          // }
          />
          <Flex
            width="100%"
            height="100%"
            paddingLeft="286px"
            bg="white"
            flexDirection="column"
            alignItems="center"
          >
            <Flex
              width="100%"
              height="71px"
              alignItems="center"
              paddingLeft="64px"
            >
              <TextButton
                onClick={() => {
                  setStep(0);
                }}
              >
                <BlendIcon iconify={lefArrow} size="12px" />
                Widgets Directory
              </TextButton>
            </Flex>
            <Image
              src={allValues.bannerImage}
              alt={"Image"}
              shape={"square"}
              style={{ filter: "blur(1.5px)" }}
            />
            <Flex
              alt="innerContainer"
              marginTop={-120}
              borderRadius="8px"
              minWidth="1026px"
              bg="white"
              boxShadow="0px 0px 16px rgba(74, 77, 79, 0.25)"
              flexDirection="column"
              marginBottom="82px"
              marginLeft="64px"
              marginRight="64px"
              paddingLeft="40px"
              paddingRight="40px"
              paddingBottom="30px"
              zIndex={0}
            >
              <Flex
                alt="topContainer"
                justifyContent="space-between"
                alignItems="center"
                width="100%"
                // minHeight="88px"
                paddingTop="32px"
                paddingBottom="24px"
                // marginBottom="20px"
              >
                <Flex alt="leftSide" alignItems="center" flex="2">
                  <Image
                    src={allValues.icon}
                    alt={"Image"}
                    shape={"square"}
                    width={57}
                  />
                  <Flex flexDirection="column" marginLeft="16px">
                    <Flex alignItems="center">
                      <Text fontSize="24px" bold marginRight="24px">
                        {allValues.title}
                      </Text>
                      <Badge>Widget</Badge>
                    </Flex>
                    <Flex paddingTop="8px">
                      <Text marginRight="18px" color="#969595" fontSize="12px">
                        {allValues.publisher}
                      </Text>
                      <Text color="#969595" fontSize="12px">
                        {allValues.category}
                      </Text>
                    </Flex>
                  </Flex>
                </Flex>
                <Flex alt="rightSide" justifyContent="space-between" flex="2">
                  <OutlineButton variation="outline">Report bug</OutlineButton>
                  <OutlineButton variation="outline">Support</OutlineButton>
                  <Button disabled>Install</Button>
                </Flex>
              </Flex>
              {/* temporary */}
              {/* <Flex
                bg="#FFF8E0"
                justifyContent="space-between"
                paddingTop="28px"
                paddingBottom="28px"
                paddingLeft="17"
                paddingRight="28px"
              >
                <Text color="#E8B607">
                  This widget requires health and viewing data to operate
                </Text>
                <Text color="#E8B607">Connect Data</Text>
              </Flex> */}
              <Flex alt="buttons" marginBottom="38px">
                <UnderlineButton
                  style={{
                    color: "#ADADAD",
                    borderBottom: "2px solid #ADADAD",
                  }}
                  onClick={() => {
                    setStep(1);
                  }}
                >
                  Widget Details
                </UnderlineButton>
                <UnderlineButton
                  onClick={() => {
                    setStep(2);
                  }}
                >
                  Data requirements
                </UnderlineButton>
              </Flex>
              <Flex
                alt="dataRequirements"
                paddingLeft="7px"
                paddingRight="20px"
                marginBottom="25px"
                justifyContent="space-between"
              >
                <Flex alt="leftSide" flexDirection="column" width="480px">
                  <Flex alignItems="center" marginBottom="13px">
                    <Text marginRight="24px" fontSize="18px">
                      Data Requirements
                    </Text>
                    {/* temproray */}
                    <Box
                      width="117px"
                      height="30px"
                      bg="#B2F5EA"
                      textAlign="center"
                      lineHeight="30px"
                      fontSize="10px"
                      color="#00A3C4"
                    >
                      User Held
                    </Box>
                  </Flex>
                  <Text fontSize="14px" color="#969595">
                    Some products on Prifina are powered by ‘user-held’ data
                    which they pull from your data cloud, if the data is not
                    available in your cloud they can’t run. Select from sources
                    below to add the data
                  </Text>
                  <Flex
                    justifyContent="space-between"
                    paddingTop="32px"
                    paddingBottom="31px"
                  >
                    <Flex flexDirection="column">
                      <Text fontSize="14px" bold marginBottom="16px">
                        User-held
                      </Text>
                      {userHeldData()}
                    </Flex>
                    <Flex flexDirection="column">
                      <Text fontSize="14px" bold marginBottom="16px">
                        User-generated
                      </Text>
                      {userGeneratedData()}
                    </Flex>
                    <Flex flexDirection="column">
                      <Text fontSize="14px" bold marginBottom="16px">
                        Public
                      </Text>
                      {publicData()}
                    </Flex>
                  </Flex>
                </Flex>
                <Flex alt="rightSide">
                  <Image
                    src={allValues.dataConnectionsImage}
                    style={{
                      width: "284px",
                      height: "213px",
                    }}
                  />
                </Flex>
              </Flex>

              <Divider as={"div"} color="#F2F4F5" height={"1px"} />
              <Flex alt="addData" paddingTop="32px" paddingBottom="40px">
                <Flex flexDirection="column" marginRight="190px">
                  <Flex paddingBottom="8px">
                    <Image src={healthData} alt={"Image"} shape={"square"} />
                    <Text marginLeft="8px">Add health data to your cloud</Text>
                  </Flex>
                  <Text color="#969595">
                    Select from available sources to add
                  </Text>
                  <Flex paddingTop="31px">
                    <Box
                      height="44px"
                      width="44px"
                      borderRadius="8.8px"
                      bg="grey"
                    />
                  </Flex>
                </Flex>
                <Flex flexDirection="column">
                  <Flex paddingBottom="8px">
                    <Image src={viewingData} alt={"Image"} shape={"square"} />
                    <Text marginLeft="8px">Add viewing data to your cloud</Text>
                  </Flex>
                  <Text color="#969595">
                    Select from available sources to add
                  </Text>
                  <Flex paddingTop="31px">
                    <Box
                      height="44px"
                      width="44px"
                      borderRadius="8.8px"
                      bg="grey"
                    ></Box>
                  </Flex>
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        </ThemeProvider>
      )}
    </>
  );
};

AppMarket.displayName = "AppMarket";

// export default AppMarket;

AppMarket.story = {
  name: "App Market",
};
