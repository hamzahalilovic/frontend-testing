/* eslint-disable react/display-name */
/* eslint-disable react/no-multi-comp */

import React, { useRef, useState, useEffect } from "react";

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
} from "@blend-ui/core";

import CreateProjectModal from "../components/CreateProjectModal";
import createProject from "../assets/createProject.png";
import docs from "../assets/docs.png";
import starterResources from "../assets/starterResources.png";
import launcherResources from "../assets/launcherResources.png";
import slackResources from "../assets/slackResources.png";
import widget from "../assets/Widget.png";

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

export default { title: "Sandbox" };

export const Sandbox = props => {
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

  // const [ccolor, setColor] = useState("black");

  // constructor(props){
  //   super(props);
  //   this.state = { color: green };
  //   this.changeColor = this.changeColor.bind(this);
  // };

  const [color, setColor] = useState("black");

  const changeColor = () => {
    const newColor = color == "black" ? "white" : "black";
    setColor(newColor);
  };

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

      <Flex
        height="48px"
        width={width}
        bg="#61045F"
        alignItems="center"
        justifyContent="center"
      >
        <Text color="white" fontSize={16}>
          This is a live Sandbox session you are seeing how your project will
          render in Prifina
        </Text>
      </Flex>
      <Flex
        height="64px"
        width="100%"
        bg="#1D152C"
        justifyContent="flex-end"
        alignItems="center"
        paddingRight="67px"
      >
        <Text color="#F5F8F7" paddingRight="16px">
          Let there be light
        </Text>

        <Button
          size="xs"
          onClick={() => {
            changeColor();
          }}
        >
          Switch
        </Button>
      </Flex>
      <Flex
        // width="100%"
        height={height}
        // paddingLeft="288px"
        // paddingTop="30px"
        bg={color}
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        <Image src={widget} width="308px" height="295px" />
      </Flex>

    </ThemeProvider>
  );
};

Sandbox.story = {
  name: "Default App",
};

Sandbox.story = {
  name: "Sandbox",

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
