/* eslint-disable react/display-name */
/* eslint-disable react/no-multi-comp */

import React, { useRef, useState, useEffect, useMemo } from "react";

import Amplify, { Auth, API as GRAPHQL } from "aws-amplify";
import config from "../config";

import AWSAppSyncClient, { AUTH_TYPE } from "aws-appsync";

import { getPrifinaUserQuery } from "../graphql/api";

import { default as DefaultApp } from "../pages/Home";
import { useFormFields } from "../lib/formFields";

import {
  Box,
  Flex,
  Text,
  Button,
  Image,
  useTheme,
  ThemeProvider,
  Input,
} from "@blend-ui/core";

// import { Button } from "demo-blend-ui/core";
import styled from "styled-components";

import { BlendIcon } from "@blend-ui/icons";

import { Tabs, Tab, TabList, TabPanel, TabPanelList } from "@blend-ui/tabs";

import { ProgressBar, ProgressLabel } from "demo-blend-ui/progress";

import mdiPlusCircle from "@iconify/icons-mdi/plus-circle-outline";
import mdiPowerPlug from "@iconify/icons-mdi/power-plug";
import mdiZipBoxOutline from "@iconify/icons-mdi/zip-box-outline";
import copy from "@iconify/icons-mdi/content-copy";
import mdiArrowLeft from "@iconify/icons-mdi/arrow-left";
import bxsInfoCircle from "@iconify/icons-bx/bxs-info-circle";
import arrowTopRightBottomLeft from "@iconify/icons-mdi/arrow-top-right-bottom-left";
import baselineWeb from "@iconify/icons-mdi/table";

import CreateProjectModal from "../components/CreateProjectModal";
import createProject from "../assets/createProject.png";
import docs from "../assets/docs.png";
import starterResources from "../assets/starterResources.png";
import launcherResources from "../assets/launcherResources.png";
import slackResources from "../assets/slackResources.png";
import table from "../assets/table.png";

import Table from "../components/Table";
import { Cell } from "demo-blend-ui/core";

const APIConfig = {
  aws_appsync_graphqlEndpoint: config.appSync.aws_appsync_graphqlEndpoint,
  aws_appsync_region: config.main_region,
  aws_appsync_authenticationType: config.appSync.aws_appsync_authenticationType,
};

const AUTHConfig = {
  // To get the aws credentials, you need to configure
  // the Auth module with your Cognito Federated Identity Pool
  mandatorySignIn: false,
  userPoolId: config.cognito.USER_POOL_ID,
  identityPoolId: config.cognito.IDENTITY_POOL_ID,
  userPoolWebClientId: config.cognito.APP_CLIENT_ID,
  region: config.main_region,
};

const S3Config = {
  AWSS3: {
    bucket: config.S3.bucket, //REQUIRED -  Amazon S3 bucket name
    region: config.S3.region, //OPTIONAL -  Amazon service region
  },
};

export default { title: "Register App" };

export const RegisterApp = props => {
  console.log("COMPONENT ---> ", props);
  console.log("CONFIG ", config);
  const [settingsReady, setSettingsReady] = useState(false);
  const clientHandler = useRef(null);

  const prifinaID = useRef("");
  const [login, setLogin] = useState(true);

  const [loginFields, handleChange] = useFormFields({
    username: "",
    password: "",
  });

  //   Auth.configure(AUTHConfig);
  //   Amplify.configure(APIConfig);
  //   Amplify.configure(S3Config);
  console.log("AUTH CONFIG ", AUTHConfig);

  const createClient = (endpoint, region) => {
    const client = new AWSAppSyncClient({
      url: endpoint,
      region: region,
      auth: {
        type: AUTH_TYPE.AWS_IAM,
        // credentials: () => Auth.currentCredentials(),
      },
      /*
    auth: {
      type: AUTH_TYPE.AMAZON_COGNITO_USER_POOLS,
      jwtToken: async () =>
        (await Auth.currentSession()).getIdToken().getJwtToken(),
    },
    */
      disableOffline: true,
    });
    return client;
  };

  // get user auth...
  useEffect(async () => {
    try {
      if (login) {
        const session = await Auth.currentSession();

        console.log("SESSION ", session);
        if (!session) {
          console.log("NO CURRENT SESSION FOUND");
        }
        console.log("PRIFINA-ID", session.idToken.payload["custom:prifina"]);
        prifinaID.current = session.idToken.payload["custom:prifina"];

        const currentPrifinaUser = await getPrifinaUserQuery(
          GRAPHQL,
          prifinaID.current,
        );

        console.log("CURRENT USER ", currentPrifinaUser);

        const appProfile = JSON.parse(
          currentPrifinaUser.data.getPrifinaUser.appProfile,
        );
        console.log("CURRENT USER ", appProfile, appProfile.initials);

        let clientEndpoint =
          "https://kxsr2w4zxbb5vi5p7nbeyfzuee.appsync-api.us-east-1.amazonaws.com/graphql";
        let clientRegion = "us-east-1";
        if (appProfile.hasOwnProperty("endpoint")) {
          clientEndpoint = appProfile.endpoint;
          clientRegion = appProfile.region;
        }

        clientHandler.current = createClient(clientEndpoint, clientRegion);

        setSettingsReady(true);
      }
    } catch (e) {
      if (typeof e === "string" && e === "No current user") {
        setLogin(false);
        //const user = await Auth.signIn("tahola", "xxxx");
        //console.log("AUTH ", user);
        //console.log("APP DEBUG ", appCode);
      }

      console.log("AUTH ", e);
    }
  }, [login]);

  const theme = useTheme();

  const [dialogOpen, setDialogOpen] = useState(true);
  const [step, setStep] = useState(0);

  switch (step) {
    case 0:
      break;
    case 1:
      break;
    case 2:
      break;
    case 3:
      break;
    case 4:
      break;
    case 5:
      break;
    default:
  }

  const onCloseCheck = (e, action) => {
    console.log("MODAL CLOSE ", e, action);
    onClose(e, action);
    e.preventDefault();
  };

  const Navbar = () => {
    return (
      <Flex
        height="74px"
        bg="#08011C"
        style={{ position: "sticky", top: 0, zIndex: 1 }}
      ></Flex>
    );
  };
  const UserMenu = () => {
    return (
      <Flex
        height="100%"
        flexDirection="column"
        width="288px"
        position="fixed"
        bg="#08011C"
        zIndex={1}
        alignItems="center"
        paddingTop={25}
      />
    );
  };

  const ResourceCard = ({ title, description, src }) => {
    return (
      <Flex
        width="221px"
        height="120px"
        bg="#08011C"
        borderRadius="5px"
        alignItems="center"
      >
        <Box position="relative" left={-18} marginRight={0} width="100%">
          <Image src={src} />
        </Box>
        <Box
          paddingLeft="-21px"
          alignItems="center"
          paddingTop="23px"
          paddingBottom="23px"
        >
          <Text color="white" fontSize={16} paddingBottom="5px">
            {title}
          </Text>
          <Text color="#ADADAD" fontSize={12}>
            {description}
          </Text>
        </Box>
      </Flex>
    );
  };

  const [activeTab, setActiveTab] = useState(0);
  const tabClick = (e, tab) => {
    console.log("Click", e);
    console.log("TAB", tab);
    setActiveTab(tab);
  };

  const StyledFlex = styled(Flex)`
    background: linear-gradient(89.1deg, #61045f 43.06%, #aa076b 111.87%);
  `;

  //////table
  const data = [
    {
      name: "Holistic Health",
      appID: "0IVzuQpF...",
      type: "Application",
      progress: "25",
      density: "402.82",
    },
    {
      name: "Battleship",
      appID: "0IVzuQpF...",
      type: "Widget",
      progress: "50",
      density: "146.24",
    },
    {
      name: "PopChat",
      appID: "0IVzuQpF...",
      type: "Widget",
      progress: "10",
      density: "200.72",
    },
    {
      name: "Pollen Run",
      appID: "0IVzuQpF...",
      type: "Application",
      progress: "100",
      density: "33.27",
    },
    {
      name: "Sleep Master",
      appID: "0IVzuQpF...",
      type: "Widget",
      progress: "20",
      density: "3.77",
    },
    {
      name: "Budget Buddy",
      appID: "0IVzuQpF...",
      type: "Widget",
      progress: "80",
      density: "3.31",
    },
    {
      name: "Text",
      appID: "0IVzuQpF...",
      type: "Application",
      progress: "35",
      density: "232.17",
    },
    {
      name: "Text",
      appID: "0IVzuQpF...",
      type: "Application",
      progress: "35",
      density: "232.17",
    },
    {
      name: "Text",
      appID: "0IVzuQpF...",
      type: "Application",
      progress: "35",
      density: "232.17",
    },
    {
      name: "Text",
      appID: "0IVzuQpF...",
      type: "Application",
      progress: "35",
      density: "232.17",
    },
    {
      name: "Text",
      appID: "0IVzuQpF...",
      type: "Application",
      progress: "35",
      density: "232.17",
    },
    {
      name: "Text",
      appID: "0IVzuQpF...",
      type: "Application",
      progress: "35",
      density: "232.17",
    },
    {
      name: "Text",
      appID: "0IVzuQpF...",
      type: "Application",
      progress: "35",
      density: "232.17",
    },
    {
      name: "Text",
      appID: "0IVzuQpF...",
      type: "Application",
      progress: "100",
      density: "232.17",
    },
    {
      name: "Text",
      appID: "0IVzuQpF...",
      type: "Application",
      progress: "35",
      density: "232.17",
    },
    {
      name: "Text",
      appID: "0IVzuQpF...",
      type: "Application",
      progress: "100",
      density: "232.17",
    },
    {
      name: "Text",
      appID: "0IVzuQpF...",
      type: "Application",
      progress: "35",
      density: "232.17",
    },
    {
      name: "Text",
      appID: "0IVzuQpF...",
      type: "Application",
      progress: "35",
      density: "232.17",
    },
  ];

  const Badge = styled.span`
    position: absolute;
    // top: ${props => (props.isOpen ? "20px" : "9px")};
    // right: ${props => (props.isOpen ? "143px" : "9px")};
    min-width: 55px;
    height: 22px;
    padding: 3.5px 5.5px;
    border-radius: 20px;
    border: 1px solid #9f7aea;
    background: transparent;
    font-size: 10px;
    line-height: 10px;
    color: #9f7aea;
    font-weight: 700;
    text-transform: uppercase;
  `;

  const Badge2 = styled.span`
    position: absolute;
    // top: ${props => (props.isOpen ? "20px" : "9px")};
    // right: ${props => (props.isOpen ? "143px" : "9px")};
    min-width: 55px;
    height: 22px;
    padding: 3.5px 5.5px;
    border-radius: 20px;
    border: 1px solid #f6ad55;
    background: transparent;
    font-size: 10px;
    line-height: 10px;
    color: #f6ad55;
    font-weight: 700;
    text-transform: uppercase;
  `;

  const columns = [
    {
      Header: "Name",
      accessor: "name",
      sortType: "basic",
      Cell: props => {
        return (
          <Text
            color="white"
            onClick={() => {
              setStep(2);
            }}
          >
            {props.cell.value}{" "}
          </Text>
        );
      },
    },
    {
      Header: "App ID",
      accessor: "appID",
      sortType: "basic",
      align: "left",
      Cell: props => {
        console.log(props);
        return (
          <span
            style={{
              display: "flex",
              width: "100%",
              textAlign: props.cell.column.align,
            }}
          >
            <div style={{ paddingRight: 17 }}>{props.cell.value}</div>
            <BlendIcon iconify={copy} />
          </span>
        );
      },
    },
    {
      Header: "Type",
      accessor: "type",
      sortType: "basic",
      align: "center",
      Cell: props => {
        console.log(props);
        return (
          <span
            style={{
              display: "flex",
              width: "119px",
              textAlign: props.cell.column.align,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* {props.cell.value} */}
            {props.cell.value === "Widget" ? (
              <Badge isOpen>{props.cell.value}</Badge>
            ) : (
              <Badge2 isOpen>{props.cell.value}</Badge2>
            )}
          </span>
        );
      },
    },
    {
      Header: "Progress",
      accessor: "progress",
      sortType: "basic",
      align: "center",
      Cell: props => {
        console.log(props);
        return (
          <span
            style={{
              display: "block",
              width: "177px",
              textAlign: props.cell.column.align,
            }}
          >
            <ProgressBar
              color="#AA1370"
              height="8px"
              width="116px"
              percentage={props.cell.value}
            ></ProgressBar>
          </span>
        );
      },
    },
    {
      Header: "Actions",
      sortType: "basic",
      align: "center",
      Cell: props => {
        console.log(props);
        return (
          <span
            style={{
              display: "block",
              width: "177px",
              textAlign: props.cell.column.align,
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <BlendIcon iconify={mdiPowerPlug} />
              <BlendIcon iconify={baselineWeb} />
              <BlendIcon iconify={mdiZipBoxOutline} />
              <BlendIcon iconify={arrowTopRightBottomLeft} />
            </div>
          </span>
        );
      },
    },
    {
      Header: "Publishing",
      // accessor: "density",
      sortType: "basic",
      align: "left",
      Cell: props => {
        console.log(props);
        console.log("Custom row value", props.cell.row.allCells[3].value);
        return (
          <span
            style={{
              display: "block",
              // width: "100%",
              textAlign: "center",
              lineHeight: "24px",
            }}
          >
            {props.cell.row.allCells[3].value === "100" ? (
              <Button size="xs" lineHeight="24px" minWidth="84px">
                Submit
              </Button>
            ) : (
              <Button size="xs" lineHeight="24px" minWidth="84px" disabled>
                Submit
              </Button>
            )}
          </span>
        );
      },
    },
  ];

  function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height,
    };
  }

  function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState(
      getWindowDimensions(),
    );

    useEffect(() => {
      function handleResize() {
        setWindowDimensions(getWindowDimensions());
      }

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);

    return windowDimensions;
  }

  const { height, width } = useWindowDimensions();
  return (
    <ThemeProvider>
      {/* {!login && (
        <div>
          <div>
            Username:
            <input id={"username"} name={"username"} onChange={handleChange} />
          </div>
          <div>
            Password:
            <input id={"password"} name={"password"} onChange={handleChange} />
          </div>
          <div>
            <button
              onClick={e => {
                //console.log(loginFields);
                Auth.signIn(loginFields.username, loginFields.password).then(
                  () => {
                    setLogin(true);
                  },
                );
              }}
            >
              Login
            </button>
          </div>
        </div>
      )} */}
      {/* {login && settingsReady && (
        <DefaultApp
          appSyncClient={clientHandler.current}
          prifinaID={prifinaID.current}
          GraphQLClient={GRAPHQL}
        />
      )}
      {!settingsReady && <div />} */}

      <Navbar />
      <UserMenu />
      {step === 0 && (
        <Flex
          width="100%"
          height={height}
          paddingLeft="288px"
          paddingTop="30px"
          bg="#141020"
          // justifyContent="center"
          flexDirection="column"
        >
          <Flex flexDirection="column" alignItems="center">
            <Image src={createProject} style={{ position: "relative" }} />
            <Flex
              textAlign="center"
              width="506px"
              height="196px"
              flexDirection="column"
              justifyContent="space-between"
              alignItems="center"
              position="absolute"
              top="243px"
            >
              <Text color="white" fontSize={24}>
                Create your first project
              </Text>
              <Text color="#969595" fontSize={20}>
                Working on an app or are already done making one? Make it
                official by adding it here.
              </Text>
              <Button
                size="sm"
                onClick={() => {
                  setStep(1);
                }}
              >
                New Project
                {/* <BlendIcon iconify={bxsPlusCircle} size="12px" paddingLeft="10px" /> */}
              </Button>
            </Flex>
          </Flex>
          <Box paddingLeft="62px" paddingTop="100px">
            <Text color="white" fontSize={24}>
              Key Resources
            </Text>
            <Text color="#F5F8F7" fontSize={16} paddingTop="8px">
              Resources and utilities to help you build for Prifina
            </Text>
            <Flex paddingTop="35px">
              <Box paddingRight="42px">
                <ResourceCard
                  src={docs}
                  title="Prifina Docs"
                  description="Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu."
                />
              </Box>
              <Box paddingRight="42px">
                <ResourceCard
                  src={starterResources}
                  title="Prifina Docs"
                  description="Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu."
                />
              </Box>
              <Box paddingRight="42px">
                <ResourceCard
                  src={launcherResources}
                  title="Prifina Docs"
                  description="Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu."
                />
              </Box>
              <Box>
                <ResourceCard
                  src={slackResources}
                  title="Prifina Docs"
                  description="Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu."
                />
              </Box>
            </Flex>
          </Box>
        </Flex>
      )}
      {step === 1 && (
        <Flex
          width="100%"
          height={height}
          paddingLeft="288px"
          paddingTop="48px"
          bg="#141020"
          // justifyContent="center"
          flexDirection="column"
        >
          <CreateProjectModal />

          <Flex
            marginLeft="66px"
            bg="#231D35"
            width="1007px"
            height="617px"
            borderRadius="10px"
            flexDirection="column"
            alignItems="center"
          >
            <Flex
              paddingLeft="16px"
              paddingTop="16px"
              paddingBottom="40px"
              justifyContent="space-between"
              display="flex"
            >
              <Text color="white" fontSize={24}>
                Projects
              </Text>
              <Box marginLeft="750px">
                <Button
                  onClick={() => {
                    setStep(4);
                  }}
                  size="sm"
                >
                  New Project
                </Button>
              </Box>
            </Flex>

            {/* <Image src={table} width="975px" height="433px" /> */}
            <Table columns={columns} data={data} />
          </Flex>
        </Flex>
      )}
      {step === 2 && (
        <Flex
          width="100%"
          height={height}
          paddingLeft="288px"
          paddingTop="48px"
          bg="#141020"
          // justifyContent="center"
          flexDirection="column"
        >
          <Flex
            marginLeft="66px"
            bg="#231D35"
            height="64px"
            borderRadius="10px"
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
            paddingRight="64px"
            paddingLeft="22px"
          >
            <Flex>
              <BlendIcon
                iconify={mdiArrowLeft}
                color="white"
                onClick={() => {
                  setStep(1);
                }}
              />
              <Text color="#F5F8F7" fontSize={18} paddingLeft="16px">
                Holistic Health
              </Text>
            </Flex>
            <Flex alignItems="center">
              <Button>Launch Sandbox</Button>
              <Box paddingLeft="17px">
                <BlendIcon
                  iconify={bxsInfoCircle}
                  width="13px"
                  color="#969595"
                />
              </Box>
            </Flex>
          </Flex>
          <StyledFlex
            height="95px"
            // width="100%"
            marginLeft="66px"
            alignItems="center"
            paddingLeft="61px"
            paddingRight="74px"
          >
            <Box width="1007px">
              <Text fontSize={18} color="white" paddingBottom="15px">
                Project Completion
              </Text>
              <ProgressBar
                height="5px"
                percentage={25}
                color="black"
              ></ProgressBar>
              <Text paddingTop="8px" color="white" fontSize={12}>
                1/4 View Steps
              </Text>
            </Box>
          </StyledFlex>

          <Flex
            paddingLeft="65px"
            paddingTop="38px"
            paddingRight="50px"
            width="1037px"
          >
            <Tabs
              activeTab={activeTab}
              onClick={tabClick}
              height="532px"
              width="1037px"
              style={{
                paddingTop: 0,
                background: "transparent",
                borderBottom: 0,
                paddingLeft: 0,
              }}
            >
              <TabList
                style={{
                  marginRight: 8,
                  marginLeft: 0,
                  borderTopRightRadius: 10,
                  borderTopLeftRadius: 10,
                  // background: "#1D152C",
                  borderWidth: 0,
                }}
              >
                <Tab style={{ marginLeft: 0 }}>Sanbox Testing</Tab>
                <Tab>Marketplace listing</Tab>
                <Tab>Uploads</Tab>
              </TabList>
              <TabPanelList style={{ background: "#1D152C" }}>
                <TabPanel>
                  <>
                    <Box paddingTop="46px" paddingLeft="41px">
                      <Box width="493px">
                        <Text color="white" fontSize="24px">
                          Sandbox testing
                        </Text>
                        <Text paddingTop="21px" color="white" fontSize="16px">
                          Finished your local build? See how your application
                          will behave on our platform using our Sandbox
                          enviroment.{" "}
                        </Text>
                      </Box>
                    </Box>
                    <Box
                      marginTop="49px"
                      marginLeft="16px"
                      marginRight="16px"
                      paddingTop="35px"
                      paddingLeft="32px"
                      height="315px"
                      style={{
                        border: "1px solid #3F3A4F",
                        borderTopRightRadius: 15,
                        borderTopLeftRadius: 15,
                        borderBottom: 0,
                      }}
                    >
                      <Text color="white" fontSize="18px">
                        Launch Sandbox session
                      </Text>
                      <Text
                        color="#ADADAD"
                        fontSize={12}
                        paddingTop="34px"
                        paddingBottom="4px"
                      >
                        App ID
                      </Text>
                      <Input width="331px" placeholder="Sleep Tracker" />
                      <Flex>
                        <Box>
                          <Text
                            paddingTop="42px"
                            paddingBottom="16px"
                            color="#ADADAD"
                            fontSize="12px"
                          >
                            Project Name
                          </Text>
                          <Input width="361px" placeholder="Sleep Tracker" />
                        </Box>
                        <Box marginLeft="26px">
                          <Text
                            paddingTop="42px"
                            paddingBottom="16px"
                            color="#ADADAD"
                            fontSize="12px"
                          >
                            Remote Link
                          </Text>
                          <Input width="361px" placeholder="Remote Link" />
                        </Box>
                      </Flex>
                    </Box>
                  </>
                </TabPanel>
                <TabPanel>
                  <Box>{/* <Text colorStyle={"error"}>Testing2</Text> */}</Box>
                </TabPanel>
                <TabPanel>
                  <Box>{/* <Text colorStyle={"error"}>Testing3</Text> */}</Box>
                </TabPanel>
              </TabPanelList>
            </Tabs>
          </Flex>
        </Flex>
      )}
      {step === 4 && (
        <Flex
          width="100%"
          height={height}
          paddingLeft="288px"
          paddingTop="48px"
          bg="#141020"
          // justifyContent="center"
          flexDirection="column"
        >
          <CreateProjectModal />

          <Flex
            marginLeft="66px"
            bg="#231D35"
            width="1007px"
            height="617px"
            borderRadius="10px"
            flexDirection="column"
            alignItems="center"
          >
            <Flex
              paddingLeft="16px"
              paddingTop="16px"
              paddingBottom="40px"
              justifyContent="space-between"
              display="flex"
            >
              <Text color="white" fontSize={24}>
                Projects
              </Text>
              <Box marginLeft="750px">
                <Button
                  onClick={() => {
                    setStep(4);
                  }}
                  size="sm"
                >
                  New Project
                </Button>
              </Box>
            </Flex>

            {/* <Image src={table} width="975px" height="433px" /> */}
            <Table columns={columns} data={data} />
          </Flex>
        </Flex>
      )}
    </ThemeProvider>
  );
};

RegisterApp.story = {
  name: "Default App",
};

RegisterApp.story = {
  name: "Default APP theme",

  decorators: [
    Story => {
      //console.log("PROVIDER ", PrifinaProvider);
      return (
        <ThemeProvider>
          <Story />
        </ThemeProvider>
      );
    },
  ],
};
